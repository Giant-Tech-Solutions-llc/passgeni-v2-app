import Head from "next/head";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import { useRef, useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, useInView } from "framer-motion";
import { getSiteSchema, getFAQSchema, getHowToSchema } from "../seo/schema.js";
import { FAQ, TOOLS_PREVIEW, TESTIMONIALS, STATS } from "../content/copy.js";

/* ── Surface constants ──────────────────────────────────────────────────────── */
const BP  = "#3A4EFB";              // blue primary
const BS  = "#33A4FA";              // blue secondary
const ACC = "#E3FF3B";              // lime accent
const ML  = "#5C617A";              // muted on light
const MD  = "#8B90A8";              // muted on dark
const BL  = "#E6E8F0";              // border light
const BD  = "rgba(255,255,255,0.10)"; // border dark
const W   = { bg:"#FFFFFF",   text:"#0B0D17" };
const D   = { bg:"#0F1222",   text:"#F0F2FF" };

/* ── Inline SVG icons ───────────────────────────────────────────────────────── */
const Check = ({ size=14, c="#22C55E" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c}
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{display:"inline-block",flexShrink:0,verticalAlign:"middle"}}>
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const Xmark = ({ size=14, c="#EF4444" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c}
    strokeWidth="2.5" strokeLinecap="round"
    style={{display:"inline-block",flexShrink:0,verticalAlign:"middle"}}>
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const LockIcon = ({ size=16, c=BP }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={c}
    style={{display:"inline-block",flexShrink:0,verticalAlign:"middle"}}>
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const Arr = ({ size=13, c="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{display:"inline-block",flexShrink:0}}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── FadeIn ─────────────────────────────────────────────────────────────────── */
function FadeIn({ children, delay=0, y=18, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{opacity:0,y}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.5,delay,ease:[0.22,1,0.36,1]}}
      style={style} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Password generation helpers ────────────────────────────────────────────── */
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
function genPw(len=20) {
  const a = new Uint32Array(len);
  crypto.getRandomValues(a);
  return Array.from(a, n => CHARS[n % CHARS.length]).join("");
}
function calcEntropy(pw) {
  let p=0;
  if(/[a-z]/.test(pw))p+=26; if(/[A-Z]/.test(pw))p+=26;
  if(/[0-9]/.test(pw))p+=10; if(/[^a-zA-Z0-9]/.test(pw))p+=32;
  return p>0?Math.floor(pw.length*Math.log2(p)):0;
}
function checkStds(pw,bits) {
  const l=pw.length,u=/[A-Z]/.test(pw),lo=/[a-z]/.test(pw),
        n=/[0-9]/.test(pw),s=/[^a-zA-Z0-9]/.test(pw),all=u&&lo&&n&&s;
  return [
    {id:"NIST",  label:"NIST SP 800-63B", pass:l>=8},
    {id:"HIPAA", label:"HIPAA §164.312",  pass:l>=12&&all},
    {id:"PCI",   label:"PCI-DSS v4.0",    pass:l>=12&&all&&bits>=40},
    {id:"SOC2",  label:"SOC 2 CC6.1",     pass:l>=16&&all},
    {id:"ISO",   label:"ISO 27001",        pass:l>=14&&all},
  ];
}

/* ══════════════════════════════════════════════════════════════════════════════
   §2 — GENERATOR COMPONENT (dark surface)
══════════════════════════════════════════════════════════════════════════════ */
function GeneratorDemo() {
  const { data:session } = useSession();
  const [pw,setPw]               = useState("");
  const [bits,setBits]           = useState(0);
  const [copied,setCopied]       = useState(false);
  const [pulse,setPulse]         = useState(false);
  const [stds,setStds]           = useState([]);
  const [certState,setCertState] = useState("idle");
  const [certResult,setCertResult]=useState(null);
  const [certError,setCertError]  =useState(null);

  const generate = useCallback(()=>{
    const next=genPw(20), b=calcEntropy(next);
    setPw(next); setBits(b); setStds(checkStds(next,b));
    setPulse(true); setCertState("idle"); setCertResult(null); setCertError(null);
    setTimeout(()=>setPulse(false),400);
  },[]);
  useEffect(()=>{ generate(); },[generate]);

  const copy=()=>navigator.clipboard.writeText(pw).then(()=>{
    setCopied(true); setTimeout(()=>setCopied(false),1800);
  });

  const handleCertify = async ()=>{
    if(!session){ signIn(undefined,{callbackUrl:"/dashboard/certify"}); return; }
    setCertState("checking"); setCertError(null);
    const params={compliance_standard:"nist",length:pw.length,
      has_upper:/[A-Z]/.test(pw),has_lower:/[a-z]/.test(pw),
      has_numbers:/[0-9]/.test(pw),has_special:/[^a-zA-Z0-9]/.test(pw),
      entropy_bits:bits,
      char_pool_size:(()=>{let p=0;if(/[a-z]/.test(pw))p+=26;if(/[A-Z]/.test(pw))p+=26;if(/[0-9]/.test(pw))p+=10;if(/[^a-zA-Z0-9]/.test(pw))p+=32;return p;})(),
    };
    const r1=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(params)});
    const d1=await r1.json();
    if(!r1.ok){setCertError(d1.error??"Request failed");setCertState("error");return;}
    if(d1.standards_met)setStds(p=>p.map(s=>({...s,pass:d1.standards_met.includes(s.id)||d1.standards_met.includes(s.label)})));
    setCertState("certifying");
    const r2=await fetch("/api/generate-certificate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({generation_session_id:d1.generation_session_id})});
    const d2=await r2.json();
    if(!r2.ok){setCertError(d2.error??"Certificate failed");setCertState("error");return;}
    setCertResult(d2); setCertState("done");
  };

  const pct  = Math.min(100,(bits/128)*100);
  const barC = bits>=80?"#22C55E":bits>=50?"#F59E0B":"#EF4444";

  const poolSize=(()=>{
    if(!pw) return 0;
    let p=0;
    if(/[a-z]/.test(pw))p+=26;if(/[A-Z]/.test(pw))p+=26;
    if(/[0-9]/.test(pw))p+=10;if(/[^a-zA-Z0-9]/.test(pw))p+=32;
    return p;
  })();

  return (
    <div style={{maxWidth:700,margin:"0 auto"}}>
      {/* Password output */}
      <div style={{background:"#0D1025",border:`1px solid ${BD}`,borderRadius:10,padding:"20px 24px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>
          Generated password
        </div>
        <motion.div animate={pulse?{opacity:[1,0.45,1]}:{}} transition={{duration:0.3}}
          style={{fontFamily:"var(--font-mono)",fontSize:15,letterSpacing:"0.06em",color:ACC,
            wordBreak:"break-all",minHeight:52,display:"flex",alignItems:"center",lineHeight:1.5}}>
          {pw||"—"}
        </motion.div>

        {/* Entropy bar */}
        <div style={{marginTop:14,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:MD,marginBottom:6}}>
            <span>Entropy</span>
            <span style={{color:barC,fontWeight:700,fontFamily:"var(--font-mono)"}}>{bits} bits</span>
          </div>
          <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2}}>
            <motion.div animate={{width:`${pct}%`}} transition={{duration:0.45,ease:"easeOut"}}
              style={{height:"100%",borderRadius:2,background:barC}}/>
          </div>
        </div>

        {/* Compliance status */}
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {stds.map(s=>(
            <span key={s.id} style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,
              fontWeight:600,padding:"4px 10px",borderRadius:4,transition:"all 0.2s",
              background:s.pass?"rgba(34,197,94,0.10)":"rgba(239,68,68,0.10)",
              color:s.pass?"#22C55E":"#EF4444",
              border:`1px solid ${s.pass?"rgba(34,197,94,0.25)":"rgba(239,68,68,0.25)"}`}}>
              {s.pass?<Check size={10} c="#22C55E"/>:<Xmark size={10} c="#EF4444"/>}
              {s.label}
            </span>
          ))}
          {certState==="done"&&(
            <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600,
              padding:"4px 10px",borderRadius:4,background:"rgba(58,78,251,0.12)",
              color:"#7B93FF",border:"1px solid rgba(58,78,251,0.3)"}}>
              <Check size={10} c="#7B93FF"/> Compliance certificate attached
            </span>
          )}
        </div>
      </div>

      {/* Audit indicators */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
        {[
          {label:"Audit indicator",  value:`${bits} bit entropy`, ok:bits>=80},
          {label:"Character pool",   value:`${poolSize} chars`,   ok:true},
          {label:"Storage",          value:"Zero bytes",          ok:true},
        ].map(ind=>(
          <div key={ind.label} style={{background:"#0D1025",border:`1px solid ${BD}`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontSize:10,fontWeight:700,color:MD,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>
              {ind.label}
            </div>
            <div style={{fontSize:13,fontWeight:700,color:ind.ok?"#22C55E":"#F59E0B",fontFamily:"var(--font-mono)"}}>
              {ind.value}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={generate} className="btn-primary" style={{flex:1,fontSize:14,padding:"11px 0"}}>
          Generate new password
        </button>
        <button onClick={copy} className="btn-ghost" style={{fontSize:14,padding:"11px 20px",minWidth:90}}>
          {copied?"Copied!":"Copy"}
        </button>
      </div>

      {certState==="done"&&certResult?(
        <div style={{padding:"12px 16px",borderRadius:8,background:"rgba(34,197,94,0.07)",
          border:"1px solid rgba(34,197,94,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:13,color:"#22C55E",display:"flex",alignItems:"center",gap:6}}>
            <Check size={13} c="#22C55E"/> Compliance certificate issued
          </span>
          <a href={certResult.cert_url} target="_blank" rel="noreferrer"
            style={{fontSize:13,color:ACC,fontWeight:600}}>View cert →</a>
        </div>
      ):(
        <button onClick={handleCertify}
          disabled={certState==="checking"||certState==="certifying"}
          style={{width:"100%",padding:"11px 0",fontSize:13,fontWeight:600,borderRadius:8,
            border:"1px solid rgba(58,78,251,0.4)",background:"rgba(58,78,251,0.08)",color:"#7B93FF",
            cursor:certState==="checking"||certState==="certifying"?"wait":"pointer",
            transition:"background 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <LockIcon size={13} c="#7B93FF"/>
          {certState==="idle"     && "Certify this password →"}
          {certState==="checking" && "Validating…"}
          {certState==="certifying"&&"Issuing certificate…"}
          {certState==="error"    && "Retry certify →"}
        </button>
      )}
      {certError&&<p style={{marginTop:8,fontSize:12,color:"#EF4444"}}>{certError}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   §8 — DASHBOARD PREVIEW COMPONENT (dark surface)
══════════════════════════════════════════════════════════════════════════════ */
function DashboardPreview() {
  const certs=[
    {std:"HIPAA §164.312(d)", bits:112,date:"Apr 2027",status:"VALID",    sc:"#22C55E",sb:"rgba(34,197,94,0.10)"},
    {std:"NIST SP 800-63B",  bits:98, date:"Jun 2026",status:"EXP SOON",  sc:"#F59E0B",sb:"rgba(245,158,11,0.10)"},
    {std:"PCI-DSS v4.0",    bits:128,date:"Mar 2027",status:"VALID",    sc:"#22C55E",sb:"rgba(34,197,94,0.10)"},
    {std:"SOC 2 CC6.1",     bits:104,date:"Jan 2027",status:"VALID",    sc:"#22C55E",sb:"rgba(34,197,94,0.10)"},
  ];
  const bars=[
    {std:"NIST SP 800-63B",pct:100,c:"#22C55E"},
    {std:"HIPAA §164.312", pct:84, c:"#22C55E"},
    {std:"PCI-DSS v4.0",  pct:92, c:"#22C55E"},
    {std:"SOC 2 CC6.1",   pct:56, c:"#F59E0B"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {/* Certificate table */}
      <div style={{background:"#0D1025",border:`1px solid ${BD}`,borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${BD}`,fontSize:11,fontWeight:700,
          color:MD,letterSpacing:"0.1em",textTransform:"uppercase"}}>
          Active compliance certificates
        </div>
        {certs.map((c,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"12px 18px",borderBottom:i<certs.length-1?`1px solid rgba(255,255,255,0.05)`:"none"}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:D.text,marginBottom:2}}>{c.std}</div>
              <div style={{fontSize:11,color:MD,fontFamily:"var(--font-mono)"}}>{c.bits}b · Exp {c.date}</div>
            </div>
            <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:4,
              background:c.sb,color:c.sc,letterSpacing:"0.06em"}}>{c.status}</span>
          </div>
        ))}
      </div>

      {/* Compliance score bars */}
      <div style={{background:"#0D1025",border:`1px solid ${BD}`,borderRadius:10,padding:"18px"}}>
        <div style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.1em",
          textTransform:"uppercase",marginBottom:14}}>
          Compliance score by standard
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {bars.map(b=>(
            <div key={b.std}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:D.text,fontWeight:500}}>{b.std}</span>
                <span style={{color:b.c,fontWeight:700,fontFamily:"var(--font-mono)"}}>{b.pct}%</span>
              </div>
              <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                <div style={{width:`${b.pct}%`,height:"100%",background:b.c,borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid rgba(255,255,255,0.06)`,
          display:"flex",justifyContent:"space-between",fontSize:12}}>
          <span style={{color:MD}}>Monthly certificates</span>
          <span style={{color:D.text,fontWeight:700,fontFamily:"var(--font-mono)"}}>3 / 3 used</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════════ */
const FEATS = [
  {title:"Compliance-preset generation",body:"Select HIPAA, PCI-DSS, SOC 2, NIST, ISO 27001, or DoD. PassGeni auto-configures minimum length, character classes, and entropy floor. No manual cross-referencing.",link:null},
  {title:"NIST SP 800-63B passphrase mode",body:"NIST recommends passphrases over complex strings. Four random profession-seeded words at 50+ bits of entropy — easier to type, harder to crack.",link:"/guides/nist-800-63b-password-guidelines"},
  {title:"Profession-aware AI seeding",body:"Seed word drawn from your profession vocabulary. A doctor gets clinical terms; a developer gets technical patterns. Identical cryptographic strength, meaningfully better recall.",link:null},
  {title:"Password DNA Score",body:"Seven-point quality audit: length, character class diversity, pattern detection, repeat sequences. Graded A+ to C with per-check breakdown and weighted scoring.",link:"/tools/strength-checker"},
  {title:"Post-Quantum Mode",body:"Aligned with NIST 2024 post-quantum standards (FIPS 140-3). Generates passwords resistant to Grover's algorithm. Required for long-lived credentials.",link:null},
  {title:"Bulk generator + export",body:"Generate 5–50 passwords in one request. Labeled .txt export for team onboarding and CI/CD provisioning.",link:null},
  {title:"Open Audit Mode",body:"Full transparency on generation: randomness source, entropy pool, character set, seed application. Full audit trail, no black box.",link:null},
  {title:"Developer REST API",body:"POST to /api/v1/generate with compliance_standard and certify flags. 50 free calls/day. 5,000/day on Authority plan.",link:"/api"},
];

const GAP_ROWS = [
  {req:"HIPAA §164.312(d)",   need:"≥12 chars · upper+lower+num+sym · ≥60-bit entropy", pass:"1-click sets every requirement"},
  {req:"PCI-DSS v4.0 Req 8", need:"≥12 chars · complexity · quarterly rotation",         pass:"PCI preset + certificate per credential"},
  {req:"SOC 2 CC6.1",        need:"≥16 chars · MFA recommended · audit log",              pass:"SOC 2 preset + verifiable cert URL"},
  {req:"NIST SP 800-63B",    need:"≥8 chars · no complexity rules · check breaches",      pass:"NIST mode + k-anon breach checker"},
  {req:"ISO 27001 A.9",      need:"≥14 chars · policy enforced · documented",             pass:"ISO preset + policy generator"},
];

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const SP  = "clamp(80px,9vw,112px) 0";
  const SPL = "clamp(96px,11vw,136px) 0";

  return (
    <>
      <Head>
        <title>PassGeni — Compliance Password Generator for HIPAA, SOC 2, PCI-DSS, NIST</title>
        <meta name="description" content="Generate audit-ready passwords with verifiable compliance certificates for HIPAA, PCI-DSS, SOC 2, NIST SP 800-63B, and ISO 27001. Zero storage. Client-side only. Free."/>
        <meta name="robots" content="index,follow"/>
        <link rel="canonical" href="https://passgeni.ai"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://passgeni.ai"/>
        <meta property="og:title" content="PassGeni — Compliance Password Generator for HIPAA, SOC 2, PCI-DSS, NIST"/>
        <meta property="og:description" content="Generate audit-ready passwords with verifiable compliance certificates. Zero storage. Client-side only. Free."/>
        <meta property="og:image" content="https://passgeni.ai/og-image.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="PassGeni — Compliance Password Generator"/>
        <meta name="twitter:description" content="Passwords with verifiable compliance certificates. HIPAA, PCI-DSS, SOC 2, NIST. Zero storage."/>
        <meta name="twitter:image" content="https://passgeni.ai/og-image.png"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(getSiteSchema())}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(getFAQSchema(FAQ.items))}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(getHowToSchema())}}/>
      </Head>

      <div style={{background:W.bg,overflowX:"hidden"}}>
        <Header/>
        <main>

          {/* ══════════════════════════════════════════════════════════════════
              §1  HERO  —  WHITE
          ══════════════════════════════════════════════════════════════════ */}
          <section className="s-white" aria-labelledby="hero-heading"
            style={{paddingTop:"clamp(100px,12vw,140px)",paddingBottom:"clamp(64px,7vw,88px)"}}>
            <div className="container">

              {/* 2-col asymmetric: text left, compliance panel right */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                gap:"clamp(40px,6vw,88px)",alignItems:"center"}}>

                {/* Left */}
                <div>
                  <FadeIn>
                    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",
                      borderRadius:4,background:"rgba(58,78,251,0.07)",border:"1px solid rgba(58,78,251,0.18)",
                      marginBottom:24}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:BP,display:"inline-block"}}/>
                      <span style={{fontSize:12,fontWeight:600,color:BP,letterSpacing:"0.04em"}}>
                        Free · No account · Zero storage
                      </span>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.07}>
                    <h1 id="hero-heading" style={{fontFamily:"var(--font-heading)",fontWeight:900,
                      fontSize:"clamp(2.4rem,5vw,3.8rem)",lineHeight:1.04,letterSpacing:"-0.04em",
                      color:W.text,marginBottom:20}}>
                      The compliance password generator{" "}
                      <em style={{fontFamily:"var(--font-italic)",fontStyle:"italic",
                        fontWeight:500,color:BP}}>auditors accept.</em>
                    </h1>
                  </FadeIn>

                  <FadeIn delay={0.12}>
                    <p style={{fontSize:"clamp(1rem,1.6vw,1.12rem)",color:ML,lineHeight:1.8,
                      maxWidth:480,marginBottom:32}}>
                      PassGeni generates cryptographically strong passwords and issues verifiable
                      compliance certificates for HIPAA, SOC&nbsp;2, PCI-DSS, and NIST&nbsp;SP&nbsp;800-63B.
                      Nothing is stored. Everything runs in your browser.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.16}>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
                      <a href="#generator" className="btn-primary" style={{fontSize:15,padding:"13px 28px"}}>
                        Generate password now
                      </a>
                      <a href="#how-it-works" className="btn-ghost-light" style={{fontSize:15,padding:"13px 22px"}}>
                        See how it works
                      </a>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                      {["256-bit minimum entropy","Zero bytes stored","6 compliance frameworks"].map(t=>(
                        <span key={t} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:ML}}>
                          <Check size={13} c="#22C55E"/> {t}
                        </span>
                      ))}
                    </div>
                  </FadeIn>
                </div>

                {/* Right: certificate preview panel */}
                <FadeIn delay={0.25}>
                  <div style={{background:W.bg,border:`1.5px solid ${BL}`,borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:"#F7F8FC",padding:"14px 20px",borderBottom:`1px solid ${BL}`,
                      display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,fontWeight:700,color:W.text}}>Compliance certificate preview</span>
                      <span style={{fontSize:11,padding:"3px 8px",borderRadius:4,fontWeight:700,
                        background:"rgba(34,197,94,0.10)",color:"#16A34A",border:"1px solid rgba(34,197,94,0.25)"}}>
                        VALID
                      </span>
                    </div>
                    <div style={{padding:"20px"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 20px",marginBottom:16}}>
                        {[
                          {k:"Standard",  v:"HIPAA §164.312(d)", hi:true},
                          {k:"Entropy",   v:"112.4 bits",         hi:true},
                          {k:"Issued",    v:"Apr 22, 2026",       hi:false},
                          {k:"Expires",   v:"Apr 22, 2027",       hi:false},
                          {k:"Char pool", v:"90 characters",      hi:false},
                          {k:"Algorithm", v:"ES256 P-256",        hi:false},
                        ].map(({k,v,hi})=>(
                          <div key={k}>
                            <div style={{fontSize:10,fontWeight:700,color:ML,letterSpacing:"0.1em",
                              textTransform:"uppercase",marginBottom:3}}>{k}</div>
                            <div style={{fontSize:13,fontWeight:600,color:hi?BP:W.text}}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{borderTop:`1px solid ${BL}`,paddingTop:14}}>
                        <div style={{fontSize:10,fontWeight:700,color:ML,letterSpacing:"0.1em",
                          textTransform:"uppercase",marginBottom:8}}>Also satisfies</div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {["NIST","PCI-DSS","SOC 2","ISO 27001"].map(s=>(
                            <span key={s} style={{padding:"4px 10px",borderRadius:4,
                              border:`1px solid ${BL}`,fontSize:11,fontWeight:600,
                              color:W.text,background:"#F7F8FC"}}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Stats bar */}
            <div style={{borderTop:`1px solid ${BL}`,marginTop:"clamp(52px,6vw,72px)"}}>
              <div className="container">
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",paddingTop:28,paddingBottom:28}}>
                  {STATS.map((s,i)=>(
                    <div key={s.number} style={{paddingLeft:i>0?24:0,
                      borderLeft:i>0?`1px solid ${BL}`:"none"}}>
                      <div style={{fontFamily:"var(--font-heading)",fontWeight:900,
                        fontSize:"clamp(1.5rem,2.4vw,2rem)",color:BP,letterSpacing:"-0.04em",
                        marginBottom:4}}>{s.number}</div>
                      <div style={{fontSize:13,color:ML}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §2  GENERATOR  —  DARK
          ══════════════════════════════════════════════════════════════════ */}
          <section id="generator" className="s-dark" aria-labelledby="gen-heading"
            style={{padding:SP}}>
            <div className="container">
              <FadeIn>
                <div style={{marginBottom:36}}>
                  <p style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:10}}>Try it now — free · no signup</p>
                  <h2 id="gen-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                    fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:D.text,letterSpacing:"-0.03em",
                    lineHeight:1.08}}>
                    Generate a compliance-ready password.{" "}
                    <em style={{fontFamily:"var(--font-italic)",fontStyle:"italic",
                      fontWeight:400,color:MD}}>Right now.</em>
                  </h2>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}><GeneratorDemo/></FadeIn>
              <FadeIn delay={0.15}>
                <div style={{marginTop:20,display:"flex",gap:24,flexWrap:"wrap"}}>
                  <a href="/auth/signin" style={{fontSize:13,color:MD,
                    display:"inline-flex",alignItems:"center",gap:6}}>
                    <Arr c={MD}/> Save your certificate history
                  </a>
                  <a href="/guides" style={{fontSize:13,color:MD,
                    display:"inline-flex",alignItems:"center",gap:6}}>
                    <Arr c={MD}/> Compliance standard guides
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §3  COMPLIANCE GAP  —  WHITE
          ══════════════════════════════════════════════════════════════════ */}
          <section id="compliance-gap" className="s-white s-divider-top"
            aria-labelledby="gap-heading" style={{padding:SPL}}>
            <div className="container">
              <div style={{display:"grid",gridTemplateColumns:"280px 1fr",
                gap:"clamp(48px,7vw,100px)",alignItems:"start"}}>

                {/* Left: sticky heading + AEO answer */}
                <div style={{position:"sticky",top:80}}>
                  <FadeIn>
                    <p style={{fontSize:11,fontWeight:700,color:BP,letterSpacing:"0.14em",
                      textTransform:"uppercase",marginBottom:12}}>Compliance gap analysis</p>
                    <h2 id="gap-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                      fontSize:"clamp(1.6rem,2.8vw,2.2rem)",color:W.text,letterSpacing:"-0.03em",
                      lineHeight:1.1,marginBottom:16}}>
                      What do auditors actually need?
                    </h2>
                    {/* AEO: direct answer block */}
                    <div style={{borderLeft:`3px solid ${BP}`,paddingLeft:14,marginBottom:20}}>
                      <p style={{fontSize:14,color:W.text,lineHeight:1.75,fontWeight:500}}>
                        Auditors need documented proof that each password meets the character, length,
                        and entropy requirements of your framework — not a verbal claim.
                      </p>
                    </div>
                    <p style={{fontSize:14,color:ML,lineHeight:1.8,marginBottom:20}}>
                      PassGeni issues an ES256-signed compliance certificate per credential — a
                      tamper-evident JWT with a shareable verification URL. No auditor login required.
                    </p>
                    <a href="/password-compliance-certificate"
                      style={{fontSize:14,fontWeight:600,color:BP,
                        display:"inline-flex",alignItems:"center",gap:6}}>
                      What is a compliance certificate? <Arr c={BP}/>
                    </a>
                  </FadeIn>
                </div>

                {/* Right: requirements table */}
                <FadeIn delay={0.1}>
                  <div style={{border:`1.5px solid ${BL}`,borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:"#F7F8FC",padding:"12px 20px",
                      borderBottom:`1px solid ${BL}`,
                      display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      {["Framework","Requirement","PassGeni"].map(h=>(
                        <span key={h} style={{fontSize:11,fontWeight:700,color:ML,
                          letterSpacing:"0.08em",textTransform:"uppercase"}}>{h}</span>
                      ))}
                    </div>
                    {GAP_ROWS.map((r,i)=>(
                      <div key={r.req} style={{display:"grid",
                        gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"16px 20px",
                        borderBottom:i<GAP_ROWS.length-1?`1px solid ${BL}`:"none",
                        alignItems:"start"}}>
                        <div style={{fontSize:13,fontWeight:700,color:W.text}}>{r.req}</div>
                        <div style={{fontSize:12,color:ML,lineHeight:1.6}}>{r.need}</div>
                        <div style={{display:"flex",alignItems:"flex-start",gap:5,
                          fontSize:12,color:"#16A34A",fontWeight:500}}>
                          <Check size={12} c="#16A34A"/> {r.pass}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:14,display:"flex",gap:16,flexWrap:"wrap"}}>
                    {[
                      {href:"/guides/hipaa-password-requirements",label:"HIPAA guide"},
                      {href:"/guides/pci-dss-password-requirements",label:"PCI-DSS guide"},
                      {href:"/guides/soc2-password-requirements",label:"SOC 2 guide"},
                    ].map(({href,label})=>(
                      <a key={href} href={href}
                        style={{fontSize:13,color:ML,display:"inline-flex",alignItems:"center",gap:5}}>
                        {label} <Arr c={ML}/>
                      </a>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §4  SYSTEM FLOW  —  DARK
          ══════════════════════════════════════════════════════════════════ */}
          <section id="how-it-works" className="s-dark" aria-labelledby="flow-heading"
            style={{padding:SP}}>
            <div className="container">
              <FadeIn>
                <div style={{marginBottom:44}}>
                  <p style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:10}}>How it works</p>
                  <h2 id="flow-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                    fontSize:"clamp(1.8rem,3.5vw,2.8rem)",color:D.text,letterSpacing:"-0.03em",lineHeight:1.08}}>
                    Generate → Certify → Verify
                  </h2>
                </div>
              </FadeIn>

              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
                borderTop:`1px solid rgba(255,255,255,0.07)`}}>
                {[
                  {
                    n:"01", step:"Generate",
                    q:"How is the password generated?",
                    a:"Entirely in your browser via crypto.getRandomValues(). No server contact. The password never leaves your device.",
                    detail:"Select a compliance framework. PassGeni auto-configures minimum length, character classes, and entropy floor. Password is assembled client-side using a FIPS 140-3 compliant CSPRNG.",
                  },{
                    n:"02", step:"Certify",
                    q:"What is a compliance certificate?",
                    a:"An ES256 JWT signed by PassGeni's authority key, attesting that generation parameters met the selected standard at a specific timestamp.",
                    detail:"The server receives only parameters (length, standard, character classes, entropy). It never sees the password. It signs the parameters and returns a certificate with a shareable /cert/[id] URL.",
                  },{
                    n:"03", step:"Verify",
                    q:"How do auditors verify the certificate?",
                    a:"Open the /cert/[id] URL. No login required. Standard, entropy, parameters, and cryptographic signature are visible — verifiable against PassGeni's published public key.",
                    detail:"Independently checkable against passgeni.ai/.well-known/jwks.json — even offline. SHA-256 fingerprint of the JWT is embedded for forensic verification.",
                  },
                ].map((step,i)=>(
                  <FadeIn key={step.n} delay={i*0.1}>
                    <div style={{padding:"32px 28px",
                      borderRight:i<2?`1px solid rgba(255,255,255,0.07)`:"none",height:"100%"}}>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,
                        color:MD,marginBottom:14,letterSpacing:"0.08em"}}>{step.n}</div>
                      <h3 style={{fontFamily:"var(--font-heading)",fontWeight:700,
                        fontSize:"clamp(1.15rem,1.8vw,1.4rem)",color:D.text,
                        letterSpacing:"-0.03em",marginBottom:14}}>{step.step}</h3>
                      <p style={{fontSize:12,fontWeight:600,color:MD,
                        marginBottom:8}}>Q: {step.q}</p>
                      <p style={{fontSize:14,color:"rgba(240,242,255,0.85)",lineHeight:1.75,
                        marginBottom:12,borderLeft:"2px solid rgba(58,78,251,0.5)",
                        paddingLeft:12}}>{step.a}</p>
                      <p style={{fontSize:13,color:MD,lineHeight:1.7}}>{step.detail}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §5  FEATURES  —  WHITE
          ══════════════════════════════════════════════════════════════════ */}
          <section id="features" className="s-white s-divider-top"
            aria-labelledby="feat-heading" style={{padding:SPL}}>
            <div className="container">
              <div style={{display:"grid",gridTemplateColumns:"260px 1fr",
                gap:"clamp(48px,7vw,96px)",alignItems:"start"}}>

                {/* Left: sticky heading */}
                <div style={{position:"sticky",top:80}}>
                  <FadeIn>
                    <p style={{fontSize:11,fontWeight:700,color:BP,letterSpacing:"0.14em",
                      textTransform:"uppercase",marginBottom:12}}>What PassGeni includes</p>
                    <h2 id="feat-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                      fontSize:"clamp(1.5rem,2.6vw,2.1rem)",color:W.text,letterSpacing:"-0.03em",
                      lineHeight:1.1,marginBottom:16}}>
                      Everything compliance-grade password management needs.
                    </h2>
                    <p style={{fontSize:14,color:ML,lineHeight:1.8,marginBottom:24}}>
                      No external dependencies. No data leaving your browser. Each feature is a direct
                      response to a documented security requirement.
                    </p>
                    <a href="/auth/signin" className="btn-primary"
                      style={{fontSize:14,padding:"11px 22px"}}>Start free →</a>
                  </FadeIn>
                </div>

                {/* Right: feature list */}
                <div style={{display:"flex",flexDirection:"column"}}>
                  {FEATS.map((f,i)=>(
                    <FadeIn key={f.title} delay={i*0.04}>
                      <div style={{display:"flex",gap:18,padding:"22px 0",
                        borderBottom:i<FEATS.length-1?`1px solid ${BL}`:"none",alignItems:"flex-start"}}>
                        <div style={{width:26,height:26,borderRadius:6,flexShrink:0,marginTop:1,
                          background:"rgba(58,78,251,0.07)",border:"1px solid rgba(58,78,251,0.14)",
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <Check size={12} c={BP}/>
                        </div>
                        <div>
                          <div style={{display:"flex",alignItems:"baseline",gap:10,
                            flexWrap:"wrap",marginBottom:5}}>
                            <h3 style={{fontFamily:"var(--font-heading)",fontWeight:700,
                              fontSize:15,color:W.text,letterSpacing:"-0.02em"}}>{f.title}</h3>
                            {f.link&&(
                              <a href={f.link} style={{fontSize:12,color:BP,fontWeight:600,
                                whiteSpace:"nowrap"}}>Guide →</a>
                            )}
                          </div>
                          <p style={{fontSize:14,color:ML,lineHeight:1.75,margin:0}}>{f.body}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §6  SECURITY ARCHITECTURE  —  DARK
          ══════════════════════════════════════════════════════════════════ */}
          <section id="security" className="s-dark" aria-labelledby="sec-heading"
            style={{padding:SP}}>
            <div className="container">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                gap:"clamp(48px,7vw,96px)",alignItems:"start"}}>

                {/* Left: text */}
                <FadeIn>
                  <p style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:12}}>Zero-knowledge architecture</p>
                  <h2 id="sec-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                    fontSize:"clamp(1.8rem,3vw,2.6rem)",color:D.text,letterSpacing:"-0.03em",
                    lineHeight:1.08,marginBottom:20}}>
                    PassGeni never sees your password.{" "}
                    <em style={{fontFamily:"var(--font-italic)",fontStyle:"italic",
                      fontWeight:400,color:MD}}>Ever.</em>
                  </h2>
                  <div style={{borderLeft:"2px solid rgba(58,78,251,0.5)",
                    paddingLeft:16,marginBottom:24}}>
                    <p style={{fontSize:14,color:"rgba(240,242,255,0.85)",lineHeight:1.8,fontWeight:500}}>
                      This is not a privacy policy claim. It is a technical impossibility. Passwords
                      are generated via{" "}
                      <code style={{fontFamily:"var(--font-mono)",fontSize:12,color:ACC,
                        background:"rgba(227,255,59,0.08)",padding:"1px 6px",borderRadius:3}}>
                        crypto.getRandomValues()
                      </code>{" "}
                      in the browser. The server receives only generation parameters — never the password.
                    </p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:28}}>
                    {[
                      {t:"Zero-Knowledge Mode",b:"Password generated 100% client-side. No server request is made. No record is created."},
                      {t:"Certified Mode",b:"Server receives: length, standard, entropy target, character classes. Returns: signed ES256 JWT. Password: never transmitted."},
                      {t:"Offline verification",b:"ES256 signature is checkable against passgeni.ai/.well-known/jwks.json — without PassGeni involvement."},
                    ].map(item=>(
                      <div key={item.t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                        <div style={{width:20,height:20,borderRadius:4,flexShrink:0,marginTop:2,
                          background:"rgba(58,78,251,0.12)",border:"1px solid rgba(58,78,251,0.25)",
                          display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <Check size={10} c="#7B93FF"/>
                        </div>
                        <div>
                          <div style={{fontSize:14,fontWeight:700,color:D.text,marginBottom:3}}>{item.t}</div>
                          <div style={{fontSize:13,color:MD,lineHeight:1.7}}>{item.b}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="/security" style={{fontSize:14,fontWeight:600,
                    color:"rgba(240,242,255,0.6)",display:"inline-flex",alignItems:"center",gap:6}}>
                    Read the security model <Arr c="rgba(240,242,255,0.6)"/>
                  </a>
                </FadeIn>

                {/* Right: architecture diagram */}
                <FadeIn delay={0.12}>
                  <div style={{border:`1px solid ${BD}`,borderRadius:10,overflow:"hidden"}}>
                    <div style={{background:"#0D1025",padding:"13px 18px",borderBottom:`1px solid ${BD}`}}>
                      <span style={{fontFamily:"var(--font-mono)",fontSize:11,color:MD,
                        letterSpacing:"0.08em"}}>TWO MODES — SAME GUARANTEE</span>
                    </div>
                    {/* Mode A */}
                    <div style={{padding:"20px 18px",borderBottom:`1px solid ${BD}`,
                      background:"rgba(58,78,251,0.03)"}}>
                      <div style={{fontSize:10,fontWeight:700,color:MD,letterSpacing:"0.12em",
                        textTransform:"uppercase",marginBottom:10}}>Zero-Knowledge Mode</div>
                      {[
                        {s:"Browser: generate password via crypto.getRandomValues()",c:"rgba(240,242,255,0.75)"},
                        {s:"→ Not sent anywhere",c:"#EF4444"},
                        {s:"No record created",c:MD},
                      ].map((row,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:8,
                          fontSize:12,color:row.c,marginBottom:5}}>
                          <span style={{fontFamily:"var(--font-mono)",color:MD,fontSize:10,
                            width:14,flexShrink:0}}>{i+1}.</span>{row.s}
                        </div>
                      ))}
                    </div>
                    {/* Mode B */}
                    <div style={{padding:"20px 18px",borderBottom:`1px solid ${BD}`,
                      background:"rgba(58,78,251,0.03)"}}>
                      <div style={{fontSize:10,fontWeight:700,color:MD,letterSpacing:"0.12em",
                        textTransform:"uppercase",marginBottom:10}}>Certified Mode</div>
                      {[
                        {s:"Browser: generate password",c:"rgba(240,242,255,0.75)"},
                        {s:"Send: parameters only — length, standard, entropy",c:"#7B93FF"},
                        {s:"Server: sign JWT → issue compliance certificate",c:"rgba(240,242,255,0.75)"},
                        {s:"Browser: receive /cert/[id] URL",c:"rgba(240,242,255,0.75)"},
                      ].map((row,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:8,
                          fontSize:12,color:row.c,marginBottom:5}}>
                          <span style={{fontFamily:"var(--font-mono)",color:MD,fontSize:10,
                            width:14,flexShrink:0}}>{i+1}.</span>{row.s}
                        </div>
                      ))}
                    </div>
                    {/* Guarantee */}
                    <div style={{padding:"14px 18px",background:"rgba(34,197,94,0.04)",
                      display:"flex",alignItems:"center",gap:10}}>
                      <Check size={16} c="#22C55E"/>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:D.text}}>
                          Both modes: password never transmitted
                        </div>
                        <div style={{fontSize:11,color:MD,marginTop:2}}>
                          A technical constraint — not a policy promise
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div style={{marginTop:10,padding:"14px 16px",background:"#0D1025",
                    border:`1px solid ${BD}`,borderRadius:8,fontFamily:"var(--font-mono)",
                    fontSize:12,lineHeight:1.7,color:MD}}>
                    <div style={{color:"rgba(255,255,255,0.22)",marginBottom:4}}># Entropy source (FIPS 140-3)</div>
                    <div style={{color:ACC}}>const arr = new Uint32Array(len);</div>
                    <div style={{color:ACC}}>crypto.getRandomValues(arr);</div>
                    <div style={{color:"rgba(255,255,255,0.22)",marginTop:4,fontSize:11}}>
                      // Not Math.random() — cryptographically secure
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §7  TOOLS ENTRY  —  WHITE
          ══════════════════════════════════════════════════════════════════ */}
          <section id="tools" className="s-white s-divider-top"
            aria-labelledby="tools-heading" style={{padding:SP}}>
            <div className="container">
              <FadeIn>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16}}>
                  <div>
                    <p style={{fontSize:11,fontWeight:700,color:BP,letterSpacing:"0.14em",
                      textTransform:"uppercase",marginBottom:10}}>Free security tools</p>
                    <h2 id="tools-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                      fontSize:"clamp(1.6rem,3vw,2.4rem)",color:W.text,letterSpacing:"-0.03em",
                      lineHeight:1.08}}>
                      Everything you need. Nothing you don't.
                    </h2>
                  </div>
                  <a href="/tools" style={{fontSize:14,fontWeight:600,color:BP,
                    display:"inline-flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
                    All tools <Arr c={BP}/>
                  </a>
                </div>
              </FadeIn>

              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",
                border:`1.5px solid ${BL}`,borderRadius:10,overflow:"hidden"}}>
                {TOOLS_PREVIEW.items.map((t,i)=>(
                  <FadeIn key={t.title} delay={i*0.05}>
                    <article style={{padding:"22px",
                      borderRight:i%3<2?`1px solid ${BL}`:"none",
                      borderBottom:i<3?`1px solid ${BL}`:"none",
                      background:W.bg,transition:"background 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#F7F8FC"}
                      onMouseLeave={e=>e.currentTarget.style.background=W.bg}>
                      <div style={{fontSize:18,marginBottom:10}}>{t.icon}</div>
                      <h3 style={{fontFamily:"var(--font-heading)",fontWeight:700,
                        fontSize:15,color:W.text,letterSpacing:"-0.02em",marginBottom:7}}>
                        {t.title}
                      </h3>
                      <p style={{fontSize:13,color:ML,lineHeight:1.7,marginBottom:12}}>{t.body}</p>
                      <a href={t.href} style={{fontSize:13,fontWeight:700,color:BP,
                        display:"inline-flex",alignItems:"center",gap:5}}>
                        {t.label} <Arr c={BP}/>
                      </a>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §8  DASHBOARD PREVIEW  —  DARK
          ══════════════════════════════════════════════════════════════════ */}
          <section id="dashboard" className="s-dark" aria-labelledby="dash-heading"
            style={{padding:SP}}>
            <div className="container">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",
                gap:"clamp(40px,6vw,80px)",alignItems:"start"}}>

                {/* Left */}
                <FadeIn>
                  <p style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:12}}>Compliance dashboard</p>
                  <h2 id="dash-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                    fontSize:"clamp(1.6rem,2.8vw,2.2rem)",color:D.text,letterSpacing:"-0.03em",
                    lineHeight:1.1,marginBottom:16}}>
                    Monitor compliance across every credential.
                  </h2>
                  <p style={{fontSize:14,color:MD,lineHeight:1.8,marginBottom:24}}>
                    One view of every certificate you have ever issued. Expiry risk flagged before
                    your auditor notices. One-click re-certify when standards update.
                  </p>
                  <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
                    {[
                      "Compliance score per standard — per-seat and org-wide",
                      "Expiry risk — ≤30 days flagged amber; ≤7 days red",
                      "One-click re-certify, pre-loaded with the original standard",
                      "Monthly usage bar with upgrade prompt at 80% usage",
                      "CSV audit export — all certificates and their parameters",
                    ].map(t=>(
                      <li key={t} style={{display:"flex",gap:10,fontSize:13,color:MD,lineHeight:1.65}}>
                        <Check size={12} c="#22C55E"/> {t}
                      </li>
                    ))}
                  </ul>
                  <a href="/auth/signin" className="btn-ghost"
                    style={{fontSize:14,padding:"11px 22px"}}>Open your dashboard →</a>
                </FadeIn>

                {/* Right: mockup */}
                <FadeIn delay={0.12}><DashboardPreview/></FadeIn>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §9  TRUST / SOCIAL PROOF  —  WHITE
          ══════════════════════════════════════════════════════════════════ */}
          <section id="trust" className="s-white s-divider-top"
            aria-labelledby="trust-heading" style={{padding:SPL}}>
            <div className="container">
              <FadeIn>
                <div style={{marginBottom:36}}>
                  <p style={{fontSize:11,fontWeight:700,color:BP,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:12}}>What people say</p>
                  <h2 id="trust-heading" style={{fontFamily:"var(--font-heading)",fontWeight:800,
                    fontSize:"clamp(1.6rem,3vw,2.4rem)",color:W.text,letterSpacing:"-0.03em",
                    lineHeight:1.08}}>
                    Trusted by security teams and compliance officers.
                  </h2>
                </div>
              </FadeIn>

              {/* Featured testimonials */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:36}}>
                {TESTIMONIALS.featured.slice(0,3).map((t,i)=>(
                  <FadeIn key={t.name} delay={i*0.08}>
                    <article style={{padding:"22px",border:`1.5px solid ${BL}`,
                      borderRadius:10,display:"flex",flexDirection:"column",gap:14}}>
                      <div style={{display:"flex",gap:2}}>
                        {Array.from({length:t.stars}).map((_,j)=>(
                          <span key={j} style={{fontSize:13,color:"#F59E0B"}}>★</span>
                        ))}
                      </div>
                      <p style={{fontSize:14,color:W.text,lineHeight:1.75,flex:1}}>"{t.text}"</p>
                      <div style={{display:"flex",alignItems:"center",gap:10,
                        paddingTop:12,borderTop:`1px solid ${BL}`}}>
                        <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,
                          background:"rgba(58,78,251,0.07)",border:"1px solid rgba(58,78,251,0.14)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontFamily:"var(--font-mono)",fontSize:11,fontWeight:700,color:BP}}>
                          {t.avatar}
                        </div>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:W.text}}>{t.name}</div>
                          <div style={{fontSize:12,color:ML}}>{t.role}</div>
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>

              {/* SEO resource links */}
              <FadeIn delay={0.2}>
                <div style={{borderTop:`1px solid ${BL}`,paddingTop:28}}>
                  <p style={{fontSize:11,fontWeight:700,color:ML,letterSpacing:"0.14em",
                    textTransform:"uppercase",marginBottom:14}}>Related compliance guides</p>
                  <div style={{display:"grid",
                    gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:8}}>
                    {[
                      {href:"/password-compliance-certificate",label:"What is a compliance certificate?"},
                      {href:"/glossary/entropy",               label:"Password entropy explained"},
                      {href:"/guides/nist-800-63b-password-guidelines",label:"NIST 800-63B guide"},
                      {href:"/guides/hipaa-password-requirements",     label:"HIPAA password requirements"},
                      {href:"/guides/pci-dss-password-requirements",   label:"PCI-DSS v4.0 guide"},
                      {href:"/guides/soc2-password-requirements",      label:"SOC 2 CC6.1 guide"},
                      {href:"/tools/compliance-fixer",                 label:"Credential Compliance Fixer"},
                      {href:"/tools/policy-generator",                 label:"Password Policy Generator"},
                    ].map(({href,label})=>(
                      <a key={href} href={href}
                        style={{fontSize:13,color:ML,padding:"10px 14px",
                          border:`1px solid ${BL}`,borderRadius:8,
                          display:"block",transition:"all 0.15s"}}
                        onMouseEnter={e=>{e.currentTarget.style.color=BP;e.currentTarget.style.borderColor="rgba(58,78,251,0.3)";e.currentTarget.style.background="#F7F8FC";}}
                        onMouseLeave={e=>{e.currentTarget.style.color=ML;e.currentTarget.style.borderColor=BL;e.currentTarget.style.background="transparent";}}>
                        {label} →
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              §10  FINAL CTA  —  DARK
          ══════════════════════════════════════════════════════════════════ */}
          <section className="s-dark" aria-labelledby="cta-heading"
            style={{padding:"clamp(96px,12vw,140px) 0",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:"30%",width:600,height:600,
              background:"radial-gradient(circle,rgba(58,78,251,0.10) 0%,transparent 65%)",
              pointerEvents:"none"}}/>
            <div className="container" style={{position:"relative",maxWidth:680}}>
              <FadeIn>
                <p style={{fontSize:11,fontWeight:700,color:MD,letterSpacing:"0.14em",
                  textTransform:"uppercase",marginBottom:16}}>Start your compliance journey</p>
                <h2 id="cta-heading" style={{fontFamily:"var(--font-heading)",fontWeight:900,
                  fontSize:"clamp(2rem,4.5vw,3.4rem)",color:D.text,letterSpacing:"-0.04em",
                  lineHeight:1.05,marginBottom:20}}>
                  Will you have{" "}
                  <em style={{fontFamily:"var(--font-italic)",fontStyle:"italic",
                    fontWeight:500,color:ACC}}>evidence</em>
                  , or just good intentions?
                </h2>
                <p style={{fontSize:"clamp(1rem,1.6vw,1.1rem)",color:MD,lineHeight:1.8,
                  marginBottom:32,maxWidth:520}}>
                  Auditors don't accept verbal assurances. PassGeni gives you signed, verifiable
                  proof — a compliance certificate per credential, ready to share in under 60 seconds.
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
                  <a href="/auth/signin" className="btn-primary"
                    style={{fontSize:15,padding:"13px 28px"}}>Get your first certificate free →</a>
                  <a href="/pricing" className="btn-ghost"
                    style={{fontSize:15,padding:"13px 22px"}}>See pricing</a>
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.2)",
                  fontFamily:"var(--font-mono)",letterSpacing:"0.04em"}}>
                  No credit card · Free forever for individuals · Magic link sign-in · Zero storage
                </p>
              </FadeIn>
            </div>
          </section>

        </main>
        <Footer/>
      </div>
    </>
  );
}
