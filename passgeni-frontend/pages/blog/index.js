// =============================================================
// PASSGENI — BLOG INDEX PAGE  (Phase 5 — real posts)
// passgeni.ai/blog
// =============================================================

import PageLayout from "../../components/layout/PageLayout.js";
import { ALL_POSTS } from "../../content/blog.js";

const CATEGORIES = [
  { id: "all",        label: "All posts"  },
  { id: "compliance", label: "Compliance" },
  { id: "research",   label: "Research"   },
  { id: "product",    label: "Product"    },
];

function PostCard({ post, featured }) {
  return (
    <a href={`/blog/${post.slug}`} style={{ display: "block", background: "#0a0a0c", border: `1px solid ${featured ? "#C8FF0022" : "#141416"}`, borderRadius: 14, padding: "24px 28px", textDecoration: "none", transition: "border-color 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8FF0044")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = featured ? "#C8FF0022" : "#141416")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: post.categoryColor, background: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}33`, borderRadius: 100, padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {post.categoryLabel}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555" }}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: featured ? 22 : 18, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 10 }}>
        {post.title}
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", lineHeight: 1.75, marginBottom: 16 }}>
        {post.excerpt}
      </p>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00" }}>
        {post.readTime} min read →
      </span>
    </a>
  );
}

export default function BlogIndexPage({ posts }) {
  const featured = posts.filter((p) => p.featured);
  const rest     = posts.filter((p) => !p.featured);

  const schema = {
    "@context":   "https://schema.org",
    "@type":      "Blog",
    "name":       "PassGeni Blog",
    "url":        "https://passgeni.ai/blog",
    "description":"Password security news, compliance analysis, and practical security advice.",
  };

  return (
    <PageLayout
      title="Blog — Password Security News and Analysis | PassGeni"
      description="Password security news, data breach analysis, NIST updates, and practical credential security advice."
      canonical="https://passgeni.ai/blog"
      schema={schema}
    >
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "60px var(--page-pad) 100px" }}>

        {/* Header */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#888", textDecoration: "none" }}>PassGeni</a>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#444", margin: "0 8px" }}>→</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00" }}>Blog</span>
        </nav>

        <div style={{ marginBottom: 56 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px,5vw,52px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
            The PassGeni blog.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#888", lineHeight: 1.8 }}>
            Password security news, compliance changes, breach analysis, and practical advice. No fluff.
          </p>
        </div>

        {/* Featured posts */}
        {featured.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
            {featured.map((p) => <PostCard key={p.slug} post={p} featured />)}
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && featured.length > 0 && (
          <div style={{ borderTop: "1px solid #141416", marginBottom: 28 }} />
        )}

        {/* Rest of posts */}
        {rest.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        )}

        {/* Subscribe CTA */}
        <div style={{ marginTop: 64, background: "#0a0a0c", border: "1px solid #141416", borderRadius: 14, padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
            Get new posts in your inbox.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.7 }}>
            4 posts per week. Compliance updates, breach analysis, and security research.
          </p>
          <a href="/#waitlist" className="btn-primary" style={{ fontSize: 14, padding: "12px 24px", animation: "none" }}>
            Subscribe →
          </a>
        </div>

      </main>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const posts = [...ALL_POSTS].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  return { props: { posts } };
}
