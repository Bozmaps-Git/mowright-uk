-- MowRight UK marketplace — initial schema.
-- Run with the Supabase CLI: `supabase db push`
-- Or apply via the Supabase SQL editor / MCP `apply_migration`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: lightweight per-user row, auto-created on signup.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  phone         text,
  postcode      text,
  created_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_self_select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_self_insert" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Trigger: create a profile row whenever a new auth.user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- listings: a user-submitted mower for sale.
-- ---------------------------------------------------------------------------
-- status lifecycle:
--   draft     - created, awaiting payment
--   live      - paid, visible publicly, expires_at in future
--   expired   - past expires_at (or manually expired)
--   sold      - seller marked as sold
--   removed   - seller or admin took it down
create type listing_status as enum ('draft', 'live', 'expired', 'sold', 'removed');
create type listing_condition as enum ('new', 'like-new', 'good', 'fair', 'spares-or-repair');

create table if not exists public.listings (
  id               uuid primary key default gen_random_uuid(),
  seller_id        uuid not null references auth.users(id) on delete cascade,
  status           listing_status not null default 'draft',

  -- Mower details
  title            text not null check (char_length(title) between 3 and 120),
  brand            text not null,
  model            text not null,
  mower_type       text not null,           -- Petrol / Electric / Cordless / Hover / Robotic / Ride-on / Push
  catalog_slug     text,                    -- optional link to mowers.json (e.g. "honda-hrx-476-vy")
  condition        listing_condition not null,
  year             int  check (year is null or (year between 1950 and extract(year from now())::int + 1)),
  hours            int  check (hours is null or hours >= 0),

  -- Price & money
  price_pence      int  not null check (price_pence > 0),
  delivery_pence   int  check (delivery_pence is null or delivery_pence >= 0),
  delivery_notes   text,

  -- Location
  postcode_area    text not null,           -- e.g. "SW1", "M14" — outward code only, never full postcode
  town             text,

  -- Description
  description      text not null check (char_length(description) between 20 and 5000),

  -- Contact preferences
  contact_email    text,
  contact_phone    text,

  -- Lifecycle / payments
  paid_at          timestamptz,
  expires_at       timestamptz,
  bumped_at        timestamptz,
  view_count       int not null default 0,

  -- Stripe linkage
  stripe_checkout_session_id text,
  stripe_payment_intent_id   text,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists listings_status_expires_idx
  on public.listings (status, expires_at desc) where status = 'live';
create index if not exists listings_seller_idx on public.listings (seller_id);
create index if not exists listings_type_idx on public.listings (mower_type) where status = 'live';
create index if not exists listings_brand_idx on public.listings (brand) where status = 'live';

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists listings_touch_updated_at on public.listings;
create trigger listings_touch_updated_at
  before update on public.listings
  for each row execute function public.set_updated_at();

alter table public.listings enable row level security;

-- Anyone can read live listings; sellers can read their own at any status.
create policy "listings_public_select_live" on public.listings
  for select using (status = 'live');
create policy "listings_self_select_all" on public.listings
  for select using (auth.uid() = seller_id);

-- Sellers can insert their own draft, update their own (except status/paid_at),
-- and delete their own.
create policy "listings_self_insert" on public.listings
  for insert with check (auth.uid() = seller_id and status = 'draft');
create policy "listings_self_update" on public.listings
  for update using (auth.uid() = seller_id) with check (auth.uid() = seller_id);
create policy "listings_self_delete" on public.listings
  for delete using (auth.uid() = seller_id);

-- ---------------------------------------------------------------------------
-- listing_images: uploaded photos for a listing (max ~6 per listing, enforced client-side).
-- ---------------------------------------------------------------------------
create table if not exists public.listing_images (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid not null references public.listings(id) on delete cascade,
  storage_path text not null,
  position     int  not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists listing_images_listing_idx
  on public.listing_images (listing_id, position);

alter table public.listing_images enable row level security;

create policy "listing_images_public_select_live" on public.listing_images
  for select using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.status = 'live'
    )
  );
create policy "listing_images_self_all" on public.listing_images
  for all using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.seller_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.seller_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- listing_payments: append-only audit log written by the Stripe webhook.
-- Used by the webhook (service role) only; clients never see it.
-- ---------------------------------------------------------------------------
create table if not exists public.listing_payments (
  id                       uuid primary key default gen_random_uuid(),
  listing_id               uuid references public.listings(id) on delete set null,
  stripe_event_id          text not null unique,
  stripe_session_id        text,
  stripe_payment_intent_id text,
  amount_pence             int,
  currency                 text,
  status                   text,            -- 'paid', 'refunded', etc
  raw                      jsonb,
  received_at              timestamptz not null default now()
);

alter table public.listing_payments enable row level security;
-- No policies = no client access. Only service role (webhook) can read/write.

-- ---------------------------------------------------------------------------
-- Storage bucket for listing photos.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Anyone can read images (the bucket is public anyway, but explicit).
drop policy if exists "listing_images_storage_public_read" on storage.objects;
create policy "listing_images_storage_public_read" on storage.objects
  for select using (bucket_id = 'listing-images');

-- Authenticated users can upload only into their own folder (uid/<listing-id>/<file>).
drop policy if exists "listing_images_storage_self_upload" on storage.objects;
create policy "listing_images_storage_self_upload" on storage.objects
  for insert with check (
    bucket_id = 'listing-images'
    and auth.uid()::text = split_part(name, '/', 1)
  );
drop policy if exists "listing_images_storage_self_delete" on storage.objects;
create policy "listing_images_storage_self_delete" on storage.objects
  for delete using (
    bucket_id = 'listing-images'
    and auth.uid()::text = split_part(name, '/', 1)
  );

-- ---------------------------------------------------------------------------
-- View: public_listings — denormalised feed for the marketplace browse page,
-- joins first image and decorates with display fields. Read by anon clients.
-- ---------------------------------------------------------------------------
create or replace view public.public_listings as
  select
    l.id,
    l.title,
    l.brand,
    l.model,
    l.mower_type,
    l.catalog_slug,
    l.condition,
    l.year,
    l.price_pence,
    l.postcode_area,
    l.town,
    l.created_at,
    l.paid_at,
    l.expires_at,
    (
      select li.storage_path from public.listing_images li
      where li.listing_id = l.id order by li.position asc limit 1
    ) as cover_path,
    (
      select count(*) from public.listing_images li where li.listing_id = l.id
    ) as image_count
  from public.listings l
  where l.status = 'live'
    and (l.expires_at is null or l.expires_at > now());

grant select on public.public_listings to anon, authenticated;
