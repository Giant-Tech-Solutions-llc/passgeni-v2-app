// =============================================================
// PASSGENI — STRIPE CONFIGURATION
// =============================================================
// All Stripe price IDs and plan metadata live here.
// When you create products in Stripe dashboard, paste the
// Price IDs into STRIPE_PRICES below.
//
// Environment variables required (Vercel dashboard):
//   STRIPE_SECRET_KEY         — sk_live_... or sk_test_...
//   STRIPE_WEBHOOK_SECRET     — whsec_...
//   NEXT_PUBLIC_STRIPE_PK     — pk_live_... or pk_test_...
// =============================================================

// ─── PLAN DEFINITIONS ─────────────────────────────────────────
// Keep this in sync with content/copy.js PRICING section.
// These are the Stripe Price IDs — paste from your Stripe dashboard.
export const STRIPE_PRICES = {
  team_monthly: process.env.STRIPE_PRICE_TEAM_MONTHLY || "price_REPLACE_WITH_LIVE_ID",
};

// ─── PLAN METADATA ────────────────────────────────────────────
export const PLANS = {
  free: {
    id:          "free",
    name:        "Free",
    price:       0,
    apiCalls:    50,      // per day
    maxBulk:     10,
    seats:       1,
    compliance:  false,
    api:         true,   // limited
  },
  team: {
    id:          "team",
    name:        "Team",
    price:       29,
    apiCalls:    5000,    // per day
    maxBulk:     500,
    seats:       5,
    compliance:  true,
    api:         true,
    stripePriceId: STRIPE_PRICES.team_monthly,
  },
};

// ─── STRIPE SDK INSTANCE ──────────────────────────────────────
// Lazy-loaded so it only runs server-side
let _stripe = null;
export function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY environment variable not set");
    }
    const Stripe = require("stripe");
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
      appInfo: {
        name:    "PassGeni",
        version: "2.0.0",
        url:     "https://passgeni.ai",
      },
    });
  }
  return _stripe;
}

// ─── HELPERS ──────────────────────────────────────────────────

/**
 * Returns the plan object for a given Stripe subscription status.
 * Called after webhook events to determine what to provision.
 */
export function getPlanFromSubscription(subscription) {
  if (!subscription || subscription.status !== "active") return PLANS.free;
  const priceId = subscription.items?.data?.[0]?.price?.id;
  if (priceId === STRIPE_PRICES.team_monthly) return PLANS.team;
  return PLANS.free;
}
