// POST /api/create-checkout
// Body: { listingId: string }
// Returns: { url: string } — Stripe Checkout session URL the client should redirect to.
//
// Auth: the caller passes the Supabase session via the Authorization header
// (set automatically by the supabase-js fetch hook). We verify with the anon
// client + service role for write access.

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://mowright.co.uk');
const LISTING_FEE_PENCE = parseInt(process.env.LISTING_FEE_PENCE || '299', 10);
const LISTING_FEE_LABEL = process.env.LISTING_FEE_LABEL || 'MowRight UK listing — 30 days';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { listingId } = req.body || {};
    if (!listingId) return res.status(400).json({ error: 'Missing listingId' });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    // Identify the caller from the supabase access token header.
    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!accessToken) return res.status(401).json({ error: 'Not signed in' });

    const { data: userData, error: userErr } = await admin.auth.getUser(accessToken);
    if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });
    const userId = userData.user.id;

    // Confirm the listing belongs to this user and is still a draft.
    const { data: listing, error: lErr } = await admin
      .from('listings')
      .select('id, seller_id, status, title')
      .eq('id', listingId)
      .maybeSingle();

    if (lErr || !listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.seller_id !== userId) return res.status(403).json({ error: 'Not your listing' });
    if (listing.status !== 'draft') {
      return res.status(400).json({ error: 'Listing is already live or sold' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: LISTING_FEE_PENCE,
            product_data: {
              name: LISTING_FEE_LABEL,
              description: `Listing: ${listing.title}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/account?paid=1&id=${encodeURIComponent(listing.id)}`,
      cancel_url: `${SITE_URL}/account?cancelled=1&id=${encodeURIComponent(listing.id)}`,
      metadata: { listing_id: listing.id, seller_id: userId },
      customer_email: userData.user.email || undefined,
    });

    // Cache the session id on the listing so the webhook can cross-check.
    await admin
      .from('listings')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', listing.id);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout]', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
