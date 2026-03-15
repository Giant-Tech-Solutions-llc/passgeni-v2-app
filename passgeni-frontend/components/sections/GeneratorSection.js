import{GENERATOR,STATS}from"../../content/copy.js";
import GeneratorWidget from"../generator/GeneratorWidget.js";

export default function GeneratorSection(){
  return(
    <section id="generator" style={{padding:"var(--section) var(--pad)",maxWidth:1200,margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,56px)"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--text-xs)",fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{display:"block",width:18,height:1,background:"var(--accent)",opacity:.6}}/>
          {GENERATOR.eyebrow}
          <span style={{display:"block",width:18,height:1,background:"var(--accent)",opacity:.6}}/>
        </div>
        <h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,5vw,52px)",color:"var(--text)",letterSpacing:"-.03em",lineHeight:1.05,marginBottom:12}}>
          {GENERATOR.headline}
        </h2>
        <p style={{fontFamily:"var(--font-body)",fontSize:"var(--text-base)",color:"var(--muted)",maxWidth:480,margin:"0 auto",lineHeight:1.75}}>
          {GENERATOR.subheadline}
        </p>
      </div>

      {/* Bento: widget + side cards */}
      <div className="gen-bento">
        {/* Generator widget */}
        <div style={{background:"rgba(13,13,16,.8)",border:"1px solid rgba(200,255,0,.08)",borderRadius:"var(--radius-l)",overflow:"hidden",boxShadow:"0 0 0 1px rgba(200,255,0,.04),0 24px 64px rgba(0,0,0,.6)"}}>
          <GeneratorWidget/>
        </div>

        {/* Side column */}
        <div style={{display:"flex",flexDirection:"column",gap:"var(--gap)"}}>
          {/* Stats card */}
          <div className="bc" style={{flex:1}}>
            <div className="bc-line"/>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--text-xs)",color:"var(--accent)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:18}}>Security stats</div>
            <div style={{display:"flex",flexDirection:"column",gap:"clamp(14px,2.5vw,20px)"}}>
              {STATS.map(({number,label})=>(
                <div key={label}>
                  <div style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(22px,4vw,36px)",color:"var(--text)",letterSpacing:"-.03em",lineHeight:1}}>{number}</div>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--text-xs)",color:"var(--muted)",marginTop:4,letterSpacing:".08em",textTransform:"uppercase"}}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zero knowledge card */}
          <div className="bc bc-feat">
            <div className="bc-line"/>
            <div style={{fontSize:"clamp(22px,3vw,28px)",marginBottom:12,lineHeight:1}}>🔒</div>
            <h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(14px,2vw,16px)",color:"var(--text)",marginBottom:10,letterSpacing:"-.01em"}}>Zero knowledge</h3>
            <p style={{fontFamily:"var(--font-body)",fontSize:"var(--text-base)",color:"var(--muted)",lineHeight:1.75}}>Everything runs in your browser. No passwords ever leave your device. Zero server contact.</p>
            <div style={{display:"flex",gap:7,marginTop:14,flexWrap:"wrap"}}>
              {["Client-side","No storage","No tracking"].map(t=>(
                <span key={t} style={{fontFamily:"var(--font-mono)",fontSize:9,fontWeight:600,letterSpacing:".1em",color:"var(--accent)",background:"var(--accent-dim)",border:"1px solid rgba(200,255,0,.2)",borderRadius:4,padding:"3px 8px"}}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
