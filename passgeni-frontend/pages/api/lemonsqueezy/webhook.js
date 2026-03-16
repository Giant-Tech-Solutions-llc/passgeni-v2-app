// =============================================================
// PASSGENI — LEMON SQUEEZY WEBHOOK HANDLER
// POST /api/lemonsqueezy/webhook
// =============================================================
// Events handled:
//   subscription_created       — provision + welcome email
//   subscription_updated       — trial→active, status sync
//   subscription_cancelled     — deprovision + cancellation email
//   subscription_expired       — deprovision (grace period ended)
//   subscription_payment_failed — payment failed email
// =============================================================

import crypto                from "crypto";
import { generateApiKey }    from "../../../lib/apiKeys.js";
import { mapLSStatus }       from "../../../lib/lemonsqueezy.js";
import {
  upsertCustomer,
  findCustomerByLSId,
  findCustomerByEmail,
  createApiKey,
  deactivateCustomerKeys,
} from "../../../lib/db/client.js";
import { sendEmail }         from "../../../lib/email/send.js";
import { teamWelcome, teamPaymentFailed, teamCancellation } from "../../../lib/email/templates.js";

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data",  (c) => chunks.push(c));
    req.on("end",   ()  => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

// ─── PROVISION ────────────────────────────────────────────────
async function provisionTeamAccess({ lsCustomerId, lsSubscriptionId, customerEmail, customerName, trialEndsAt, renewsAt }) {
  const planStatus = trialEndsAt && new Date(trialEndsAt) > new Date() ? "trialing" : "active";

  const customer = await upsertCustomer({
    ls_customer_id:     String(lsCustomerId),
    ls_subscription_id: String(lsSubscriptionId),
    email:              customerEmail.toLowerCase(),
    name:               customerName || null,
    plan:               "team",
    plan_status:        planStatus,
    trial_end:          trialEndsAt || null,
    current_period_end: renewsAt    || null,
  });

  const { raw, hash, prefix } = generateApiKey("live");

  await createApiKey({
    customerId: customer.id,
    keyHash:    hash,
    keyPrefix:  prefix,
    label:      "Default",
  });

  const tmpl = teamWelcome(customerEmail, raw);
  await sendEmail({ to: customerEmail, ...tmpl });

  console.log(`✓ Provisioned Team for ${customerEmail}, key prefix: ${prefix}`);
  return customer;
}

// ─── DEPROVISION ─────────────────────────────────────────────
async function deprovisionTeamAccess(lsCustomerId) {
  const customer = await findCustomerByLSId(String(lsCustomerId));
  if (!customer) return;

  await deactivateCustomerKeys(customer.id);

  await upsertCustomer({
    ls_customer_id: String(lsCustomerId),
    plan:           "free",
    plan_status:    "canceled",
  });

  const tmpl = teamCancellation(customer.email);
  await sendEmail({ to: customer.email, ...tmpl });

  console.log(`✓ Deprovisioned Team for ${customer.email}`);
}

// ─── SUBSCRIPTION STATUS UPDATE ──────────────────────────────
async function updateSubscriptionStatus(attributes) {
  const { customer_id, id: subscriptionId, status, trial_ends_at, renews_at } = attributes;

  await upsertCustomer({
    ls_customer_id:     String(customer_id),
    ls_subscription_id: String(subscriptionId),
    plan:               (status === "cancelled" || status === "expired") ? "free" : "team",
    plan_status:        mapLSStatus(status),
    trial_end:          trial_ends_at || null,
    current_period_end: renews_at     || null,
  });
}

// ─── MAIN HANDLER ────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: "Webhook secret not configured" });

  const rawBody  = await getRawBody(req);
  const signature = req.headers["x-signature"] || "";

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(signature, "utf8"))) {
    console.error("Webhook signature mismatch");
    return res.status(400).json({ error: "Invalid signature" });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const eventName = payload?.meta?.event_name;
  const attrs     = payload?.data?.attributes;

  try {
    switch (eventName) {

      case "subscription_created": {
        // attrs: user_email, user_name, customer_id, id (subscriptionId),
        //        trial_ends_at, renews_at, status
        if (!attrs) break;
        await provisionTeamAccess({
          lsCustomerId:     attrs.customer_id,
          lsSubscriptionId: payload.data.id,
          customerEmail:    attrs.user_email,
          customerName:     attrs.user_name || null,
          trialEndsAt:      attrs.trial_ends_at || null,
          renewsAt:         attrs.renews_at     || null,
        });
        break;
      }

      case "subscription_updated": {
        if (!attrs) break;
        await updateSubscriptionStatus({ ...attrs, id: payload.data.id });
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        if (!attrs) break;
        await deprovisionTeamAccess(attrs.customer_id);
        break;
      }

      case "subscription_payment_failed": {
        if (!attrs) break;
        await upsertCustomer({
          ls_customer_id: String(attrs.customer_id),
          plan_status:    "past_due",
        });
        const customer = await findCustomerByLSId(String(attrs.customer_id));
        if (customer?.email) {
          const tmpl = teamPaymentFailed(customer.email);
          await sendEmail({ to: customer.email, ...tmpl });
        }
        break;
      }

      default: break;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
