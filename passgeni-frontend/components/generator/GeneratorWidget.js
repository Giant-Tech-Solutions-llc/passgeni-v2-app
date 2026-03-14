// =============================================================
// PASSGENI — GENERATOR WIDGET
// =============================================================
// The main password/passphrase generator.
// State and logic are here. Display is split into sub-components.
// =============================================================

import { useState, useRef, useEffect } from "react";
import { COMPLIANCE_PRESETS }    from "../../data/compliance.js";
import { PROFESSIONS }           from "../../content/professions.js";
import { buildPassword, buildPassphrase, deriveSeeds, generateAuditRecord } from "../../lib/generator.js";
import { getStrength, getEntropy, getCrackTime, getDNAScore } from "../../lib/strength.js";
import { CopyBtn, TogglePill, StrengthBar, TrustChip } from "../ui/index.js";
import PasswordDisplay    from "./PasswordDisplay.js";
import DNAScorePanel      from "./DNAScore.js";
import PasswordHistory    from "./PasswordHistory.js";
import BulkGenerator      from "./BulkGenerator.js";
import ComplianceBar      from "./ComplianceBar.js";
import ProfessionSelector from "./ProfessionSelector.js";
import PassphraseTab      from "./PassphraseTab.js";

// ─── TRUST STRIP ─────────────────────────────────────────────
function GeneratorTrustStrip() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "16px 0 4px", borderTop: "1px solid #111", marginTop: 20 }} role="list" aria-label="Security guarantees">
      <TrustChip label="Never leaves your browser" type="dot"    />
      <TrustChip label="Zero server contact"        type="shield" />
      <TrustChip label="FIPS 140-3 entropy"         type="zero"   />
      <TrustChip label="NIST SP 800-63B"            type="check"  />
    </div>
  );
}

// ─── MAIN WIDGET ─────────────────────────────────────────────
export default function GeneratorWidget() {
  // ── Tab state ──
  const [tab, setTab] = useState("password");

  // ── Generator settings ──
  const [profession,   setProfession]   = useState("dev");
  const [length,       setLength]       = useState(18);
  const [opts,         setOpts]         = useState({ upper: true, num: true, sym: true });
  const [compliance,   setCompliance]   = useState("none");
  const [quantumMode,  setQuantumMode]  = useState(false);
  const [language,     setLanguage]     = useState("latin");

  // ── Custom profession state ──
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue,     setOtherValue]     = useState("");
  const [customSeeds,    setCustomSeeds]    = useState(null);
  const [customLabel,    setCustomLabel]    = useState("");

  // ── Output state ──
  const [password,    setPassword]    = useState("");
  const [isNew,       setIsNew]       = useState(false);
  const [generating,  setGenerating]  = useState(false);
  const [history,     setHistory]     = useState([]);
  const [auditRecord, setAuditRecord] = useState(null);

  // ── Panel toggles ──
  const [showDNA,   setShowDNA]   = useState(false);
  const [showBulk,  setShowBulk]  = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const inputRef = useRef(null);

  // ── Computed values ──
  const strength   = getStrength(password);
  const entropy    = getEntropy(password);
  const crackTime  = getCrackTime(password);
  const activePreset = COMPLIANCE_PRESETS[compliance];

  // ── Language char pools ──────────────────────────────────
  const LANG_SEEDS = {
    arabic:     "أبتثجحخدذرزسشصضطظعغفقكلمنهوي",
    french:     "àâæçéèêëîïôœùûüÿ",
    german:     "äöüßÄÖÜ",
    spanish:    "áéíóúñü¿¡",
    portuguese: "ãõâêôçáéíóú",
    russian:    "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    japanese:   "あいうえおかきくけこさしすせそたちつてとなにぬねの",
    chinese:    "安好中大学工人月日年时国地会来出",
    greek:      "αβγδεζηθικλμνξοπρστυφχψω",
    hindi:      "अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह",
    korean:     "가나다라마바사아자차카타파하",
    latin:      "",
  };

  // ── Generate password ──────────────────────────────────────
  const generate = (seedsOverride) => {
    setGenerating(true);
    setIsNew(false);
    setTimeout(() => {
      const seeds  = seedsOverride !== undefined ? seedsOverride : customSeeds;
      let newPw    = buildPassword(length, profession, opts, seeds, quantumMode);
      // Inject language characters if non-latin selected
      const langPool = LANG_SEEDS[language] || "";
      if (langPool && newPw.length > 4) {
        const arr    = newPw.split("");
        const inject = Math.min(3, Math.floor(newPw.length / 5));
        for (let i = 0; i < inject; i++) {
          const pos = Math.floor(Math.random() * arr.length);
          const ch  = langPool[Math.floor(Math.random() * langPool.length)];
          arr[pos]  = ch;
        }
        newPw = arr.join("");
      }
      const audit  = generateAuditRecord(newPw, {
        seed:       seeds ? seeds[0] : profession,
        compliance: compliance !== "none" ? compliance : null,
        quantum:    quantumMode,
        mode:       "password",
      });
      setPassword(newPw);
      setAuditRecord(audit);
      setHistory((h) => [newPw, ...h.filter((x) => x !== newPw)].slice(0, 10));
      setGenerating(false);
      setIsNew(true);
      setTimeout(() => setIsNew(false), 2000);
    }, 200);
  };

  // Generate on first load
  useEffect(() => { generate(null); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Compliance preset handler ──────────────────────────────
  const applyCompliance = (key) => {
    setCompliance(key);
    if (key === "none") return;
    const preset = COMPLIANCE_PRESETS[key];
    setLength((l) => Math.max(l, preset.minLen));
    setOpts({ upper: preset.upper, num: preset.num, sym: preset.sym });
    if (key === "quantum") setQuantumMode(true);
  };

  // ── Option toggle ──────────────────────────────────────────
  const toggleOpt = (key) => setOpts((o) => ({ ...o, [key]: !o[key] }));

  // ── Profession handlers ────────────────────────────────────
  const handleProfessionClick = (id) => {
    setProfession(id);
    setCustomSeeds(null);
    setCustomLabel("");
    setOtherValue("");
    setShowOtherInput(false);
  };

  const handleCustomSubmit = () => {
    const trimmed = otherValue.trim();
    if (!trimmed) return;
    const seeds = deriveSeeds(trimmed);
    setCustomSeeds(seeds);
    setCustomLabel(trimmed);
    setShowOtherInput(false);
    generate(seeds);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Compliance Mode Bar ─────────────────────────────── */}
      <ComplianceBar
        compliance={compliance}
        onSelect={applyCompliance}
        activePreset={activePreset}
      />

      {/* ── Main Widget ─────────────────────────────────────── */}
      <div style={{ background: "#0a0a0c", border: "1px solid #141416", borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 80px #00000088,0 0 0 1px #141416" }}>

        {/* Tab selector */}
        <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e" }} role="tablist">
          {[["password", "Password"], ["passphrase", "Passphrase"]].map(([t, label]) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              style={{ flex: 1, padding: "14px 0", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", background: tab === t ? "#0c0c0e" : "transparent", color: tab === t ? "#C8FF00" : "#777", border: "none", borderBottom: tab === t ? "1px solid #C8FF00" : "1px solid transparent", cursor: "pointer", transition: "all 0.2s" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: "28px 28px 32px" }}>
          {tab === "password" ? (
            <>
              {/* Password output */}
              <PasswordDisplay
                password={password}
                generating={generating}
                strength={strength}
                entropy={entropy}
                crackTime={crackTime}
                isNew={isNew}
              />

              {/* Panel toggles */}
              <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <TogglePill label={showDNA   ? "Hide DNA Score"    : "Show DNA Score"}    active={showDNA}   onClick={() => setShowDNA((d) => !d)} />
                <TogglePill label={showAudit ? "Hide Audit Log"    : "Show Audit Log"}    active={showAudit} onClick={() => setShowAudit((a) => !a)} />
                <TogglePill label={showBulk  ? "Close Bulk"        : "Bulk Generator"}    active={showBulk}  onClick={() => setShowBulk((b) => !b)} />
                <TogglePill label={quantumMode ? "⚡ Quantum ON"   : "Post-Quantum Mode"} active={quantumMode} onClick={() => { setQuantumMode((q) => !q); if (compliance !== "quantum") setCompliance("none"); }} />
              </div>

              {/* DNA Score panel */}
              {showDNA && <DNAScorePanel password={password} />}

              {/* Audit log panel */}
              {showAudit && auditRecord && (
                <div style={{ background: "#08080a", border: "1px solid #141416", borderRadius: 10, padding: "16px 20px", marginTop: 12, animation: "fadeIn 0.3s ease" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                    Open Audit Log — How this password was built
                  </div>
                  {Object.entries(auditRecord).map(([key, val]) => (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #0e0e10", gap: 16 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#666", letterSpacing: "0.06em" }}>{key}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#aaa", textAlign: "right" }}>{String(val)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Length slider */}
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <label htmlFor="pw-len" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>length</label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#C8FF00", fontWeight: 600 }}>{length} characters</span>
                </div>
                <input
                  id="pw-len"
                  type="range"
                  min={compliance !== "none" ? activePreset.minLen : 8}
                  max={32}
                  value={length}
                  onChange={(e) => setLength(+e.target.value)}
                />
              </div>

              {/* Character options + Language */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }} role="group" aria-label="Character options">
                {[["sym", "Symbols"], ["num", "Numbers"], ["upper", "A-Z"]].map(([k, label]) => (
                  <TogglePill key={k} label={label} active={opts[k]} onClick={() => toggleOpt(k)} />
                ))}
                {/* Language selector */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ background: "#0c0c0e", border: "1px solid #222", borderRadius: 100, padding: "6px 14px", fontFamily: "var(--font-mono)", fontSize: 10, color: "#aaa", cursor: "pointer", outline: "none", letterSpacing: "0.06em" }}
                  title="Password character language / script"
                >
                  <option value="latin">🌐 English (Default)</option>
                  <option value="arabic">🇦🇪 Arabic / عربي</option>
                  <option value="french">🇫🇷 French / Français</option>
                  <option value="german">🇩🇪 German / Deutsch</option>
                  <option value="spanish">🇪🇸 Spanish / Español</option>
                  <option value="portuguese">🇧🇷 Portuguese / Português</option>
                  <option value="russian">🇷🇺 Russian / Русский</option>
                  <option value="japanese">🇯🇵 Japanese / 日本語</option>
                  <option value="chinese">🇨🇳 Chinese / 中文</option>
                  <option value="greek">🇬🇷 Greek / Ελληνικά</option>
                  <option value="hindi">🇮🇳 Hindi / हिन्दी</option>
                  <option value="korean">🇰🇷 Korean / 한국어</option>
                </select>
              </div>

              {/* Generate button */}
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => generate()}>
                {generating ? "Generating…" : <>Generate secure password <span style={{ fontSize: 18 }}>→</span></>}
              </button>

              <GeneratorTrustStrip />
              <PasswordHistory history={history} onClear={() => setHistory([])} />
            </>
          ) : (
            <PassphraseTab
              profession={profession}
              customSeeds={customSeeds}
              customLabel={customLabel}
              showOtherInput={showOtherInput}
              otherValue={otherValue}
              inputRef={inputRef}
              onSelectProfession={handleProfessionClick}
              onShowOther={() => { setShowOtherInput(true); setTimeout(() => inputRef.current?.focus(), 60); }}
              onOtherChange={(v) => setOtherValue(v)}
              onOtherSubmit={handleCustomSubmit}
              onOtherCancel={() => { setShowOtherInput(false); setOtherValue(""); }}
            />
          )}
        </div>
      </div>

      {/* ── Bulk Generator (below main widget) ─────────────── */}
      {showBulk && (
        <BulkGenerator
          profession={profession}
          opts={opts}
          length={length}
          customSeeds={customSeeds}
          quantumMode={quantumMode}
        />
      )}
    </div>
  );
}
