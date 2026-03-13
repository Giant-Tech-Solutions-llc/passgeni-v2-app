// =============================================================
// PASSGENI — COMPLIANCE PRESETS
// =============================================================
// Each preset defines the password requirements for a specific
// security framework. Add new frameworks below.
// =============================================================

export const COMPLIANCE_PRESETS = {
  // ─── Custom (no preset applied) ──────────────────────────
  none: {
    label:   "Custom",
    minLen:  8,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#888",
    desc:    "Your settings",
    badge:   null,
  },

  // ─── HIPAA ───────────────────────────────────────────────
  // HHS requires minimum 8 chars but 12+ is recommended best practice
  hipaa: {
    label:   "HIPAA",
    minLen:  12,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#4fc3f7",
    desc:    "Min 12 chars · All character classes · HHS recommended",
    badge:   "Healthcare",
  },

  // ─── PCI-DSS ─────────────────────────────────────────────
  // PCI-DSS v4.0 requires minimum 12 characters
  pci: {
    label:   "PCI-DSS",
    minLen:  12,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#ffb74d",
    desc:    "Min 12 chars · PCI-DSS v4.0 compliant",
    badge:   "Payment",
  },

  // ─── SOC 2 ───────────────────────────────────────────────
  // SOC 2 Trust Criteria requires strong passwords — 16+ recommended
  soc2: {
    label:   "SOC 2",
    minLen:  16,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#ce93d8",
    desc:    "Min 16 chars · Mixed case + symbols · SOC 2 CC6.1",
    badge:   "SaaS",
  },

  // ─── ISO 27001 ───────────────────────────────────────────
  // ISO 27001:2022 Annex A.9 requires full complexity
  iso: {
    label:   "ISO 27001",
    minLen:  14,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#80cbc4",
    desc:    "Min 14 chars · Full complexity · ISO 27001:2022",
    badge:   "Enterprise",
  },

  // ─── NIST SP 800-63B ─────────────────────────────────────
  // NIST recommends length over complexity — 15+ chars
  nist: {
    label:   "NIST 800-63B",
    minLen:  15,
    maxLen:  32,
    upper:   false,
    num:     true,
    sym:     false,
    color:   "#a5d6a7",
    desc:    "Min 15 chars · Length over complexity · Federal standard",
    badge:   "Federal",
  },

  // ─── DoD / Government ────────────────────────────────────
  // DoD 8500.01 requires 15+ chars for privileged accounts
  dod: {
    label:   "DoD / Gov",
    minLen:  15,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#ef9a9a",
    desc:    "Min 15 chars · DoD 8500.01 · CMMC aligned",
    badge:   "Government",
  },

  // ─── Post-Quantum ─────────────────────────────────────────
  // NIST 2024 post-quantum recommendations — maximum length + entropy
  quantum: {
    label:   "Post-Quantum",
    minLen:  20,
    maxLen:  32,
    upper:   true,
    num:     true,
    sym:     true,
    color:   "#C8FF00",
    desc:    "Min 20 chars · NIST 2024 PQC aligned · Grover-resistant",
    badge:   "Quantum",
  },
};
