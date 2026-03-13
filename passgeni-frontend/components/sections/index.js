// =============================================================
// PASSGENI — HOMEPAGE SECTIONS
// =============================================================
// Each section is exported separately and used in pages/index.js
// All text comes from content/copy.js — edit there, not here.
// =============================================================

import { useState } from "react";
import { STATS, HOW_IT_WORKS, FEATURES, TOOLS_PREVIEW, PRICING, TESTIMONIALS, FAQ, WAITLIST } from "../../content/copy.js";
import { Eyebrow, Headline } from "../ui/index.js";

// ─── STATS BAR ───────────────────────────────────────────────
export function StatsBar() {
  return (
    <section aria-label="Statistics" style={{ borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
      <div
        className="stats-row"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,5vw,60px) var(--page-pad)", display: "flex", justifyContent: "space-around", gap: 40, flexWrap: "wrap" }}
      >
        {STATS.map(({ number, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "#fff", letterSpacing: "-0.03em" }}>
              {number}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#888", marginTop: 6, letterSpacing: "0.06em" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────
export function HowItWorks() {
  return (
    <section id="how" style={{ padding: "var(--section-pad) var(--page-pad)", maxWidth: 1200, margin: "0 auto" }} aria-labelledby="how-h2">
      <div style={{ marginBottom: 64 }}>
        <Eyebrow>{HOW_IT_WORKS.eyebrow}</Eyebrow>
        <h2 id="how-h2" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", maxWidth: 560, whiteSpace: "pre-line" }}>
          {HOW_IT_WORKS.headline}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#1a1a1a" }} className="features-grid">
        {HOW_IT_WORKS.steps.map(({ step, title, body, accent }) => (
          <article key={step} style={{ background: "#0a0a0c", padding: "40px 36px" }} className="feature-card">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.1em", marginBottom: 20 }}>{step}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h3>
            <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8, marginBottom: 24 }}>{body}</p>
            <div style={{ display: "inline-block", background: "#0c0c0e", border: "1px solid #141416", borderRadius: 6, padding: "6px 14px", fontFamily: "var(--font-mono)", fontSize: 10, color: "#C8FF0099", letterSpacing: "0.08em" }}>
              {accent}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ────────────────────────────────────────
export function FeaturesSection() {
  return (
    <section id="features" style={{ padding: "0 var(--page-pad) var(--section-pad)", maxWidth: 1200, margin: "0 auto" }} aria-labelledby="feat-h2">
      <div style={{ marginBottom: 64 }}>
        <Eyebrow>{FEATURES.eyebrow}</Eyebrow>
        <h2 id="feat-h2" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em" }}>
          Not just random.<br /><span style={{ color: "var(--color-accent)" }}>Reasoned.</span>
        </h2>
      </div>
      <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {FEATURES.items.map(({ icon, title, body }) => (
          <article key={title} className="card">
            <div style={{ fontSize: 22, marginBottom: 18, color: "var(--color-accent)" }}>{icon}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.4 }}>{title}</h3>
            <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.85 }}>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── TOOLS PREVIEW ───────────────────────────────────────────
export function ToolsPreview() {
  return (
    <section style={{ padding: "0 var(--page-pad) var(--section-pad)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 64 }}>
        <Eyebrow>{TOOLS_PREVIEW.eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em" }}>
          Everything you need.<br /><span style={{ color: "var(--color-accent)" }}>Nothing you don't.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {TOOLS_PREVIEW.items.map(({ icon, title, body, href, label }) => (
          <article key={title} className="card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 10 }}>{title}</h3>
            <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8, flex: 1, marginBottom: 20 }}>{body}</p>
            <a href={href} className="btn-ghost" style={{ justifyContent: "center", fontSize: 13, padding: "10px 20px" }}>
              {label} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── PRICING SECTION ─────────────────────────────────────────
export function PricingSection() {
  return (
    <section id="pricing" style={{ padding: "var(--section-pad) var(--page-pad)", maxWidth: 1200, margin: "0 auto" }} aria-labelledby="pricing-h2">
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Eyebrow>{PRICING.eyebrow}</Eyebrow>
        <h2 id="pricing-h2" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, whiteSpace: "pre-line" }}>
          {PRICING.headline}
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#888", maxWidth: 480, margin: "0 auto" }}>
          {PRICING.subheadline}
        </p>
      </div>
      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
        {PRICING.plans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.featured ? "featured" : ""}`} style={plan.featured ? { border: `1px solid ${plan.color}44` } : {}}>
            {plan.badge && (
              <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--color-accent)", color: "#000", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 16px", borderRadius: "0 0 8px 8px", whiteSpace: "nowrap" }}>
                {plan.badge}
              </div>
            )}
            <div style={{ marginBottom: 24, paddingTop: plan.badge ? 16 : 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: plan.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 40, color: "#fff", letterSpacing: "-0.03em" }}>{plan.price}</span>
                {plan.period && <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666" }}>{plan.period}</span>}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#888", lineHeight: 1.6 }}>{plan.tagline}</p>
            </div>
            <a href={plan.ctaHref} className={plan.featured ? "btn-primary" : "btn-ghost"} style={{ width: "100%", justifyContent: "center", marginBottom: 28, display: "flex", fontSize: 14, padding: "13px 20px", boxSizing: "border-box" }}>
              {plan.cta}
            </a>
            <div style={{ borderTop: "1px solid #141416", paddingTop: 20 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span className="pricing-check">✓</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
              {plan.missing?.slice(0, 2).map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, opacity: 0.35 }}>
                  <span style={{ width: 18, height: 18, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#555" }}>—</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", marginTop: 32, letterSpacing: "0.08em" }}>
        {PRICING.footer}
      </p>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <section style={{ padding: "0 var(--page-pad) var(--section-pad)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <Eyebrow>{TESTIMONIALS.eyebrow}</Eyebrow>
        <Headline>{TESTIMONIALS.headline}</Headline>
      </div>
      <div className="proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {TESTIMONIALS.items.map(({ name, role, stars, text }) => (
          <article key={name} style={{ background: "#0c0c0e", border: "1px solid #141416", borderRadius: 12, padding: 28, transition: "border-color 0.2s" }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
              {Array(stars).fill("★").map((s, i) => <span key={i} style={{ color: "var(--color-accent)", fontSize: 13 }}>{s}</span>)}
            </div>
            <p style={{ fontSize: 14, color: "#999", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{text}"</p>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#fff" }}>{name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", marginTop: 4, letterSpacing: "0.06em" }}>{role}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ SECTION ─────────────────────────────────────────────
export function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "0 var(--page-pad) var(--section-pad)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 56, textAlign: "center" }}>
        <Eyebrow>{FAQ.eyebrow}</Eyebrow>
        <Headline>{FAQ.headline}</Headline>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {FAQ.items.map((item, i) => (
          <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: open === i ? "var(--color-accent)" : "#fff", margin: 0 }}>
                {item.question}
              </h3>
              <span style={{ color: "var(--color-accent)", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </div>
            {open === i && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#aaa", lineHeight: 1.85, marginTop: 16, animation: "fadeIn 0.3s ease" }}>
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── WAITLIST SECTION ────────────────────────────────────────
export function WaitlistSection() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="waitlist" style={{ margin: "0 auto clamp(80px,10vw,120px)", padding: "0 var(--page-pad)", maxWidth: 1200 }}>
      <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 20, overflow: "hidden", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,#C8FF0012,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ padding: "clamp(48px,6vw,80px)", position: "relative", zIndex: 1, maxWidth: 600 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#C8FF0066", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
            {WAITLIST.eyebrow}
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1, whiteSpace: "pre-line" }}>
            {WAITLIST.headline}
          </h2>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
            {WAITLIST.body}
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder={WAITLIST.inputPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, minWidth: 220, background: "#060608", border: "1px solid #1e1e1e", borderRadius: 6, padding: "14px 18px", fontFamily: "var(--font-body)", fontSize: 14, color: "#fff", outline: "none" }}
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving…" : WAITLIST.ctaButton}
              </button>
              {error && <p style={{ width: "100%", fontSize: 13, color: "var(--color-danger)", marginTop: 4 }}>{error}</p>}
            </form>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }} role="alert">
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#000", fontWeight: 800 }}>✓</div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", fontSize: 15 }}>{WAITLIST.successTitle}</div>
                <div style={{ fontFamily: "var(--font-body)", color: "#888", fontSize: 13, marginTop: 2 }}>{WAITLIST.successBody}</div>
              </div>
            </div>
          )}
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#aaa", marginTop: 16, letterSpacing: "0.04em" }}>
            {WAITLIST.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
