// =============================================================
// PASSGENI — API USAGE ALERT  (pages/api/usage/alert.js)
// POST /api/usage/alert
// =============================================================
// Called internally from /api/v1/generate when usage hits
// a threshold (80% or 100% of daily limit).
// Uses the teamApiLimitWarning email template.
//
// Body: { customerId, email, percentUsed }
// Auth: internal — protected by INTERNAL_SECRET env var
// =============================================================

import { sendEmail }            from "../../../lib/email/send.js";
import { teamApiLimitWarning }  from "../../../lib/email/templates.js";

// Simple in-memory dedup: prevent double-sending for the same
// customer + threshold within a 24-hour window.
const _alerted = new Map(); // key: `${customerId}:${threshold}`

function wasAlertedToday(customerId, threshold) {
  const key  = `${customerId}:${threshold}`;
  const last = _alerted.get(key);
  if (!last) return false;
  return (Date.now() - last) < 86_400_000; // 24h
}

function markAlerted(customerId, threshold) {
  _alerted.set(`${customerId}:${threshold}`, Date.now());
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Protect internal endpoint
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { customerId, email, percentUsed } = req.body;

  if (!customerId || !email || !percentUsed) {
    return res.status(400).json({ error: "customerId, email, percentUsed required" });
  }

  // Round to 80 or 100 for dedup key
  const threshold = percentUsed >= 100 ? 100 : 80;

  if (wasAlertedToday(customerId, threshold)) {
    return res.status(200).json({ skipped: true, reason: "already_alerted_today" });
  }

  const tmpl = teamApiLimitWarning(email, threshold);
  const { ok } = await sendEmail({ to: email, ...tmpl });

  if (ok) markAlerted(customerId, threshold);

  return res.status(ok ? 200 : 500).json({ ok });
}
