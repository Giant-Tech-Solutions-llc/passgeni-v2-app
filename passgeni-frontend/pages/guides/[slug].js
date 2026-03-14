// =============================================================
// PASSGENI — GUIDE PAGE TEMPLATE  (Phase 5 — real content)
// =============================================================
// Phase 5: GuideContent now receives real JSX content
// loaded at build time via getStaticProps dynamic require().
// Falls back to a placeholder if content file doesn't exist yet.
// =============================================================

import PageLayout from "../../components/layout/PageLayout.js";
import { ALL_GUIDES, getGuideBySlug, getRelatedGuides } from "../../content/guides.js";
import { getGuideSchema, getFAQSchema } from "../../seo/schema.js";

// ─── PROSE COMPONENTS (exported so content files can import them) ─

export function H2({ id, children }) {
  return (
    <h2 id={id} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px,2.8vw,28px)", color: "#fff", letterSpacing: "-0.02em", marginTop: 56, marginBottom: 16, scrollMarginTop: 80 }}>
      {children}
    </h2>
  );
}

export function H3({ children }) {
  return (
    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(16px,2vw,20px)", color: "#e0e0e0", letterSpacing: "-0.01em", marginTop: 32, marginBottom: 12 }}>
      {children}
    </h3>
  );
}

export function P({ children }) {
  return (
    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#aaa", lineHeight: 1.9, marginBottom: 20 }}>
      {children}
    </p>
  );
}

export function UL({ children }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {children}
    </ul>
  );
}

export function LI({ children }) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "var(--font-body)", fontSize: 15, color: "#aaa", lineHeight: 1.8 }}>
      <span style={{ color: "#C8FF00", marginTop: 2, flexShrink: 0 }}>◈</span>
      <span>{children}</span>
    </li>
  );
}

export function OL({ children }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12, counterReset: "ol-counter" }}>
      {children}
    </ol>
  );
}

export function OLI({ n, children }) {
  return (
    <li style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", background: "#C8FF0011", border: "1px solid #C8FF0033", borderRadius: 4, padding: "2px 7px", flexShrink: 0, marginTop: 2 }}>{n}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#aaa", lineHeight: 1.8 }}>{children}</span>
    </li>
  );
}

export function Callout({ type = "info", children }) {
  const styles = {
    info:    { border: "#C8FF0033", bg: "#C8FF0008", dot: "#C8FF00" },
    warning: { border: "#ffb74d33", bg: "#ffb74d08", dot: "#ffb74d" },
    danger:  { border: "#ff444433", bg: "#ff444408", dot: "#ff6644" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ border: `1px solid ${s.border}`, background: s.bg, borderRadius: 10, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12 }}>
      <span style={{ color: s.dot, fontSize: 14, flexShrink: 0, marginTop: 1 }}>
        {type === "warning" ? "⚠" : type === "danger" ? "✕" : "→"}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#ccc", lineHeight: 1.8 }}>{children}</span>
    </div>
  );
}

export function Requirement({ label, value, color = "#C8FF00" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#0a0a0c", border: "1px solid #141416", borderRadius: 8, marginBottom: 8 }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#aaa" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color, background: `${color}11`, border: `1px solid ${color}22`, borderRadius: 4, padding: "3px 10px" }}>{value}</span>
    </div>
  );
}

export function ComplianceTable({ rows }) {
  return (
    <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
            {Object.keys(rows[0]).map((h) => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #0e0e10" }}>
              {Object.values(row).map((cell, j) => (
                <td key={j} style={{ padding: "13px 16px", fontFamily: j === 0 ? "var(--font-mono)" : "var(--font-body)", fontSize: j === 0 ? 12 : 14, color: j === 0 ? "#C8FF00" : "#aaa" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GeneratorCTA({ compliance }) {
  const href = compliance ? `/#generator` : "/#generator";
  return (
    <div style={{ background: "#0a0a0c", border: "1px solid #C8FF0022", borderRadius: 14, padding: "28px 32px", margin: "48px 0", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#C8FF0066", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>
        Put it into practice
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
        Generate a compliant password now.
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.7 }}>
        Free. Client-side. Zero storage. {compliance && `${compliance.toUpperCase()} preset included.`}
      </p>
      <a href={href} className="btn-primary" style={{ fontSize: 14, padding: "13px 28px", animation: "none" }}>
        Generate password →
      </a>
    </div>
  );
}

// ─── ARTICLE CHROME ───────────────────────────────────────────

function GuideMeta({ guide }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", marginBottom: 32 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: guide.badgeColor, background: `${guide.badgeColor}15`, border: `1px solid ${guide.badgeColor}33`, borderRadius: 100, padding: "4px 12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {guide.badge}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555" }}>{guide.readTime} min read</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555" }}>
        Updated {new Date(guide.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </span>
    </div>
  );
}

function TableOfContents({ sections }) {
  if (!sections?.length) return null;
  return (
    <nav aria-label="Table of contents" style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 12, padding: "20px 24px", marginBottom: 40 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Contents</div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {sections.map((s, i) => (
          <li key={i}>
            <a href={`#${s.id}`} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#aaa", textDecoration: "none", display: "flex", gap: 10, alignItems: "center", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C8FF00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#444" }}>{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FAQSection({ items }) {
  if (!items?.length) return null;
  return (
    <section aria-label="Frequently asked questions" style={{ marginTop: 56 }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 28, letterSpacing: "-0.02em" }}>
        Frequently asked questions
      </h2>
      {items.map(({ q, a }, i) => (
        <div key={i} style={{ borderBottom: "1px solid #111", padding: "20px 0" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 10 }}>{q}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#aaa", lineHeight: 1.8, margin: 0 }}>{a}</p>
        </div>
      ))}
    </section>
  );
}

function RelatedGuides({ guides }) {
  if (!guides?.length) return null;
  return (
    <section aria-label="Related guides" style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid #141416" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>Related guides</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {guides.map((g) => (
          <a key={g.slug} href={`/guides/${g.slug}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#0a0a0c", border: "1px solid #141416", borderRadius: 10, textDecoration: "none", transition: "border-color 0.2s", gap: 16 }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8FF0033")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#141416")}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#ccc" }}>{g.title}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", flexShrink: 0 }}>{g.readTime} min →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function GuidePage({ guide, related, contentHtml, toc }) {
  if (!guide) {
    return (
      <PageLayout title="Guide Not Found | PassGeni" description="" canonical="https://passgeni.ai/guides">
        <div style={{ maxWidth: 760, margin: "120px auto", padding: "0 var(--page-pad)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 40, color: "#fff", marginBottom: 16 }}>404</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#888" }}>This guide doesn't exist.</p>
          <a href="/guides" className="btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>← All guides</a>
        </div>
      </PageLayout>
    );
  }

  const schema = [
    getGuideSchema(guide),
    ...(guide.faq?.length ? [getFAQSchema(guide.faq)] : []),
  ];

  return (
    <PageLayout title={guide.metaTitle} description={guide.metaDescription} canonical={`https://passgeni.ai/guides/${guide.slug}`} schema={schema}>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "60px var(--page-pad) 80px" }}>

        <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
          <a href="/"       style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none" }}>PassGeni</a>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444", margin: "0 8px" }}>→</span>
          <a href="/guides" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none" }}>Guides</a>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444", margin: "0 8px" }}>→</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00" }}>{guide.badge}</span>
        </nav>

        <GuideMeta guide={guide} />

        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,42px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>
          {guide.title}
        </h1>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#999", lineHeight: 1.8, marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid #141416" }}>
          {guide.excerpt}
        </p>

        {toc?.length > 0 && <TableOfContents sections={toc} />}

        <article>
          {/* Content is injected as dangerouslySetInnerHTML for SSG — see getStaticProps */}
          {contentHtml
            ? <div className="guide-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            : (
              <div style={{ background: "#0c0c0e", border: "1px dashed #1e1e1e", borderRadius: 10, padding: "24px", marginBottom: 32 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555", margin: 0 }}>
                  ✏️ Guide content file: <code style={{ color: "#C8FF0066" }}>content/guides/{guide.slug}.js</code>
                </p>
              </div>
            )
          }
        </article>

        <FAQSection items={guide.faq} />
        <RelatedGuides guides={related} />

        {/* Internal links — SEO + UX */}
        <nav aria-label="Related tools and resources" style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #141416" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Free tools for this topic
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { label: "Password Generator", href: "/#generator" },
              { label: "Breach Checker", href: "/tools/breach-checker" },
              { label: "Strength Checker", href: "/tools/strength-checker" },
              { label: "Password Audit Tool", href: "/tools/audit" },
              { label: "Policy Generator", href: "/tools/policy-generator" },
              { label: "Secure Share", href: "/tools/secure-share" },
              { label: "All Guides", href: "/guides" },
              { label: "Blog", href: "/blog" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", background: "#C8FF0011", border: "1px solid #C8FF0022", borderRadius: 100, padding: "6px 14px", textDecoration: "none", letterSpacing: "0.04em", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#C8FF0022")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C8FF0011")}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a href="/guides" className="btn-ghost" style={{ marginRight: 12 }}>← All guides</a>
          <a href="/#generator" className="btn-primary" style={{ animation: "none" }}>Generate password →</a>
        </div>

      </main>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths:    ALL_GUIDES.map((g) => ({ params: { slug: g.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guide   = getGuideBySlug(params.slug);
  const related = getRelatedGuides(params.slug, 3);

  let contentHtml = null;
  let toc         = null;

  try {
    const mod  = require(`../../content/guides/${params.slug}.js`);
    contentHtml = mod.contentHtml || null;
    toc         = mod.toc        || null;
  } catch {
    // Content file not written yet — page renders with placeholder
  }

  return {
    props: {
      guide:       guide || null,
      related,
      contentHtml,
      toc,
    },
  };
}
