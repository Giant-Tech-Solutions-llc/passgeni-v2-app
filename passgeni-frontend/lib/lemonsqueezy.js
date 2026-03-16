// =============================================================
// PASSGENI — LEMON SQUEEZY CONFIGURATION
// =============================================================
// All Lemon Squeezy variant IDs and plan metadata live here.
// When you create products in the LS dashboard, paste the
// Variant ID into LEMONSQUEEZY_VARIANT_TEAM_MONTHLY below.
//
// Environment variables required (Vercel dashboard):
//   LEMONSQUEEZY_API_KEY              — from Settings → API
//   LEMONSQUEEZY_STORE_ID             — from Settings → Store
//   LEMONSQUEEZY_VARIANT_TEAM_MONTHLY — from Products → Variants
//   LEMONSQUEEZY_WEBHOOK_SECRET       — from Settings → Webhooks
// =============================================================

import { lemonSqueezySetup as _setup } from "@lemonsqueezy/lemonsqueezy.js";

// ─── PLAN VARIANT IDs ──────────────────────────────────────
export const LS_VARIANTS = {
  team_monthly: process.env.LEMONSQUEEZY_VARIANT_TEAM_MONTHLY || "REPLACE_WITH_VARIANT_ID",
};

// ─── PLAN METADATA ────────────────────────────────────────
export const PLANS = {
  free: {
    id:         "free",
    name:       "Free",
    price:      0,
    apiCalls:   50,
    maxBulk:    10,
    seats:      1,
    compliance: false,
    api:        true,
  },
  team: {
    id:         "team",
    name:       "Team",
    price:      29,
    apiCalls:   5000,
    maxBulk:    500,
    seats:      5,
    compliance: true,
    api:        true,
    lsVariantId: LS_VARIANTS.team_monthly,
  },
};

// ─── SDK SETUP ────────────────────────────────────────────
// Call once before using any SDK function (idempotent).
export function setupLemonSqueezy() {
  if (!process.env.LEMONSQUEEZY_API_KEY) {
    throw new Error("LEMONSQUEEZY_API_KEY environment variable not set");
  }
  _setup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });
}

// ─── HELPERS ──────────────────────────────────────────────

/**
 * Maps a Lemon Squeezy subscription status to our internal plan.
 * LS statuses: active, on_trial, past_due, unpaid, cancelled, expired, paused
 */
export function getPlanFromSubscription(attributes) {
  if (!attributes) return PLANS.free;
  const { status, variant_id } = attributes;
  const variantId = String(variant_id);
  if ((status === "active" || status === "on_trial") && variantId === String(LS_VARIANTS.team_monthly)) {
    return PLANS.team;
  }
  return PLANS.free;
}

/**
 * Maps a Lemon Squeezy subscription status to our internal plan_status value.
 */
export function mapLSStatus(status) {
  const map = {
    active:    "active",
    on_trial:  "trialing",
    past_due:  "past_due",
    unpaid:    "past_due",
    cancelled: "canceled",
    expired:   "canceled",
    paused:    "canceled",
  };
  return map[status] || status;
}
