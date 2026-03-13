// =============================================================
// PASSGENI — GUIDES CONTENT REGISTRY
// =============================================================
// Every guide lives here. Add a new guide by adding one object.
// The page template at pages/guides/[slug].js handles rendering.
// Writing the full guide content goes in content/guides/[slug].js
// =============================================================

// ─── TIER 1: COMPLIANCE GUIDES ───────────────────────────────
export const COMPLIANCE_GUIDES = [
  {
    slug:            "hipaa-password-requirements",
    title:           "HIPAA Password Requirements: The Complete 2025 Guide",
    metaTitle:       "HIPAA Password Requirements 2025 — What You Actually Need | PassGeni",
    metaDescription: "Exact HIPAA password requirements for 2025: minimum length, complexity, rotation, MFA, and audit controls. Includes a ready-to-use policy template.",
    excerpt:         "What HIPAA actually requires for passwords, what it recommends, and how to implement compliant controls without crippling your staff.",
    tier:            1,
    badge:           "HIPAA",
    badgeColor:      "#4fc3f7",
    publishedAt:     "2025-01-15",
    updatedAt:       "2025-01-15",
    readTime:        12,
    faq: [
      { q: "What is the minimum password length required by HIPAA?", a: "HIPAA does not specify an exact minimum length in its text. However, HHS guidance and NIST recommendations used as the security standard require at least 8 characters, with 12+ as best practice." },
      { q: "Does HIPAA require password rotation?", a: "HIPAA requires 'automatic logoff' and periodic review of access, which is broadly interpreted to include rotation. Best practice under HIPAA is 90-day rotation for most accounts, though NIST now questions mandatory rotation." },
      { q: "Is MFA required under HIPAA?", a: "MFA is not explicitly required by HIPAA, but it is strongly recommended and increasingly considered best practice for ePHI access, especially remote access." },
    ],
  },
  {
    slug:            "pci-dss-password-requirements",
    title:           "PCI-DSS v4.0 Password Requirements: What Changed in 2024",
    metaTitle:       "PCI-DSS v4.0 Password Requirements 2024 — Complete Guide | PassGeni",
    metaDescription: "PCI-DSS v4.0 raised minimum password length to 12 characters. Full breakdown of what changed, what stayed the same, and how to implement compliant controls.",
    excerpt:         "PCI-DSS v4.0 made significant changes to password requirements. Here is exactly what changed, what stayed the same, and how to get compliant.",
    tier:            1,
    badge:           "PCI-DSS",
    badgeColor:      "#ffb74d",
    publishedAt:     "2025-01-20",
    updatedAt:       "2025-01-20",
    readTime:        10,
    faq: [
      { q: "What changed in PCI-DSS v4.0 for passwords?", a: "The minimum password length increased from 7 to 12 characters. MFA requirements were expanded. The timeline for compliance was March 2025." },
      { q: "Does PCI-DSS v4.0 require MFA?", a: "Yes. PCI-DSS v4.0 Requirement 8.4 requires MFA for all non-console access into the cardholder data environment, and for all remote network access." },
    ],
  },
  {
    slug:            "soc2-password-requirements",
    title:           "SOC 2 Password Requirements: CC6.1 Explained",
    metaTitle:       "SOC 2 Password Requirements — CC6.1 Compliant Guide | PassGeni",
    metaDescription: "SOC 2 CC6.1 password requirements for SaaS companies. What auditors look for, what documentation you need, and how to implement compliant controls.",
    excerpt:         "What SOC 2 auditors actually check when it comes to password controls, and how to ensure CC6.1 compliance without over-engineering.",
    tier:            1,
    badge:           "SOC 2",
    badgeColor:      "#ce93d8",
    publishedAt:     "2025-02-01",
    updatedAt:       "2025-02-01",
    readTime:        9,
    faq: [
      { q: "What does SOC 2 CC6.1 require for passwords?", a: "CC6.1 requires logical access controls, including strong authentication. Auditors typically expect minimum 16 characters, complexity, MFA for privileged access, and a documented policy." },
    ],
  },
  {
    slug:            "iso-27001-password-requirements",
    title:           "ISO 27001 Password Requirements: Annex A.9 Explained",
    metaTitle:       "ISO 27001 Password Requirements — Annex A.9 Guide | PassGeni",
    metaDescription: "ISO 27001:2022 Annex A.9 password requirements. What the standard requires, what it recommends, and how to implement compliant access controls.",
    excerpt:         "ISO 27001:2022 Annex A.9 covers access control and password management. Here is exactly what it requires and how to implement it.",
    tier:            1,
    badge:           "ISO 27001",
    badgeColor:      "#80cbc4",
    publishedAt:     "2025-02-10",
    updatedAt:       "2025-02-10",
    readTime:        11,
    faq: [],
  },
  {
    slug:            "nist-800-63b-password-guidelines",
    title:           "NIST SP 800-63B Password Guidelines: The Complete Summary",
    metaTitle:       "NIST SP 800-63B Password Guidelines — Plain English Summary | PassGeni",
    metaDescription: "NIST SP 800-63B rewrote the rules on passwords. No mandatory rotation. No complexity requirements. Length over complexity. Full plain-English guide.",
    excerpt:         "NIST Special Publication 800-63B changed everything we thought we knew about password requirements. Here is what it actually says in plain English.",
    tier:            1,
    badge:           "NIST",
    badgeColor:      "#a5d6a7",
    publishedAt:     "2025-02-15",
    updatedAt:       "2025-02-15",
    readTime:        14,
    faq: [
      { q: "Does NIST require password rotation?", a: "No. NIST SP 800-63B explicitly advises against mandatory periodic rotation unless there is evidence of compromise. Forced rotation encourages predictable patterns like 'Password1' to 'Password2'." },
      { q: "Does NIST require complexity (uppercase, symbols)?", a: "No. NIST recommends against mandatory complexity rules. Instead, it recommends checking passwords against known breach lists and encouraging length." },
    ],
  },
];

// ─── TIER 2: PROFESSION-SPECIFIC GUIDES ──────────────────────
export const PROFESSION_GUIDES = [
  {
    slug:            "password-security-for-healthcare-workers",
    title:           "Password Security for Healthcare Workers: HIPAA-Ready Guide",
    metaTitle:       "Password Security for Healthcare Workers — HIPAA Guide | PassGeni",
    metaDescription: "Password security guide for doctors, nurses, and healthcare staff. HIPAA-compliant password practices that are actually usable in a clinical environment.",
    excerpt:         "Healthcare workers face unique password challenges: shared workstations, frequent logins, strict compliance. This guide covers practical, HIPAA-ready approaches.",
    tier:            2,
    badge:           "Healthcare",
    badgeColor:      "#4fc3f7",
    publishedAt:     "2025-03-01",
    updatedAt:       "2025-03-01",
    readTime:        8,
    faq: [],
  },
  {
    slug:            "password-security-for-developers",
    title:           "Password Security for Developers: Secrets, Credentials, and APIs",
    metaTitle:       "Password Security for Developers — Secrets Management Guide | PassGeni",
    metaDescription: "Password security for software developers: SSH keys, API credentials, database passwords, secrets management, and personal account security.",
    excerpt:         "Developers manage more credentials than anyone. This guide covers personal account security, API key hygiene, secrets management, and hardcoded credential risks.",
    tier:            2,
    badge:           "Developers",
    badgeColor:      "#C8FF00",
    publishedAt:     "2025-03-05",
    updatedAt:       "2025-03-05",
    readTime:        15,
    faq: [],
  },
  {
    slug:            "password-security-for-small-business",
    title:           "Password Security for Small Business: A Practical Guide",
    metaTitle:       "Password Security for Small Business — Practical Guide | PassGeni",
    metaDescription: "Password security for small business owners: team password policies, shared accounts, password managers, and affordable compliance without an IT department.",
    excerpt:         "Small businesses are the #1 target for credential-based attacks. This practical guide covers everything a small business owner needs without an IT team.",
    tier:            2,
    badge:           "SMB",
    badgeColor:      "#ffb74d",
    publishedAt:     "2025-03-10",
    updatedAt:       "2025-03-10",
    readTime:        10,
    faq: [],
  },
  {
    slug:            "password-security-for-lawyers",
    title:           "Password Security for Lawyers: Bar Ethics and Data Protection",
    metaTitle:       "Password Security for Lawyers — Bar Ethics & Cybersecurity | PassGeni",
    metaDescription: "Password security for attorneys and law firms. ABA model rules on cybersecurity, client confidentiality obligations, and practical password practices.",
    excerpt:         "Attorneys have ethical obligations to protect client data. This guide covers what the ABA model rules require and how to implement it practically.",
    tier:            2,
    badge:           "Legal",
    badgeColor:      "#ce93d8",
    publishedAt:     "2025-03-15",
    updatedAt:       "2025-03-15",
    readTime:        9,
    faq: [],
  },
  {
    slug:            "password-security-for-remote-workers",
    title:           "Password Security for Remote Workers: VPN, Home Networks, and More",
    metaTitle:       "Password Security for Remote Workers — Complete Guide | PassGeni",
    metaDescription: "Password security for remote workers: home network risks, VPN authentication, shared family devices, and maintaining corporate security standards from home.",
    excerpt:         "Remote work introduced new credential risks: home networks, personal devices, public WiFi, and blurred work/personal boundaries. This guide covers all of it.",
    tier:            2,
    badge:           "Remote Work",
    badgeColor:      "#80cbc4",
    publishedAt:     "2025-03-20",
    updatedAt:       "2025-03-20",
    readTime:        11,
    faq: [],
  },
];

// ─── TIER 3: CONCEPT DEPTH GUIDES ────────────────────────────
export const CONCEPT_GUIDES = [
  {
    slug:            "what-is-password-entropy",
    title:           "What Is Password Entropy? A Plain English Explanation",
    metaTitle:       "What Is Password Entropy? Plain English Explanation | PassGeni",
    metaDescription: "Password entropy explained simply: what it is, how it's calculated, what bits of entropy actually means, and why it's the only real measure of password strength.",
    excerpt:         "Entropy is the only honest measure of password strength. Here is exactly what it means, how to calculate it, and why length matters more than complexity.",
    tier:            3,
    badge:           "Concepts",
    badgeColor:      "#888",
    publishedAt:     "2025-01-10",
    updatedAt:       "2025-01-10",
    readTime:        7,
    faq: [
      { q: "What is password entropy?", a: "Password entropy is a measure of how unpredictable a password is, expressed in bits. Higher entropy means more possible combinations and a harder brute-force attack. Formula: length × log2(character_pool_size)." },
      { q: "How many bits of entropy is enough?", a: "NIST considers 80+ bits sufficient for most applications. For highly sensitive accounts, 100+ bits is recommended. A 16-character random password from a full character set has approximately 105 bits of entropy." },
    ],
  },
  {
    slug:            "passphrase-vs-password",
    title:           "Passphrase vs Password: Which Is Actually More Secure?",
    metaTitle:       "Passphrase vs Password — Which Is More Secure? | PassGeni",
    metaDescription: "Passphrase vs password: a direct comparison of entropy, memorability, and security. NIST now recommends passphrases. Here is why, with the math.",
    excerpt:         "NIST Special Publication 800-63B recommends passphrases over complex short passwords. Here is the entropy math that explains why 'correct-horse-battery-staple' beats 'P@ssw0rd'.",
    tier:            3,
    badge:           "Concepts",
    badgeColor:      "#888",
    publishedAt:     "2025-01-12",
    updatedAt:       "2025-01-12",
    readTime:        8,
    faq: [],
  },
  {
    slug:            "what-is-zero-knowledge-architecture",
    title:           "What Is Zero-Knowledge Architecture? Password Security Explained",
    metaTitle:       "Zero-Knowledge Architecture Explained — Password Security | PassGeni",
    metaDescription: "Zero-knowledge architecture means a service provider literally cannot access your data. How it works, how to verify it, and why it matters for password security.",
    excerpt:         "Zero-knowledge is not a marketing claim — it is a specific technical architecture. Here is how it works, how to verify it, and why PassGeni is genuinely zero-knowledge.",
    tier:            3,
    badge:           "Concepts",
    badgeColor:      "#888",
    publishedAt:     "2025-01-18",
    updatedAt:       "2025-01-18",
    readTime:        9,
    faq: [],
  },
  {
    slug:            "post-quantum-password-security",
    title:           "Post-Quantum Password Security: What You Need to Know in 2025",
    metaTitle:       "Post-Quantum Password Security 2025 — What to Know | PassGeni",
    metaDescription: "How quantum computers threaten current password security, what NIST's 2024 post-quantum standards mean for credentials, and what to do about it today.",
    excerpt:         "Quantum computers are not yet breaking passwords — but the threat is real and the preparation window is now. Here is what you need to know and do.",
    tier:            3,
    badge:           "Advanced",
    badgeColor:      "#C8FF00",
    publishedAt:     "2025-02-01",
    updatedAt:       "2025-02-01",
    readTime:        13,
    faq: [],
  },
];

// ─── TIER 4: COMPARISON / INTENT GUIDES ──────────────────────
export const COMPARISON_GUIDES = [
  {
    slug:            "best-password-generator-2025",
    title:           "Best Password Generators in 2025: Ranked and Reviewed",
    metaTitle:       "Best Password Generators 2025 — Ranked & Reviewed | PassGeni",
    metaDescription: "The best password generators of 2025 compared: PassGeni, 1Password, Bitwarden, Dashlane, KeePass, and others. Ranked by security architecture, features, and ease of use.",
    excerpt:         "Not all password generators are built the same. We compare 8 options across security architecture, client-side generation, compliance features, and memorability.",
    tier:            4,
    badge:           "Comparison",
    badgeColor:      "#ffaa00",
    publishedAt:     "2025-03-25",
    updatedAt:       "2025-03-25",
    readTime:        16,
    faq: [],
  },
  {
    slug:            "passgeni-vs-1password",
    title:           "PassGeni vs 1Password: Which Is Right for You?",
    metaTitle:       "PassGeni vs 1Password — Which Should You Use? | PassGeni",
    metaDescription: "PassGeni vs 1Password: free vs paid, zero-knowledge generation vs encrypted vault, profession-aware passwords vs smart fill. Which is right for your use case?",
    excerpt:         "PassGeni and 1Password serve different needs. PassGeni is a zero-knowledge generator. 1Password is a full password manager. Here is how to choose.",
    tier:            4,
    badge:           "Comparison",
    badgeColor:      "#ffaa00",
    publishedAt:     "2025-04-01",
    updatedAt:       "2025-04-01",
    readTime:        10,
    faq: [],
  },
  {
    slug:            "free-vs-paid-password-generators",
    title:           "Free vs Paid Password Generators: What Do You Actually Get?",
    metaTitle:       "Free vs Paid Password Generators — What's the Difference? | PassGeni",
    metaDescription: "What do paid password generators offer that free ones don't? Compliance presets, API access, team management, and audit logging explained.",
    excerpt:         "Most people do not need a paid password generator. But for teams, compliance requirements, and API access, the differences are significant.",
    tier:            4,
    badge:           "Comparison",
    badgeColor:      "#ffaa00",
    publishedAt:     "2025-04-05",
    updatedAt:       "2025-04-05",
    readTime:        8,
    faq: [],
  },
];

// ─── ALL GUIDES COMBINED ──────────────────────────────────────
export const ALL_GUIDES = [
  ...COMPLIANCE_GUIDES,
  ...PROFESSION_GUIDES,
  ...CONCEPT_GUIDES,
  ...COMPARISON_GUIDES,
];

// ─── HELPER: find guide by slug ───────────────────────────────
export function getGuideBySlug(slug) {
  return ALL_GUIDES.find((g) => g.slug === slug) || null;
}

// ─── HELPER: get related guides ───────────────────────────────
export function getRelatedGuides(slug, count = 3) {
  const current = getGuideBySlug(slug);
  if (!current) return [];
  return ALL_GUIDES
    .filter((g) => g.slug !== slug && g.tier === current.tier)
    .slice(0, count);
}
