// =============================================================
// PASSGENI — TICKER BAR
// =============================================================

import { TICKER_ITEMS } from "../../content/copy.js";

export default function Ticker() {
  // Double the items so the ticker loops seamlessly
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      style={{ borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e", padding: "14px 0", overflow: "hidden" }}
      aria-hidden="true"
    >
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      11,
              color:         i % 2 === 0 ? "#2a2a2a" : "#C8FF00",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding:       "0 32px",
              whiteSpace:    "nowrap",
            }}
          >
            {i % 2 === 0 ? item : "✦"}
          </span>
        ))}
      </div>
    </div>
  );
}
