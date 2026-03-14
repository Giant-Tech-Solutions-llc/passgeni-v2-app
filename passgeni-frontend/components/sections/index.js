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
      <div style={{ marginBottom: 64, textAlign: "center" }}>
        <Eyebrow>{HOW_IT_WORKS.eyebrow}</Eyebrow>
        <h2 id="how-h2" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", maxWidth: 560, whiteSpace: "pre-line", margin: "0 auto" }}>
          {HOW_IT_WORKS.headline}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, background: "transparent" }} className="features-grid">
        {HOW_IT_WORKS.steps.map(({ step, title, body, accent }) => (
          <article key={step} style={{ background: "#0a0a0c", border: "1px solid #1a1a1a", borderRadius: 12, padding: "40px 36px", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8FF0044"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.transform = "translateY(0)"; }}
            className="feature-card"
          >
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
      <div style={{ marginBottom: 64, textAlign: "center" }}>
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
      <div style={{ marginBottom: 64, textAlign: "center" }}>
        <Eyebrow>{TOOLS_PREVIEW.eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em" }}>
          Everything you need.<br /><span style={{ color: "var(--color-accent)" }}>Nothing you don't.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {TOOLS_PREVIEW.items.map(({ icon, title, body, href, label }) => (
          <a
            key={title}
            href={href}
            style={{ display: "flex", flexDirection: "column", background: "var(--color-bg-card)", border: "1px solid #141416", borderRadius: 12, padding: "var(--card-pad)", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8FF0044"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#141416"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 10 }}>{title}</h3>
            <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8, flex: 1, marginBottom: 20 }}>{body}</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.06em" }}>
              {label} →
            </span>
          </a>
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
  // Split into 3 rows, alternating scroll direction
  const items = TESTIMONIALS.items;
  const third = Math.ceil(items.length / 3);
  const rows  = [items.slice(0, third), items.slice(third, third * 2), items.slice(third * 2)];

  return (
    <section style={{ padding: "0 0 var(--section-pad)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 var(--page-pad)", marginBottom: 48, textAlign: "center" }}>
        <Eyebrow>{TESTIMONIALS.eyebrow}</Eyebrow>
        <Headline>{TESTIMONIALS.headline}</Headline>
      </div>

      {rows.map((row, rowIdx) => {
        const doubled = [...row, ...row]; // duplicate for seamless loop
        const dur = [38, 46, 42][rowIdx];
        const dir = rowIdx % 2 === 1 ? "reverse" : "normal";
        return (
          <div key={rowIdx} style={{ marginBottom: 16, position: "relative" }}>
            {/* Fade edges */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #060608, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #060608, transparent)", zIndex: 2, pointerEvents: "none" }} />

            <div
              style={{
                display: "flex",
                gap: 16,
                width: "max-content",
                animation: `scrollLeft ${dur}s linear infinite`,
                animationDirection: dir,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {doubled.map((t, i) => (
                <article
                  key={i}
                  style={{
                    background: "#0c0c0e",
                    border: "1px solid #141416",
                    borderRadius: 12,
                    padding: "22px 24px",
                    width: 300,
                    flexShrink: 0,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8FF0033")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#141416")}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {Array(t.stars).fill("★").map((s, si) => (
                      <span key={si} style={{ color: "var(--color-accent)", fontSize: 11 }}>{s}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", lineHeight: 1.75, marginBottom: 16 }}>"{t.text}"</p>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", marginTop: 3, letterSpacing: "0.06em" }}>{t.role}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
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

// ─── FEATURED BLOG SECTION ───────────────────────────────────
export function FeaturedBlogSection() {
  // Import inline to avoid circular deps — hardcoded 3 featured picks
  const posts = [
    { slug: "pci-dss-v4-password-changes-explained", title: "PCI-DSS v4.0 Raised the Password Bar. Here's What You Missed.", excerpt: "The March 2024 deadline passed. If you haven't updated your authentication controls for PCI-DSS v4.0, here is what changed and what auditors will check.", category: "Compliance", color: "#ffb74d", readTime: 6, date: "Jan 10, 2025" },
    { slug: "why-password-complexity-rules-backfire", title: "Why Password Complexity Rules Make You Less Secure", excerpt: "Requiring uppercase, a number, and a symbol teaches users to choose P@ssw0rd. The research on why complexity rules backfire — and what NIST recommends instead.", category: "Research", color: "#ce93d8", readTime: 5, date: "Jan 14, 2025" },
    { slug: "announcing-passgeni-v2", title: "PassGeni V2: DNA Score, Compliance Presets, and 6 New Tools", excerpt: "Everything that shipped in V2 — the DNA Score, six new free tools, HIPAA and PCI-DSS presets, passphrase mode, and the Profession-aware AI seeding engine.", category: "Product", color: "#81c784", readTime: 4, date: "Jan 20, 2025" },
  ];

  return (
    <section style={{ padding: "0 var(--page-pad) var(--section-pad)", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
        <div>
          <Eyebrow>From the blog</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px,3.5vw,40px)", color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
            Latest posts.
          </h2>
        </div>
        <a href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", textDecoration: "none", letterSpacing: "0.08em", opacity: 0.8 }}>
          View all posts →
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {posts.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            style={{ display: "flex", flexDirection: "column", background: "#0a0a0c", border: "1px solid #141416", borderRadius: 14, padding: 28, textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8FF0044"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#141416"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: p.color, letterSpacing: "0.12em", textTransform: "uppercase", background: p.color + "18", padding: "4px 10px", borderRadius: 100 }}>{p.category}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#555", letterSpacing: "0.06em" }}>{p.readTime} min · {p.date}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "#fff", lineHeight: 1.35, marginBottom: 14, letterSpacing: "-0.01em", flex: 1 }}>{p.title}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#777", lineHeight: 1.75, marginBottom: 20 }}>{p.excerpt}</p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", letterSpacing: "0.06em" }}>Read more →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
export function WaitlistSection() {
  return (
    <section id="waitlist" style={{ margin: "0 auto clamp(80px,10vw,120px)", padding: "0 var(--page-pad)", maxWidth: 1200 }}>
      <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 20, overflow: "hidden", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,#C8FF0012,transparent 70%)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,#C8FF0008,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ padding: "clamp(48px,6vw,80px)", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#C8FF00", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8FF00", display: "inline-block", animation: "blink 1.5s ease infinite" }} />
            {WAITLIST.eyebrow}
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1, whiteSpace: "pre-line", maxWidth: 560 }}>
            {WAITLIST.headline}
          </h2>
          <p style={{ fontSize: 16, color: "#888", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
            {WAITLIST.body}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a href="/auth/signin?callbackUrl=/api/stripe/checkout" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
              {WAITLIST.ctaButton}
            </a>
            <a href="/api-docs" className="btn-ghost" style={{ fontSize: 14, padding: "14px 28px" }}>
              View API docs →
            </a>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
            {["$29/month", "5,000 calls/day", "14-day free trial", "Cancel anytime"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#C8FF00", fontSize: 12 }}>✓</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#666" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
