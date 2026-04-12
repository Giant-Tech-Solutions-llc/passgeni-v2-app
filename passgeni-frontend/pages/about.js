// =============================================================
// PASSGENI — ABOUT PAGE
// passgeni.ai/about
// =============================================================

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/layout/PageLayout.js";

// ─── Motion helpers ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, amount: 0.15 },
  transition:  { duration: 0.56, delay, ease: [0.16, 1, 0.3, 1] },
});

// ─── SCHEMA ──────────────────────────────────────────────────
const schema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About PassGeni",
    "description": "PassGeni was built on one conviction: your password should never touch a server. Learn the story, the architecture, and the people behind zero-knowledge password generation.",
    "url": "https://passgeni.ai/about",
    "publisher": {
      "@type": "Organization",
      "name": "PassGeni",
      "url": "https://passgeni.ai",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "PassGeni", "item": "https://passgeni.ai" },
      { "@type": "ListItem", "position": 2, "name": "About",   "item": "https://passgeni.ai/about" },
    ],
  },
];

// ─── DIAGRAM ─────────────────────────────────────────────────
function ArchDiagram() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {[
        { label: "Your Browser", accent: true, icon: "⬡" },
        { label: null },
        { label: "crypto.getRandomValues()", accent: false, icon: "⚙" },
        { label: null },
        { label: "Your Password", accent: true, icon: "◈" },
      ].map((node, i) =>
        node.label === null ? (
          <div key={i} style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 28, padding: "2px 0 2px 28px" }}>
            <span style={{ color: "rgba(200,255,0,0.5)", fontSize: 20, lineHeight: 1 }}>↓</span>
          </div>
        ) : (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: node.accent ? "rgba(200,255,0,0.06)" : "rgba(13,13,16,0.9)",
            border: `1px solid ${node.accent ? "rgba(200,255,0,0.22)" : "rgba(200,255,0,0.08)"}`,
            borderRadius: 10, padding: "14px 20px",
          }}>
            <span style={{ color: "var(--accent)", fontSize: 14 }}>{node.icon}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: node.accent ? "#fff" : "var(--muted)", letterSpacing: "0.01em" }}>{node.label}</span>
          </div>
        )
      )}

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          "✕  No Server Contact",
          "✕  No Network Request",
          "✕  No Log. No Storage.",
        ].map((x, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, color: "#ff6644", letterSpacing: "0.02em" }}>
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCROLL INDICATOR ────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(200,255,0,0.5)", letterSpacing: "0.16em" }}>SCROLL</span>
      <span style={{ color: "var(--accent)", fontSize: 18, lineHeight: 1 }}>↓</span>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <PageLayout
      title="About PassGeni — Why We Built It, How It Works, and Who We Are"
      description="PassGeni was built on one conviction: your password should never touch a server. Learn the story, the architecture, and the people behind zero-knowledge password generation."
      canonical="https://passgeni.ai/about"
      schema={schema}
    >

      {/* ── SECTION 1 · HERO ─────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(80px,10vw,120px) var(--page-pad) 60px",
        textAlign: "center", position: "relative",
      }}>
        {/* Radial glow */}
        <div aria-hidden style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 28 }}>Our Story</div>

          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(40px,7vw,80px)",
            lineHeight: 1.0, letterSpacing: "-0.035em",
            color: "#fff", maxWidth: 900, margin: "0 auto 28px",
          }}>
            We built PassGeni<br />
            because we got tired<br />
            <span style={{ color: "var(--accent)" }}>of trusting servers.</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px,1.8vw,20px)",
            color: "var(--muted)", lineHeight: 1.85,
            maxWidth: 640, margin: "0 auto",
          }}>
            Every password generator we used sent data somewhere.<br />
            Logged something. Assumed we'd never check.<br />
            We checked. Then we built something different.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
        >
          <ScrollIndicator />
        </motion.div>
      </section>

      {/* ── SECTION 2 · ORIGIN STORY ─────────────────────────── */}
      <section style={{ padding: "var(--section) var(--page-pad)", maxWidth: 720, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Where This Started</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(26px,3.5vw,42px)",
            color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 36,
          }}>
            A password generator<br />
            that stores your passwords<br />
            isn't a tool.<br />
            <span style={{ color: "var(--accent)" }}>It's a liability.</span>
          </h2>
        </motion.div>

        {[
          `In 2021, we were building internal security tooling for a small team. We needed a fast way to generate strong passwords — the kind that meet HIPAA requirements, that actually hold up against modern attacks, that don't feel like keyboard smashing.`,
          `We tried every major generator. They were fine. Until we opened DevTools.`,
          `Most of them were making network requests on generation. Some logged inputs. A few had third-party analytics running during the generation event itself. None of them disclosed this clearly. None of them needed to — there was no law saying they had to.`,
          `We weren't angry. We were just done.`,
          `If a password generator's server gets breached, every password ever generated on that platform is potentially compromised. Not stored passwords — generated ones. The ones you're using right now on your bank account, your work systems, your email.`,
          `That's the problem PassGeni exists to solve.`,
        ].map((para, i) => (
          <motion.p
            key={i}
            {...fadeUp(i * 0.05)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px,1.6vw,18px)",
              color: i === 3 || i === 5 ? "#fff" : "var(--muted)",
              lineHeight: 1.95,
              marginBottom: 22,
              fontWeight: i === 3 || i === 5 ? 600 : 400,
              fontStyle: i === 5 ? "italic" : "normal",
            }}
          >
            {para}
          </motion.p>
        ))}
      </section>

      {/* ── SECTION 3 · MANIFESTO ────────────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          {...fadeUp(0)}
          style={{
            background: "#0a0a0c",
            border: "1px solid rgba(200,255,0,0.15)",
            borderRadius: "var(--radius-l)",
            padding: "clamp(48px,8vw,96px) clamp(32px,6vw,80px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg,transparent,rgba(200,255,0,0.4),transparent)",
          }} />
          <div aria-hidden style={{
            position: "absolute", bottom: -80, right: -80, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle,rgba(200,255,0,0.04),transparent 70%)",
          }} />
          <blockquote style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "clamp(22px,3.5vw,38px)",
            color: "#fff", lineHeight: 1.35, letterSpacing: "-0.02em",
            margin: "0 0 28px", maxWidth: 760, marginLeft: "auto", marginRight: "auto",
          }}>
            "Zero storage isn't a feature.<br />
            It's a promise we made<br />
            before we wrote a single line of code."
          </blockquote>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted-2)",
            margin: 0, fontStyle: "italic",
          }}>
            — The principle behind every decision PassGeni has made since day one
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 4 · ARCHITECTURE ─────────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <div className="eyebrow">The Architecture</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(26px,3.5vw,44px)",
            color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 640,
          }}>
            Your browser generates it.<br />
            Your browser keeps it.<br />
            <span style={{ color: "var(--accent)" }}>Nothing leaves.</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,420px)",
          gap: "clamp(40px,6vw,80px)",
          alignItems: "start",
        }}
          className="about-arch-grid"
        >
          {/* Left: copy */}
          <motion.div {...fadeUp(0.06)}>
            {[
              `PassGeni runs entirely in your browser using JavaScript's crypto.getRandomValues() — the same cryptographic primitive used in HTTPS, banking systems, and government infrastructure.`,
              `Here is what happens when you generate a password:`,
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.5vw,17px)", color: "var(--muted)", lineHeight: 1.9, marginBottom: 20 }}>{p}</p>
            ))}

            <ol style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "You select your profession, length, and preferences.",
                "Your browser pulls a domain-relevant seed from our profession vocabulary — a term a doctor, developer, or lawyer would recognize.",
                "crypto.getRandomValues() generates a cryptographically random character pool. It's mathematically unguessable — not just hard to guess.",
                "The seed embeds into that pool and gets shuffled.",
                "Your password appears.",
              ].map((step, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", background: "rgba(200,255,0,0.07)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 4, padding: "2px 8px", flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.5vw,17px)", color: "var(--muted)", lineHeight: 1.85 }}>{step}</span>
                </li>
              ))}
            </ol>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.5vw,17px)", color: "var(--muted)", lineHeight: 1.9, marginBottom: 16 }}>
              At no point does anything leave your device. Not the seed. Not the password. Not your preferences. Not even an encrypted version.
            </p>

            <div style={{
              background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.18)",
              borderLeft: "3px solid var(--accent)", borderRadius: 8, padding: "16px 20px",
            }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.5vw,17px)", color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>
                You can verify this yourself. Open DevTools. Go to the Network tab. Generate a password. <strong style={{ color: "#fff" }}>Watch nothing happen.</strong>
                <br /><br />
                That's not a marketing claim. That's verifiable architecture.
              </p>
            </div>
          </motion.div>

          {/* Right: diagram */}
          <motion.div {...fadeUp(0.14)} style={{ position: "sticky", top: 88 }}>
            <div className="bc" style={{ padding: "clamp(24px,3vw,36px)" }}>
              <div className="bc-line" />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Generation Flow</div>
              <ArchDiagram />
            </div>
          </motion.div>
        </div>

        <style>{`@media(max-width:860px){.about-arch-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── SECTION 5 · THREE TRUTHS ─────────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)} className="section-header" style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <div className="eyebrow">How We Operate</div>
          <h2>Three things we will never<br />compromise on.</h2>
        </motion.div>

        <div className="grid-cards">
          {[
            {
              icon: "◈",
              title: "Zero Storage — Always",
              body: "We don't store your passwords. We can't. Not 'we choose not to' — the architecture makes it technically impossible. Even a full breach of our servers reveals nothing about any password ever generated.",
              delay: 0,
            },
            {
              icon: "✦",
              title: "No Dark Patterns — Ever",
              body: "We don't use countdown timers to fake urgency. We don't hide the free tier behind friction. We don't run ads against your security choices. If something feels manipulative, we won't build it.",
              delay: 0.07,
            },
            {
              icon: "⚡",
              title: "Honest Limits — Upfront",
              body: "The free tier is real. Fifteen passwords a day, no account required, no data collected. We make money from Pro and Team plans — not from selling access to your behavior.",
              delay: 0.14,
            },
          ].map((card) => (
            <motion.div key={card.title} {...fadeUp(card.delay)} className="bc bc-a">
              <div className="bc-line" />
              <div style={{ fontSize: 22, color: "var(--accent)", marginBottom: 20 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(16px,1.8vw,19px)", color: "#fff", letterSpacing: "-0.01em", marginBottom: 14 }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,16px)", color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 · USER IDENTITY MIRROR ────────────────────*/}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)} className="section-header" style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
          <div className="eyebrow">Built For</div>
          <h2>Not built for everyone.<br /><span style={{ color: "var(--accent)" }}>Built precisely for you.</span></h2>
        </motion.div>

        {[
          {
            label: "The Individual",
            headline: "You're not paranoid.\nYou're paying attention.",
            body: [
              `You've read enough breach reports to know that "we take security seriously" is the thing companies say right before they tell you your data was compromised.`,
              `You use PassGeni because you want a password that's actually unguessable — and you want to know, with certainty, that generating it didn't create a new vulnerability somewhere else.`,
              `No account. No tracking. No compromise.`,
            ],
            reverse: false,
            chip: "Free · No account · No data",
            cta: { label: "Generate now →", href: "/#generator" },
          },
          {
            label: "The Professional",
            headline: "Your work comes with compliance requirements\nyou didn't design and can't ignore.",
            body: [
              `HIPAA says 12 characters minimum. PCI-DSS says no dictionary words. Your auditor says "prove it." Your previous tool said "trust us."`,
              `PassGeni has presets for HIPAA, PCI-DSS, SOC 2, ISO 27001, NIST 800-63B, and DoD. One click. Settings auto-configured. Audit-ready in seconds.`,
              `You don't have to read a 40-page compliance document to use a password generator correctly.`,
            ],
            reverse: true,
            chip: "Team plan · 6 compliance presets · Audit-ready",
            cta: { label: "See compliance presets →", href: "/guides" },
          },
          {
            label: "The Team",
            headline: "You're responsible for people who don't think about\npassword security until something goes wrong.",
            body: [
              `The Team plan gives you an API, bulk generation, custom vocabulary, and the compliance presets your industry requires — without asking your team to become security experts to use the tool.`,
              `Five seats. One policy. Zero guesswork.`,
            ],
            reverse: false,
            chip: "5 seats · REST API · Bulk generation",
            cta: { label: "See Team pricing →", href: "/pricing" },
          },
        ].map((user, ui) => (
          <motion.div
            key={user.label}
            {...fadeUp(0)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px,6vw,80px)",
              alignItems: "center",
              marginBottom: "clamp(56px,7vw,96px)",
              direction: user.reverse ? "rtl" : "ltr",
            }}
            className="about-user-row"
          >
            {/* Visual side */}
            <div style={{ direction: "ltr" }}>
              <div className="bc bc-feat" style={{ padding: "clamp(28px,4vw,48px)", textAlign: "center", minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div className="bc-line" />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>
                  {user.label}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.12)", borderRadius: 100, padding: "6px 16px", textAlign: "center", lineHeight: 1.6 }}>
                  {user.chip}
                </div>
                <a href={user.cta.href} className="btn-ghost" style={{ fontSize: 12, padding: "9px 20px", marginTop: 8 }}>
                  {user.cta.label}
                </a>
              </div>
            </div>

            {/* Copy side */}
            <div style={{ direction: "ltr" }}>
              <h3 style={{
                fontFamily: "var(--font-heading)", fontWeight: 800,
                fontSize: "clamp(20px,2.4vw,28px)",
                color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25,
                marginBottom: 24, whiteSpace: "pre-line",
              }}>
                {user.headline}
              </h3>
              {user.body.map((p, pi) => (
                <p key={pi} style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px,1.5vw,17px)",
                  color: pi === user.body.length - 1 ? "#fff" : "var(--muted)",
                  lineHeight: 1.9, marginBottom: 16,
                  fontWeight: pi === user.body.length - 1 ? 600 : 400,
                }}>
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        <style>{`@media(max-width:768px){.about-user-row{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
      </section>

      {/* ── SECTION 7 · STATS BAR ────────────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          {...fadeUp(0)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 2,
            background: "var(--border)",
            borderRadius: "var(--radius-l)",
            overflow: "hidden",
          }}
          className="about-stats-grid"
        >
          {[
            { value: "256-bit",    label: "Minimum entropy" },
            { value: "0 bytes",    label: "of your data stored" },
            { value: "6+",         label: "Compliance frameworks" },
            { value: "<1 second",  label: "Generation time" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "var(--bg)", padding: "clamp(24px,3vw,40px) clamp(20px,2.5vw,32px)",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-heading)", fontWeight: 800,
                fontSize: "clamp(22px,3vw,36px)",
                color: "var(--accent)", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1,
              }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px,1.2vw,13px)", color: "var(--muted)", lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
        <style>{`@media(max-width:640px){.about-stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      </section>

      {/* ── SECTION 8 · TEAM PHILOSOPHY ─────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 720, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)}>
          <div className="eyebrow">Who We Are</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(24px,3.5vw,40px)",
            color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 36,
          }}>
            A small team with an unreasonable<br />
            <span style={{ color: "var(--accent)" }}>commitment to one thing.</span>
          </h2>
        </motion.div>

        {[
          `PassGeni is built by a small team of engineers and security researchers who believe that good security tooling should be auditable, honest, and boring in the best possible way.`,
          `Boring meaning: it does exactly what it says. Nothing more. No surprise features. No hidden behavior. No pivot to "AI-powered insights about your security posture" that requires uploading your passwords to train a model.`,
          `We're not trying to be your everything-security-platform. We're trying to be the one tool you reach for when you need a strong password — and trust completely when you do.`,
          `That focus is the product. That restraint is the feature.`,
        ].map((p, i) => (
          <motion.p
            key={i}
            {...fadeUp(i * 0.06)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px,1.6vw,18px)",
              color: i === 3 ? "#fff" : "var(--muted)",
              lineHeight: 1.95, marginBottom: 22,
              fontWeight: i === 3 ? 600 : 400,
              fontStyle: i === 3 ? "italic" : "normal",
            }}
          >
            {p}
          </motion.p>
        ))}

        <motion.div
          {...fadeUp(0.2)}
          style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40, paddingTop: 36, borderTop: "1px solid var(--border)" }}
        >
          {[
            { icon: "◈", text: "Founded 2021" },
            { icon: "✦", text: "Bootstrapped — no VC pressure to monetize your data" },
            { icon: "⬡", text: "Client-side architecture, verified open to inspection" },
            { icon: "◎", text: "NIST SP 800-63B aligned since day one" },
            { icon: "⚡", text: "Zero breach history — because there's nothing to breach" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--accent)", fontSize: 13, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,16px)", color: "var(--muted)" }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION 9 · TRANSPARENCY PLEDGE ─────────────────── */}
      <section style={{ padding: "0 var(--page-pad) var(--section)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          {...fadeUp(0)}
          style={{
            borderLeft: "3px solid var(--accent)",
            paddingLeft: "clamp(24px,4vw,48px)",
          }}
        >
          <div className="eyebrow">Our Commitment</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(24px,3.5vw,40px)",
            color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 48,
          }}>
            Things we will tell you straight.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              {
                n: "01",
                heading: "We will never sell your data",
                body: "Because we don't have any. Generation happens in your browser. We have no record of what you generated, when, or for which account.",
              },
              {
                n: "02",
                heading: "We will never add analytics to the generation event",
                body: "If we ever need to understand usage patterns, we will use aggregated, non-identifying metrics — never anything touching the generation itself.",
              },
              {
                n: "03",
                heading: "We will tell you when we change the architecture",
                body: "Any change to how PassGeni generates passwords will be disclosed in our changelog before it ships, with a technical explanation of what changed and why.",
              },
              {
                n: "04",
                heading: "We will always maintain a genuinely free tier",
                body: "The free tier exists because we believe everyone deserves access to strong password generation, not because it's a loss-leader funnel. If that changes, we'll give 90 days notice.",
              },
            ].map((pledge, i) => (
              <motion.div
                key={pledge.n}
                {...fadeUp(i * 0.07)}
                className="bc"
                style={{ display: "flex", gap: "clamp(16px,3vw,28px)", flexDirection: "row", alignItems: "flex-start" }}
              >
                <div className="bc-line" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", background: "rgba(200,255,0,0.07)", border: "1px solid rgba(200,255,0,0.2)", borderRadius: 4, padding: "4px 9px", flexShrink: 0, marginTop: 2 }}>{pledge.n}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(16px,1.8vw,19px)", color: "#fff", letterSpacing: "-0.01em", marginBottom: 10, lineHeight: 1.35 }}>
                    {pledge.heading}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,16px)", color: "var(--muted)", lineHeight: 1.9, margin: 0 }}>
                    {pledge.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 10 · CTA ─────────────────────────────────── */}
      <section style={{ padding: "0 var(--page-pad) clamp(80px,10vw,140px)", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          {...fadeUp(0)}
          className="bc bc-feat"
          style={{ textAlign: "center", padding: "clamp(56px,8vw,100px) var(--page-pad)", position: "relative" }}
        >
          <div className="bc-line" />
          <div aria-hidden style={{
            position: "absolute", inset: 0, borderRadius: "var(--radius-l)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.05) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />

          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>Ready When You Are</div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "clamp(28px,4.5vw,52px)",
            color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14,
          }}>
            Generate your first password.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.6vw,18px)", color: "var(--muted)", lineHeight: 1.8, marginBottom: 40 }}>
            No account. No commitment. No catch.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <motion.a
              href="/#generator"
              className="btn-primary"
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(200,255,0,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: 15, padding: "15px 36px" }}
            >
              Generate a password →
            </motion.a>
            <motion.a
              href="/pricing"
              className="btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: 15, padding: "15px 32px" }}
            >
              See Team pricing
            </motion.a>
          </div>

          <div style={{ display: "flex", gap: "clamp(16px,3vw,32px)", justifyContent: "center", flexWrap: "wrap" }}>
            {["◈ Zero storage", "✦ Client-side only", "⬡ NIST SP 800-63B", "◎ Free forever"].map((chip) => (
              <span key={chip} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted-2)", letterSpacing: "0.06em" }}>{chip}</span>
            ))}
          </div>
        </motion.div>
      </section>

    </PageLayout>
  );
}
