// =============================================================
// PASSGENI — TOOL PAGE WRAPPER
// =============================================================
// Every tool page uses this wrapper for consistent layout,
// breadcrumbs, and the "try the generator" CTA at the bottom.
// =============================================================

import PageLayout from "../layout/PageLayout.js";

// ─── BREADCRUMB ───────────────────────────────────────────────
function Breadcrumb({ toolName }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
      <ol style={{ display: "flex", gap: 8, alignItems: "center", listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none", letterSpacing: "0.08em" }}>
            PassGeni
          </a>
        </li>
        <li style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444" }}>→</li>
        <li>
          <a href="/tools" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none", letterSpacing: "0.08em" }}>
            Tools
          </a>
        </li>
        <li style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444" }}>→</li>
        <li style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", letterSpacing: "0.08em" }}>
          {toolName}
        </li>
      </ol>
    </nav>
  );
}

// ─── GENERATOR CTA ────────────────────────────────────────────
function GeneratorCTA() {
  return (
    <section style={{ margin: "80px auto 0", maxWidth: 760, padding: "0 var(--page-pad) 80px" }}>
      <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 16, padding: "40px 48px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#C8FF0066", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Try the generator
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px,3vw,32px)", color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>
          Now generate a stronger password.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
          Free, client-side, zero storage. Uses your profession to make it memorable.
        </p>
        <a href="/#generator" className="btn-primary" style={{ fontSize: 15, padding: "16px 32px" }}>
          Generate my password →
        </a>
      </div>
    </section>
  );
}

// ─── TOOL PAGE WRAPPER ────────────────────────────────────────
export default function ToolPage({
  title,
  description,
  canonical,
  schema,
  toolName,
  eyebrow,
  headline,
  subheadline,
  children,
  showGeneratorCTA = true,
}) {
  return (
    <PageLayout title={title} description={description} canonical={canonical} schema={schema}>
      <main>
        {/* ── Tool header ─────────────────────────────────── */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px var(--page-pad) 0" }}>
          <Breadcrumb toolName={toolName} />

          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            {eyebrow || "Free tool"}
          </div>

          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1 }}>
            {headline}
          </h1>

          {subheadline && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#888", lineHeight: 1.8, marginBottom: 40, maxWidth: 580 }}>
              {subheadline}
            </p>
          )}
        </div>

        {/* ── Tool content (passed as children) ───────────── */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 var(--page-pad)" }}>
          {children}
        </div>

        {/* ── Generator CTA at bottom ─────────────────────── */}
        {showGeneratorCTA && <GeneratorCTA />}
      </main>
    </PageLayout>
  );
}
