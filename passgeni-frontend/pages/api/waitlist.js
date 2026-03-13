// =============================================================
// PASSGENI — WAITLIST API ROUTE  (Phase 6 — email sequences)
// POST /api/waitlist
// =============================================================
// Adds email to Resend audience and sends the welcome email.
// The Day 3 and Day 7 nurture sequences are triggered separately
// via Resend's broadcast system (or POST /api/waitlist/sequence).
//
// Environment variables:
//   RESEND_API_KEY     — Resend API key
//   RESEND_AUDIENCE_ID — Resend audience ID
// =============================================================

import { sendEmail, addToAudience } from "../../lib/email/send.js";
import { waitlistWelcome }          from "../../lib/email/templates.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email address required" });
  }

  try {
    // 1. Add to Resend audience (for future broadcasts)
    await addToAudience(email);

    // 2. Send welcome email
    const tmpl   = waitlistWelcome(email);
    const result = await sendEmail({ to: email, ...tmpl });

    if (!result.ok) {
      return res.status(500).json({ error: "Failed to send confirmation email" });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Waitlist signup error:", err);
    return res.status(500).json({ error: "Failed to process signup. Please try again." });
  }
}
