// =============================================================
// PASSGENI — GUIDES INDEX PAGE
// passgeni.ai/guides
// =============================================================

import PageLayout from "../../components/layout/PageLayout.js";
import { COMPLIANCE_GUIDES, PROFESSION_GUIDES, CONCEPT_GUIDES, COMPARISON_GUIDES } from "../../content/guides.js";

const TIERS = [
  { label: "Compliance Frameworks",   guides: COMPLIANCE_GUIDES,  desc: "Exact requirements for HIPAA, PCI-DSS, SOC 2, ISO 27001, NIST, and DoD." },
  { label: "By Profession",           guides: PROFESSION_GUIDES,  desc: "Password security tailored to your role, from healthcare to legal to development." },
  { label: "Core Concepts",           guides: CONCEPT_GUIDES,     desc: "Entropy, passphrases, zero-knowledge, post-quantum — explained properly." },
  { label: "Comparisons & Rankings",  guides: COMPARISON_GUIDES,  desc: "Head-to-head comparisons and ranked lists to help you choose the right tool." },
];

function GuideCard({ guide }) {
  return (
    <a
      href={`/guides/${guide.slug}`}
      style={{ display: "flex", flexDirection: "column", background: "#0a0a0c", border: "1px solid #141416", borderRadius: 12, padding: "22px 24px", textDecoration: "none", transition: "all 0.25s cubic-bezier(.16,1,.3,1)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${guide.badgeColor}44`; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#141416"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: guide.badgeColor, background: `${guide.badgeColor}15`, border: `1px solid ${guide.badgeColor}33`, borderRadius: 100, padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {guide.badge}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555" }}>
          {guide.readTime} min
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#e0e0e0", lineHeight: 1.4, marginBottom: 10, flex: 1 }}>
        {guide.title}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", lineHeight: 1.7, margin: 0 }}>
        {guide.excerpt.slice(0, 100)}…
      </p>
    </a>
  );
}

const schema = {
  "@context":    "https://schema.org",
  "@type":       "CollectionPage",
  "name":        "Password Security Guides — PassGeni",
  "description": "Comprehensive password security guides: compliance frameworks, profession-specific advice, core cryptographic concepts, and tool comparisons.",
  "url":         "https://passgeni.ai/guides",
};

export default function GuidesIndexPage() {
  const totalGuides = COMPLIANCE_GUIDES.length + PROFESSION_GUIDES.length + CONCEPT_GUIDES.length + COMPARISON_GUIDES.length;

  return (
    <PageLayout
      title="Password Security Guides — HIPAA, NIST, SOC 2, and More | PassGeni"
      description="Comprehensive guides on password security, compliance requirements, and credential best practices. HIPAA, PCI-DSS, SOC 2, ISO 27001, NIST 800-63B, and more."
      canonical="https://passgeni.ai/guides"
      schema={schema}
    >
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "80px var(--page-pad) 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none" }}>PassGeni</a>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444", margin: "0 8px" }}>→</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00" }}>Guides</span>
          </nav>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            {totalGuides} guides · updated regularly
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", color: "#fff", letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
            Security guides.<br /><span style={{ color: "#C8FF00" }}>Written to rank.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#888", maxWidth: 520, lineHeight: 1.8 }}>
            Comprehensive, reference-grade guides on password security. Every guide cites primary sources — NIST, HHS, PCI Council, ISO. No filler. No guessing.
          </p>
        </div>

        {/* Tiers */}
        {TIERS.map((tier) => (
          <section key={tier.label} style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px,2.5vw,24px)", color: "#fff", letterSpacing: "-0.01em" }}>
                {tier.label}
              </h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555" }}>
                {tier.guides.length} guides
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#666", marginBottom: 24, lineHeight: 1.7 }}>
              {tier.desc}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {tier.guides.map((g) => <GuideCard key={g.slug} guide={g} />)}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 14, padding: "36px 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
            More coming weekly
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Can't find what you're looking for?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>
            We publish 4 new pieces per week. Join the waitlist and we'll email you when guides relevant to your industry go live.
          </p>
          <a href="/#waitlist" className="btn-primary" style={{ fontSize: 14, padding: "13px 28px" }}>
            Get notified →
          </a>
        </div>
      </main>
    </PageLayout>
  );
}
