import{useState,useEffect,useRef,useCallback}from"react";
import{createPortal}from"react-dom";
import{motion,AnimatePresence,useScroll,useTransform}from"framer-motion";
import{useSession}from"next-auth/react";
import{NAV}from"../../content/copy.js";
import PassGeniLogo from"./Logo.js";

// ─── Menu Data ────────────────────────────────────────────────
const TOOLS_MENU={
  columns:[
    {label:"Security",items:[
      {icon:"🔍",label:"Breach Checker",desc:"Check if your password appeared in a data breach",href:"/tools/breach-checker"},
      {icon:"🔗",label:"Secure Password Sharing",desc:"Share credentials via encrypted one-time links",href:"/tools/secure-share"},
    ]},
    {label:"Analysis",items:[
      {icon:"📊",label:"Password Strength Checker",desc:"Entropy score, crack time, DNA grade",href:"/tools/strength-checker"},
      {icon:"🛡️",label:"Password Audit Tool",desc:"Audit multiple passwords at once",href:"/tools/audit",business:true},
    ]},
    {label:"Business",items:[
      {icon:"📋",label:"Password Policy Generator",desc:"Generate a compliant written password policy",href:"/tools/policy-generator",business:true},
    ]},
    {label:"Utility",items:[
      {icon:"📶",label:"WiFi QR Generator",desc:"Create a scannable QR code for your WiFi",href:"/tools/wifi-qr",business:true},
    ]},
  ],
  footer:{label:"New to PassGeni? Start with the generator →",href:"/#generator"},
};

const GUIDES_MENU={
  columns:[
    {label:"Compliance",items:[
      {label:"HIPAA Password Requirements",href:"/guides/hipaa-password-requirements"},
      {label:"PCI-DSS v4.0 Guide",href:"/guides/pci-dss-v4-password-requirements"},
      {label:"SOC 2 Requirements",href:"/guides/soc2-password-requirements"},
      {label:"ISO 27001 Controls",href:"/guides/iso-27001-password-controls"},
      {label:"NIST 800-63B Plain English",href:"/guides/nist-800-63b-password-guide"},
      {label:"DoD / Gov Requirements",href:"/guides/dod-password-requirements"},
    ]},
    {label:"By Profession",items:[
      {label:"Doctors & Healthcare",href:"/guides/healthcare-password-security"},
      {label:"Developers & DevOps",href:"/guides/developer-password-security"},
      {label:"Finance & Legal",href:"/guides/finance-legal-password-security"},
      {label:"Educators & HR",href:"/guides/education-hr-password-security"},
    ]},
    {label:"Fundamentals",items:[
      {label:"What is Password Entropy",href:"/guides/what-is-password-entropy"},
      {label:"Passphrase vs Password",href:"/guides/passphrase-vs-password"},
      {label:"Zero-Knowledge Security",href:"/guides/zero-knowledge-security"},
      {label:"Post-Quantum Passwords",href:"/guides/post-quantum-passwords"},
    ]},
  ],
  footer:{label:"Browse all guides →",href:"/guides"},
};

// ─── Portal: positions dropdown via fixed layout, clamps to vw ─
function MegaMenuPortal({triggerRef,dropWidth,onMouseEnter,onMouseLeave,children}){
  const[mounted,setMounted]=useState(false);
  const[pos,setPos]=useState({top:0,left:0});
  const EDGE_PAD=16;

  useEffect(()=>{ setMounted(true); },[]);

  useEffect(()=>{
    if(!mounted||!triggerRef.current)return;
    const rect=triggerRef.current.getBoundingClientRect();
    const vw=window.innerWidth;
    const rawLeft=rect.left;
    const clampedLeft=Math.min(rawLeft,vw-dropWidth-EDGE_PAD);
    const safeLeft=Math.max(EDGE_PAD,clampedLeft);
    setPos({top:rect.bottom+10,left:safeLeft});
  },[mounted,triggerRef,dropWidth]);

  if(!mounted)return null;
  return createPortal(
    <div
      style={{position:"fixed",top:pos.top,left:pos.left,zIndex:9000,width:dropWidth}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
}

// ─── Shared dropdown shell ─────────────────────────────────────
const SHELL={
  background:"rgba(7,7,9,0.98)",
  border:"1px solid rgba(200,255,0,0.08)",
  borderRadius:16,
  backdropFilter:"blur(24px)",
  WebkitBackdropFilter:"blur(24px)",
  boxShadow:"0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,255,0,0.04)",
  padding:"28px 28px 20px",
  maxWidth:"calc(100vw - 32px)",
  boxSizing:"border-box",
};

function ColLabel({children}){
  return(
    <div style={{fontFamily:"var(--font-body)",fontSize:10,fontWeight:700,color:"rgba(200,255,0,.5)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:14,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
      {children}
    </div>
  );
}

function MenuItem({href,icon,label,desc,badge}){
  return(
    <a href={href}
      style={{display:"flex",alignItems:"flex-start",gap:14,padding:"10px 12px",borderRadius:10,textDecoration:"none",transition:"background .15s",marginBottom:2}}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(200,255,0,0.05)"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
    >
      <div style={{width:36,height:36,borderRadius:8,background:"rgba(200,255,0,0.06)",border:"1px solid rgba(200,255,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,marginTop:1}}>
        {icon||"⚙️"}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
          <span style={{fontFamily:"var(--font-body)",fontSize:14,fontWeight:600,color:"#f0f0f0",lineHeight:1.2}}>{label}</span>
          {badge&&<span style={{background:"rgba(200,255,0,0.08)",color:"rgba(200,255,0,0.5)",fontSize:9,borderRadius:100,padding:"2px 8px",fontFamily:"var(--font-body)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",flexShrink:0}}>Team</span>}
        </div>
        {desc&&<div style={{fontFamily:"var(--font-body)",fontSize:12,color:"#666",lineHeight:1.5}}>{desc}</div>}
      </div>
    </a>
  );
}

function GuideLink({href,label}){
  const arrowRef=useRef(null);
  return(
    <a href={href}
      style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"9px 12px",borderRadius:8,textDecoration:"none",transition:"background .15s,color .15s",fontFamily:"var(--font-body)",fontSize:13,fontWeight:500,color:"#aaa",lineHeight:1.4,marginBottom:2}}
      onMouseEnter={e=>{e.currentTarget.style.background="rgba(200,255,0,0.05)";e.currentTarget.style.color="#fff";if(arrowRef.current)arrowRef.current.style.opacity="1";}}
      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#aaa";if(arrowRef.current)arrowRef.current.style.opacity="0";}}
    >
      {label}
      <span ref={arrowRef} style={{color:"rgba(200,255,0,.6)",fontSize:12,opacity:0,transition:"opacity .15s",flexShrink:0}}>→</span>
    </a>
  );
}

function DropdownFooter({tagline,href,label}){
  return(
    <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:16,marginTop:4,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
      <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"#3a3a3a"}}>{tagline}</span>
      <a href={href}
        style={{fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,color:"rgba(200,255,0,.7)",textDecoration:"none",transition:"color .15s",whiteSpace:"nowrap"}}
        onMouseEnter={e=>e.currentTarget.style.color="#C8FF00"}
        onMouseLeave={e=>e.currentTarget.style.color="rgba(200,255,0,.7)"}
      >{label}</a>
    </div>
  );
}

function ToolsDropdown(){
  return(
    <div style={SHELL}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:24,rowGap:8}}>
        {TOOLS_MENU.columns.map(col=>(
          <div key={col.label} style={{marginBottom:8}}>
            <ColLabel>{col.label}</ColLabel>
            {col.items.map(item=>(
              <MenuItem key={item.label} href={item.href} icon={item.icon} label={item.label} desc={item.desc} badge={item.business}/>
            ))}
          </div>
        ))}
      </div>
      <DropdownFooter tagline="All tools are free · No account needed" href={TOOLS_MENU.footer.href} label={TOOLS_MENU.footer.label}/>
    </div>
  );
}

function GuidesDropdown(){
  return(
    <div style={SHELL}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",columnGap:20,rowGap:8}}>
        {GUIDES_MENU.columns.map(col=>(
          <div key={col.label} style={{marginBottom:8}}>
            <ColLabel>{col.label}</ColLabel>
            {col.items.map(item=>(
              <GuideLink key={item.label} href={item.href} label={item.label}/>
            ))}
          </div>
        ))}
      </div>
      <DropdownFooter tagline="Free compliance guides · Updated 2024" href={GUIDES_MENU.footer.href} label={GUIDES_MENU.footer.label}/>
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────
export default function Header(){
  const{data:session,status}=useSession();
  const{scrollY,scrollYProgress}=useScroll();
  const headerBg=useTransform(scrollY,[0,80],["rgba(6,6,8,0)","rgba(6,6,8,0.95)"]);
  const headerBlur=useTransform(scrollY,[0,80],["blur(0px)","blur(20px)"]);
  const[scrolled,setScrolled]=useState(false);
  const[open,setOpen]=useState(false);
  const[active,setActive]=useState("");
  const[megaOpen,setMegaOpen]=useState(null);
  const[mobileExpanded,setMobileExpanded]=useState(null);
  const closeTimer=useRef(null);
  const toolsRef=useRef(null);
  const guidesRef=useRef(null);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>24);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const fn=()=>{if(window.innerWidth>900)setOpen(false);};
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);

  useEffect(()=>{
    document.body.style.overflow=open?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[open]);

  useEffect(()=>{
    const fn=(e)=>{if(e.key==="Escape")setMegaOpen(null);};
    document.addEventListener("keydown",fn);
    return()=>document.removeEventListener("keydown",fn);
  },[]);

  const openMega=useCallback((key)=>{
    clearTimeout(closeTimer.current);
    setMegaOpen(key);
  },[]);
  const scheduleMegaClose=useCallback(()=>{
    closeTimer.current=setTimeout(()=>setMegaOpen(null),200);
  },[]);

  const triggerRef=(key)=>key==="tools"?toolsRef:guidesRef;
  const dropWidth=(key)=>key==="tools"?640:700;

  return(
    <>
      {/* Scroll progress bar */}
      <motion.div style={{scaleX:scrollYProgress,transformOrigin:"0%",position:"fixed",top:0,left:0,right:0,height:2,background:"#C8FF00",boxShadow:"0 0 6px rgba(200,255,0,0.5)",zIndex:9999}}/>

      <motion.header style={{backgroundColor:headerBg,backdropFilter:headerBlur,position:"fixed",top:0,left:0,right:0,zIndex:1000}}>
        <nav className={`nav-root${scrolled?" scrolled":""}`} aria-label="Main navigation">
          <a href="/" className="nav-logo" aria-label="PassGeni home">
            <PassGeniLogo height="28px"/>
            <div className="nav-logo-dot" aria-hidden="true"/>
          </a>

          <div className="nav-links-row" role="list">
            {NAV.links.map(l=>{
              const isMega=l.label==="Tools"||l.label==="Guides";
              const key=l.label.toLowerCase();
              if(!isMega){
                return(
                  <a key={l.label} href={l.href}
                    className={`nav-link${active===l.href?" active":""}`}
                    role="listitem"
                    onClick={()=>setActive(l.href)}
                  >{l.label}</a>
                );
              }
              const tRef=triggerRef(key);
              const isOpen=megaOpen===key;
              return(
                <div key={l.label} ref={tRef} style={{position:"relative"}} role="listitem"
                  onMouseEnter={()=>openMega(key)}
                  onMouseLeave={scheduleMegaClose}
                >
                  <a href={l.href}
                    className={`nav-link${active===l.href?" active":""}`}
                    onClick={()=>setActive(l.href)}
                    style={{display:"flex",alignItems:"center",gap:4}}
                  >
                    {l.label}
                    <motion.span
                      animate={{rotate:isOpen?180:0}}
                      transition={{duration:0.2}}
                      style={{fontSize:8,opacity:.5,display:"inline-block",marginTop:1}}
                    >▼</motion.span>
                  </a>
                  <AnimatePresence>
                    {isOpen&&(
                      <MegaMenuPortal
                        triggerRef={tRef}
                        dropWidth={dropWidth(key)}
                        onMouseEnter={()=>openMega(key)}
                        onMouseLeave={scheduleMegaClose}
                      >
                        <motion.div
                          initial={{opacity:0,y:8,scale:0.98}}
                          animate={{opacity:1,y:0,scale:1}}
                          exit={{opacity:0,y:4,scale:0.98}}
                          transition={{duration:0.18,ease:"easeOut"}}
                        >
                          {key==="tools"?<ToolsDropdown/>:<GuidesDropdown/>}
                        </motion.div>
                      </MegaMenuPortal>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="nav-right">
            <a href="/auth/signin" className="nav-signin">Sign In</a>
            {status!=="loading"&&session&&(
              <a href="/dashboard" className="btn-primary" style={{padding:"9px 18px",fontSize:12}}>Dashboard →</a>
            )}
            <button
              className={`nav-hamburger${open?" open":""}`}
              onClick={()=>setOpen(v=>!v)}
              aria-label={open?"Close menu":"Open menu"}
              aria-expanded={open}
            >
              <span/><span/><span/>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open&&(
          <motion.nav
            key="mobile-drawer"
            className="mobile-nav-drawer open"
            aria-label="Mobile navigation"
            initial={{opacity:0,y:-16}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-10}}
            transition={{duration:0.3,ease:"easeOut"}}
          >
            {NAV.links.map((l,li)=>{
              const isMega=l.label==="Tools"||l.label==="Guides";
              const key=l.label.toLowerCase();

              if(!isMega){
                return(
                  <motion.a key={l.label} href={l.href} className="mobile-nav-link"
                    initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                    transition={{delay:li*0.05}}
                    onClick={()=>setOpen(false)}
                  >{l.label}</motion.a>
                );
              }

              const menuData=key==="tools"?TOOLS_MENU:GUIDES_MENU;
              const isExpanded=mobileExpanded===key;

              return(
                <div key={l.label} style={{borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  <motion.button
                    initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                    transition={{delay:li*0.05}}
                    style={{background:"none",border:"none",cursor:"pointer",width:"100%",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0",fontFamily:"var(--font-body)",fontSize:20,fontWeight:600,color:isExpanded?"var(--accent)":"var(--muted)"}}
                    onClick={()=>setMobileExpanded(isExpanded?null:key)}
                  >
                    {l.label}
                    <motion.span
                      animate={{rotate:isExpanded?45:0}}
                      transition={{duration:0.2}}
                      style={{fontSize:20,lineHeight:1,color:"rgba(200,255,0,.5)",display:"inline-block"}}
                    >+</motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded&&(
                      <motion.div
                        initial={{height:0,opacity:0}}
                        animate={{height:"auto",opacity:1}}
                        exit={{height:0,opacity:0}}
                        transition={{duration:0.25,ease:"easeOut"}}
                        style={{overflow:"hidden"}}
                      >
                        <div style={{paddingBottom:20,display:"flex",flexDirection:"column",gap:20}}>
                          {menuData.columns.map(col=>(
                            <div key={col.label}>
                              <div style={{fontFamily:"var(--font-body)",fontSize:9,fontWeight:700,color:"rgba(200,255,0,.45)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:10,paddingBottom:8,borderBottom:"1px solid rgba(255,255,255,.04)"}}>{col.label}</div>
                              {col.items.map(item=>(
                                <a key={item.label} href={item.href}
                                  style={{display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:10,textDecoration:"none",background:"rgba(255,255,255,.02)",marginBottom:4,border:"1px solid rgba(255,255,255,.04)",transition:"background .15s"}}
                                  onClick={()=>setOpen(false)}
                                  onTouchStart={e=>e.currentTarget.style.background="rgba(200,255,0,.06)"}
                                  onTouchEnd={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"}
                                >
                                  {item.icon&&(
                                    <div style={{width:32,height:32,borderRadius:7,background:"rgba(200,255,0,0.06)",border:"1px solid rgba(200,255,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                                      {item.icon}
                                    </div>
                                  )}
                                  <div style={{flex:1,minWidth:0}}>
                                    <div style={{fontFamily:"var(--font-body)",fontSize:14,fontWeight:600,color:"#e8e8e8",lineHeight:1.3}}>{item.label}</div>
                                    {item.desc&&<div style={{fontFamily:"var(--font-body)",fontSize:11,color:"#555",marginTop:2,lineHeight:1.4}}>{item.desc}</div>}
                                  </div>
                                  {item.business&&<span style={{background:"rgba(200,255,0,.07)",color:"rgba(200,255,0,.45)",fontSize:9,borderRadius:100,padding:"2px 7px",fontFamily:"var(--font-body)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",whiteSpace:"nowrap",flexShrink:0}}>Team</span>}
                                  <span style={{color:"rgba(200,255,0,.25)",fontSize:13,flexShrink:0}}>›</span>
                                </a>
                              ))}
                            </div>
                          ))}
                          <a href={menuData.footer.href}
                            style={{fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,color:"rgba(200,255,0,.65)",textDecoration:"none",padding:"8px 2px",display:"flex",alignItems:"center",gap:6}}
                            onClick={()=>setOpen(false)}
                          >{menuData.footer.label}</a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div style={{marginTop:28,display:"flex",flexDirection:"column",gap:12}}>
              <a href="/auth/signin" className="btn-ghost"
                style={{justifyContent:"center",fontSize:15,padding:"14px"}}
                onClick={()=>setOpen(false)}
              >Sign In</a>
              {status!=="loading"&&session&&(
                <a href="/dashboard" className="btn-primary"
                  style={{justifyContent:"center",fontSize:15,padding:"14px"}}
                  onClick={()=>setOpen(false)}
                >Dashboard →</a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
