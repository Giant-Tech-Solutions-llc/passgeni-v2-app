// =============================================================
// PASSGENI — LEMON SQUEEZY CUSTOMER PORTAL
// POST /api/lemonsqueezy/portal
// =============================================================
// Returns a Lemon Squeezy customer portal URL so users can
// manage their subscription, update payment, cancel, etc.
//
// Request body:
//   { customerId: string }   — Lemon Squeezy customer ID
//
// Response:
//   { url: string }
// =============================================================

import { setupLemonSqueezy } from "../../../lib/lemonsqueezy.js";
import { getCustomer }       from "@lemonsqueezy/lemonsqueezy.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { customerId } = req.body || {};

  if (!customerId) {
    return res.status(400).json({ error: "customerId required" });
  }

  try {
    setupLemonSqueezy();

    const { data, error } = await getCustomer(customerId);

    if (error) throw new Error(error.message);

    const portalUrl = data?.attributes?.urls?.customer_portal;
    if (!portalUrl) {
      return res.status(404).json({ error: "Customer portal URL not available" });
    }

    return res.status(200).json({ url: portalUrl });

  } catch (err) {
    console.error("Lemon Squeezy portal error:", err.message);
    return res.status(500).json({ error: "Could not retrieve billing portal URL" });
  }
}
