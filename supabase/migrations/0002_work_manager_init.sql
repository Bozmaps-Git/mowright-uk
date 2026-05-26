-- MowRight UK — Work Manager schema.
-- A lightweight CRM + day-route planner for tradespeople (gardeners, mower
-- service techs, landscapers) who already have a MowRight account.
--
-- Tables are prefixed `wm_` so they don't clash with the marketplace.
-- Multi-tenant via auth.uid() + RLS — every row belongs to one user.
--
-- Apply with: supabase db push, or the SQL editor / MCP apply_migration.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- wm_customers: end-customers of the trader (homeowners, businesses, sites).
-- ---------------------------------------------------------------------------
create table if not exists public.wm_customers (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  name         text not null check (char_length(name) between 1 and 120),
  company      text,
  phone        text,
  email        text,
  notes        text,
  address      text,
  lat          double precision,
  lng          double precision,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists wm_customers_user_idx on public.wm_customers(user_id);

-- ---------------------------------------------------------------------------
-- wm_jobs: a single visit to a customer at a date (+ optional fixed time).
-- ---------------------------------------------------------------------------
-- priority:
--   0 = flexible          (optimiser may schedule any time of day)
--   1 = morning only      (must finish by 12:00)
--   2 = afternoon only    (must start after 12:00)
--   3 = fixed_time        (must arrive exactly at fixed_time +/- 15min)
-- status: scheduled / in_progress / complete / cancelled.
create table if not exists public.wm_jobs (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  customer_id        uuid references public.wm_customers(id) on delete set null,
  title              text not null check (char_length(title) between 1 and 160),
  description        text,
  address            text not null,
  lat                double precision,
  lng                double precision,
  scheduled_date     date not null,
  fixed_time         time,
  estimated_minutes  int  not null default 60 check (estimated_minutes between 5 and 600),
  priority           int  not null default 0 check (priority between 0 and 3),
  price_pence        int,
  status             text not null default 'scheduled'
                       check (status in ('scheduled','in_progress','complete','cancelled')),
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists wm_jobs_user_date_idx on public.wm_jobs(user_id, scheduled_date);
create index if not exists wm_jobs_customer_idx  on public.wm_jobs(customer_id);

-- ---------------------------------------------------------------------------
-- wm_day_plans: stored, optimised route for a given date.
-- One row per (user_id, plan_date). Re-running the optimiser overwrites it.
-- ---------------------------------------------------------------------------
create table if not exists public.wm_day_plans (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  plan_date           date not null,
  start_address       text,
  start_lat           double precision,
  start_lng           double precision,
  end_address         text,
  end_lat             double precision,
  end_lng             double precision,
  start_time          time not null default '08:00',
  return_to_start     boolean not null default true,
  optimised_sequence  jsonb,             -- [{ job_id, leg_distance_km, leg_minutes, arrive, depart }]
  total_distance_km   double precision,
  total_drive_minutes int,
  optimised_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (user_id, plan_date)
);

create index if not exists wm_day_plans_user_date_idx on public.wm_day_plans(user_id, plan_date);

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger (reuses public.set_updated_at from marketplace migration
-- if present; otherwise creates it).
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists wm_customers_touch on public.wm_customers;
create trigger wm_customers_touch before update on public.wm_customers
  for each row execute function public.set_updated_at();

drop trigger if exists wm_jobs_touch on public.wm_jobs;
create trigger wm_jobs_touch before update on public.wm_jobs
  for each row execute function public.set_updated_at();

drop trigger if exists wm_day_plans_touch on public.wm_day_plans;
create trigger wm_day_plans_touch before update on public.wm_day_plans
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS — every row is owned by exactly one user.
-- ---------------------------------------------------------------------------
alter table public.wm_customers  enable row level security;
alter table public.wm_jobs       enable row level security;
alter table public.wm_day_plans  enable row level security;

create policy "wm_customers_own" on public.wm_customers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "wm_jobs_own" on public.wm_jobs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "wm_day_plans_own" on public.wm_day_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
