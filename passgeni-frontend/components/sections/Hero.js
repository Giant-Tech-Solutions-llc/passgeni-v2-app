// =============================================================
// PASSGENI — HERO SECTION
// =============================================================

import { useState, useEffect } from "react";
import { HERO } from "../../content/copy.js";

// ─── ANIMATED PASSWORD TYPEWRITER ────────────────────────────
function AnimatedPassword() {
  const passwords = [
    "nX9#kT2@mP5!qR8$",
    "cortex-vault-442-helix",
    "Bz7!deploy#K3@stack",
    "helix-neon-881-pulse",
    "pixel-stark-357-render",
    "Kq#delta88!yield@Zn",
  ];

  const [idx,     setIdx]     = useState(0);
  const [display, setDisplay] = useState("");
  const [phase,   setPhase]   = useState("typing");

  useEffect(() => {
    const pw = passwords[idx];
    let t;
    if (phase === "typing") {
      if (display.length < pw.length) {
        t = setTimeout(() => setDisplay(pw.slice(0, display.length + 1)), 60);
      } else {
        t = setTimeout(() => setPhase("hold"), 1800);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("erasing"), 400);
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
      } else {
        setIdx((idx + 1) % passwords.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [display, phase, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(15px,2.2vw,22px)", letterSpacing: "0.08em", lineHeight: 1, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, minHeight: 32 }}>
      {display.split("").map((c, i) => {
        let color = "#e8e8e8";
        if ("!@#$%^&*-_=+".includes(c))    color = "#C8FF00";
        else if ("0123456789".includes(c))  color = "#777";
        else if (c === c.toUpperCase() && /[A-Z]/.test(c)) color = "#fff";
        return <span key={i} style={{ color }}>{c}</span>;
      })}
      <span style={{ display: "inline-block", width: 2, height: "1.1em", background: "#C8FF00", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
    </div>
  );
}

// ─── BACKGROUND PASSWORD STREAM ──────────────────────────────
const STREAM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function PasswordStream({ left, delay, duration, opacity }) {
  const len   = 18 + Math.floor(Math.random() * 10);
  const chars = Array.from({ length: len }, () => STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)]).join("");
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: `${left}%`, top: "100%", fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", opacity, letterSpacing: "0.05em", lineHeight: 2.2, writingMode: "vertical-rl", animation: `passwordStream ${duration}s ${delay}s linear infinite`, pointerEvents: "none", userSelect: "none" }}
    >
      {chars}
    </div>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────
export default function HeroSection() {
  const streams = [
    { left: 5,  delay: 0,   duration: 14, opacity: 0.04 },
    { left: 15, delay: 3,   duration: 18, opacity: 0.03 },
    { left: 28, delay: 1,   duration: 12, opacity: 0.05 },
    { left: 42, delay: 5,   duration: 16, opacity: 0.03 },
    { left: 58, delay: 2,   duration: 20, opacity: 0.04 },
    { left: 70, delay: 7,   duration: 13, opacity: 0.03 },
    { left: 83, delay: 4,   duration: 17, opacity: 0.05 },
    { left: 93, delay: 1.5, duration: 15, opacity: 0.03 },
  ];

  return (
    <section
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "100px var(--page-pad) 80px" }}
      aria-labelledby="hero-headline"
    >
      {/* Grid background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#C8FF0008 1px,transparent 1px),linear-gradient(90deg,#C8FF0008 1px,transparent 1px)", backgroundSize: "80px 80px", animation: "gridPulse 6s ease infinite", pointerEvents: "none" }} />

      {/* Glow orb */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900, background: "radial-gradient(circle,#C8FF0009 0%,transparent 65%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* Expanding rings */}
      {[0, 1.8, 3.6].map((delay, i) => (
        <div key={i} aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: "min(600px,80vw)", height: "min(600px,80vw)", border: "1px solid #C8FF0018", borderRadius: "50%", animation: `ringExpand 5.4s ${delay}s ease-out infinite`, pointerEvents: "none" }} />
      ))}

      {/* Password stream columns */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {streams.map((s, i) => <PasswordStream key={i} {...s} />)}
      </div>

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 860 }}>

        {/* Badge */}
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#0c0c0e", border: "1px solid #1a1a1a", borderRadius: 100, padding: "8px 20px", marginBottom: 40 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#C8FF00", boxShadow: "0 0 12px #C8FF00", animation: "blink 2s ease infinite" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {HERO.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 id="hero-headline" className="fade-up-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(44px,7.5vw,96px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#fff", marginBottom: 0, whiteSpace: "pre-line" }}>
          {HERO.headline.split("\n")[0]}{"\n"}
          <span style={{ color: "transparent", WebkitTextStroke: "1px #C8FF0066" }}>
            {HERO.headline.split("\n")[1]}
          </span>{"\n"}
          <span style={{ color: "#C8FF00" }}>
            {HERO.headline.split("\n")[2]}
          </span>
        </h1>

        {/* Animated password display */}
        <div className="fade-up-3" style={{ margin: "48px auto", background: "#08080a", border: "1px solid #1a1a1a", borderRadius: 12, padding: "20px 32px", display: "inline-flex", alignItems: "center", gap: 20, maxWidth: "100%" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            generating →
          </span>
          <AnimatedPassword />
        </div>

        {/* Subheadline */}
        <p className="fade-up-3" style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "#aaa", lineHeight: 1.85, maxWidth: 560, margin: "0 auto 48px" }}>
          {HERO.subheadline}
        </p>

        {/* CTA buttons */}
        <div className="fade-up-4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <a href={HERO.primaryHref}   className="btn-primary" style={{ fontSize: 16, padding: "18px 36px" }}>{HERO.primaryCTA} ↓</a>
          <a href={HERO.secondaryHref} className="btn-ghost"   style={{ fontSize: 15 }}>{HERO.secondaryCTA}</a>
        </div>

        {/* Trust points */}
        <div className="fade-up-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px,3vw,36px)", flexWrap: "wrap" }}>
          {HERO.trustPoints.map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{ color: "#C8FF0055", fontSize: 14 }}>{icon}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
