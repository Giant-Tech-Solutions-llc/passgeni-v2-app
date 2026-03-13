// =============================================================
// PASSGENI — TEAM MEMBER MANAGEMENT
// POST /api/keys/team
// =============================================================
// Actions:
//   { action: "invite", email: string, name: string }
//   { action: "remove", memberId: string }
//
// Rules:
//   - Team plan allows up to 5 seats
//   - Owner is automatically the paying customer
//   - Invited members receive an email with sign-in link
// =============================================================

import { requireTeam } from "../../../lib/auth.js";
import { getDB } from "../../../lib/db/client.js";

const MAX_SEATS = 5;

// ─── INVITE EMAIL ────────────────────────────────────────────
async function sendInviteEmail({ inviteeEmail, inviteeName, inviterEmail, dashboardUrl }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from:    "PassGeni <hello@passgeni.ai>",
      to:      [inviteeEmail],
      subject: `${inviterEmail} invited you to PassGeni Team`,
      html: `<!DOCTYPE html>
<html>
<body style="background:#060608;color:#e0e0e0;font-family:'DM Sans',Arial,sans-serif;margin:0;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;">
    <div style="margin-bottom:28px;">
      <span style="font-size:22px;font-weight:800;color:#C8FF00;">PassGeni</span>
    </div>
    <h1 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 14px;">You've been invited.</h1>
    <p style="font-size:14px;color:#aaa;line-height:1.8;margin:0 0 24px;">
      ${inviterEmail} invited you to join their PassGeni Team account.
      Sign in with your email address to access the team dashboard and API tools.
    </p>
    <a href="${dashboardUrl}" style="display:inline-block;background:#C8FF00;color:#000;font-weight:800;font-size:14px;padding:14px 28px;border-radius:8px;text-decoration:none;">
      Accept invitation →
    </a>
    <p style="font-size:11px;color:#555;margin-top:24px;line-height:1.6;">
      If you didn't expect this invitation, you can safely ignore this email.
    </p>
  </div>
</body>
</html>`,
    }),
  });
}

// ─── HANDLER ─────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const auth = await requireTeam(req, res);
  if (!auth) return;

  const { action, email, name, memberId } = req.body || {};
  const db = getDB();

  // ── INVITE ──────────────────────────────────────────────
  if (action === "invite") {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email required" });
    }

    // Count existing active members
    const { data: existing, error: countErr } = await db
      .from("team_members")
      .select("id", { count: "exact" })
      .eq("customer_id", auth.customerId)
      .neq("status", "removed");

    if (countErr) throw countErr;
    if ((existing?.length || 0) >= MAX_SEATS) {
      return res.status(400).json({ error: `Team limit reached (${MAX_SEATS} seats max)` });
    }

    // Upsert the invite
    const { data: member, error: inviteErr } = await db
      .from("team_members")
      .upsert(
        {
          customer_id: auth.customerId,
          email:       email.toLowerCase(),
          name:        name || null,
          role:        "member",
          status:      "pending",
          invited_at:  new Date().toISOString(),
        },
        { onConflict: "customer_id,email" }
      )
      .select()
      .single();

    if (inviteErr) throw inviteErr;

    // Send invite email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://passgeni.ai";
    await sendInviteEmail({
      inviteeEmail:  email,
      inviteeName:   name,
      inviterEmail:  auth.session.user.email,
      dashboardUrl:  `${siteUrl}/auth/signin?callbackUrl=/dashboard`,
    }).catch(console.error);

    return res.status(200).json({
      success: true,
      member,
      message: `Invitation sent to ${email}`,
    });
  }

  // ── REMOVE ──────────────────────────────────────────────
  if (action === "remove") {
    if (!memberId) return res.status(400).json({ error: "memberId required" });

    const { error: removeErr } = await db
      .from("team_members")
      .update({ status: "removed" })
      .eq("id", memberId)
      .eq("customer_id", auth.customerId)
      .neq("role", "owner"); // can't remove the owner

    if (removeErr) throw removeErr;

    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Invalid action. Use 'invite' or 'remove'." });
}
