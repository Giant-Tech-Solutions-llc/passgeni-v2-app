// =============================================================
// PASSGENI — CREATE LEMON SQUEEZY CHECKOUT
// POST /api/lemonsqueezy/checkout
// =============================================================
// Creates a Lemon Squeezy checkout for the Team plan.
// Redirects the browser to the LS hosted checkout page.
//
// Request body:
//   { email: string }   — pre-fills the checkout email field
//
// Response:
//   { url: string }     — checkout URL to redirect to
// =============================================================

import { setupLemonSqueezy, LS_VARIANTS } from "../../../lib/lemonsqueezy.js";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://passgeni.ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};

  try {
    setupLemonSqueezy();

    const storeId   = process.env.LEMONSQUEEZY_STORE_ID;
    const variantId = LS_VARIANTS.team_monthly;

    if (!storeId) {
      throw new Error("LEMONSQUEEZY_STORE_ID environment variable not set");
    }

    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: email || undefined,
        custom: {
          product:  "passgeni_team",
          version:  "2.0",
        },
      },
      productOptions: {
        redirectUrl:      `${SITE_URL}/dashboard?status=success`,
        receiptButtonUrl: `${SITE_URL}/dashboard`,
        receiptThankYouNote: "Welcome to PassGeni Team! Check your email for your API key.",
      },
      checkoutOptions: {
        embed:        false,
        media:        false,
        logo:         true,
      },
    });

    if (error) throw new Error(error.message);

    return res.status(200).json({ url: data.attributes.url });

  } catch (err) {
    console.error("Lemon Squeezy checkout error:", err.message);
    return res.status(500).json({
      error: "Could not create checkout session. Please try again or contact hello@passgeni.ai",
    });
  }
}
