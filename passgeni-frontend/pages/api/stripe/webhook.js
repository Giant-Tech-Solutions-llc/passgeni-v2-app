// =============================================================
// PASSGENI — STRIPE WEBHOOK HANDLER  (Phase 6 — full email)
// POST /api/stripe/webhook
// =============================================================
// Phase 6: all email calls replaced with lib/email templates.
//
// Events handled:
//   checkout.session.completed       — provision + welcome email
//   customer.subscription.updated    — trial→active, status sync
//   customer.subscription.deleted    — deprovision + cancellation email
//   invoice.payment_failed           — payment failed email
// =============================================================

import { getStripe }     from "../../../lib/stripe.js";
import { generateApiKey } from "../../../lib/apiKeys.js";
import {
  upsertCustomer,
  findCustomerByStripeId,
  findCustomerByEmail,
  createApiKey,
  deactivateCustomerKeys,
} from "../../../lib/db/client.js";
import { sendEmail }     from "../../../lib/email/send.js";
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
async function provisionTeamAccess({ customerId, customerEmail, customerName, subscriptionId, trialEnd, periodEnd }) {
  // 1. Upsert customer record
  const customer = await upsertCustomer({
    stripe_customer_id:     customerId,
    stripe_subscription_id: subscriptionId,
    email:                  customerEmail.toLowerCase(),
    name:                   customerName || null,
    plan:                   "team",
    plan_status:            trialEnd && new Date(trialEnd * 1000) > new Date() ? "trialing" : "active",
    trial_end:              trialEnd  ? new Date(trialEnd  * 1000).toISOString() : null,
    current_period_end:     periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
  });

  // 2. Generate API key
  const { raw, hash, prefix } = generateApiKey("live");

  // 3. Store hashed key in DB (never store raw)
  await createApiKey({
    customerId: customer.id,
    keyHash:    hash,
    keyPrefix:  prefix,
    label:      "Default",
  });

  // 4. Send welcome email with raw key (only time it's shown)
  const tmpl = teamWelcome(customerEmail, raw);
  await sendEmail({ to: customerEmail, ...tmpl });

  console.log(`✓ Provisioned Team for ${customerEmail}, key prefix: ${prefix}`);
  return customer;
}

// ─── DEPROVISION ─────────────────────────────────────────────
async function deprovisionTeamAccess(stripeCustomerId) {
  const customer = await findCustomerByStripeId(stripeCustomerId);
  if (!customer) return;

  // Deactivate all keys
  await deactivateCustomerKeys(customer.id);

  // Update plan status
  await upsertCustomer({
    stripe_customer_id: stripeCustomerId,
    plan:               "free",
    plan_status:        "canceled",
  });

  // Send cancellation email
  const tmpl = teamCancellation(customer.email);
  await sendEmail({ to: customer.email, ...tmpl });

  console.log(`✓ Deprovisioned Team for ${customer.email}`);
}

// ─── SUBSCRIPTION STATUS UPDATE ──────────────────────────────
async function updateSubscriptionStatus(sub) {
  const statusMap = {
    active:   "active",
    trialing: "trialing",
    past_due: "past_due",
    canceled: "canceled",
    unpaid:   "past_due",
  };

  await upsertCustomer({
    stripe_customer_id:     sub.customer,
    stripe_subscription_id: sub.id,
    plan:                   sub.status === "canceled" ? "free" : "team",
    plan_status:            statusMap[sub.status] || sub.status,
    trial_end:              sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
    current_period_end:     sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
  });
}

// ─── MAIN HANDLER ────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sig    = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: "Webhook secret not configured" });

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).json({ error: err.message });
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object;
        if (!session.subscription) break;
        const stripe   = getStripe();
        const sub      = await stripe.subscriptions.retrieve(session.subscription);
        const customer = await stripe.customers.retrieve(session.customer);
        await provisionTeamAccess({
          customerId:     session.customer,
          customerEmail:  customer.email || session.customer_email || session.customer_details?.email,
          customerName:   customer.name  || session.customer_details?.name,
          subscriptionId: session.subscription,
          trialEnd:       sub.trial_end,
          periodEnd:      sub.current_period_end,
        });
        break;
      }

      case "customer.subscription.updated": {
        await updateSubscriptionStatus(event.data.object);
        break;
      }

      case "customer.subscription.deleted": {
        await deprovisionTeamAccess(event.data.object.customer);
        break;
      }

      case "invoice.payment_failed": {
        const invoice  = event.data.object;
        await upsertCustomer({
          stripe_customer_id: invoice.customer,
          plan_status:        "past_due",
        });
        // Find email from DB and send payment failed notification
        const customer = await findCustomerByStripeId(invoice.customer);
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
