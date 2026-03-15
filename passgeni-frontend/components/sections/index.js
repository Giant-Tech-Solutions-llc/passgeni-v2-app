import{useState}from"react";
import{STATS,HOW_IT_WORKS,FEATURES,TOOLS_PREVIEW,PRICING,TESTIMONIALS,FAQ,WAITLIST}from"../../content/copy.js";
import{Headline}from"../ui/index.js";
const LOGOS=["Microsoft","Google","Amazon","Stripe","Shopify","Cloudflare","GitHub","Atlassian","Twilio","Okta","Datadog","HashiCorp","Vercel","MongoDB","Elastic"];
export function StatsBar(){return(<section style={{borderTop:"1px solid rgba(200,255,0,0.08)",borderBottom:"1px solid rgba(200,255,0,0.08)"}}>
<div style={{maxWidth:1200,margin:"0 auto",padding:"clamp(36px,5vw,52px) var(--pad)",display:"flex",justifyContent:"space-around",gap:40,flexWrap:"wrap"}}>
{STATS.map(({number,label})=>(<div key={label} style={{textAlign:"center"}}><div style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,52px)",color:"var(--text)",letterSpacing:"-.04em",lineHeight:1}}>{number}</div><div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted)",marginTop:8,letterSpacing:".1em",textTransform:"uppercase"}}>{label}</div></div>))}
</div>
<div style={{borderTop:"1px solid rgba(200,255,0,0.05)",padding:"20px 0",overflow:"hidden",position:"relative"}}>
<div style={{textAlign:"center",marginBottom:14}}><span style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--muted)",letterSpacing:".14em",textTransform:"uppercase"}}>Trusted by security teams at</span></div>
<div style={{position:"relative"}}><div style={{position:"absolute",left:0,top:0,bottom:0,width:80,background:"linear-gradient(to right,var(--bg),transparent)",zIndex:2,pointerEvents:"none"}}/><div style={{position:"absolute",right:0,top:0,bottom:0,width:80,background:"linear-gradient(to left,var(--bg),transparent)",zIndex:2,pointerEvents:"none"}}/>
<div style={{display:"flex",width:"max-content",animation:"ticker 50s linear infinite",gap:48,alignItems:"center",padding:"0 24px"}} onMouseEnter={e=>e.currentTarget.style.animationPlayState="paused"} onMouseLeave={e=>e.currentTarget.style.animationPlayState="running"}>
{[...LOGOS,...LOGOS].map((name,i)=>(<span key={i} style={{fontFamily:"var(--font-heading)",fontSize:16,fontWeight:800,color:"rgba(255,255,255,.15)",letterSpacing:"-.02em",whiteSpace:"nowrap",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.35)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.15)"}>{name}</span>))}
</div></div></div></section>);}
export function HowItWorks(){return(<section id="how" style={{padding:"var(--section) var(--pad)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:56}}><div className="eyebrow" style={{justifyContent:"center"}}>{HOW_IT_WORKS.eyebrow}</div><h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,52px)",color:"var(--text)",letterSpacing:"-.03em",lineHeight:1.05,maxWidth:520,margin:"0 auto",whiteSpace:"pre-line"}}>{HOW_IT_WORKS.headline}</h2></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,alignItems:"stretch"}}>
{HOW_IT_WORKS.steps.map((step)=>(<article key={step.step} className="bc bc-a" style={{minHeight:260}}>
<div className="bc-line"/><div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--accent)",letterSpacing:".14em",marginBottom:20,textTransform:"uppercase"}}>{step.step}</div>
<h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:20,color:"var(--text)",marginBottom:14,letterSpacing:"-.02em"}}>{step.title}</h3>
<p style={{fontSize:15,color:"var(--muted)",lineHeight:1.8,flex:1,marginBottom:24}}>{step.body}</p>
<div style={{display:"inline-block",background:"rgba(200,255,0,0.06)",border:"1px solid rgba(200,255,0,0.15)",borderRadius:6,padding:"6px 14px",fontFamily:"var(--font-mono)",fontSize:10,color:"rgba(200,255,0,.7)",letterSpacing:".06em"}}>{step.accent}</div>
</article>))}</div></section>);}
export function FeaturesSection(){return(<section id="features" style={{padding:"0 var(--pad) var(--section)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:56}}><div className="eyebrow" style={{justifyContent:"center"}}>{FEATURES.eyebrow}</div><h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,52px)",color:"var(--text)",letterSpacing:"-.03em"}}>Not just random.<br/><span style={{color:"var(--accent)"}}>Reasoned.</span></h2></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,alignItems:"stretch"}}>
{FEATURES.items.slice(0,6).map((item)=>(<article key={item.title} className="bc bc-a" style={{minHeight:220}}>
<div className="bc-line"/><div style={{fontSize:28,marginBottom:16,color:"var(--accent)",lineHeight:1}}>{item.icon}</div>
<h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:17,color:"var(--text)",marginBottom:12,letterSpacing:"-.02em",lineHeight:1.3}}>{item.title}</h3>
<p style={{fontSize:14,color:"var(--muted)",lineHeight:1.8}}>{item.body}</p>
</article>))}</div></section>);}
export function ToolsPreview(){return(<section style={{padding:"0 var(--pad) var(--section)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:56}}><div className="eyebrow" style={{justifyContent:"center"}}>{TOOLS_PREVIEW.eyebrow}</div><h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,52px)",color:"var(--text)",letterSpacing:"-.03em"}}>Everything you need.<br/><span style={{color:"var(--accent)"}}>Nothing you don't.</span></h2></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,alignItems:"stretch"}}>
{TOOLS_PREVIEW.items.slice(0,6).map((item)=>(<a key={item.title} href={item.href} className="bc bc-a" style={{textDecoration:"none",minHeight:220}}>
<div className="bc-line"/><div style={{fontSize:30,marginBottom:16,lineHeight:1}}>{item.icon}</div>
<h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:17,color:"var(--text)",marginBottom:10,flex:1}}>{item.title}</h3>
<p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75,marginBottom:16}}>{item.body}</p>
<span style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--accent)",letterSpacing:".06em"}}>{item.label} →</span>
</a>))}</div></section>);}
export function PricingSection(){return(<section id="pricing" style={{padding:"var(--section) var(--pad)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:64}}><div className="eyebrow" style={{justifyContent:"center"}}>{PRICING.eyebrow}</div><h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,52px)",color:"var(--text)",letterSpacing:"-.03em",marginBottom:14,whiteSpace:"pre-line"}}>{PRICING.headline}</h2><p style={{fontFamily:"var(--font-body)",fontSize:16,color:"var(--muted)",maxWidth:440,margin:"0 auto"}}>{PRICING.subheadline}</p></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr 1fr",gap:10,alignItems:"stretch"}}>
{PRICING.plans.map((plan,i)=>(<div key={plan.name} style={{background:i===1?"linear-gradient(135deg,rgba(13,13,16,.9) 0%,rgba(200,255,0,.05) 100%)":"rgba(13,13,16,.7)",border:i===1?"1px solid rgba(200,255,0,.3)":"1px solid rgba(200,255,0,.08)",borderRadius:"var(--radius-l)",padding:"36px 28px",display:"flex",flexDirection:"column",position:"relative",backdropFilter:"blur(12px)",transition:"border-color .3s"}}>
{i===1&&<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(200,255,0,.6),transparent)"}}/>}
{plan.badge&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:"var(--accent)",color:"#000",fontFamily:"var(--font-mono)",fontSize:9,fontWeight:700,letterSpacing:".12em",padding:"5px 18px",borderRadius:"0 0 10px 10px",whiteSpace:"nowrap"}}>{plan.badge}</div>}
<div style={{marginBottom:24,paddingTop:plan.badge?20:0}}><div style={{fontFamily:"var(--font-mono)",fontSize:10,color:plan.color||"var(--accent)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:12}}>{plan.name}</div>
<div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:10}}><span style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:56,color:"var(--text)",letterSpacing:"-.04em",lineHeight:1}}>{plan.price}</span>{plan.period&&<span style={{fontFamily:"var(--font-body)",fontSize:15,color:"var(--muted)"}}>{plan.period}</span>}</div>
<p style={{fontFamily:"var(--font-body)",fontSize:15,color:"var(--muted)",lineHeight:1.6}}>{plan.tagline}</p></div>
<a href={plan.ctaHref} className={plan.featured?"btn-primary":"btn-ghost"} style={{width:"100%",justifyContent:"center",marginBottom:24,display:"flex",fontSize:14,padding:"14px 20px",boxSizing:"border-box"}}>{plan.cta}</a>
<div style={{borderTop:"1px solid rgba(200,255,0,0.08)",paddingTop:20,flex:1}}>
{plan.features.map((f,fi)=>(<div key={fi} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}><span style={{color:"var(--accent)",fontSize:12,marginTop:2,flexShrink:0}}>✓</span><span style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--text)",lineHeight:1.5}}>{f}</span></div>))}
{plan.missing?.slice(0,2).map((f,fi)=>(<div key={fi} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,opacity:.3}}><span style={{fontSize:12,color:"var(--muted)",marginTop:2,flexShrink:0}}>—</span><span style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--muted)",lineHeight:1.5}}>{f}</span></div>))}
</div></div>))}
</div><p style={{textAlign:"center",fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted-2)",marginTop:28,letterSpacing:".08em"}}>{PRICING.footer}</p></section>);}
export function TestimonialsSection(){const items=TESTIMONIALS.items;const mid=Math.ceil(items.length/2);const rows=[items.slice(0,mid),items.slice(mid)];
return(<section style={{padding:"0 0 var(--section)",overflow:"hidden"}}>
<div style={{maxWidth:1200,margin:"0 auto",padding:"0 var(--pad)",marginBottom:52,textAlign:"center"}}><div className="eyebrow" style={{justifyContent:"center"}}>{TESTIMONIALS.eyebrow}</div><Headline>{TESTIMONIALS.headline}</Headline></div>
{rows.map((row,ri)=>{const doubled=[...row,...row];const dur=ri===0?90:110;return(<div key={ri} style={{marginBottom:12,position:"relative"}}>
<div style={{position:"absolute",left:0,top:0,bottom:0,width:120,background:"linear-gradient(to right,var(--bg),transparent)",zIndex:2,pointerEvents:"none"}}/>
<div style={{position:"absolute",right:0,top:0,bottom:0,width:120,background:"linear-gradient(to left,var(--bg),transparent)",zIndex:2,pointerEvents:"none"}}/>
<div style={{display:"flex",gap:12,width:"max-content",animation:"scrollLeft "+dur+"s linear infinite",animationDirection:ri===1?"reverse":"normal"}} onMouseEnter={e=>e.currentTarget.style.animationPlayState="paused"} onMouseLeave={e=>e.currentTarget.style.animationPlayState="running"}>
{doubled.map((t,i)=>(<article key={i} className="bc" style={{width:320,flexShrink:0,padding:"26px 28px",minHeight:190}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(200,255,0,.25)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(200,255,0,.08)"}>
<div style={{display:"flex",gap:3,marginBottom:14}}>{Array(t.stars||5).fill("★").map((s,si)=><span key={si} style={{color:"var(--accent)",fontSize:14}}>{s}</span>)}</div>
<p style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--muted)",lineHeight:1.8,marginBottom:18,flex:1}}>"{t.text}"</p>
<div><div style={{fontFamily:"var(--font-heading)",fontWeight:700,fontSize:15,color:"var(--text)"}}>{t.name}</div><div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--muted-2)",marginTop:3,letterSpacing:".05em"}}>{t.role}</div></div>
</article>))}</div></div>);})}
</section>);}
export function FAQSection(){const[open,setOpen]=useState(null);return(<section id="faq" style={{padding:"0 var(--pad) var(--section)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:56}}><div className="eyebrow" style={{justifyContent:"center"}}>{FAQ.eyebrow}</div><Headline>{FAQ.headline}</Headline></div>
<div style={{maxWidth:720,margin:"0 auto"}}>
{FAQ.items.map((item,i)=>(<div key={i} className="faq-item" onClick={()=>setOpen(open===i?null:i)}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:24}}><div style={{display:"flex",gap:18,alignItems:"center"}}><span style={{fontFamily:"var(--font-mono)",fontSize:11,color:"rgba(200,255,0,.45)",letterSpacing:".1em",flexShrink:0,width:26}}>{String(i+1).padStart(2,"0")}</span><h3 style={{fontFamily:"var(--font-heading)",fontSize:17,fontWeight:700,color:open===i?"var(--accent)":"var(--text)",margin:0,lineHeight:1.4}}>{item.question}</h3></div><span style={{color:"var(--accent)",fontSize:22,flexShrink:0,transition:"transform .2s",transform:open===i?"rotate(45deg)":"none",display:"block"}}>+</span></div>
{open===i&&<p style={{fontFamily:"var(--font-body)",fontSize:15,color:"var(--muted)",lineHeight:1.85,marginTop:16,paddingLeft:44,animation:"fadeIn .25s ease"}}>{item.answer}</p>}
</div>))}</div></section>);}
export function FeaturedBlogSection(){
const posts=[{slug:"pci-dss-v4-password-changes-explained",title:"PCI-DSS v4.0 Raised the Password Bar. Here's What You Missed.",excerpt:"The March 2024 deadline passed. Here is what changed and what auditors will check.",category:"Compliance",color:"#ffb74d",readTime:6,date:"Jan 10, 2025"},{slug:"why-password-complexity-rules-backfire",title:"Why Password Complexity Rules Make You Less Secure",excerpt:"Requiring uppercase, a number, and a symbol teaches users to choose P@ssw0rd.",category:"Research",color:"#ce93d8",readTime:5,date:"Jan 14, 2025"},{slug:"announcing-passgeni-v2",title:"PassGeni V2: DNA Score, Compliance Presets, and 6 New Tools",excerpt:"Everything that shipped in V2 — DNA Score, six new free tools, HIPAA and PCI-DSS presets.",category:"Product",color:"#81c784",readTime:4,date:"Jan 20, 2025"}];
return(<section style={{padding:"0 var(--pad) var(--section)",maxWidth:1200,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:48}}><div className="eyebrow" style={{justifyContent:"center"}}>From the blog</div><h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(24px,3.5vw,44px)",color:"var(--text)",letterSpacing:"-.03em"}}>Latest posts.</h2></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,alignItems:"stretch"}}>
{posts.map(p=>(<a key={p.slug} href={"/blog/"+p.slug} className="bc bc-a" style={{textDecoration:"none",minHeight:260}}>
<div className="bc-line"/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><span style={{fontFamily:"var(--font-mono)",fontSize:9,color:p.color,letterSpacing:".12em",textTransform:"uppercase",background:p.color+"18",padding:"4px 12px",borderRadius:100}}>{p.category}</span><span style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--muted-2)"}}>{p.readTime} min</span></div>
<h3 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:17,color:"var(--text)",lineHeight:1.35,marginBottom:12,flex:1}}>{p.title}</h3>
<p style={{fontSize:14,color:"var(--muted)",lineHeight:1.75,marginBottom:20}}>{p.excerpt}</p>
<span style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--accent)",letterSpacing:".06em"}}>Read more →</span>
</a>))}
</div>
<div style={{textAlign:"center",marginTop:36}}><a href="/blog" style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--accent)",letterSpacing:".08em",display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",border:"1px solid rgba(200,255,0,.2)",borderRadius:8,transition:"border-color .2s,background .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,255,0,.4)";e.currentTarget.style.background="rgba(200,255,0,.04)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,255,0,.2)";e.currentTarget.style.background="transparent"}}>View all posts →</a></div>
</section>);}
export function WaitlistSection(){return(<section id="waitlist" style={{margin:"0 auto clamp(80px,10vw,120px)",padding:"0 var(--pad)",maxWidth:1200}}>
<div className="bc bc-feat" style={{overflow:"hidden",position:"relative",padding:"clamp(56px,6vw,88px)",textAlign:"center"}}>
<div aria-hidden style={{position:"absolute",top:-80,right:-80,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,255,0,.10),transparent 70%)",pointerEvents:"none"}}/>
<div aria-hidden style={{position:"absolute",bottom:-60,left:-60,width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,255,0,.06),transparent 70%)",pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:1,maxWidth:640,margin:"0 auto"}}>
<div style={{fontFamily:"var(--font-mono)",fontSize:10,color:"var(--accent)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span className="live-dot"/>{WAITLIST.eyebrow}<span className="live-dot"/></div>
<h2 style={{fontFamily:"var(--font-heading)",fontWeight:800,fontSize:"clamp(28px,4vw,56px)",color:"var(--text)",letterSpacing:"-.03em",marginBottom:18,lineHeight:1.05,whiteSpace:"pre-line"}}>{WAITLIST.headline}</h2>
<p style={{fontSize:17,color:"var(--muted)",lineHeight:1.75,marginBottom:40}}>{WAITLIST.body}</p>
<div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center",justifyContent:"center",marginBottom:28}}>
<a href="/auth/signin?callbackUrl=/api/stripe/checkout" className="btn-primary" style={{fontSize:16,padding:"17px 36px"}}>{WAITLIST.ctaButton}</a>
<a href="/api-docs" className="btn-ghost" style={{fontSize:14}}>View API docs →</a>
</div>
<div style={{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center"}}>
{["$29/month","5,000 calls/day","14-day free trial","Cancel anytime"].map(item=>(<div key={item} style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:"var(--accent)",fontSize:12}}>✓</span><span style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--muted)"}}>{item}</span></div>))}
</div></div></div></section>);}
