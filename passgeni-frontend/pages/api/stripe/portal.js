// =============================================================
// PASSGENI — STRIPE CUSTOMER PORTAL SESSION
// POST /api/stripe/portal
// =============================================================
// Creates a Stripe Customer Portal session so users can
// manage their subscription, update payment, cancel, etc.
//
// Request body:
//   { customerId: string }
//
// Response:
//   { url: string }
// =============================================================

import { getStripe } from "../../../lib/stripe.js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://passgeni.ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { customerId } = req.body || {};

  if (!customerId) {
    return res.status(400).json({ error: "customerId required" });
  }

  try {
    const stripe  = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: `${SITE_URL}/dashboard`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Stripe portal error:", error.message);
    return res.status(500).json({ error: "Could not create billing portal session" });
  }
}
