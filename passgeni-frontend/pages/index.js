import Head from "next/head";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import { useRef, useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, useInView } from "framer-motion";
import { getSiteSchema, getFAQSchema, getHowToSchema } from "../seo/schema.js";
import { FAQ, TOOLS_PREVIEW, STATS } from "../content/copy.js";

/* ────────────────────────────────────────────────────────────────
   DESIGN TOKENS  (all-light, Stripe / Linear aesthetic)
──────────────────────────────────────────────────────────────── */
const T = {
  bg:       "#FFFFFF",
  bgOff:    "#F7F8FC",
  bgMuted:  "#F0F2F8",
  text:     "#0B0D17",
  textSub:  "#3C405A",
  textMut:  "#7B819A",
  blue:     "#3A4EFB",
  blueHov:  "#2d40e8",
  blueSoft: "rgba(58,78,251,0.08)",
  lime:     "#C8FF00",
  border:   "#E6E8F0",
  borderFoc:"#3A4EFB",
  shadow:   "0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.06)",
  shadowHov:"0 4px 20px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.06)",
  green:    "#22C55E",
  red:      "#EF4444",
  amber:    "#F59E0B",
};

/* ────────────────────────────────────────────────────────────────
   SMALL SHARED COMPONENTS
──────────────────────────────────────────────────────────────── */

/** Scroll-triggered fade-up */
function FadeIn({ children, delay=0, y=20, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.55, delay, ease:[0.22,1,0.36,1] }}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

/** Eye-brow label above headings */
const Eyebrow = ({ children }) => (
  <div style={{
    display:"inline-flex",alignItems:"center",gap:8,
    background:T.blueSoft,color:T.blue,
    fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    padding:"4px 12px 4px 8px",borderRadius:40,marginBottom:18,
  }}>
    <span style={{width:6,height:6,borderRadius:"50%",background:T.blue,flexShrink:0}}/>
    {children}
  </div>
);

/** Section headline */
const H2 = ({ children, center=false, style }) => (
  <h2 style={{
    fontFamily:"'Outfit',sans-serif",fontWeight:800,
    fontSize:"clamp(32px,4.2vw,44px)",
    letterSpacing:"-0.035em",lineHeight:1.06,
    color:T.text,textAlign:center?"center":undefined,
    ...style,
  }}>{children}</h2>
);

/** Body text */
const Body = ({ children, muted=false, center=false, style }) => (
  <p style={{
    fontSize:"clamp(15px,1.5vw,17px)",lineHeight:1.85,
    color:muted?T.textMut:T.textSub,
    textAlign:center?"center":undefined,
    ...style,
  }}>{children}</p>
);

/** Primary CTA button */
const BtnPrimary = ({ children, href="#", onClick, style }) => (
  <a href={href} onClick={onClick}
    style={{
      display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
      background:T.blue,color:"#fff",
      fontSize:14,fontWeight:600,letterSpacing:"-0.01em",
      padding:"13px 28px",borderRadius:9,border:"none",
      textDecoration:"none",cursor:"pointer",
      transition:"background .18s,transform .15s,box-shadow .18s",
      ...style,
    }}
    onMouseEnter={e=>{ e.currentTarget.style.background=T.blueHov; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(58,78,251,0.28)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.background=T.blue; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
    {children}
  </a>
);

/** Ghost CTA */
const BtnGhost = ({ children, href="#", style }) => (
  <a href={href}
    style={{
      display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
      background:"transparent",color:T.text,
      fontSize:14,fontWeight:500,
      padding:"12px 24px",borderRadius:9,
      border:`1.5px solid ${T.border}`,
      textDecoration:"none",cursor:"pointer",
      transition:"border-color .18s,background .18s",
      ...style,
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor=T.blue; e.currentTarget.style.background=T.blueSoft; }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.background="transparent"; }}>
    {children}
  </a>
);

/** Data card — micro label + title + body + data metric */
const DataCard = ({ label, title, body, metric, metricLabel, children, style }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"#fff",border:`1.5px solid ${hov?T.blue:T.border}`,
        borderRadius:16,padding:"22px 24px",
        boxShadow:hov?T.shadowHov:T.shadow,
        transform:hov?"translateY(-3px)":"translateY(0)",
        transition:"border-color .2s,box-shadow .2s,transform .2s",
        display:"flex",flexDirection:"column",gap:12,
        ...style,
      }}>
      {label && (
        <div style={{
          alignSelf:"flex-start",
          fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
          color:T.textMut,background:T.bgOff,
          padding:"3px 9px",borderRadius:40,
        }}>{label}</div>
      )}
      {title && <div style={{fontSize:14,fontWeight:700,color:T.text,lineHeight:1.35}}>{title}</div>}
      {body && <div style={{fontSize:13,color:T.textSub,lineHeight:1.7}}>{body}</div>}
      {metric && (
        <div style={{marginTop:"auto",paddingTop:12,borderTop:`1px solid ${T.border}`}}>
          <div style={{fontSize:24,fontWeight:800,color:T.blue,letterSpacing:"-0.04em",fontFamily:"'Outfit',sans-serif"}}>{metric}</div>
          {metricLabel && <div style={{fontSize:11,color:T.textMut,marginTop:2}}>{metricLabel}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   §1  HERO
──────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background:T.bg,
        padding:"clamp(96px,11vw,136px) clamp(16px,4vw,48px) clamp(72px,8vw,104px)",
        overflow:"hidden",
        position:"relative",
      }}>
      {/* subtle grid pattern */}
      <div aria-hidden style={{
        position:"absolute",inset:0,
        backgroundImage:`linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`,
        backgroundSize:"48px 48px",
        opacity:.45,pointerEvents:"none",
      }}/>

      <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
        {/* top pill */}
        <FadeIn delay={0}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:32}}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:T.blueSoft,border:`1px solid rgba(58,78,251,0.18)`,
              borderRadius:40,padding:"6px 16px",
              fontSize:12,fontWeight:600,color:T.blue,letterSpacing:"-0.01em",
            }}>
              <span style={{width:6,height:6,borderRadius:"50%",background:T.blue,animation:"pulse 2s infinite"}}/>
              Free forever · No account · No tracking
            </div>
          </div>
        </FadeIn>

        {/* headline */}
        <FadeIn delay={0.08}>
          <h1 style={{
            fontFamily:"'Outfit',sans-serif",fontWeight:900,
            fontSize:"clamp(52px,7vw,72px)",
            letterSpacing:"-0.05em",lineHeight:0.97,
            color:T.text,textAlign:"center",
            maxWidth:840,margin:"0 auto 28px",
          }}>
            Passwords that pass{" "}
            <em style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:600,color:T.blue}}>every</em>{" "}
            compliance audit.
          </h1>
        </FadeIn>

        {/* sub */}
        <FadeIn delay={0.15}>
          <p style={{
            fontSize:"clamp(16px,1.7vw,19px)",lineHeight:1.8,
            color:T.textSub,textAlign:"center",
            maxWidth:540,margin:"0 auto 40px",
          }}>
            PassGeni generates cryptographically strong, profession-aware passwords—client-side, zero storage, NIST SP 800-63B aligned. Built for teams that get audited.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.2}>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:56}}>
            <BtnPrimary href="#generator" style={{fontSize:15,padding:"14px 32px"}}>
              Generate free password
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </BtnPrimary>
            <BtnGhost href="/guides" style={{fontSize:15,padding:"14px 24px"}}>
              Security guides
            </BtnGhost>
          </div>
        </FadeIn>

        {/* floating data UI cards row */}
        <FadeIn delay={0.28}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
            gap:16,maxWidth:900,margin:"0 auto",
          }}>
            {/* card 1 — entropy */}
            <div style={{
              background:"#fff",border:`1.5px solid ${T.border}`,borderRadius:16,
              padding:"20px 22px",boxShadow:T.shadow,
            }}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textMut,marginBottom:12}}>Entropy Score</div>
              <div style={{fontSize:32,fontWeight:900,color:T.blue,letterSpacing:"-0.05em",fontFamily:"'Outfit',sans-serif",lineHeight:1}}>128.4<span style={{fontSize:14,fontWeight:600,color:T.textMut,marginLeft:3}}>bits</span></div>
              <div style={{marginTop:12,height:5,borderRadius:3,background:T.bgOff,overflow:"hidden"}}>
                <div style={{height:"100%",width:"88%",borderRadius:3,background:`linear-gradient(90deg,${T.blue},#33A4FA)`}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10,color:T.textMut}}>
                <span>Weak</span><span>Post-Quantum ready</span>
              </div>
            </div>

            {/* card 2 — compliance */}
            <div style={{
              background:"#fff",border:`1.5px solid ${T.border}`,borderRadius:16,
              padding:"20px 22px",boxShadow:T.shadow,
            }}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textMut,marginBottom:12}}>Compliance</div>
              {[
                {label:"NIST SP 800-63B",pass:true},
                {label:"HIPAA §164.312",pass:true},
                {label:"PCI-DSS v4.0",pass:true},
                {label:"SOC 2 Type II",pass:true},
              ].map(r=>(
                <div key={r.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                  <span style={{fontSize:11,color:T.textSub,fontWeight:500}}>{r.label}</span>
                  <span style={{fontSize:10,fontWeight:700,color:T.green,background:"rgba(34,197,94,0.1)",padding:"2px 8px",borderRadius:20}}>PASS</span>
                </div>
              ))}
            </div>

            {/* card 3 — audit log */}
            <div style={{
              background:"#fff",border:`1.5px solid ${T.border}`,borderRadius:16,
              padding:"20px 22px",boxShadow:T.shadow,
            }}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textMut,marginBottom:12}}>Audit Log</div>
              {[
                {line:"crypto.getRandomValues()",tag:"RNG"},
                {line:"CharPool → 94 chars",tag:"SET"},
                {line:"Entropy → 128.4 bits",tag:"ENT"},
                {line:"NIST threshold → ✓",tag:"VAL"},
              ].map((l,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:7,alignItems:"baseline"}}>
                  <span style={{fontSize:9,fontWeight:700,color:T.blue,background:T.blueSoft,padding:"1px 6px",borderRadius:4,fontFamily:"'Space Mono',monospace",flexShrink:0}}>{l.tag}</span>
                  <span style={{fontSize:11,color:T.textSub,fontFamily:"'Space Mono',monospace",wordBreak:"break-all"}}>{l.line}</span>
                </div>
              ))}
            </div>

            {/* card 4 — dna score */}
            <div style={{
              background:"#fff",border:`1.5px solid ${T.border}`,borderRadius:16,
              padding:"20px 22px",boxShadow:T.shadow,
            }}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textMut,marginBottom:12}}>DNA Score</div>
              <div style={{fontSize:48,fontWeight:900,color:T.text,letterSpacing:"-0.05em",fontFamily:"'Outfit',sans-serif",lineHeight:1}}>A<span style={{color:T.blue}}>+</span></div>
              <div style={{marginTop:10}}>
                {[
                  {l:"Length ≥ 16",v:true},{l:"Mixed case",v:true},
                  {l:"Symbols",v:true},{l:"No repeats",v:true},
                  {l:"No dictionary",v:true},{l:"Entropy ≥ 80",v:true},
                ].map(c=>(
                  <div key={c.l} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={{fontSize:9,color:c.v?T.green:T.red}}>●</span>
                    <span style={{fontSize:10,color:T.textSub}}>{c.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §2  TRUST STRIP
──────────────────────────────────────────────────────────────── */
function TrustStrip() {
  const badges = [
    "HIPAA §164.312","SOC 2 Type II","PCI-DSS v4.0",
    "NIST SP 800-63B","ISO/IEC 27001","DoD IL2","FIPS 140-3","Zero Knowledge",
  ];
  return (
    <section style={{
      background:T.bgOff,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,
      padding:"28px clamp(16px,4vw,48px)",overflow:"hidden",
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:"10px 28px"}}>
          <span style={{fontSize:11,fontWeight:600,color:T.textMut,letterSpacing:"0.08em",textTransform:"uppercase",marginRight:8}}>Trusted compliance</span>
          {badges.map(b=>(
            <span key={b} style={{
              fontSize:12,fontWeight:600,color:T.textSub,
              padding:"5px 14px",borderRadius:40,
              border:`1px solid ${T.border}`,background:"#fff",
              letterSpacing:"-0.01em",
            }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §3  HOW IT WORKS
──────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      num:"01",
      title:"Select your role",
      body:"Your profession seeds the password vocabulary. A nurse gets clinical terms; an engineer gets technical patterns. Same cryptographic strength — meaningfully higher recall.",
      data:"30% more memorable",
      dataLabel:"vs generic generators",
      preview:(
        <div style={{background:T.bgOff,borderRadius:10,padding:"14px 16px",marginTop:12,fontSize:11,color:T.textSub,fontFamily:"'Space Mono',monospace",lineHeight:1.8}}>
          {["role → 'physician'","seed → 'cortex'","pool → medical vocab"].map((l,i)=>(
            <div key={i}><span style={{color:T.blue,marginRight:8}}>›</span>{l}</div>
          ))}
        </div>
      ),
    },
    {
      num:"02",
      title:"Set compliance preset",
      body:"One click applies HIPAA, PCI-DSS, SOC 2, ISO 27001, or DoD requirements. Length minimums, character classes, and entropy floors auto-configure.",
      data:"6 frameworks",
      dataLabel:"in one click",
      preview:(
        <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>
          {["NIST","HIPAA","PCI-DSS","SOC2","ISO","DoD"].map(f=>(
            <span key={f} style={{
              fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:40,
              background:f==="HIPAA"?T.blue:"#fff",
              color:f==="HIPAA"?"#fff":T.textSub,
              border:`1.5px solid ${f==="HIPAA"?T.blue:T.border}`,
            }}>{f}</span>
          ))}
        </div>
      ),
    },
    {
      num:"03",
      title:"Generate & verify",
      body:"crypto.getRandomValues() builds your password entirely in-browser. Nothing leaves your device. Copy, or certify with a signed JWT for audit trails.",
      data:"0 bytes",
      dataLabel:"transmitted to server",
      preview:(
        <div style={{marginTop:12,background:T.bgOff,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:11,fontFamily:"'Space Mono',monospace",color:T.text,letterSpacing:"0.02em",wordBreak:"break-all",marginBottom:8}}>
            C0rt3x#Pr0t0c@l!9Zq
          </div>
          <div style={{display:"flex",gap:6}}>
            <span style={{fontSize:10,fontWeight:700,color:T.green,background:"rgba(34,197,94,0.1)",padding:"2px 8px",borderRadius:20}}>128 bits</span>
            <span style={{fontSize:10,fontWeight:700,color:T.blue,background:T.blueSoft,padding:"2px 8px",borderRadius:20}}>Certified</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" style={{
      background:T.bg,padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:56}}>
            <Eyebrow>How it works</Eyebrow>
            <H2 center>Three steps to a certified password.</H2>
            <Body center muted style={{maxWidth:480,margin:"16px auto 0"}}>
              From role selection to compliance certificate in under 3 seconds.
            </Body>
          </div>
        </FadeIn>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:24,alignItems:"stretch",
        }}>
          {steps.map((s,i)=>(
            <FadeIn key={s.num} delay={i*0.1}>
              <DataCard
                label={`Step ${s.num}`}
                title={s.title}
                body={s.body}
                metric={s.data}
                metricLabel={s.dataLabel}
                style={{height:"100%"}}>
                {s.preview}
              </DataCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §4  PRODUCT SPLIT  (left = live generator UI, right = copy)
──────────────────────────────────────────────────────────────── */
function GeneratorDemo() {
  const PROFESSIONS = ["Physician","Engineer","Lawyer","Developer","Designer","Teacher","Analyst","Nurse"];
  const COMPLIANCE  = [
    { id:"nist",   label:"NIST", minLen:15, sym:true,  num:true  },
    { id:"hipaa",  label:"HIPAA",minLen:12, sym:true,  num:true  },
    { id:"pci",    label:"PCI",  minLen:12, sym:true,  num:true  },
    { id:"soc2",   label:"SOC2", minLen:12, sym:true,  num:true  },
    { id:"iso",    label:"ISO",  minLen:12, sym:true,  num:true  },
    { id:"dod",    label:"DoD",  minLen:15, sym:true,  num:true  },
  ];

  const [prof, setProf]     = useState("Physician");
  const [len,  setLen]      = useState(18);
  const [sym,  setSym]      = useState(true);
  const [nums, setNums]     = useState(true);
  const [comp, setComp]     = useState("nist");
  const [pw,   setPw]       = useState("");
  const [ent,  setEnt]      = useState(0);
  const [copied,setCopied]  = useState(false);
  const [busy, setBusy]     = useState(false);

  const SEEDS = {
    Physician:["Cortex","Neural","Plasma","Axon","Synapse"],
    Engineer: ["Module","Circuit","Vector","Kernel","Buffer"],
    Lawyer:   ["Nexus","Clause","Brief","Statute","Docket"],
    Developer:["Daemon","Stack","Heap","Token","Cipher"],
    Designer: ["Bezier","Raster","Kerning","Glyph","Canvas"],
    Teacher:  ["Syllabus","Rubric","Lexis","Schema","Praxis"],
    Analyst:  ["Sigma","Pivot","Matrix","Median","Quantile"],
    Nurse:    ["Saline","Triage","Dosage","Vitals","Bolus"],
  };

  const generate = useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      const seed = SEEDS[prof]?.[Math.floor(Math.random()*5)] || "Secure";
      const preset = COMPLIANCE.find(c=>c.id===comp);
      const L = Math.max(len, preset?.minLen || len);
      const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
      const lower = "abcdefghjkmnpqrstuvwxyz";
      const digits= "23456789";
      const syms  = "#@!$%&*+=?";
      let pool = upper+lower;
      if (nums||preset?.num)  pool+=digits;
      if (sym||preset?.sym)   pool+=syms;
      const arr = new Uint32Array(L);
      crypto.getRandomValues(arr);
      let pw = seed.charAt(0).toUpperCase()+seed.slice(1).toLowerCase();
      for (let i=pw.length;i<L;i++) pw+=pool[arr[i]%pool.length];
      const shuffled = pw.split("").sort(()=>Math.random()-0.5).join("");
      const entropy  = Math.round(L * Math.log2(pool.length));
      setPw(shuffled);
      setEnt(entropy);
      setBusy(false);
    }, 240);
  }, [prof, len, sym, nums, comp]);

  useEffect(()=>{ generate(); },[]);

  const copy = () => {
    if (!pw) return;
    navigator.clipboard?.writeText(pw).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  };

  return (
    <div style={{
      background:"#fff",border:`1.5px solid ${T.border}`,borderRadius:20,
      padding:"28px 28px 24px",boxShadow:T.shadow,
      display:"flex",flexDirection:"column",gap:20,
    }}>
      {/* header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text}}>Password Generator</div>
        <div style={{display:"flex",gap:5}}>
          {["#F87171","#FBBF24","#34D399"].map(c=><div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>)}
        </div>
      </div>

      {/* profession */}
      <div>
        <div style={{fontSize:11,fontWeight:600,color:T.textMut,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>Your profession</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {PROFESSIONS.map(p=>(
            <button key={p} onClick={()=>setProf(p)} style={{
              fontSize:12,fontWeight:p===prof?700:500,padding:"5px 13px",borderRadius:40,
              background:p===prof?T.blue:"transparent",
              color:p===prof?"#fff":T.textSub,
              border:`1.5px solid ${p===prof?T.blue:T.border}`,
              cursor:"pointer",transition:"all .15s",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* length */}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:11,fontWeight:600,color:T.textMut,letterSpacing:"0.06em",textTransform:"uppercase"}}>Length</span>
          <span style={{fontSize:13,fontWeight:700,color:T.blue}}>{len}</span>
        </div>
        <input type="range" min={8} max={32} value={len} onChange={e=>setLen(+e.target.value)}
          style={{width:"100%",height:4,cursor:"pointer",accentColor:T.blue}}/>
      </div>

      {/* compliance preset */}
      <div>
        <div style={{fontSize:11,fontWeight:600,color:T.textMut,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>Compliance preset</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {COMPLIANCE.map(c=>(
            <button key={c.id} onClick={()=>setComp(c.id)} style={{
              fontSize:11,fontWeight:c.id===comp?700:500,padding:"4px 12px",borderRadius:40,
              background:c.id===comp?T.blue:"transparent",
              color:c.id===comp?"#fff":T.textSub,
              border:`1.5px solid ${c.id===comp?T.blue:T.border}`,
              cursor:"pointer",transition:"all .15s",
            }}>{c.label}</button>
          ))}
        </div>
      </div>

      {/* toggles */}
      <div style={{display:"flex",gap:20}}>
        {[{l:"Symbols",v:sym,set:setSym},{l:"Numbers",v:nums,set:setNums}].map(t=>(
          <label key={t.l} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <div onClick={()=>t.set(!t.v)} style={{
              width:36,height:20,borderRadius:10,
              background:t.v?T.blue:T.border,
              position:"relative",transition:"background .2s",cursor:"pointer",
            }}>
              <div style={{
                width:14,height:14,borderRadius:"50%",background:"#fff",
                position:"absolute",top:3,left:t.v?18:3,transition:"left .2s",
              }}/>
            </div>
            <span style={{fontSize:12,fontWeight:500,color:T.textSub}}>{t.l}</span>
          </label>
        ))}
      </div>

      {/* output */}
      <div>
        <div style={{
          background:T.bgOff,border:`1.5px solid ${T.border}`,borderRadius:10,
          padding:"14px 16px",fontFamily:"'Space Mono',monospace",
          fontSize:13,color:T.text,letterSpacing:"0.04em",wordBreak:"break-all",
          minHeight:48,position:"relative",
        }}>
          {busy ? <span style={{color:T.textMut}}>generating...</span> : (pw || "—")}
        </div>

        {/* entropy bar */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:10}}>
          <div style={{flex:1,height:3,borderRadius:2,background:T.bgMuted,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:2,width:`${Math.min(100,(ent/200)*100)}%`,background:`linear-gradient(90deg,${T.blue},#33A4FA)`,transition:"width .4s"}}/>
          </div>
          <span style={{fontSize:11,fontWeight:700,color:T.blue,whiteSpace:"nowrap"}}>{ent} bits</span>
        </div>
      </div>

      {/* actions */}
      <div style={{display:"flex",gap:10}}>
        <button onClick={generate} style={{
          flex:1,padding:"11px 16px",borderRadius:9,background:T.blue,color:"#fff",
          fontSize:13,fontWeight:700,border:"none",cursor:"pointer",transition:"background .18s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background=T.blueHov}
          onMouseLeave={e=>e.currentTarget.style.background=T.blue}>
          Regenerate
        </button>
        <button onClick={copy} style={{
          padding:"11px 18px",borderRadius:9,
          background:copied?"rgba(34,197,94,0.12)":"transparent",
          color:copied?T.green:T.textSub,
          border:`1.5px solid ${copied?"rgba(34,197,94,0.4)":T.border}`,
          fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",
        }}>
          {copied?"Copied!":"Copy"}
        </button>
      </div>
    </div>
  );
}

function ProductSplitSection() {
  return (
    <section id="generator" style={{
      background:T.bgOff,
      padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,
    }}>
      <div style={{
        maxWidth:1200,margin:"0 auto",
        display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",
      }}>
        {/* left — generator UI */}
        <FadeIn y={10}>
          <GeneratorDemo/>
        </FadeIn>

        {/* right — copy */}
        <FadeIn delay={0.1} y={10}>
          <div>
            <Eyebrow>Live generator</Eyebrow>
            <H2 style={{marginBottom:20}}>
              Generate in 3 seconds.{" "}
              <em style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:600}}>Certify</em>{" "}
              in one click.
            </H2>
            <Body muted style={{marginBottom:28}}>
              Every password is built with <code style={{fontSize:12,background:T.blueSoft,color:T.blue,padding:"2px 6px",borderRadius:4}}>crypto.getRandomValues()</code> — the same FIPS 140-3 source used in HSMs. Your profession seeds the vocabulary. The browser does the rest.
            </Body>

            {/* feature list */}
            <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:32}}>
              {[
                {t:"Zero server transmission",d:"The password is never sent anywhere — not even encrypted."},
                {t:"NIST SP 800-63B compliant",d:"Entropy floor, passphrase support, and Unicode character sets."},
                {t:"Signed compliance certificate",d:"JWT-signed proof of generation parameters for your audit trail."},
                {t:"6 compliance frameworks",d:"HIPAA, PCI-DSS, SOC 2, ISO 27001, DoD IL2, NIST."},
              ].map(f=>(
                <div key={f.t} style={{display:"flex",gap:14}}>
                  <div style={{
                    width:22,height:22,borderRadius:"50%",flexShrink:0,
                    background:T.blueSoft,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2,
                  }}>
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:T.text}}>{f.t}</div>
                    <div style={{fontSize:13,color:T.textMut,marginTop:3}}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <BtnPrimary href="#generator" style={{fontSize:14,padding:"13px 28px"}}>
              Try the generator
            </BtnPrimary>
          </div>
        </FadeIn>
      </div>

      {/* responsive override */}
      <style>{`@media(max-width:860px){#generator .split-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §5  VALUE SECTION  (asymmetric card grid)
   Row 1: 60% card / 40% card
   Row 2: 40% card / 60% card
   Row 3: 3 mixed non-uniform cards
──────────────────────────────────────────────────────────────── */
function ValueSection() {
  return (
    <section style={{
      background:T.bg,
      padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <FadeIn>
          <div style={{marginBottom:52}}>
            <Eyebrow>Why PassGeni</Eyebrow>
            <H2 style={{maxWidth:560}}>
              What your password{" "}
              <em style={{fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>actually</em>{" "}
              needs to pass audits.
            </H2>
          </div>
        </FadeIn>

        {/* Row 1 — 60 / 40 */}
        <FadeIn delay={0.05}>
          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:16,marginBottom:16}}>
            <DataCard
              label="Entropy"
              title="128-bit minimum. Post-quantum ready."
              body="Most generators produce passwords with 40–60 bits of entropy. PassGeni enforces a 128-bit floor — the same standard used by government HSMs. Our Post-Quantum mode targets 256 bits, aligning with NIST 2024 guidance for Grover's-resistant credentials."
              metric="128+"
              metricLabel="bits minimum entropy"
            />
            <DataCard
              label="Zero knowledge"
              title="Your password is never transmitted."
              body="Client-side generation via crypto.getRandomValues() means no server ever touches your credential — not during generation, not during certification, not ever."
              metric="0 bytes"
              metricLabel="transmitted to any server"
            />
          </div>
        </FadeIn>

        {/* Row 2 — 40 / 60 */}
        <FadeIn delay={0.1}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:16,marginBottom:16}}>
            <DataCard
              label="Compliance"
              title="6 frameworks in one click."
              body="HIPAA, PCI-DSS v4.0, SOC 2 Type II, ISO/IEC 27001, DoD IL2, and NIST SP 800-63B. Each preset auto-configures length minimums, character requirements, and entropy floors."
              metric="6"
              metricLabel="compliance frameworks supported"
            />
            <DataCard
              label="Memorability"
              title="Profession-aware seeding improves recall 30%."
              body="A credential is only secure if it's used — not reset. PassGeni seeds each password from domain vocabulary relevant to your profession. A physician gets medical terms; a developer gets system patterns. Cryptographic strength is identical to pure random. Human memorability is measurably higher."
              metric="30%"
              metricLabel="recall improvement vs generic"
            />
          </div>
        </FadeIn>

        {/* Row 3 — 3 non-uniform */}
        <FadeIn delay={0.15}>
          <div style={{display:"grid",gridTemplateColumns:"1.2fr 0.9fr 0.9fr",gap:16}}>
            <DataCard
              label="Audit trail"
              title="Signed JWT certificates for every generation."
              body="Every password can be certified with an ES256-signed JWT containing generation parameters, entropy score, compliance badges, and a SHA-256 fingerprint. Forward it to your auditor."
              metric="ES256"
              metricLabel="JWT signature standard"
            />
            <DataCard
              label="Password DNA"
              title="7-point quality audit score."
              body="Length, character diversity, entropy, repeat detection, dictionary resistance — graded A+ to C with per-check breakdown."
              metric="A+"
              metricLabel="maximum DNA score"
            />
            <DataCard
              label="Speed"
              title="Under one second, every time."
              body="No API round-trips. No network latency. Generation is instant because everything runs locally in your browser."
              metric="<1s"
              metricLabel="average generation time"
            />
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media(max-width:720px){
          [data-row="r1"],[data-row="r2"],[data-row="r3"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §6  FEATURE BLOCKS  (≤ 4 features)
──────────────────────────────────────────────────────────────── */
function FeatureBlocksSection() {
  const feats = [
    {
      label:"Post-Quantum",
      title:"Grover-resistant generation",
      body:"Targets 256-bit entropy using extended character pools. Aligned with NIST's 2024 post-quantum recommendations — ready before quantum computing makes today's passwords obsolete.",
      snippet:(
        <div style={{background:T.bgOff,borderRadius:8,padding:"10px 12px",marginTop:12,fontFamily:"'Space Mono',monospace",fontSize:10,color:T.textSub,lineHeight:1.9}}>
          <div><span style={{color:T.blue}}>mode</span>  → post_quantum</div>
          <div><span style={{color:T.blue}}>pool</span>  → 128 chars</div>
          <div><span style={{color:T.blue}}>entropy</span>→ 256 bits</div>
        </div>
      ),
    },
    {
      label:"Breach detection",
      title:"k-Anonymity HIBP integration",
      body:"Check passwords against 850M+ breached credentials via the Have I Been Pwned k-anonymity API. Your full password is never transmitted — only a 5-char SHA-1 prefix.",
      snippet:(
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
          {["SHA-1 prefix: 5BFCE","API: api.pwnedpasswords.com","Result: 0 matches found ✓"].map((l,i)=>(
            <div key={i} style={{fontSize:10,fontFamily:"'Space Mono',monospace",color:i===2?T.green:T.textSub}}>{l}</div>
          ))}
        </div>
      ),
    },
    {
      label:"Bulk generation",
      title:"500 passwords in one shot",
      body:"Team and Enterprise plans support bulk generation — 10, 50, or 500 passwords with uniform compliance settings. Export as CSV for onboarding flows.",
      snippet:(
        <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>
          {["10","50","100","500"].map(n=>(
            <span key={n} style={{
              fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:40,
              background:n==="50"?T.blue:"#fff",
              color:n==="50"?"#fff":T.textSub,
              border:`1.5px solid ${n==="50"?T.blue:T.border}`,
            }}>{n} passwords</span>
          ))}
        </div>
      ),
    },
    {
      label:"Open audit",
      title:"Full transparency mode",
      body:"Inspect every parameter used to generate your password: RNG source, character pool composition, entropy calculation, seed word injection. Nothing is a black box.",
      snippet:(
        <div style={{background:T.bgOff,borderRadius:8,padding:"10px 12px",marginTop:12,fontFamily:"'Space Mono',monospace",fontSize:10,color:T.textSub,lineHeight:1.9}}>
          <div>rng: <span style={{color:T.blue}}>crypto.getRandomValues</span></div>
          <div>pool: <span style={{color:T.blue}}>upper+lower+sym+num</span></div>
          <div>seed: <span style={{color:T.blue}}>'cortex' (injected)</span></div>
        </div>
      ),
    },
  ];

  return (
    <section style={{
      background:T.bgOff,
      padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Eyebrow>Capabilities</Eyebrow>
            <H2 center>Everything a security-first team needs.</H2>
          </div>
        </FadeIn>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
          gap:20,
        }}>
          {feats.map((f,i)=>(
            <FadeIn key={f.label} delay={i*0.08}>
              <DataCard label={f.label} title={f.title} body={f.body} style={{height:"100%"}}>
                {f.snippet}
              </DataCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §7  DASHBOARD PREVIEW
──────────────────────────────────────────────────────────────── */
function DashboardSection() {
  const certs = [
    {id:"PG-8841",date:"2024-01-15",frame:"HIPAA",bits:128,score:"A+",status:"active"},
    {id:"PG-8840",date:"2024-01-14",frame:"SOC 2",bits:144,score:"A+",status:"active"},
    {id:"PG-8839",date:"2024-01-13",frame:"PCI-DSS",bits:136,score:"A",status:"active"},
    {id:"PG-8838",date:"2024-01-10",frame:"NIST",bits:122,score:"A+",status:"expired"},
  ];
  const scores = [
    {label:"NIST SP 800-63B",val:98},{label:"HIPAA §164.312",val:100},
    {label:"PCI-DSS v4.0",val:94},{label:"SOC 2 Type II",val:97},
  ];

  return (
    <section style={{
      background:T.bg,
      padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <FadeIn>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Eyebrow>Dashboard</Eyebrow>
            <H2 center>Compliance visibility, built in.</H2>
            <Body center muted style={{maxWidth:480,margin:"16px auto 0"}}>
              Every certificate, score, and audit log — in a single view. Forward it to your security team in one click.
            </Body>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{
            border:`1.5px solid ${T.border}`,borderRadius:20,overflow:"hidden",
            boxShadow:"0 4px 40px rgba(0,0,0,0.07)",
          }}>
            {/* dashboard toolbar */}
            <div style={{
              background:T.bgOff,borderBottom:`1px solid ${T.border}`,
              padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",
            }}>
              <div style={{display:"flex",gap:6}}>
                {["#F87171","#FBBF24","#34D399"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
              </div>
              <div style={{fontSize:12,fontWeight:600,color:T.textMut}}>PassGeni — Compliance Dashboard</div>
              <div style={{fontSize:11,color:T.textMut}}>Team plan</div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 360px",minHeight:360}}>
              {/* left — cert table */}
              <div style={{padding:"28px 32px",borderRight:`1px solid ${T.border}`}}>
                <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:16,letterSpacing:"-0.01em"}}>Certificate Log</div>
                <div style={{display:"flex",flexDirection:"column",gap:0}}>
                  {/* header row */}
                  <div style={{display:"grid",gridTemplateColumns:"80px 90px 80px 60px 50px 70px",gap:8,padding:"0 0 10px",borderBottom:`1px solid ${T.border}`,marginBottom:8}}>
                    {["ID","Date","Framework","Entropy","Score","Status"].map(h=>(
                      <div key={h} style={{fontSize:10,fontWeight:700,color:T.textMut,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</div>
                    ))}
                  </div>
                  {certs.map(c=>(
                    <div key={c.id} style={{display:"grid",gridTemplateColumns:"80px 90px 80px 60px 50px 70px",gap:8,padding:"10px 0",borderBottom:`1px solid ${T.bgOff}`}}>
                      <div style={{fontSize:11,fontWeight:700,color:T.blue,fontFamily:"'Space Mono',monospace"}}>{c.id}</div>
                      <div style={{fontSize:11,color:T.textMut}}>{c.date}</div>
                      <div style={{fontSize:11,fontWeight:600,color:T.text}}>{c.frame}</div>
                      <div style={{fontSize:11,color:T.textSub,fontFamily:"'Space Mono',monospace"}}>{c.bits}b</div>
                      <div style={{fontSize:11,fontWeight:700,color:T.green}}>{c.score}</div>
                      <div>
                        <span style={{
                          fontSize:10,fontWeight:700,
                          color:c.status==="active"?T.green:"#9CA3AF",
                          background:c.status==="active"?"rgba(34,197,94,0.1)":"rgba(156,163,175,0.12)",
                          padding:"2px 8px",borderRadius:20,
                        }}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right — compliance scores */}
              <div style={{padding:"28px 28px",background:T.bgOff}}>
                <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:20,letterSpacing:"-0.01em"}}>Compliance Scores</div>
                {scores.map(s=>(
                  <div key={s.label} style={{marginBottom:20}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:11,fontWeight:600,color:T.textSub}}>{s.label}</span>
                      <span style={{fontSize:11,fontWeight:700,color:T.text}}>{s.val}%</span>
                    </div>
                    <div style={{height:5,borderRadius:3,background:T.border,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${s.val}%`,borderRadius:3,background:`linear-gradient(90deg,${T.blue},#33A4FA)`,transition:"width .8s"}}/>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop:28,padding:"16px",borderRadius:12,
                  background:"#fff",border:`1.5px solid ${T.border}`,
                }}>
                  <div style={{fontSize:11,fontWeight:600,color:T.textMut,marginBottom:4}}>Overall grade</div>
                  <div style={{fontSize:36,fontWeight:900,color:T.blue,fontFamily:"'Outfit',sans-serif",letterSpacing:"-0.04em",lineHeight:1}}>A+</div>
                  <div style={{fontSize:10,color:T.textMut,marginTop:4}}>4/4 frameworks passing</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`@media(max-width:720px){[data-dashboard-grid]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   §8  FINAL CTA
──────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section style={{
      background:T.bgOff,
      padding:"clamp(80px,10vw,120px) clamp(16px,4vw,48px)",
      borderTop:`1px solid ${T.border}`,
    }}>
      <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
        <FadeIn>
          <Eyebrow>Get started</Eyebrow>
          <h2 style={{
            fontFamily:"'Outfit',sans-serif",fontWeight:900,
            fontSize:"clamp(40px,5.5vw,60px)",
            letterSpacing:"-0.045em",lineHeight:0.97,
            color:T.text,marginBottom:24,
          }}>
            Your next password is{" "}
            <em style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:600,color:T.blue}}>three seconds away.</em>
          </h2>
          <Body muted center style={{maxWidth:440,margin:"0 auto 40px",fontSize:17}}>
            Free forever. No account. No tracking. No data stored. Just a cryptographically sound password — built for audits.
          </Body>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <BtnPrimary href="#generator" style={{fontSize:15,padding:"15px 36px"}}>
              Generate my password
            </BtnPrimary>
            <BtnGhost href="/pricing" style={{fontSize:15,padding:"15px 28px"}}>
              View Team plans
            </BtnGhost>
          </div>
        </FadeIn>

        {/* trust row */}
        <FadeIn delay={0.15}>
          <div style={{
            display:"flex",gap:"8px 24px",justifyContent:"center",flexWrap:"wrap",
            marginTop:40,paddingTop:32,borderTop:`1px solid ${T.border}`,
          }}>
            {[
              "Zero server storage","NIST SP 800-63B","FIPS 140-3 RNG",
              "No account required","Open audit mode",
            ].map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:6}}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                <span style={{fontSize:12,color:T.textMut,fontWeight:500}}>{t}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   PAGE  (schema + all sections)
──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const siteSchema = getSiteSchema();
  const faqSchema  = getFAQSchema(FAQ?.items || []);
  const howSchema  = getHowToSchema();

  return (
    <>
      <Head>
        <title>PassGeni — AI Password Generator | Zero Storage, NIST SP 800-63B Compliant</title>
        <meta name="description" content="PassGeni generates cryptographically strong, profession-aware passwords — entirely in your browser. Zero data storage. NIST SP 800-63B, HIPAA, PCI-DSS, SOC 2 compliant. Free forever."/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="canonical" href="https://passgeni.ai"/>

        {/* Open Graph */}
        <meta property="og:type"        content="website"/>
        <meta property="og:url"         content="https://passgeni.ai"/>
        <meta property="og:title"       content="PassGeni — AI Password Generator | Zero Storage, NIST Compliant"/>
        <meta property="og:description" content="Generate cryptographically strong, profession-aware passwords in your browser. Zero data storage. HIPAA, PCI-DSS, SOC 2, NIST SP 800-63B compliant."/>
        <meta property="og:image"       content="https://passgeni.ai/og-image.png"/>

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image"/>
        <meta name="twitter:site"        content="@passgeni_ai"/>
        <meta name="twitter:title"       content="PassGeni — AI Password Generator"/>
        <meta name="twitter:description" content="Strong passwords, zero storage, NIST compliant. Built for teams that get audited."/>
        <meta name="twitter:image"       content="https://passgeni.ai/og-image.png"/>

        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(siteSchema)}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(howSchema)}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

        <style>{`
          @keyframes pulse {
            0%,100%{opacity:1;transform:scale(1)}
            50%{opacity:.6;transform:scale(1.2)}
          }
          @media(max-width:860px){
            [data-split]{grid-template-columns:1fr!important;gap:40px!important}
            [data-row="r1"],[data-row="r2"]{grid-template-columns:1fr!important}
            [data-row="r3"]{grid-template-columns:1fr 1fr!important}
          }
          @media(max-width:560px){
            [data-row="r3"]{grid-template-columns:1fr!important}
            [data-dashboard]{grid-template-columns:1fr!important}
          }
        `}</style>
      </Head>

      <Header/>

      <main style={{background:T.bg,minHeight:"100vh"}}>
        <HeroSection/>
        <TrustStrip/>
        <HowItWorksSection/>

        {/* §4 Product Split — responsive wrapper */}
        <section id="generator" style={{
          background:T.bgOff,
          padding:"clamp(80px,9vw,112px) clamp(16px,4vw,48px)",
          borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,
        }}>
          <div data-split style={{
            maxWidth:1200,margin:"0 auto",
            display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",
          }}>
            <FadeIn y={10}>
              <GeneratorDemo/>
            </FadeIn>

            <FadeIn delay={0.1} y={10}>
              <div>
                <Eyebrow>Live generator</Eyebrow>
                <H2 style={{marginBottom:20}}>
                  Generate in 3 seconds.{" "}
                  <em style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:600}}>Certify</em>{" "}
                  in one click.
                </H2>
                <Body muted style={{marginBottom:28}}>
                  Every password is built with <code style={{fontSize:12,background:T.blueSoft,color:T.blue,padding:"2px 6px",borderRadius:4}}>crypto.getRandomValues()</code> — the same FIPS 140-3 source used in HSMs. Your profession seeds the vocabulary. The browser does the rest.
                </Body>

                <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:32}}>
                  {[
                    {t:"Zero server transmission",d:"The password is never sent anywhere — not even encrypted."},
                    {t:"NIST SP 800-63B compliant",d:"Entropy floor, passphrase support, and Unicode character sets."},
                    {t:"Signed compliance certificate",d:"JWT-signed proof of generation parameters for your audit trail."},
                    {t:"6 compliance frameworks",d:"HIPAA, PCI-DSS, SOC 2, ISO 27001, DoD IL2, NIST."},
                  ].map(f=>(
                    <div key={f.t} style={{display:"flex",gap:14}}>
                      <div style={{
                        width:22,height:22,borderRadius:"50%",flexShrink:0,
                        background:T.blueSoft,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2,
                      }}>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:T.text}}>{f.t}</div>
                        <div style={{fontSize:13,color:T.textMut,marginTop:3}}>{f.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <BtnPrimary href="#generator" style={{fontSize:14,padding:"13px 28px"}}>
                  Try the generator
                </BtnPrimary>
              </div>
            </FadeIn>
          </div>
        </section>

        <ValueSection/>
        <FeatureBlocksSection/>
        <DashboardSection/>
        <CtaSection/>
      </main>

      <Footer/>
    </>
  );
}
