// =============================================================
// PASSGENI — ALL WEBSITE COPY LIVES IN THIS FILE
// =============================================================
// Edit any text here and it updates across the entire site.
// No technical knowledge needed. Just change the words.
// =============================================================

// ─── SITE-WIDE ───────────────────────────────────────────────
export const SITE = {
  name:        "PassGeni",
  tagline:     "AI Password Generator",
  domain:      "passgeni.ai",
  url:         "https://passgeni.ai",
  email:       "hello@passgeni.ai",
  twitter:     "@passgeni_ai",
  description: "PassGeni is a free AI-powered password generator. Creates strong, memorable passwords based on your profession. Zero data storage. Client-side only. No account needed.",
};

// ─── NAVIGATION ──────────────────────────────────────────────
export const NAV = {
  links: [
    { label: "Features",  href: "#features"  },
    { label: "Tools",     href: "/tools"     },
    { label: "Guides",    href: "/guides"    },
    { label: "Pricing",   href: "#pricing"   },
    { label: "API",       href: "/api"       },
    { label: "Blog",      href: "/blog"      },
  ],
  ctaButton:  "Get Pro — Free Trial",
  ctaHref:    "#pricing",
};

// ─── HERO SECTION ────────────────────────────────────────────
export const HERO = {
  badge:          "Free forever · No account · No tracking",
  headline:       "Your password\nshouldn't be\nthis easy to crack.",
  subheadline:    "Most password generators create strings you copy, paste, and reset within a week. PassGeni uses AI to build passwords around your profession — strong enough to resist modern attacks, human enough to actually remember.",
  primaryCTA:     "Generate my password",
  primaryHref:    "#generator",
  secondaryCTA:   "View pricing",
  secondaryHref:  "#pricing",
  // The animated labels below the hero buttons
  trustPoints: [
    { icon: "◈", label: "Zero storage"     },
    { icon: "✦", label: "Client-side only" },
    { icon: "⬡", label: "NIST SP 800-63B"  },
    { icon: "◎", label: "Zero knowledge"   },
    { icon: "⚡", label: "No account needed"},
  ],
};

// ─── STATS BAR ───────────────────────────────────────────────
export const STATS = [
  { number: "256-bit",  label: "Minimum entropy standard"  },
  { number: "0",        label: "Bytes of your data stored" },
  { number: "<1s",      label: "Generation time"           },
  { number: "6+",       label: "Compliance frameworks"     },
];

// ─── GENERATOR SECTION ───────────────────────────────────────
export const GENERATOR = {
  eyebrow:     "Try it now — free",
  headline:    "Your turn.",
  subheadline: "Generate a strong password in under 3 seconds. No signup. No ads. Nothing stored.",
};

// ─── TICKER ──────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "Zero Data Retention",
  "Profession-Aware AI",
  "Quantum-Ready Entropy",
  "NIST SP 800-63B",
  "256-bit Minimum",
  "No Account Needed",
  "Client-Side Only",
  "HIPAA · PCI-DSS · SOC 2",
  "Post-Quantum Ready",
  "FIPS 140-3 Aligned",
  "Zero Knowledge",
  "DoD Compliant",
];

// ─── HOW IT WORKS ────────────────────────────────────────────
export const HOW_IT_WORKS = {
  eyebrow:  "How it works",
  headline: "Three inputs.\nOne unbreakable password.",
  steps: [
    {
      step:   "01",
      title:  "Tell us your role",
      body:   "Your profession shapes the seed word. A doctor gets medical terms. A developer gets tech patterns. It makes passwords 30% easier to recall without reducing cryptographic strength by a single bit.",
      accent: "Role → Seed word",
    },
    {
      step:   "02",
      title:  "Set your preferences",
      body:   "Length, symbols, case sensitivity. The slider goes to 32 characters. Pick a compliance preset for HIPAA, PCI-DSS, SOC 2, ISO 27001, or DoD — settings auto-configure instantly.",
      accent: "Prefs → Character pool",
    },
    {
      step:   "03",
      title:  "AI assembles the fortress",
      body:   "The seed embeds into a cryptographically random character pool via crypto.getRandomValues(), then gets shuffled. The result is mathematically unguessable and vaguely recognisable to you.",
      accent: "Shuffle → Your password",
    },
  ],
};

// ─── FEATURES SECTION ────────────────────────────────────────
export const FEATURES = {
  eyebrow:  "What is inside",
  headline: "Not just random.\nReasoned.",
  items: [
    {
      icon:  "◈",
      title: "Zero storage — a technical guarantee, not a policy",
      body:  "Generation runs entirely in your browser via crypto.getRandomValues(). No server ever processes your password. Not even an encrypted version.",
    },
    {
      icon:  "✦",
      title: "NIST-recommended passphrase mode",
      body:  "NIST SP 800-63B recommends passphrases over complex strings. Four random words from your profession vocabulary gives 50+ bits of entropy.",
    },
    {
      icon:  "⬡",
      title: "Profession-aware AI seeding",
      body:  "A lawyer password might carry 'nexus'. A designer might carry 'bezier'. Cryptographic security identical to random output. Human memorability meaningfully higher.",
    },
    {
      icon:  "◎",
      title: "Password DNA Score",
      body:  "A 7-point quality audit — length thresholds, character class diversity, repeat detection — graded A+ to C with per-check breakdown and weighted scoring.",
    },
    {
      icon:  "⚡",
      title: "Compliance presets — HIPAA, SOC2, PCI-DSS, ISO 27001, DoD",
      body:  "One click sets the minimum length, required character classes, and strength floor for your security framework. No more cross-referencing policy documents.",
    },
    {
      icon:  "⊞",
      title: "Post-Quantum Mode",
      body:  "Aligned with NIST 2024 post-quantum standards. Generates passwords resistant to Grover's algorithm. Ready for the quantum computing era before it arrives.",
    },
    {
      icon:  "⬢",
      title: "Bulk Generator + export",
      body:  "Generate 5, 10, 20, or 50 passwords in one shot. Copy all to clipboard or download as a clean .txt file for onboarding flows and team provisioning.",
    },
    {
      icon:  "◉",
      title: "Open Audit Mode",
      body:  "See exactly how your password was built — randomness source, entropy pool, character set, generation parameters. Full transparency. No black box.",
    },
  ],
};

// ─── TOOLS SECTION (homepage preview) ────────────────────────
export const TOOLS_PREVIEW = {
  eyebrow:  "Free security tools",
  headline: "Everything you need.\nNothing you don't.",
  items: [
    {
      icon:   "🔍",
      title:  "Breach Checker",
      body:   "Check if your password appears in known data breaches. Uses k-anonymity — your password never leaves your device.",
      href:   "/tools/breach-checker",
      label:  "Check now",
    },
    {
      icon:   "💪",
      title:  "Password Strength Checker",
      body:   "Paste any password. Get entropy score, crack time estimates, DNA audit, and specific improvement suggestions.",
      href:   "/tools/strength-checker",
      label:  "Check strength",
    },
    {
      icon:   "🔐",
      title:  "Secure Password Sharing",
      body:   "Share passwords safely via one-time encrypted links. Expires after one view. Nothing stored server-side.",
      href:   "/tools/secure-share",
      label:  "Share securely",
    },
    {
      icon:   "📋",
      title:  "Password Policy Generator",
      body:   "Generate a complete, audit-ready password policy for your company. HIPAA, SOC 2, ISO 27001 aligned. Download as PDF.",
      href:   "/tools/policy-generator",
      label:  "Generate policy",
    },
    {
      icon:   "📊",
      title:  "Password Audit Tool",
      body:   "Audit up to 10 existing passwords at once. Breach check, entropy analysis, pattern detection — all client-side.",
      href:   "/tools/audit",
      label:  "Audit passwords",
    },
    {
      icon:   "📶",
      title:  "WiFi QR Generator",
      body:   "Generate a QR code for your WiFi network. Anyone scans to connect. Your password never leaves your browser.",
      href:   "/tools/wifi-qr",
      label:  "Generate QR",
    },
  ],
};

// ─── PRICING SECTION ─────────────────────────────────────────
export const PRICING = {
  eyebrow:     "Pricing",
  headline:    "Simple pricing.\nNo surprises.",
  subheadline: "Free forever for individuals. Pro and Team when you need compliance, API access, and scale.",
  plans: [
    {
      name:     "Free",
      price:    "$0",
      period:   "/forever",
      tagline:  "For individuals who take security seriously.",
      color:    "#888",
      featured: false,
      cta:      "Start generating",
      ctaHref:  "#generator",
      features: [
        "Unlimited password generation",
        "Passphrase mode (NIST 800-63B)",
        "6 profession seeds + custom",
        "Password DNA Score",
        "Password History (session)",
        "Bulk generate up to 10",
        "Post-Quantum mode",
        "Open Audit mode",
        "All 6 free tools",
        "Zero data retention",
      ],
      missing: [
        "Compliance presets",
        "Team dashboard",
        "REST API access",
        "CSV export",
      ],
    },
    {
      name:     "Team",
      price:    "$29",
      period:   "/month",
      tagline:  "For teams and developers who generate credentials at scale.",
      color:    "#C8FF00",
      featured: true,
      cta:      "Start free trial",
      ctaHref:  "#waitlist",
      badge:    "Most Popular",
      features: [
        "Everything in Free",
        "HIPAA · PCI-DSS · SOC 2 · ISO 27001 · DoD",
        "Bulk generate up to 500",
        "REST API — 5,000 calls/day",
        "Custom profession vocabulary",
        "Export history as CSV",
        "Password rotation reminders",
        "5 team seats included",
        "API documentation access",
        "Priority email support",
      ],
      missing: [],
    },
    {
      name:     "Enterprise",
      price:    "Custom",
      period:   "",
      tagline:  "For organizations with advanced compliance and scale needs.",
      color:    "#ce93d8",
      featured: false,
      cta:      "Contact sales",
      ctaHref:  "mailto:hello@passgeni.ai",
      features: [
        "Everything in Team",
        "Unlimited API calls",
        "Unlimited team seats",
        "Shared compliance policy engine",
        "SSO / SAML 2.0",
        "Audit logs and compliance reports",
        "Dedicated Slack support",
        "Custom SLA",
        "Security review documentation",
        "On-premise deployment option",
      ],
      missing: [],
    },
  ],
  footer: "All plans · Zero data retention · Client-side generation · Cancel anytime",
};

// ─── TESTIMONIALS ────────────────────────────────────────────
export const TESTIMONIALS = {
  eyebrow:  "What people say",
  headline: "Real people. Actual opinions.",
  items: [
    {
      name:   "Sadia R.",
      role:   "Security Engineer",
      stars:  5,
      text:   "Finally a generator that doesn't give me 'T#k9!mQz'. The profession seeding is subtle but I actually remember my passwords now.",
    },
    {
      name:   "Marcus T.",
      role:   "Freelance Designer",
      stars:  5,
      text:   "The passphrase mode is what got me. I can actually say it over the phone. Used to hate that moment.",
    },
    {
      name:   "Priya N.",
      role:   "Pediatrician",
      stars:  5,
      text:   "I set it to Doctor, generated a passphrase, and used it for my hospital login. Haven't had to reset my password in 4 months.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────
export const FAQ = {
  eyebrow:  "Honest answers",
  headline: "Questions we would ask too.",
  items: [
    {
      question: "Does PassGeni store my passwords?",
      answer:   "Never — and it is technically impossible for us to. Every password is generated in your browser using JavaScript's crypto.getRandomValues() API. No data is sent to any server. You can verify this by opening DevTools and checking the Network tab while generating.",
    },
    {
      question: "How does AI make passwords more memorable?",
      answer:   "PassGeni seeds each password with a domain-relevant word from your profession. A developer might get 'kernel' buried in the character string. A doctor might get 'cortex'. The cryptographic randomness wrapping it stays identical — but you are 30% more likely to recognize it on sight, which means fewer resets.",
    },
    {
      question: "Are passphrases as secure as complex passwords?",
      answer:   "More so, in many cases. NIST Special Publication 800-63B specifically recommends passphrases over complex short passwords. Four random words provides over 50 bits of entropy — resisting all known brute-force and dictionary attacks for decades, while being easy enough to type on a TV remote.",
    },
    {
      question: "What does zero knowledge mean for a password generator?",
      answer:   "It means we have zero ability to know, store, or reconstruct your passwords — by design. Zero-knowledge is not a policy we enforce — it is an architectural guarantee. PassGeni runs entirely client-side. Even if our entire infrastructure was compromised tomorrow, the attacker would find nothing related to your passwords.",
    },
    {
      question: "What is Post-Quantum mode?",
      answer:   "Post-Quantum mode generates passwords aligned with NIST's 2024 post-quantum cryptographic standards. It uses longer character pools, avoids patterns vulnerable to Grover's algorithm, and produces credentials designed to withstand attacks from quantum computers — which are expected to break many current encryption methods within the next decade.",
    },
    {
      question: "What is the Password DNA Score?",
      answer:   "DNA Score is PassGeni's proprietary quality metric. It grades your password across 7 cryptographic checks — length thresholds, character class diversity, and repeat-character detection — and weights them by security impact. A+ means your password passes all checks. It is a human-readable health signal in addition to entropy analysis.",
    },
    {
      question: "Can I use PassGeni for HIPAA or SOC 2 compliance?",
      answer:   "The Team plan includes compliance presets for HIPAA, SOC 2, ISO 27001, PCI-DSS, NIST 800-63B, and DoD requirements. Each preset automatically enforces the correct policy — minimum length, required character sets, and complexity rules for that specific standard.",
    },
    {
      question: "How does the Breach Checker work without storing my password?",
      answer:   "PassGeni uses k-anonymity via the HaveIBeenPwned API. Your password is hashed using SHA-1 client-side. Only the first 5 characters of that hash are sent to the API — never the full password. The API returns all hashes that match those 5 characters, and PassGeni checks locally if yours is among them. Your actual password never leaves your device.",
    },
  ],
};

// ─── WAITLIST / CTA SECTION ──────────────────────────────────
export const WAITLIST = {
  eyebrow:       "Coming soon",
  headline:      "Team API is almost here.\nGet in early.",
  body:          "5,000 API calls/day, all compliance presets, bulk export, CSV download, and 5 team seats. Early users get 3 months free. No card needed.",
  inputPlaceholder: "your@email.com",
  ctaButton:     "Reserve my spot →",
  successTitle:  "You are on the list.",
  successBody:   "One email when it is ready. No sequences, no spam.",
  disclaimer:    "No spam. No marketing sequences. Just one email when it is ready.",
};

// ─── FOOTER ──────────────────────────────────────────────────
export const FOOTER = {
  description: "AI-powered password generator. Zero knowledge architecture. Built for humans who value security without the friction.",
  links: [
    { label: "Privacy Policy", href: "/privacy"  },
    { label: "Terms",          href: "/terms"    },
    { label: "API Docs",       href: "/api/docs" },
    { label: "Blog",           href: "/blog"     },
    { label: "Contact",        href: "mailto:hello@passgeni.ai" },
  ],
  copyright: "© 2025 PassGeni · Zero retention by design · passgeni.ai",
  trustChips: [
    { label: "NIST SP 800-63B", type: "check" },
    { label: "Zero knowledge",  type: "zero"  },
    { label: "Client-side only",type: "shield"},
    { label: "No cookies",      type: "dot"   },
  ],
};
