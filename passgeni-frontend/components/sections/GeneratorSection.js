import{GENERATOR}from"../../content/copy.js";
import GeneratorWidget from"../generator/GeneratorWidget.js";
import{LogosStrip}from"./index.js";

export default function GeneratorSection(){
  return(
    <section id="generator" style={{padding:"var(--section) var(--pad) 0",maxWidth:1200,margin:"0 auto"}}>
      {/* Section header */}
      <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,56px)"}}>
        <div style={{fontFamily:"var(--font-body)",fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{display:"block",width:18,height:1,background:"var(--accent)",opacity:.6}}/>
          {GENERATOR.eyebrow}
          <span style={{display:"block",width:18,height:1,background:"var(--accent)",opacity:.6}}/>
        </div>
        <h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(26px,5vw,52px)",color:"var(--text)",letterSpacing:"-.03em",lineHeight:1.05,marginBottom:12}}>
          {GENERATOR.headline}
        </h2>
        <p style={{fontFamily:"var(--font-body)",fontSize:"var(--text-base)",color:"var(--muted)",maxWidth:480,margin:"0 auto",lineHeight:1.75}}>
          {GENERATOR.subheadline}
        </p>
      </div>

      {/* Generator widget — full width, clean */}
      <div style={{background:"rgba(13,13,16,.85)",border:"1px solid rgba(200,255,0,.1)",borderRadius:"var(--radius-l)",overflow:"hidden",boxShadow:"0 0 0 1px rgba(200,255,0,.04),0 24px 64px rgba(0,0,0,.6)",maxWidth:800,margin:"0 auto"}}>
        <GeneratorWidget/>
      </div>

      {/* Logos trust strip directly below generator */}
      <div style={{maxWidth:1200,margin:"clamp(40px,5vw,64px) auto 0"}}>
        <LogosStrip/>
      </div>
    </section>
  );
}
