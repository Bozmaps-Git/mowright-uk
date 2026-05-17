// MowRight UK marketplace — shared client.
// Used by /sell, /marketplace, /listing, /account.
//
// Reads config from <meta name="mw-supabase-url"> and <meta name="mw-supabase-anon-key">.
// Listing fee shown to the user is also read from a meta tag so prices are
// edited in one place (HTML), not buried in JS.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

// ---- Config -----------------------------------------------------------------
const meta = (name) => {
  const el = document.querySelector(`meta[name="${name}"]`);
  return el ? el.getAttribute('content') : '';
};
const SUPABASE_URL = meta('mw-supabase-url');
const SUPABASE_ANON_KEY = meta('mw-supabase-anon-key');
export const LISTING_FEE_PENCE = parseInt(meta('mw-listing-fee-pence') || '299', 10);
export const LISTING_DURATION_DAYS = parseInt(meta('mw-listing-duration-days') || '30', 10);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[marketplace] Supabase env not configured. Set mw-supabase-url + mw-supabase-anon-key meta tags.');
}

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

// ---- Formatting helpers -----------------------------------------------------
export const fmtGBP = (pence) => {
  if (pence == null || isNaN(pence)) return '—';
  const pounds = pence / 100;
  return pounds >= 100
    ? '£' + Math.round(pounds).toLocaleString('en-GB')
    : '£' + pounds.toFixed(2);
};

export const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const fmtRelative = (iso) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return days + ' days ago';
  if (days < 30) return Math.floor(days / 7) + ' weeks ago';
  return fmtDate(iso);
};

export const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

// ---- Auth -------------------------------------------------------------------
export async function getSession() {
  const { data } = await sb.auth.getSession();
  return data.session || null;
}

export async function signInWithMagicLink(email, redirectTo) {
  return sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo || (location.origin + location.pathname) },
  });
}

export async function signOut() {
  await sb.auth.signOut();
  location.href = '/';
}

// ---- Storage / images -------------------------------------------------------
export function publicImageUrl(path) {
  if (!path) return '';
  const { data } = sb.storage.from('listing-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadListingImage(file, userId, listingId, position) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'].includes(ext) ? ext : 'jpg';
  const key = `${userId}/${listingId}/${position}-${Date.now()}.${safeExt}`;
  const { error } = await sb.storage
    .from('listing-images')
    .upload(key, file, { cacheControl: '31536000', upsert: false, contentType: file.type });
  if (error) throw error;
  return key;
}

// ---- Listings ---------------------------------------------------------------
export async function fetchPublicListings({ type, brand, condition, maxPrice, q, limit = 60 } = {}) {
  let query = sb.from('public_listings').select('*').order('paid_at', { ascending: false }).limit(limit);
  if (type) query = query.eq('mower_type', type);
  if (brand) query = query.eq('brand', brand);
  if (condition) query = query.eq('condition', condition);
  if (maxPrice) query = query.lte('price_pence', maxPrice * 100);
  if (q) query = query.or(`title.ilike.%${q}%,brand.ilike.%${q}%,model.ilike.%${q}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchListingById(id) {
  const [{ data: listing, error: lErr }, { data: images, error: iErr }] = await Promise.all([
    sb.from('listings').select('*').eq('id', id).maybeSingle(),
    sb.from('listing_images').select('*').eq('listing_id', id).order('position', { ascending: true }),
  ]);
  if (lErr) throw lErr;
  if (iErr) throw iErr;
  return { listing, images: images || [] };
}

export async function fetchMyListings() {
  const { data, error } = await sb
    .from('listings')
    .select('*, listing_images(storage_path, position)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createDraftListing(payload) {
  const { data, error } = await sb.from('listings').insert(payload).select().single();
  if (error) throw error;
  return data;
}

export async function attachImages(listingId, paths) {
  if (!paths.length) return [];
  const rows = paths.map((p, i) => ({ listing_id: listingId, storage_path: p, position: i }));
  const { data, error } = await sb.from('listing_images').insert(rows).select();
  if (error) throw error;
  return data || [];
}

export async function deleteListing(id) {
  const { error } = await sb.from('listings').delete().eq('id', id);
  if (error) throw error;
}

export async function markListingSold(id) {
  const { error } = await sb.from('listings').update({ status: 'sold' }).eq('id', id);
  if (error) throw error;
}

export async function startCheckout(listingId) {
  const session = await getSession();
  if (!session) throw new Error('Sign in first.');
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ listingId }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error('Checkout failed: ' + (text || res.status));
  }
  const { url } = await res.json();
  if (!url) throw new Error('No checkout URL returned');
  location.href = url;
}

// ---- Share helpers ----------------------------------------------------------
export function listingPublicUrl(id) {
  return location.origin + '/listing?id=' + encodeURIComponent(id);
}

export function shareTargets(listing, url) {
  const title = `${listing.title} — £${(listing.price_pence / 100).toFixed(0)} on MowRight UK`;
  const text = `${listing.title} for £${(listing.price_pence / 100).toFixed(0)} (${listing.condition}, ${listing.postcode_area}). Selling on MowRight UK Marketplace.`;
  const enc = encodeURIComponent;
  return [
    { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${enc(text + ' ' + url)}` },
    { id: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { id: 'x',        label: 'X',        href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { id: 'reddit',   label: 'Reddit',   href: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}` },
    { id: 'email',    label: 'Email',    href: `mailto:?subject=${enc(title)}&body=${enc(text + '\n\n' + url)}` },
  ];
}

export async function nativeShare(listing, url) {
  if (!navigator.share) return false;
  try {
    await navigator.share({
      title: listing.title,
      text: `${listing.title} for £${(listing.price_pence / 100).toFixed(0)} on MowRight UK Marketplace`,
      url,
    });
    return true;
  } catch (_) {
    return false;
  }
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    return false;
  }
}
