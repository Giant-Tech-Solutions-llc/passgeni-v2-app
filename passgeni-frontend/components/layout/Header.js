import{useState,useEffect}from"react";
import{NAV}from"../../content/copy.js";
import PassGeniLogo from"./Logo.js";
export default function Header(){
const[scrolled,setScrolled]=useState(false);
const[open,setOpen]=useState(false);
useEffect(()=>{const fn=()=>setScrolled(window.scrollY>24);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
useEffect(()=>{const fn=()=>{if(window.innerWidth>900)setOpen(false)};window.addEventListener("resize",fn);return()=>window.removeEventListener("resize",fn);},[]);
useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow="";};},[open]);
return(<header>
<nav className={`nav-root${scrolled?" scrolled":""}`}>
<a href="/"className="nav-logo"><PassGeniLogo height="30px"/><div className="nav-logo-dot"/></a>
<div className="nav-links-row">{NAV.links.map(l=>(<a key={l.label}href={l.href}className="nav-link">{l.label}</a>))}</div>
<div className="nav-right">
<a href="/auth/signin"style={{padding:"9px 18px",fontSize:12,background:"transparent",color:"var(--muted)",border:"1px solid var(--border-2)",borderRadius:8,fontFamily:"var(--font-body)",fontWeight:500,display:"inline-flex",alignItems:"center",transition:"color .2s,border-color .2s"}}onMouseEnter={e=>{e.currentTarget.style.color="var(--text)";e.currentTarget.style.borderColor="#555"}}onMouseLeave={e=>{e.currentTarget.style.color="var(--muted)";e.currentTarget.style.borderColor="var(--border-2)"}}>Sign In</a>
<a href={NAV.ctaHref}className="btn-primary"style={{padding:"9px 20px",fontSize:12}}>Try Free</a>
<button className={`nav-hamburger${open?" open":""}`}onClick={()=>setOpen(v=>!v)}aria-label="Menu"><span/><span/><span/></button>
</div></nav>
<nav className={`mobile-nav-drawer${open?" open":""}`}>
{NAV.links.map(l=>(<a key={l.label}href={l.href}className="mobile-nav-link"onClick={()=>setOpen(false)}>{l.label}</a>))}
<a href={NAV.ctaHref}className="btn-primary"style={{marginTop:32,justifyContent:"center",fontSize:14,padding:"16px"}}onClick={()=>setOpen(false)}>Try Free</a>
</nav></header>);
  }
