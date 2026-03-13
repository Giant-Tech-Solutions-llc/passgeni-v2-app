// =============================================================
// PASSGENI — BLOG CONTENT REGISTRY
// =============================================================
// Every blog post is registered here.
// Page template: pages/blog/[slug].js
// Post content:  content/blog/[slug].js
// =============================================================

export const ALL_POSTS = [
  // ─── LAUNCH BATCH ───────────────────────────────────────────
  {
    slug:            "pci-dss-v4-password-changes-explained",
    title:           "PCI-DSS v4.0 Raised the Password Bar. Here's What You Missed.",
    metaTitle:       "PCI-DSS v4.0 Password Changes: 12-Character Minimum and MFA Expansion | PassGeni",
    metaDescription: "PCI-DSS v4.0 increased minimum password length to 12 characters and expanded MFA requirements to all CDE access. What you need to know before your next audit.",
    excerpt:         "The March 2024 deadline passed. If you haven't updated your authentication controls for PCI-DSS v4.0, here is what changed and what auditors will check.",
    category:        "compliance",
    categoryLabel:   "Compliance",
    categoryColor:   "#ffb74d",
    publishedAt:     "2025-01-10",
    readTime:        6,
    featured:        true,
  },
  {
    slug:            "why-password-complexity-rules-backfire",
    title:           "Why Password Complexity Rules Make You Less Secure",
    metaTitle:       "Password Complexity Rules Are Counterproductive — Here's the Research | PassGeni",
    metaDescription: "Mandatory uppercase, lowercase, numbers, and symbols don't improve security. Here's what the research says and what to do instead.",
    excerpt:         "Requiring uppercase, a number, and a symbol teaches users to choose P@ssw0rd. The research on why complexity rules backfire — and what NIST recommends instead.",
    category:        "research",
    categoryLabel:   "Research",
    categoryColor:   "#ce93d8",
    publishedAt:     "2025-01-14",
    readTime:        5,
    featured:        false,
  },
  {
    slug:            "announcing-passgeni-v2",
    title:           "PassGeni V2: DNA Score, Compliance Presets, and 6 New Tools",
    metaTitle:       "PassGeni V2 Launch — DNA Score, Compliance Presets, and Free Tools | PassGeni",
    metaDescription: "PassGeni V2 launches with a new DNA Score system, 6 compliance presets (HIPAA, PCI-DSS, SOC 2, ISO 27001, NIST, DoD), and 6 free security tools.",
    excerpt:         "After months of building, PassGeni V2 is live. Here is everything that's new: DNA Score, compliance presets, post-quantum mode, and 6 standalone security tools.",
    category:        "product",
    categoryLabel:   "Product",
    categoryColor:   "#C8FF00",
    publishedAt:     "2025-01-15",
    readTime:        4,
    featured:        true,
  },
  // ─── PLACEHOLDERS FOR FUTURE POSTS ─────────────────────────
  // Add new posts here — format above
];

// ─── HELPERS ─────────────────────────────────────────────────

export function getPostBySlug(slug) {
  return ALL_POSTS.find((p) => p.slug === slug) || null;
}

export function getFeaturedPosts() {
  return ALL_POSTS.filter((p) => p.featured);
}

export function getPostsByCategory(category) {
  return ALL_POSTS.filter((p) => p.category === category);
}

export function getRecentPosts(n = 5) {
  return [...ALL_POSTS]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, n);
}

export function getRelatedPosts(slug, n = 3) {
  const post    = getPostBySlug(slug);
  if (!post) return [];
  return ALL_POSTS
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, n);
}
