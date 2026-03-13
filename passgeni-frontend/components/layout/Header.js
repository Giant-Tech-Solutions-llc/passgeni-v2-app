// =============================================================
// PASSGENI — HEADER / NAVIGATION
// =============================================================

import { NAV } from "../../content/copy.js";
import { TrustChip } from "../ui/index.js";
import PassGeniLogo from "./Logo.js";

export default function Header() {
  return (
    <header>
      <nav
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         999,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 var(--page-pad)",
          height:         64,
          background:     "rgba(6,6,8,0.92)",
          backdropFilter: "blur(24px) saturate(1.5)",
          borderBottom:   "1px solid #1e1e1e",
        }}
        aria-label="Main navigation"
      >
        {/* ── Left: Logo + Trust chips ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <PassGeniLogo height="32px" />
          </a>
          <div className="nav-trust-row" style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <TrustChip label="Zero storage"   type="dot"    />
            <TrustChip label="NIST compliant" type="check"  />
            <TrustChip label="Client-side"    type="shield" />
          </div>
        </div>

        {/* ── Right: Nav links + CTA ── */}
        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV.links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href={NAV.ctaHref} className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>
            {NAV.ctaButton}
          </a>
        </div>
      </nav>
    </header>
  );
}
