import{GENERATOR,STATS}from"../../content/copy.js";
import GeneratorWidget from"../generator/GeneratorWidget.js";
export default function GeneratorSection(){return(
<section id="generator" style={{padding:"var(--sec) var(--pad)",maxWidth:1200,margin:"0 auto"}} aria-labelledby="gen-h2">
<div style={{textAlign:"center",marginBottom:60}}>
<div style={{fontFamily:"var(--font-mono)",fontSize:10,fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:"var(--a)",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
<span style={{display:"block",width:20,height:1,background:"var(--a)",opacity:.6}}/>
{GENERATOR.eyebrow}
<span style={{display:"block",width:20,height:1,background:"var(--a)",opacity:.6}}/>
</div>
<h2 id="gen-h2" style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,56px)",color:"var(--t)",letterSpacing:"-.03em",lineHeight:1.05,marginBottom:14}}>{GENERATOR.headline}</h2>
<p style={{fontFamily:"var(--font-body)",fontSize:15,color:"var(--m)",maxWidth:500,margin:"0 auto",lineHeight:1.75}}>{GENERATOR.subheadline}</p>
</div>
<div className="bento" style={{alignItems:"start"}}>
<div className="b4c" style={{background:"var(--s1)",border:"1px solid var(--b1)",borderRadius:"var(--rl)",overflow:"hidden",boxShadow:"0 0 0 1px var(--b1),0 40px 80px rgba(0,0,0,.6)"}}>
<GeneratorWidget/>
</div>
<div className="b2c" style={{display:"flex",flexDirection:"column",gap:10}}>
<div className="bc" style={{padding:24}}>
<div className="bc-line"/>
<div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--a)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:22}}>Security stats</div>
<div style={{display:"flex",flexDirection:"column",gap:18}}>
{STATS.map(({number,label})=>(
<div key={label}>
<div style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(24px,3vw,36px)",color:"var(--t)",letterSpacing:"-.03em",lineHeight:1}}>{number}</div>
<div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--m)",marginTop:5,letterSpacing:".08em",textTransform:"uppercase"}}>{label}</div>
</div>))}
</div>
</div>
<div className="bc bc-feat" style={{padding:24}}>
<div className="bc-line"/>
<div style={{fontSize:32,marginBottom:16,lineHeight:1}}>🔒</div>
<h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:18,color:"var(--t)",marginBottom:12,letterSpacing:"-.01em"}}>Zero knowledge</h3>
<p style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--m)",lineHeight:1.8,marginBottom:18}}>Everything runs in your browser. No passwords ever leave your device. Zero server contact.</p>
<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
{["Client-side","No storage","No tracking"].map(t=>(
<span key={t} style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:600,letterSpacing:".1em",color:"var(--a)",background:"var(--ad)",border:"1px solid rgba(200,255,0,.2)",borderRadius:5,padding:"3px 9px"}}>{t}</span>))}
</div>
</div>
</div>
</div>
</section>);}
