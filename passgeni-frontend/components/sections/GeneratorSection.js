// =============================================================
// PASSGENI — GENERATOR SECTION (homepage wrapper)
// =============================================================

import { GENERATOR } from "../../content/copy.js";
import { Eyebrow } from "../ui/index.js";
import GeneratorWidget from "../generator/GeneratorWidget.js";

export default function GeneratorSection() {
  return (
    <section
      id="generator"
      style={{ padding: "var(--section-pad) var(--page-pad)", maxWidth: 760, margin: "0 auto" }}
      aria-labelledby="gen-h2"
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Eyebrow>{GENERATOR.eyebrow}</Eyebrow>
        <h2
          id="gen-h2"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "#fff", letterSpacing: "-0.02em" }}
        >
          {GENERATOR.headline}
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#888", marginTop: 12 }}>
          {GENERATOR.subheadline}
        </p>
      </div>

      {/* The actual generator widget */}
      <GeneratorWidget />
    </section>
  );
}
