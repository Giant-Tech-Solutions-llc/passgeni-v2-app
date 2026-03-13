// =============================================================
// PASSGENI — FOOTER
// =============================================================

import { FOOTER } from "../../content/copy.js";
import { TrustChip } from "../ui/index.js";
import PassGeniLogo from "./Logo.js";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1e1e1e", padding: "40px var(--page-pad)", maxWidth: 1200, margin: "0 auto" }}>
      {/* ── Top row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 28 }}>
        <div>
          <PassGeniLogo height="28px" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#666", maxWidth: 260, lineHeight: 1.75, marginTop: 12 }}>
            {FOOTER.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {FOOTER.trustChips.map((chip) => (
            <TrustChip key={chip.label} label={chip.label} type={chip.type} />
          ))}
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 24, borderTop: "1px solid #111" }}>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {FOOTER.links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link" style={{ fontSize: 12 }}>
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", letterSpacing: "0.08em" }}>
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
