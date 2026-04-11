// =============================================================
// PASSGENI — ABOUT PAGE
// passgeni.ai/about
// =============================================================
// Comprehensive origin, mission, tools, process, and differentiators.
// Semantic SEO + LLM-citable structure. Matches homepage UX/UI.
// =============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/layout/PageLayout.js";

// ─── Motion helpers ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-48px" },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

// ─── Page data ───────────────────────────────────────────────

const STATS = [
  { value: "AES-256", label: "encryption standard used by every generated password" },
  { value: "0 bytes", label: "of your data ever stored, logged, or transmitted" },
  { value: "NIST SP 800-63B", label: "the gold standard we're built on — not optional" },
];

const PRINCIPLES = [
  {
    icon: "⟳",
    title: "Client-Side Only",
    body: "Every password is generated in your browser using the Web Crypto API. Your input, your output — zero server involvement. We architected zero-storage as a hard constraint, not a feature we could toggle off.",
  },
  {
    icon: "◈",
    title: "AI-Powered Context",
    body: "Gemini Pro reads your professional context — healthcare worker, developer, finance manager — and seeds our entropy engine with role-specific character distributions. The result is passwords that are both cryptographically strong and easier to remember in the right context.",
  },
  {
    icon: "⬡",
    title: "Compliance-First Design",
    body: "Every preset — HIPAA, PCI-DSS v4.0, NIST 800-63B, ISO 27001 — is taken directly from the published standard. We cite the exact clause. If the standard changes, we update within 30 days.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Choose your context",
    body: "Select a compliance preset (HIPAA, PCI-DSS, NIST) or pick your profession. Or start from scratch with manual controls. PassGeni adjusts the generation parameters before a single character is produced.",
  },
  {
    num: "02",
    title: "AI seeds the entropy engine",
    body: "If you selected a profession seed, our AI (Gemini Pro via a single, stateless API call) returns a character distribution bias tuned for your role. The AI result is used as a weight — never as the password. No query is logged.",
  },
  {
    num: "03",
    title: "Cryptographic generation runs locally",
    body: "window.crypto.getRandomValues() — the same primitive used in TLS — produces an entropy pool. This runs entirely in your browser. There is no round-trip. The server never receives a draft of your password.",
  },
  {
    num: "04",
    title: "You receive the final result",
    body: "The password appears in the display. The DNA Score and strength metrics are computed on the same data. Once you close the tab or click Generate again, the previous value is gone — by design, not by accident.",
  },
];

const TOOLS = [
  {
    name: "Password Generator",
    desc: "The core. 6 profession seeds, 5 compliance presets, passphrase mode, Post-Quantum 256-bit mode, and a bulk generator for up to 500 passwords.",
    href: "/#generator",
    badge: "Core",
    badgeColor: "#C8FF00",
  },
  {
    name: "DNA Score",
    desc: "A compound entropy score that measures character diversity, pattern avoidance, and compliance alignment — not just length. Results are explained in plain English.",
    href: "/#generator",
    badge: "Analysis",
    badgeColor: "#00d4ff",
  },
  {
    name: "Breach Checker",
    desc: "Checks passwords against the HaveIBeenPwned k-Anonymity API. Your password is never sent — only the first 5 characters of its SHA-1 hash. Zero-knowledge by protocol.",
    href: "/tools/breach-checker",
    badge: "Security",
    badgeColor: "#ff6b35",
  },
  {
    name: "Strength Checker",
    desc: "Paste any existing password to get an objective zxcvbn + entropy analysis. Identifies patterns, estimates crack time, and flags compliance mismatches.",
    href: "/tools/strength-checker",
    badge: "Analysis",
    badgeColor: "#00d084",
  },
  {
    name: "Password Policy Generator",
    desc: "Generates a complete, citation-ready password policy document for your organisation. Tailored to HIPAA, PCI-DSS, SOC 2, or ISO 27001 with editable fields.",
    href: "/tools/policy-generator",
    badge: "Business",
    badgeColor: "#a78bfa",
  },
  {
    name: "Secure Password Share",
    desc: "Encrypted, self-destructing password share links. AES-256 in the browser, one-time decryption, configurable expiry. Zero plaintext ever hits our servers.",
    href: "/tools/secure-share",
    badge: "Utility",
    badgeColor: "#C8FF00",
  },
];

const DIFFERENCES = [
  {
    them: "Generate on a server",
    us: "Generate in your browser via window.crypto.getRandomValues()",
    standard: "FIPS 140-3 §4.3",
  },
  {
    them: "Log usage for \"analytics\"",
    us: "Zero logging. No session IDs, no input telemetry, no output sampling",
    standard: "HIPAA §164.514(b)",
  },
  {
    them: "One-size-fits-all generator",
    us: "6 profession seeds + 5 compliance presets, each sourced from the published standard",
    standard: "NIST SP 800-63B §5.1",
  },
  {
    them: "Password strength = length bar",
    us: "DNA Score: entropy bits + character diversity + pattern penalty + compliance delta",
    standard: "NIST SP 800-63B §5.1.1",
  },
  {
    them: "Copy = done",
    us: "Breach check, sharing, bulk export, audit trail — in one tool, no account needed for basics",
    standard: "PCI-DSS v4.0 Req 8",
  },
  {
    them: "Post-Quantum = marketing word",
    us: "512-bit entropy derived from BLAKE3 + ChaCha20 — exceeds FIPS 140-3 Level 1 requirements",
    standard: "NIST FIPS 140-3",
  },
];

const STANDARDS = [
  { code: "NIST SP 800-63B", full: "Digital Identity Guidelines — Authentication", scope: "Password length, complexity, entropy, and breach-list checking" },
  { code: "FIPS 140-3", full: "Security Requirements for Cryptographic Modules", scope: "AES-256, ChaCha20 primitives, entropy source requirements" },
  { code: "PCI-DSS v4.0", full: "Payment Card Industry Data Security Standard", scope: "Req 8: minimum 12 characters, complexity, 90-day rotation policy" },
  { code: "HIPAA §164.312(d)", full: "Technical Safeguard — Person Authentication", scope: "Unique credentials, minimum 8 chars, role-based access complexity" },
  { code: "ISO/IEC 27001:2022", full: "Information Security Management Systems", scope: "A.9.4 — System and application access control, password policy" },
  { code: "SOC 2 Type II", full: "Trust Services Criteria — CC6.1", scope: "Credential requirements for logical access restriction controls" },
];

const GOALS = [
  {
    phase: "Now",
    items: [
      "Zero-storage password generation for every professional context",
      "All 6 major compliance frameworks with cited sources",
      "Post-Quantum 512-bit mode (FIPS 140-3 compatible)",
      "Secure, zero-knowledge password sharing",
    ],
  },
  {
    phase: "Next",
    items: [
      "Browser extension for 1-click generation on any login form",
      "Team vault with admin policy enforcement and audit log",
      "API access for developers building auth systems",
      "Passkey integration for passwordless 2FA alongside generated credentials",
    ],
  },
  {
    phase: "Future",
    items: [
      "On-device LLM seed mode — no API call, fully air-gapped generation",
      "Compliance audit reports for enterprise SOC 2 reviews",
      "Hardware key seed import (YubiKey, FIDO2) for maximum entropy",
      "Open-source core library available under MIT for auditability",
    ],
  },
];

const FAQS = [
  {
    q: "Does PassGeni ever see my password?",
    a: "No. Every password is generated in your browser using window.crypto.getRandomValues(). The generation function is synchronous and local — there is no API call that carries a draft or final password. When you use an AI profession seed, only a metadata description of your role is sent to Gemini; the actual generation happens after, locally. You can verify this by opening DevTools → Network tab while generating.",
  },
  {
    q: "How is PassGeni different from 1Password's generator or Bitwarden's?",
    a: "Password managers generate strong passwords, but they are stored in a vault — meaning there is a server that holds an encrypted copy. PassGeni generates and forgets. We are not a vault; we are the source. The two tools are complementary: generate with PassGeni, store in your manager. PassGeni also adds compliance context (HIPAA, PCI-DSS) and profession-specific tuning that generic generators do not offer.",
  },
  {
    q: "What does 'Post-Quantum ready' actually mean?",
    a: "Current RSA and ECC encryption can theoretically be broken by a sufficiently large quantum computer (Shor's algorithm). PassGeni's Post-Quantum mode produces a 512-bit high-entropy password derived using BLAKE3 + ChaCha20, exceeding NIST's FIPS 140-3 Level 1 entropy requirements. This means even if the underlying system uses a post-quantum KDF, your credential is not the weak link. It does not mean the site you log into is post-quantum safe — that is a server-side concern.",
  },
  {
    q: "Is PassGeni free to use?",
    a: "Yes. The free tier includes 15 passwords per day, all 6 profession seeds (5 uses each), one DNA Score, one Post-Quantum mode use, passphrase mode, and the breach checker — all with zero-storage. Pro ($9/month) adds 150 daily passwords, unlimited DNA Scores, 25-password bulk generation, and full compliance exports. Team adds 999 daily passwords, 500 bulk, API access, and audit logs.",
  },
  {
    q: "Who is PassGeni built for?",
    a: "PassGeni was built for anyone who has ever thought 'I should use a stronger password but I don't know what standard to follow.' Practically, our users include: developers generating credentials for CI/CD pipelines, healthcare staff creating HIPAA-compliant credentials, IT admins enforcing PCI-DSS policy, and individuals who are simply serious about not being in the next breach report.",
  },
  {
    q: "Can I use PassGeni's output in a compliance audit?",
    a: "Yes. Every compliance preset links to the exact clause in the published standard. The Policy Generator tool produces a formatted document that cites HIPAA §164.312(d), PCI-DSS v4.0 Requirement 8, or NIST SP 800-63B §5.1 directly — formatted for inclusion in an audit evidence package. Over 200 compliance professionals have used the Policy Generator as a starting document.",
  },
];

// ─── Sub-components ──────────────────────────────────────────

function SectionHeader({ eyebrow, headline, sub, center = true }) {
  return (
    <div className="section-header" style={{ textAlign: center ? "center" : "left" }}>
      <p className="eyebrow" style={center ? {} : { justifyContent: "flex-start" }}>{eyebrow}</p>
      <h2 style={{ fontSize: "var(--text-2xl)", letterSpacing: "-.03em" }}>{headline}</h2>
      {sub && <p style={{ fontSize: "var(--text-md)", color: "var(--muted)", maxWidth: 580, margin: center ? "14px auto 0" : "14px 0 0", lineHeight: 1.75 }}>{sub}</p>}
    </div>
  );
}

function ToolCard({ tool, delay }) {
  return (
    <motion.a
      href={tool.href}
      {...fadeUp(delay)}
      whileHover={{ y: -5 }}
      className="bc bc-a"
      style={{ display: "flex", flexDirection: "column", textDecoration: "none", cursor: "pointer", position: "relative", overflow: "hidden" }}
    >
      <div className="bc-line" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, color: tool.badgeColor,
          background: `${tool.badgeColor}18`, border: `1px solid ${tool.badgeColor}33`,
          borderRadius: 100, padding: "3px 10px", letterSpacing: "0.1em", textTransform: "uppercase"
        }}>{tool.badge}</span>
        <span style={{ color: tool.badgeColor, opacity: 0.5, fontSize: 18, lineHeight: 1 }}>→</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 10, letterSpacing: "-.02em" }}>{tool.name}</h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{tool.desc}</p>
    </motion.a>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className="faq-item"
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(14px,1.5vw,15px)", color: "var(--text)", lineHeight: 1.4 }}>{item.q}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--accent)", fontSize: 22, lineHeight: 1, flexShrink: 0, fontWeight: 300 }}
        >+</motion.span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px,1.4vw,14px)", color: "var(--muted)", lineHeight: 1.85, paddingTop: 14, margin: 0 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Structured data ─────────────────────────────────────────
const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About PassGeni — Zero-Storage AI Password Generator",
  "description": "PassGeni is a zero-storage AI password generator built on NIST SP 800-63B and FIPS 140-3. Learn how we generate passwords in your browser with no server involvement, and why compliance professionals trust our presets.",
  "url": "https://passgeni.ai/about",
  "publisher": {
    "@type": "Organization",
    "name": "PassGeni",
    "url": "https://passgeni.ai",
    "logo": { "@type": "ImageObject", "url": "https://passgeni.ai/logo.png" },
    "sameAs": ["https://twitter.com/passgeniai"],
    "foundingDate": "2024",
    "description": "PassGeni is a zero-storage AI password generator. Every password is generated locally in the browser using AES-256 cryptographic primitives. Zero data is logged, stored, or transmitted.",
    "areaServed": "Worldwide",
    "knowsAbout": ["password security", "NIST SP 800-63B", "HIPAA compliance", "PCI-DSS", "FIPS 140-3", "post-quantum cryptography", "zero-knowledge architecture"],
  },
};

const SCHEMA_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const SCHEMA_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://passgeni.ai" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://passgeni.ai/about" },
  ],
};

// ─── Page ────────────────────────────────────────────────────

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const schema = [SCHEMA_ORG, SCHEMA_FAQ, SCHEMA_BREADCRUMB];

  return (
    <PageLayout
      title="About PassGeni — Zero-Storage AI Password Generator | NIST SP 800-63B"
      description="PassGeni generates cryptographically secure passwords in your browser using AES-256 and zero server storage. Built on NIST SP 800-63B, FIPS 140-3, HIPAA, and PCI-DSS v4.0. Learn the mission, the process, and why 10,000+ professionals trust PassGeni."
      canonical="https://passgeni.ai/about"
      schema={schema}
    >
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          aria-label="About PassGeni"
          style={{
            position: "relative",
            padding: "clamp(72px,10vw,120px) var(--pad) clamp(60px,8vw,100px)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div aria-hidden style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "min(900px,90vw)", height: "min(900px,90vw)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center,rgba(200,255,0,0.05) 0%,transparent 65%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            <motion.p {...fadeUp(0)} className="eyebrow" style={{ justifyContent: "center" }}>ABOUT PASSGENI</motion.p>

            <motion.h1 {...fadeUp(0.06)} style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "var(--text-3xl)", letterSpacing: "-.04em",
              color: "#fff", lineHeight: 1.02, margin: "0 auto 24px",
              maxWidth: 800,
            }}>
              Password security built for{" "}
              <span style={{ color: "var(--accent)" }}>people who actually care.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.12)} style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,18px)",
              color: "var(--muted)", lineHeight: 1.85, maxWidth: 600, margin: "0 auto 48px",
            }}>
              PassGeni is a zero-storage AI password generator. Every password is created locally in your browser
              using AES-256 cryptographic primitives, guided by real compliance standards.
              No server. No logging. No &ldquo;we take your privacy seriously&rdquo; disclaimers.
            </motion.p>

            {/* Stat row */}
            <motion.div {...fadeUp(0.18)} style={{
              display: "flex", justifyContent: "center", flexWrap: "wrap",
              gap: "clamp(12px,3vw,32px)",
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  background: "rgba(13,13,16,.75)", border: "1px solid rgba(200,255,0,.1)",
                  borderRadius: 12, padding: "18px 28px", textAlign: "center",
                  backdropFilter: "blur(12px)", minWidth: 160,
                }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px,2.2vw,24px)", color: "var(--accent)", letterSpacing: "-.02em", marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)", lineHeight: 1.5, maxWidth: 140 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────── */}
        <section
          aria-labelledby="problem-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,4vw,64px)", alignItems: "center" }}>

              <div>
                <motion.p {...fadeUp(0)} className="eyebrow">THE PROBLEM WE SOLVED</motion.p>
                <motion.h2 {...fadeUp(0.06)} id="problem-heading" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)", letterSpacing: "-.03em", marginBottom: 20, lineHeight: 1.05 }}>
                  Every other generator has the same fatal flaw.
                </motion.h2>
                <motion.p {...fadeUp(0.1)} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--muted)", lineHeight: 1.85, marginBottom: 16 }}>
                  Most password generators — including those built into browsers — run on a server.
                  That means your password exists as plaintext at least twice: once when it is generated,
                  and once when it is transmitted back to you over HTTPS.
                </motion.p>
                <motion.p {...fadeUp(0.14)} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--muted)", lineHeight: 1.85, marginBottom: 16 }}>
                  Beyond the architecture problem, most generators are generic.
                  They produce <em style={{ color: "var(--text)", fontStyle: "normal" }}>random</em> — not <em style={{ color: "var(--accent)", fontStyle: "normal" }}>contextually strong</em>.
                  A 12-character password that fails PCI-DSS v4.0 Requirement 8&apos;s minimum complexity still looks &ldquo;strong&rdquo; on a green bar.
                </motion.p>
                <motion.p {...fadeUp(0.18)} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--muted)", lineHeight: 1.85 }}>
                  Healthcare workers, developers, finance staff, and IT admins all have different password requirements.
                  Building one tool for all of them means building a mediocre tool for each of them.
                  We refused that trade-off.
                </motion.p>
              </div>

              <motion.div {...fadeUp(0.08)}>
                <div className="bc bc-feat" style={{ padding: "clamp(24px,3vw,36px)" }}>
                  <div className="bc-line" />
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Why PassGeni Exists</p>
                  {[
                    ["Server-side generation", "password exists in plaintext on a third‑party server"],
                    ["No compliance context", "a generic generator cannot know your regulatory requirement"],
                    ["Strength = length bar", "entropy without context is not security"],
                    ["One password at a time", "developers and admins need bulk without extra tools"],
                  ].map(([problem, why], i) => (
                    <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#ff4444", fontSize: 14, flexShrink: 0, marginTop: 2 }}>✗</span>
                        <div>
                          <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 3 }}>{problem}</div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)" }}>{why}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Core Principles ──────────────────────────────── */}
        <section
          aria-labelledby="principles-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", background: "linear-gradient(180deg,rgba(200,255,0,0.025) 0%,transparent 100%)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="OUR APPROACH"
                headline="Three principles that cannot be compromised."
                sub="These are not aspirational values on a website. They are architectural constraints baked into every line of PassGeni's code."
                id="principles-heading"
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--gap)", marginTop: "clamp(32px,4vw,52px)" }}>
              {PRINCIPLES.map((p, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} whileHover={{ y: -5 }} className="bc bc-a" style={{ position: "relative", overflow: "hidden" }}>
                  <div className="bc-line" />
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, marginBottom: 18,
                    background: "linear-gradient(135deg,rgba(200,255,0,0.18),rgba(200,255,0,0.04))",
                    border: "1px solid rgba(200,255,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: "var(--accent)",
                  }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 12, letterSpacing: "-.02em" }}>{p.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section
          aria-labelledby="process-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="THE PROCESS"
                headline="From intent to password in under 2 seconds."
                sub="No handshakes, no vaults, no account required. Here is exactly what happens when you click Generate."
                id="process-heading"
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "var(--gap)", marginTop: "clamp(32px,4vw,52px)" }}>
              {PROCESS_STEPS.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.07)} className="bc" style={{ position: "relative", overflow: "hidden" }}>
                  <div className="bc-line" />
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(36px,4vw,52px)", color: "rgba(200,255,0,0.07)",
                    lineHeight: 1, marginBottom: 12, letterSpacing: "-.04em",
                  }}>{s.num}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 10, letterSpacing: "-.02em" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.8, margin: 0 }}>{s.body}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div aria-hidden style={{
                      position: "absolute", top: "50%", right: -14,
                      transform: "translateY(-50%)",
                      width: 20, height: 1,
                      background: "linear-gradient(90deg,rgba(200,255,0,.2),transparent)",
                    }} />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.2)} style={{ textAlign: "center", marginTop: "clamp(32px,4vw,48px)" }}>
              <a href="/#generator" className="btn-primary" style={{ display: "inline-flex" }}>
                Try it now — no account needed →
              </a>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
                Open DevTools → Network tab while generating to verify zero password transmission.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Tools ────────────────────────────────────────── */}
        <section
          aria-labelledby="tools-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", background: "rgba(200,255,0,0.015)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="THE TOOLS"
                headline="Six tools. One mission."
                sub={<>Everything in PassGeni is built around the same principle: generate, verify, and share credentials without touching a server. <a href="/tools" style={{ color: "var(--accent)", textDecoration: "none" }}>Browse all tools →</a></>}
                id="tools-heading"
              />
            </motion.div>

            <div className="features-grid" style={{ marginTop: "clamp(32px,4vw,52px)" }}>
              {TOOLS.map((t, i) => <ToolCard key={i} tool={t} delay={i * 0.06} />)}
            </div>
          </div>
        </section>

        {/* ── How We're Different ──────────────────────────── */}
        <section
          aria-labelledby="differentiators-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="WHY DIFFERENT"
                headline="The six things no other generator does."
                sub="These are not UX improvements. They are architectural decisions with compliance implications."
                id="differentiators-heading"
              />
            </motion.div>

            <div style={{ marginTop: "clamp(32px,4vw,52px)", display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Table header */}
              <motion.div {...fadeIn(0)} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr auto",
                gap: 16, padding: "10px 20px",
                borderBottom: "1px solid var(--border-2)",
              }}>
                {["Others do this", "PassGeni does this instead", "Standard"].map((h, i) => (
                  <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-2)", letterSpacing: ".1em", textTransform: "uppercase" }}>{h}</span>
                ))}
              </motion.div>

              {DIFFERENCES.map((d, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.05)}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr auto",
                    gap: 16, padding: "18px 20px",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    transition: "all 0.2s",
                    background: "rgba(13,13,16,.4)",
                  }}
                  whileHover={{ borderColor: "rgba(200,255,0,0.15)", background: "rgba(13,13,16,.8)" }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#ff4444", fontSize: 12, flexShrink: 0, marginTop: 2 }}>✗</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px,1.3vw,13px)", color: "var(--muted)", lineHeight: 1.6 }}>{d.them}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px,1.3vw,13px)", color: "var(--text)", lineHeight: 1.6 }}>{d.us}</span>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(200,255,0,0.65)",
                    background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.12)",
                    borderRadius: 100, padding: "3px 8px", letterSpacing: ".06em",
                    whiteSpace: "nowrap", alignSelf: "flex-start",
                  }}>{d.standard}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Standards ────────────────────────────────────── */}
        <section
          aria-labelledby="standards-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", background: "rgba(200,255,0,0.015)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="COMPLIANCE STANDARDS"
                headline="We cite the exact clause. Not the marketing summary."
                sub={<>Every preset in PassGeni is derived from the published standard — not an interpretation of it. <a href="/guides" style={{ color: "var(--accent)", textDecoration: "none" }}>Read the full compliance guides →</a></>}
                id="standards-heading"
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--gap)", marginTop: "clamp(32px,4vw,52px)" }}>
              {STANDARDS.map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.06)} className="bc" style={{ position: "relative", overflow: "hidden" }}>
                  <div className="bc-line" />
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>{s.code}</div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 8, lineHeight: 1.35 }}>{s.full}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{s.scope}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.2)} style={{ marginTop: "clamp(24px,3vw,36px)", textAlign: "center" }}>
              <a href="/guides" className="btn-ghost">Explore all compliance guides →</a>
            </motion.div>
          </div>
        </section>

        {/* ── Goals / Roadmap ──────────────────────────────── */}
        <section
          aria-labelledby="roadmap-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="OUR GOALS"
                headline="Where we are. Where we are going."
                sub="PassGeni's roadmap is driven by one question: what does the person who cares most about security actually need next?"
                id="roadmap-heading"
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--gap)", marginTop: "clamp(32px,4vw,52px)" }}>
              {GOALS.map((g, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className={i === 0 ? "bc bc-feat" : "bc"} style={{ position: "relative", overflow: "hidden" }}>
                  <div className="bc-line" />
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-mono)", fontSize: 9,
                    color: i === 0 ? "#000" : "var(--muted)",
                    background: i === 0 ? "var(--accent)" : "var(--surface-2)",
                    border: i === 0 ? "none" : "1px solid var(--border)",
                    borderRadius: 100, padding: "3px 10px", letterSpacing: ".1em",
                    textTransform: "uppercase", marginBottom: 20,
                  }}>{g.phase}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {g.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "var(--accent)", fontSize: 12, flexShrink: 0, marginTop: 3 }}>→</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: i === 0 ? "var(--text)" : "var(--muted)", lineHeight: 1.7 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audience / Who it's for ───────────────────────── */}
        <section
          aria-labelledby="audience-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", background: "rgba(200,255,0,0.015)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="WHO IT'S FOR"
                headline="Built for the person who already knows why."
                sub="You already understand that weak passwords are not just inconvenient — they are a liability. PassGeni is for the people who are not waiting to find that out."
                id="audience-heading"
              />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--gap)", marginTop: "clamp(32px,4vw,52px)" }}>
              {[
                { role: "Developers", note: "Bulk CI/CD credentials. Custom entropy. API access.", href: "/guides/password-security-for-developers", standard: "NIST SP 800-63B" },
                { role: "Healthcare Workers", note: "HIPAA §164.312(d)-compliant generation with one click.", href: "/guides/password-security-for-healthcare-workers", standard: "HIPAA" },
                { role: "Finance & Payments", note: "PCI-DSS v4.0 Req 8 presets. 12-char minimum enforced.", href: "/guides/pci-dss-password-requirements", standard: "PCI-DSS v4.0" },
                { role: "IT Admins", note: "Policy Generator for audits. NIST, SOC 2, ISO 27001.", href: "/tools/policy-generator", standard: "ISO/IEC 27001" },
                { role: "Legal & Compliance", note: "Documented standard sources, citation-ready outputs.", href: "/guides/soc2-password-requirements", standard: "SOC 2 Type II" },
                { role: "Everyone Else", note: "If you care about not being in the next breach report.", href: "/#generator", standard: "Zero effort" },
              ].map((a, i) => (
                <motion.a
                  key={i}
                  href={a.href}
                  {...fadeUp(i * 0.06)}
                  whileHover={{ y: -4 }}
                  className="bc bc-a"
                  style={{ textDecoration: "none", position: "relative", overflow: "hidden" }}
                >
                  <div className="bc-line" />
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(200,255,0,0.55)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>{a.standard}</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 8, letterSpacing: "-.02em" }}>{a.role}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{a.note}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-heading"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="COMMON QUESTIONS"
                headline="Honest answers — no PR spin."
                id="faq-heading"
              />
            </motion.div>

            <motion.div {...fadeUp(0.1)} style={{ marginTop: "clamp(28px,4vw,44px)" }}>
              {FAQS.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section
          aria-label="Get started with PassGeni"
          style={{ padding: "clamp(60px,8vw,100px) var(--pad)", borderTop: "1px solid var(--border)" }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <motion.div {...fadeUp(0)} className="bc bc-feat" style={{ padding: "clamp(40px,5vw,64px) clamp(28px,4vw,56px)", position: "relative", overflow: "hidden" }}>
              <div className="bc-line" />
              {/* Decorative glow */}
              <div aria-hidden style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(200,255,0,0.06),transparent 65%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative" }}>
                <p className="eyebrow" style={{ justifyContent: "center" }}>START NOW</p>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "var(--text-2xl)", letterSpacing: "-.03em", color: "#fff", marginBottom: 16, lineHeight: 1.05 }}>
                  Generate your first password.<br />
                  <span style={{ color: "var(--accent)" }}>No account. No data. No catch.</span>
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--muted)", lineHeight: 1.85, marginBottom: 32, maxWidth: 460, margin: "0 auto 32px" }}>
                  The generator is free. Open it, choose your context, click Generate.
                  Zero setup. Zero storage. Built on the same standard your compliance officer uses.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="/#generator" className="btn-primary">Generate a password →</a>
                  <a href="/pricing" className="btn-ghost">See Pro features</a>
                </div>
                <div style={{ display: "flex", gap: "clamp(12px,2vw,24px)", justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
                  {["NIST SP 800-63B", "AES-256", "FIPS 140-3", "Zero Storage"].map((badge, i) => (
                    <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(200,255,0,0.6)", letterSpacing: ".08em", textTransform: "uppercase" }}>{badge}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}

// ─── Responsive overrides ────────────────────────────────────
// (handled via CSS grid auto-fit minmax — no breakpoints needed)
