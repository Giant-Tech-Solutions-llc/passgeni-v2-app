// =============================================================
// PASSGENI — CREATE STRIPE CHECKOUT SESSION
// POST /api/stripe/checkout
// =============================================================
// Creates a Stripe Checkout session for the Team plan.
// Redirects the browser to Stripe's hosted checkout page.
//
// Request body:
//   { email: string }   — pre-fills the checkout email field
//
// Response:
//   { url: string }     — Stripe checkout URL to redirect to
// =============================================================

import { getStripe, STRIPE_PRICES } from "../../../lib/stripe.js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://passgeni.ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};

  try {
    const stripe  = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode:                 "subscription",
      payment_method_types: ["card"],

      // Pre-fill email if provided
      ...(email ? { customer_email: email } : {}),

      line_items: [
        {
          price:    STRIPE_PRICES.team_monthly,
          quantity: 1,
        },
      ],

      // ── What happens after checkout ──────────────────────
      success_url: `${SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url:  `${SITE_URL}/#pricing`,

      // ── Metadata stored on the session ───────────────────
      // Used in the webhook to identify the customer
      metadata: {
        product: "passgeni_team",
        version: "2.0",
      },

      // ── Allow promotion codes ─────────────────────────────
      allow_promotion_codes: true,

      // ── 14-day free trial ─────────────────────────────────
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          product: "passgeni_team",
        },
      },
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    return res.status(500).json({
      error: "Could not create checkout session. Please try again or contact hello@passgeni.ai",
    });
  }
}
