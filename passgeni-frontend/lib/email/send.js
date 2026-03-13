// =============================================================
// PASSGENI — EMAIL SENDER  (lib/email/send.js)
// =============================================================
// Thin wrapper around the Resend API.
// All emails go through this function — never call Resend directly.
//
// Usage:
//   import { sendEmail } from "../../lib/email/send.js";
//   const { ok, error } = await sendEmail({
//     to:      "user@example.com",
//     subject: "Hello",
//     html:    "<p>Hello</p>",
//   });
// =============================================================

const RESEND_API = "https://api.resend.com/emails";
const FROM       = "PassGeni <hello@passgeni.ai>";

/**
 * Send a transactional email via Resend.
 * Returns { ok: true } on success or { ok: false, error: string } on failure.
 * Never throws — all errors are caught and returned.
 *
 * @param {{ to: string, subject: string, html: string }} options
 */
export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set — email not sent");
    return { ok: false, error: "Email service not configured" };
  }

  try {
    const res = await fetch(RESEND_API, {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Resend API error ${res.status}: ${body}`);
      return { ok: false, error: `Resend API error: ${res.status}` };
    }

    const data = await res.json();
    console.log(`[email] Sent "${subject}" to ${to} — id: ${data.id}`);
    return { ok: true, id: data.id };

  } catch (err) {
    console.error("[email] Fetch error:", err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Add a contact to the Resend audience.
 * Safe to call on every signup — Resend deduplicates by email.
 *
 * @param {string} email
 * @param {{ firstName?: string, lastName?: string }} [meta]
 */
export async function addToAudience(email, meta = {}) {
  const apiKey     = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn("[email] Audience not configured — contact not added");
    return { ok: false };
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method:  "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({
          email,
          first_name:   meta.firstName || "",
          last_name:    meta.lastName  || "",
          unsubscribed: false,
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Audience add error ${res.status}: ${body}`);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] Audience fetch error:", err.message);
    return { ok: false };
  }
}
