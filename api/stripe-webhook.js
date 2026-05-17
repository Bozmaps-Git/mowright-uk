// POST /api/stripe-webhook
// Stripe calls this when a Checkout session completes. On success we flip the
// linked listing from 'draft' to 'live' and set expires_at.

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Disable Vercel's body parser so we can verify the raw signature.
export const config = { api: { bodyParser: false } };

const LISTING_DURATION_DAYS = parseInt(process.env.LISTING_DURATION_DAYS || '30', 10);

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err.message);
    return res.status(400).end(`Webhook Error: ${err.message}`);
  }

  const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  try {
    // Idempotency: drop if we've already processed this event id.
    const { data: existing } = await admin
      .from('listing_payments')
      .select('id')
      .eq('stripe_event_id', event.id)
      .maybeSingle();
    if (existing) return res.status(200).json({ received: true, duplicate: true });

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const listingId = session.metadata?.listing_id;
      const paid = session.payment_status === 'paid';

      if (listingId && paid) {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + LISTING_DURATION_DAYS * 86400000);

        const { error: updErr } = await admin
          .from('listings')
          .update({
            status: 'live',
            paid_at: now.toISOString(),
            expires_at: expiresAt.toISOString(),
            stripe_payment_intent_id: session.payment_intent || null,
          })
          .eq('id', listingId)
          .eq('status', 'draft');                         // only promote drafts

        if (updErr) console.error('[webhook] listing update error:', updErr);

        await admin.from('listing_payments').insert({
          listing_id: listingId,
          stripe_event_id: event.id,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent || null,
          amount_pence: session.amount_total ?? null,
          currency: session.currency || 'gbp',
          status: 'paid',
          raw: event,
        });
      } else {
        // Log even if not paid so we have the trail.
        await admin.from('listing_payments').insert({
          listing_id: listingId || null,
          stripe_event_id: event.id,
          stripe_session_id: session.id,
          amount_pence: session.amount_total ?? null,
          currency: session.currency || 'gbp',
          status: session.payment_status || 'unpaid',
          raw: event,
        });
      }
    } else {
      // Acknowledge other events without action.
      await admin.from('listing_payments').insert({
        stripe_event_id: event.id,
        status: event.type,
        raw: event,
      }).select().then(() => {}, () => {});
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    return res.status(500).end('Webhook handler error');
  }
}
