import{useState,useEffect}from"react";
import{useSession}from"next-auth/react";
import{NAV}from"../../content/copy.js";
import PassGeniLogo from"./Logo.js";

const TICKER_ITEMS=[
  "Zero Data Retention","Quantum-Ready Entropy","256-bit Minimum",
  "Client-Side Only","Post-Quantum Ready","Zero Knowledge",
  "NIST SP 800-63B","FIPS 140-3 Aligned","No Account Needed","DoD Compliant"
];

export default function Header(){
  const{data:session,status}=useSession();
  const[scrolled,setScrolled]=useState(false);
  const[open,setOpen]=useState(false);
  const[active,setActive]=useState("");

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

  const doubled=[...TICKER_ITEMS,...TICKER_ITEMS];

  return(
    <>
      <header>
        {/* Main nav */}
        <nav className={`nav-root${scrolled?" scrolled":""}`} aria-label="Main navigation">
          <a href="/" className="nav-logo" aria-label="PassGeni home">
            <PassGeniLogo height="28px"/>
            <div className="nav-logo-dot" aria-hidden="true"/>
          </a>

          <div className="nav-links-row" role="list">
            {NAV.links.map(l=>(
              <a key={l.label} href={l.href}
                className={`nav-link${active===l.href?" active":""}`}
                role="listitem"
                onClick={()=>setActive(l.href)}
              >{l.label}</a>
            ))}
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

        {/* Ticker strip — single instance, no static bar */}
        <div className="ticker-wrap" style={{marginTop:60}} role="marquee" aria-label="Feature highlights">
          <div className="ticker-track">
            {doubled.map((item,i)=>(
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <nav
        className={`mobile-nav-drawer${open?" open":""}`}
        aria-hidden={!open}
        aria-label="Mobile navigation"
      >
        {NAV.links.map(l=>(
          <a key={l.label} href={l.href} className="mobile-nav-link"
            onClick={()=>setOpen(false)}
          >{l.label}</a>
        ))}
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
      </nav>
    </>
  );
}
