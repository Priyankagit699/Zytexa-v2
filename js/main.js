(function(){
"use strict";
var WA = "919166720321";
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= DATA ================= */
var PILLARS = [
  {id:"build", name:"Build", desc:"Websites, apps and interfaces that are fast, secure and ready to grow."},
  {id:"grow", name:"Grow", desc:"Marketing, marketplaces and content that bring customers to you."},
  {id:"automate", name:"Automate", desc:"Systems that handle the repetitive work so your team can focus on selling."},
  {id:"advise", name:"Advise", desc:"Honest guidance on what to build, when to build it and what it should cost."}
];
var SERVICES = [
  {p:"build", t:"Website Development", tag:"Fast, functional and future-ready websites.",
   items:["Business, portfolio and informational websites","E-commerce websites on Shopify, WooCommerce or custom PHP","CMS websites on WordPress and Wix","Static and dynamic sites","API integration and payment gateways","SEO optimization built in"],
   tech:["React.js","Next.js","HTML5","CSS3","Bootstrap","JavaScript","Node.js","Java Spring Boot","Python Django","Flask","PHP","MySQL","MongoDB","MERN","MEVN"]},
  {p:"build", t:"Mobile App Development", tag:"From concept to code. Mobile apps that scale.",
   items:["Android, iOS, cross-platform and hybrid apps","Custom UI/UX app design","App deployment and maintenance","API integration","Push notifications, Google Maps and payments"],
   tech:["Kotlin","Java","Swift","C#","React Native","Flutter","Ionic","Firebase","Node.js","Spring Boot"]},
  {p:"build", t:"UI/UX & Web Design", tag:"Design that delivers. Experiences that matter.",
   items:["UI/UX for websites and apps","Wireframes and prototypes","Responsive, accessible custom web design","User flow optimization","Speed-focused layouts","Design system creation","Brand-aligned aesthetics","A/B testing of UI variations"], tech:[]},
  {p:"build", t:"Cybersecurity & Maintenance", tag:"Protect, maintain and perform without worry.",
   items:["Security audit and vulnerability scan","SSL setup and HTTPS redirect","Firewall, WAF and CDN configuration","Protection from malware, SQL injection and brute-force attacks","Secure payments and data encryption","Regular backups and disaster recovery","Website maintenance for speed, bugs and uptime","Version updates and plugin maintenance","Performance monitoring and debugging","Legal compliance with GDPR and the Indian IT Act"], tech:[]},

  {p:"grow", t:"Digital Marketing", tag:"Reach more. Engage better. Convert faster.",
   items:["Search engine optimization (SEO)","Social media optimization (SMO)","Meta ads on Facebook and Instagram","Google Ads: Search, Display and Shopping","Email and WhatsApp marketing","Cold calling campaigns","OTT marketing on Hotstar and MX Player","Newspaper marketing across Rajasthan","Content marketing for blogs, social and web","Marketing strategy and funnel planning","Account-based marketing (ABM)","Data-driven marketing","Local and micro-influencer tie-ups","Shorts, Reels and YouTube ads"],
   tech:["Meta Ads","Google Ads","YouTube","WhatsApp","Hotstar","MX Player"]},
  {p:"grow", t:"E-Commerce Solutions", tag:"Sell smart. Grow big. Rule online.",
   items:["Store setup on Amazon, Flipkart, JioMart, Meesho and more","Product listing and optimization","Brand Registry and A+ content design","Sales analytics and ad campaign strategy","Product listing without a GST number","E-commerce marketing and automation"],
   tech:["Amazon","Flipkart","JioMart","Meesho"]},
  {p:"grow", t:"Google My Business Optimization", tag:"Be found. Be trusted. Be chosen locally.",
   items:["Google Business Profile creation and setup","Google business card design","Google reviews strategy","GMB boost and local SEO ranking","Google Maps optimization","Google Maps visibility"], tech:[]},
  {p:"grow", t:"Branding & Creative Production", tag:"Designs that speak. Brands that stick.",
   items:["Logo, identity and stationery","Packaging and business cards","Product reels and motion graphics","Ad videos and company profiles","Social media creatives and story design"], tech:[]},
  {p:"grow", t:"Photography & Videography", tag:"Visual stories that connect and convert.",
   items:["Product shoots for e-commerce","Commercial ad photography","Reels and cinematic ad shoots","Professional video and photo editing"], tech:[]},

  {p:"automate", t:"CRM & ERP Solutions", tag:"Automate your sales. Streamline your business.",
   items:["CRM setup and customization for leads, deals and pipelines","ERP implementation for SMEs","Sales, marketing and support automation","CRM integration with websites, landing pages and WhatsApp","Workflow automation and task management","Data migration from one CRM to another","Role-based access and user management","Reports and dashboards for decision making"],
   tech:["Salesforce","Zoho CRM","HubSpot","Odoo","Microsoft Dynamics","Freshsales","SAP Business One","Tally Prime","ERPNext","Zapier","Make","WhatsApp Cloud API"]},
  {p:"automate", t:"Business Automation", tag:"Automate repetitive tasks and scale with ease.",
   items:["Lead generation from Instagram DMs, Google Forms and landing pages","WhatsApp and email drip campaigns","CRM integration with website, landing pages and ad platforms","Invoice, payroll and HRMS automation","Attendance and leave tracking (biometric or app)","Follow-up and reminder bots for sales teams","Automated feedback and review collection","Auto-assigning leads to team members","Daily, weekly and monthly reports sent automatically","E-commerce order processing and customer notifications","Custom Zapier and Make workflows","Chatbots for WhatsApp, Messenger and websites"],
   tech:["Zapier","Make","Pabbly","n8n","WhatsApp API","Twilio","Mailchimp","Keka","Kredily","RazorpayX","Jibble","ManyChat","Chatfuel","Python","Apps Script"]},
  {p:"automate", t:"Data Analytics & AI", tag:"Turn data into decisions with smart insights.",
   items:["Business intelligence dashboards","Sales, marketing and finance analytics","Customer behaviour analysis","Campaign performance tracking","Real-time analytics reports","Predictive and prescriptive analytics","Data cleaning, transformation and visualization","AI-based automation and recommendation systems","Data-driven decision support systems"],
   tech:["Power BI","Tableau","Looker Studio","Python","Pandas","NumPy","R","PostgreSQL","BigQuery","Scikit-Learn","TensorFlow","Keras","OpenAI APIs","Google Analytics"]},

  {p:"advise", t:"Business Growth Strategy", tag:"From startup to scale-up. We've been there.",
   items:["Startup launch guidance","Business process setup","Cost and ROI planning","Team building and delegation","Brand positioning","Scaling online and offline"], tech:[], note:"Backed by 5+ years of running businesses ourselves."},
  {p:"advise", t:"IT Consultancy & Support", tag:"Expert tech advice, always by your side.",
   items:["Project-based technical consultancy","Launch planning for startups","Tech stack suggestions","Security, performance and scalability audits"], tech:[]}
];

/* one page per service, same order as SERVICES */
var SLUGS=["website-development","mobile-app-development","ui-ux-web-design","cybersecurity-maintenance","digital-marketing","ecommerce-solutions","google-my-business","branding-creative","photography-videography","crm-erp-solutions","business-automation","data-analytics-ai","business-growth-strategy","it-consultancy"];

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

/* ================= RENDER ================= */
var pillarsEl=document.getElementById("pillars"), html="";
PILLARS.forEach(function(pl){
  var list=SERVICES.filter(function(s){return s.p===pl.id});
  html+='<div class="pillar"><div class="pillar-head" data-reveal><h3 class="pillar-name">'+pl.name+'</h3><p class="pillar-desc">'+pl.desc+'</p><span class="pillar-count">'+list.length+' services</span></div><div class="cards">';
  list.forEach(function(s,k){
    var i=SERVICES.indexOf(s), extra=s.items.length-3;
    html+='<article class="card" style="--i:'+k+'"><h3>'+esc(s.t)+'</h3><p class="tag">'+esc(s.tag)+'</p><ul>'+s.items.slice(0,3).map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul>'+
      (s.tech.length?'<div class="chips">'+s.tech.slice(0,4).map(function(x){return '<span class="chip">'+esc(x)+'</span>'}).join("")+(s.tech.length>4?'<span class="chip">+'+(s.tech.length-4)+'</span>':'')+'</div>':'')+
      '<button class="more" data-i="'+i+'">See everything included'+(extra>0?' (+'+extra+')':'')+'</button><span class="card-logo" aria-hidden="true"><canvas width="200" height="200"></canvas></span></article>';
  });
  html+='</div></div>';
});
pillarsEl.innerHTML=html;

/* card stagger: clear the per-card delay once revealed so hover tilt stays instant */
pillarsEl.querySelectorAll(".card").forEach(function(c){
  c.addEventListener("transitionend",function(e){ if(e.target===c && e.propertyName==="opacity") c.style.transitionDelay="0s"; });
});
var pio=null, pillars=pillarsEl.querySelectorAll(".pillar");
if("IntersectionObserver" in window){
  pio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");pio.unobserve(en.target)}})},{threshold:.15});
  pillars.forEach(function(p){pio.observe(p)});
}else{pillars.forEach(function(p){p.classList.add("in")})}

/* ticker */
var tick=SERVICES.map(function(s){return "<span>"+esc(s.t)+"</span>"}).join("");
document.getElementById("ticker").innerHTML=tick+tick;

/* tech stack book */
var BOOK=[
  {t:"Front-end",items:["React.js","Next.js","HTML5","CSS3","JavaScript","Bootstrap"]},
  {t:"Back-end",items:["Node.js","Java Spring Boot","Python Django","Flask","PHP"]},
  {t:"Mobile apps",items:["Kotlin","Java","Swift","React Native","Flutter","Ionic"]},
  {t:"Data and cloud",items:["MySQL","MongoDB","PostgreSQL","Firebase","BigQuery"]},
  {t:"CMS and commerce",items:["WordPress","Shopify","WooCommerce","Amazon","Flipkart","JioMart","Meesho"]},
  {t:"CRM and ERP",items:["Salesforce","Zoho CRM","HubSpot","Odoo","SAP Business One","Tally Prime","ERPNext","Microsoft Dynamics"]},
  {t:"Automation",items:["Zapier","Make","n8n","Pabbly","Twilio","Mailchimp","WhatsApp API"]},
  {t:"Analytics and AI",items:["Power BI","Tableau","Looker Studio","Python","TensorFlow","OpenAI APIs","Google Analytics"]}
];
(function(){
  var bookEl=document.getElementById("book"), mq=window.matchMedia("(max-width: 700px)");
  var idx=0, L=0, leaves=[], timers=[], held=false, vis=true, auto=null;
  function pg(i){ var p=BOOK[i]; return '<div class="pg"><span class="pg-no">0'+(i+1)+'</span><h3 class="pg-t">'+esc(p.t)+'</h3><ul class="pg-list">'+p.items.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div>'; }
  function build(){
    timers.forEach(clearTimeout); timers=[]; idx=0;
    var single=mq.matches, h='<div class="book-body">';
    if(!single) h+='<div class="pg-base pg-left"><div class="pg"><span class="pg-no">Our stack</span><h3 class="pg-t">Turn the page.</h3><p class="pg-note">Eight chapters, from front-end to AI.</p></div></div>';
    h+='<div class="pg-base pg-right"><div class="pg"><span class="pg-no">The end</span><h3 class="pg-t">Something else in mind?</h3><p class="pg-note">Tell us what you need and we will suggest a stack that fits.</p><a class="btn btn-main" href="#contact">Talk to us</a></div></div>';
    L=single?BOOK.length:BOOK.length/2;
    for(var k=0;k<L;k++){
      h+='<div class="leaf"><div class="face front">'+pg(single?k:2*k)+'</div>'+(single?'':'<div class="face back">'+pg(2*k+1)+'</div>')+'</div>';
    }
    h+='</div><div class="book-nav"><button class="book-btn" type="button" data-d="-1" aria-label="Previous page">&#8249;</button><button class="book-btn" type="button" data-d="1" aria-label="Next page">&#8250;</button></div>';
    bookEl.className="book"+(single?" single":"");
    bookEl.innerHTML=h;
    leaves=[].slice.call(bookEl.querySelectorAll(".leaf"));
    leaves.forEach(function(l,i){ l.style.zIndex=L-i; });
  }
  function flip(i,fwd){
    var l=leaves[i]; l.style.zIndex=100; l.classList.toggle("flipped",fwd);
    timers.push(setTimeout(function(){ l.style.zIndex=fwd?i+1:L-i; },900));
  }
  function next(){
    if(idx<L){ flip(idx,true); idx++; }
    else{ for(var j=L-1;j>=0;j--) (function(j){ timers.push(setTimeout(function(){ flip(j,false); },(L-1-j)*110)); })(j); idx=0; }
  }
  function prev(){ if(idx>0){ idx--; flip(idx,false); } }
  bookEl.addEventListener("click",function(e){ var b=e.target.closest(".book-btn"); if(!b) return; +b.dataset.d>0?next():prev(); });
  bookEl.addEventListener("click",function(e){ if(e.target.closest(".book-btn")||e.target.closest("a")){ held=true; return; } held=!held; });
  if("IntersectionObserver" in window) new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(bookEl);
  if(!reduce) auto=setInterval(function(){ if(vis&&!held&&!document.hidden) next(); },2300);
  mq.addEventListener?mq.addEventListener("change",build):mq.addListener(build);
  build();
})();

/* service select */
var sel=document.getElementById("f-service");
sel.innerHTML='<option value="Not sure yet">Not sure yet</option>'+SERVICES.map(function(s){return '<option>'+esc(s.t)+'</option>'}).join("");

document.getElementById("year").textContent=new Date().getFullYear();

/* ================= DIALOG ================= */
var dlg=document.getElementById("dlg"), dlgBody=document.getElementById("dlg-body");
pillarsEl.addEventListener("click",function(e){
  var b=e.target.closest(".more"); if(!b) return;
  var s=SERVICES[+b.dataset.i], pl=PILLARS.filter(function(p){return p.id===s.p})[0];
  var msg=encodeURIComponent("Hi Zytexa, I'm interested in "+s.t+". Can we talk?");
  dlgBody.innerHTML='<p class="dlg-pillar">'+pl.name+'</p><h3 id="dlg-title">'+esc(s.t)+'</h3><p class="tag">'+esc(s.tag)+(s.note?' '+esc(s.note):'')+'</p>'+
    '<h4>What\'s included</h4><ul class="dlg-list">'+s.items.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul>'+
    (s.tech.length?'<h4>Tools and technologies</h4><div class="chips">'+s.tech.map(function(x){return '<span class="chip">'+esc(x)+'</span>'}).join("")+'</div>':'')+
    '<div class="dlg-cta"><a class="btn btn-main" href="https://wa.me/'+WA+'?text='+msg+'" target="_blank" rel="noopener">Ask about '+esc(s.t)+'</a><a class="btn btn-ghost" href="services/'+SLUGS[+b.dataset.i]+'.html">More details</a><a class="btn btn-ghost" href="#contact" data-close data-svc="'+esc(s.t)+'">Fill the form</a></div>';
  if(dlg.showModal) dlg.showModal(); else dlg.setAttribute("open","");
});
function closeDlg(){ if(dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
document.getElementById("dlg-close").addEventListener("click",closeDlg);
dlg.addEventListener("click",function(e){
  if(e.target===dlg){closeDlg();return}
  var a=e.target.closest("[data-close]"); if(a){ sel.value=a.dataset.svc; closeDlg(); }
});

/* NAV + services mega menu live in js/site.js (shared with the service pages) */

/* ================= REVEAL ================= */
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}})},{rootMargin:"0px 0px -12% 0px"});
  document.querySelectorAll("[data-reveal]").forEach(function(el){io.observe(el)});
}else{document.querySelectorAll("[data-reveal]").forEach(function(el){el.classList.add("in")})}

/* ================= CARD TILT ================= */
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce){
  pillarsEl.addEventListener("pointermove",function(e){
    var c=e.target.closest(".card"); if(!c) return;
    var r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    c.style.setProperty("--mx",(x*100)+"%"); c.style.setProperty("--my",(y*100)+"%");
    c.style.transform="perspective(900px) rotateX("+((0.5-y)*7)+"deg) rotateY("+((x-0.5)*9)+"deg) translateZ(0)";
  });
  pillarsEl.addEventListener("pointerout",function(e){
    var c=e.target.closest(".card"); if(c && !c.contains(e.relatedTarget)) c.style.transform="";
  });

  /* ================= MAGNETIC BUTTONS ================= */
  var BTN_TR="background-color .25s, border-color .25s, box-shadow .25s", magEl=null;
  function magReset(b){ b.style.transition="transform .4s cubic-bezier(.2,.8,.2,1), "+BTN_TR; b.style.transform="translate(0,0)"; }
  document.addEventListener("mousemove",function(e){
    var b=e.target.closest?e.target.closest(".btn"):null;
    if(magEl && magEl!==b){ magReset(magEl); magEl=null; }
    if(!b) return;
    magEl=b;
    var r=b.getBoundingClientRect();
    b.style.transition="transform .1s ease-out, "+BTN_TR;
    b.style.transform="translate("+((e.clientX-(r.left+r.width/2))*.3)+"px,"+((e.clientY-(r.top+r.height/2))*.3)+"px)";
  });

  /* ================= CUSTOM CURSOR ================= */
  var cur=document.createElement("div"); cur.id="cursor"; cur.setAttribute("aria-hidden","true");
  document.body.appendChild(cur);
  var root=document.documentElement, curOn=function(){ root.classList.add("has-cursor") }, curOff=function(){ root.classList.remove("has-cursor"); cur.style.opacity="0" };
  curOn();
  var cX=0,cY=0,cHot=false,cRaf=0;
  document.addEventListener("mousemove",function(e){
    if(dlg.open||leadDlg.open) return;
    cX=e.clientX; cY=e.clientY; cHot=!!(e.target.closest&&e.target.closest("a,button,.card,.more"));
    if(!cRaf) cRaf=requestAnimationFrame(function(){ cRaf=0; cur.style.opacity="1"; cur.style.transform="translate("+cX+"px,"+cY+"px) translate(-50%,-50%) scale("+(cHot?2.5:1)+")"; });
  });
  root.addEventListener("mouseleave",function(){ cur.style.opacity="0"; if(magEl){ magReset(magEl); magEl=null; } });
  pillarsEl.addEventListener("click",function(){ if(dlg.open) curOff(); });
  dlg.addEventListener("close",curOn);
}

/* ================= SERVICE CARDS: scroll-scrubbed 3D typing + depth exit ================= */
if(!reduce){
  var dcards=[].slice.call(pillarsEl.querySelectorAll(".card")), dRaf=0;
  dcards.forEach(function(el){
    el._tw={built:false,chars:null,shown:0,nodes:[].slice.call(el.querySelectorAll("h3,.tag,li")).map(function(n){ return {el:n,text:n.textContent}; })};
  });
  function twBuild(el){
    var st=el._tw, chars=[];
    st.nodes.forEach(function(n){
      n.el.textContent="";
      n.text.split(" ").forEach(function(w,wi){
        if(wi) n.el.appendChild(document.createTextNode(" "));
        var ws=document.createElement("span"); ws.className="w";
        for(var k=0;k<w.length;k++){ var sp=document.createElement("span"); sp.className="ch"; sp.textContent=w.charAt(k); ws.appendChild(sp); chars.push(sp); }
        n.el.appendChild(ws);
      });
    });
    st.chars=chars; st.shown=0; st.built=true;
  }
  function twDestroy(el){
    var st=el._tw; st.nodes.forEach(function(n){ n.el.textContent=n.text; });
    st.chars=null; st.built=false; st.shown=0;
  }
  function twSet(st,count){
    var i;
    if(count>st.shown){ for(i=st.shown;i<count;i++) st.chars[i].classList.add("on"); }
    else{ for(i=count;i<st.shown;i++) st.chars[i].classList.remove("on"); }
    st.shown=count;
  }
  function dUpdate(){
    dRaf=0;
    var vh=window.innerHeight;
    var rects=dcards.map(function(el){ return el.getBoundingClientRect(); });
    dcards.forEach(function(el,i){
      var r=rects[i], st=el._tw;
      var near=r.top<vh*1.5 && r.bottom>-vh*.5;
      if(!near){ if(st.built) twDestroy(el); }
      else{
        if(!st.built) twBuild(el);
        var tp=(vh*.92-r.top)/(vh*.42); tp=tp<0?0:tp>1?1:tp;
        var n=Math.round(tp*st.chars.length);
        if(n!==st.shown) twSet(st,n);
      }
      var p=(96-r.top)/(r.height*.9||1);
      p=p<0?0:p>1?1:p;
      if(p===0){ if(el._d){ el.style.scale=""; el.style.translate=""; el.style.setProperty("--dim",0); el._d=false; } return; }
      el._d=true;
      el.style.scale=(1-.07*p).toFixed(4);
      el.style.translate="0 "+(-14*p).toFixed(2)+"px";
      el.style.setProperty("--dim",(.6*p).toFixed(3));
    });
  }
  function dSched(){ if(!dRaf) dRaf=requestAnimationFrame(dUpdate); }
  window.addEventListener("scroll",dSched,{passive:true});
  window.addEventListener("resize",dSched);
  dSched();
}

/* ================= CARD BACKGROUND: mini particle logo (same look as the hero) ================= */
if(!reduce && window.ZYTEXA_POINTS){
  var LG=null, lgActive=[], lgRaf=0, lgLast=0;
  function lgInit(){
    var raw=atob(window.ZYTEXA_POINTS), total=raw.length/3, K=window.innerWidth<=900?520:900, prob=K/total;
    LG={n:0,tx:[],ty:[],tz:[],sx:[],sy:[],sz:[],del:[],col:[]};
    for(var i=0;i<total;i++){
      if(Math.random()>prob) continue;
      var x=raw.charCodeAt(i*3)/255-.5, y=raw.charCodeAt(i*3+1)/255-.5, c=raw.charCodeAt(i*3+2);
      var th=rnd(0,Math.PI*2), ph=Math.acos(rnd(-1,1)), r=rnd(1.3,2.2);
      LG.tx.push(x*.9676); LG.ty.push(y); LG.tz.push(rnd(-.06,.06)+(c?.06:0)); LG.col.push(c>2?0:c);
      LG.sx.push(r*Math.sin(ph)*Math.cos(th)); LG.sy.push(r*Math.sin(ph)*Math.sin(th)); LG.sz.push(r*Math.cos(ph));
      LG.del.push(rnd(0,.15)+(y+.5)*.5); LG.n++;
    }
  }
  function lgDraw(cv,t){
    var g=cv._g||(cv._g=cv.getContext("2d")), S=cv.width, ry=Math.sin(t*.6)*.55, rx=Math.sin(t*.45)*.12;
    var cY=Math.cos(ry), sY=Math.sin(ry), cX=Math.cos(rx), sX=Math.sin(rx), F=2.6;
    g.clearRect(0,0,S,S); g.globalCompositeOperation="lighter";
    for(var i=0;i<LG.n;i++){
      var p=(t-LG.del[i])/1.5; p=p<0?0:p>1?1:p; var e=1-Math.pow(1-p,3);
      var x=LG.sx[i]+(LG.tx[i]-LG.sx[i])*e, y=LG.sy[i]+(LG.ty[i]-LG.sy[i])*e, z=LG.sz[i]+(LG.tz[i]-LG.sz[i])*e;
      if(e<1){ var a=(1-e)*2.4, ca=Math.cos(a), sa=Math.sin(a), nx=x*ca-z*sa; z=x*sa+z*ca; x=nx; }
      var x1=x*cY+z*sY, z1=-x*sY+z*cY, y1=y*cX-z1*sX, z2=y*sX+z1*cX, persp=F/(F-z2);
      if(persp<=0||persp>6) continue;
      var s=8.5*persp*(S/200);
      g.globalAlpha=.95*(.4+.6*Math.min(1,e*1.4));
      g.drawImage(sprites[LG.col[i]],S/2+x1*S*.8*persp-s/2,S/2+y1*S*.8*persp-s/2,s,s);
    }
    g.globalAlpha=1; g.globalCompositeOperation="source-over";
  }
  function lgLoop(now){
    lgRaf=0;
    if(!lgActive.length||document.hidden) return;
    var settled=true;
    lgActive.forEach(function(cv){ if(now-cv._t0<2400) settled=false; });
    if(settled && now-lgLast<42){ lgRaf=requestAnimationFrame(lgLoop); return; }
    lgLast=now;
    lgActive.forEach(function(cv){ lgDraw(cv,(now-cv._t0)/1000); });
    lgRaf=requestAnimationFrame(lgLoop);
  }
  function lgKick(){ if(!lgRaf && lgActive.length) lgRaf=requestAnimationFrame(lgLoop); }
  document.addEventListener("visibilitychange",lgKick);
  if("IntersectionObserver" in window){
    var lgIO=new IntersectionObserver(function(es){
      es.forEach(function(en){
        var cv=en.target, k=lgActive.indexOf(cv);
        if(en.isIntersecting){
          if(!LG) lgInit();
          if(k<0){ if(!cv._t0) cv._t0=performance.now(); lgActive.push(cv); }
        }else if(k>=0){ lgActive.splice(k,1); }
      });
      lgKick();
    },{rootMargin:"60px"});
    pillarsEl.querySelectorAll(".card-logo canvas").forEach(function(cv){ lgIO.observe(cv); });
  }
}

/* ================= USP CARDS: 3D fly-in from both sides (scroll-scrubbed) ================= */
if(!reduce){
  var usp=[].slice.call(document.querySelectorAll(".usp-item")), uRaf=0;
  function uUpdate(){
    uRaf=0;
    var vh=window.innerHeight, off=Math.min(window.innerWidth*.45,460);
    var tops=usp.map(function(el){ return el.getBoundingClientRect().top; });
    usp.forEach(function(el,i){
      var p=(vh*1.08-tops[i])/(vh*.38);
      p=p<0?0:p>1?1:p;
      if(p>=1){ if(el._u){ el.style.transform=""; el.style.opacity=""; el.style.transition=""; el.style.borderRadius=""; el._u=false; } return; }
      var e=1-Math.pow(1-p,3), d=1-e, dir=i%2?1:-1, th=d*Math.PI*.6, R=off*.7;
      el._u=true;
      el.style.transition="none";
      el.style.opacity=Math.min(1,e*3);
      el.style.borderRadius=(24+((el._h||(el._h=el.offsetHeight))/2-24)*d)+"px";
      el.style.transform="perspective(1300px) translate3d("+(dir*R*Math.sin(th))+"px,"+(R*.35*(1-Math.cos(th)))+"px,"+(-160*d)+"px) rotateY("+(-dir*22*d)+"deg)";
    });
  }
  function uSched(){ if(!uRaf) uRaf=requestAnimationFrame(uUpdate); }
  window.addEventListener("scroll",uSched,{passive:true});
  window.addEventListener("resize",function(){ usp.forEach(function(el){ el._h=0; }); uSched(); });
  uSched();
}

/* ================= HOW WE WORK: timeline reveal + scroll-linked line ================= */
(function(){
  var tl=document.getElementById("hww"), fill=document.getElementById("hww-fill");
  if(!tl||!fill) return;
  var rows=tl.querySelectorAll(".hww-row");
  if(reduce || !("IntersectionObserver" in window)){
    rows.forEach(function(r){ r.classList.add("in"); });
    fill.style.height="100%";
    return;
  }
  // reveal on the way down; hide again only when a row leaves through the bottom (scrolling up)
  var rio=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting) en.target.classList.add("in");
    else if(en.boundingClientRect.top>0) en.target.classList.remove("in");
  })},{threshold:.3,rootMargin:"-80px 0px"});
  rows.forEach(function(r){ rio.observe(r); });
  var near=false, ticking=false;
  function update(){
    ticking=false;
    var r=tl.getBoundingClientRect(), p=(innerHeight*.6-r.top)/r.height;
    p=p<0?0:p>1?1:p;
    fill.style.height=(p*100)+"%";
  }
  function sched(){ if(near && !ticking){ ticking=true; requestAnimationFrame(update); } }
  new IntersectionObserver(function(es){ near=es[0].isIntersecting; if(near) sched(); },{rootMargin:"300px 0px"}).observe(tl);
  window.addEventListener("scroll",sched,{passive:true});
  window.addEventListener("resize",sched);
  update();
})();

/* ================= USP CARDS: cursor glow + tilt ================= */
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce){
  var uspGrid=document.querySelector(".usp-grid");
  uspGrid.addEventListener("pointermove",function(e){
    var it=e.target.closest(".usp-item"); if(!it) return;
    var r=it.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    it.style.setProperty("--mx",(x*100)+"%"); it.style.setProperty("--my",(y*100)+"%");
    it.style.setProperty("--ry",((x-.5)*8)+"deg"); it.style.setProperty("--rx",((.5-y)*6)+"deg");
  });
  uspGrid.addEventListener("pointerout",function(e){
    var it=e.target.closest(".usp-item"); if(it && !it.contains(e.relatedTarget)){ it.style.setProperty("--rx","0deg"); it.style.setProperty("--ry","0deg"); }
  });
}

/* ================= WORD SWAP ================= */
var words=["builds","sells","automates","grows"], wi=0, swap=document.getElementById("swap");
var glyphs="ZYTEXA<>/#*+=";
function scramble(to){
  var from=swap.textContent, len=Math.max(from.length,to.length), start=performance.now(), dur=650;
  (function f(now){
    var p=Math.min(1,(now-start)/dur), out="";
    for(var i=0;i<len;i++){
      if(p*len>i+ (1-p)*2) out+=to[i]||"";
      else out+= (i<to.length? glyphs[(Math.random()*glyphs.length)|0] : "");
    }
    swap.textContent=out;
    if(p<1) requestAnimationFrame(f); else swap.textContent=to;
  })(start);
}
if(!reduce) setInterval(function(){ if(document.hidden) return; wi=(wi+1)%words.length; scramble(words[wi]) },2600);

/* ================= FORM ================= */
var form=document.getElementById("form"), status=document.getElementById("form-status"), via="wa";
form.addEventListener("click",function(e){var b=e.target.closest("[data-via]"); if(b) via=b.dataset.via});
function setErr(id,input,msg){document.getElementById(id).textContent=msg;input.setAttribute("aria-invalid",msg?"true":"false")}
form.addEventListener("submit",function(e){
  e.preventDefault();
  var fN=document.getElementById("f-name"),fP=document.getElementById("f-phone"),fE=document.getElementById("f-email"),fM=document.getElementById("f-msg");
  var n=fN.value.trim(), ph=fP.value.trim(), em=fE.value.trim(), sv=sel.value, m=fM.value.trim(), ok=true, first=null;
  var digits=ph.replace(/\D/g,"");
  if(!n){setErr("e-name",fN,"Enter your name so we know who to reply to.");ok=false;first=first||fN}else setErr("e-name",fN,"");
  if(digits.length<10||digits.length>13){setErr("e-phone",fP,"Enter a 10-digit mobile number.");ok=false;first=first||fP}else setErr("e-phone",fP,"");
  if(em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){setErr("e-email",fE,"Check the email address, or leave it empty.");ok=false;first=first||fE}else setErr("e-email",fE,"");
  if(m.length<5){setErr("e-msg",fM,"Add a line or two about what you need.");ok=false;first=first||fM}else setErr("e-msg",fM,"");
  if(!ok){first.focus();status.textContent="";return}
  var text="Hi Zytexa, I'm "+n+".\nService: "+sv+"\nPhone: "+ph+(em?"\nEmail: "+em:"")+"\n\n"+m;
  if(via==="mail"){
    location.href="mailto:contact@zytexa.com?cc=Zytexatechnology@gmail.com&subject="+encodeURIComponent("Project enquiry: "+sv+" ("+n+")")+"&body="+encodeURIComponent(text);
    status.textContent="Your email app is opening with the message filled in. Press send there to reach us.";
  }else{
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
    status.textContent="WhatsApp is opening with your message filled in. Press send there to reach us.";
  }
});

/* ================= SOUND (Web Audio, synthesized, no files) ================= */
var AC=window.AudioContext||window.webkitAudioContext, actx=null, master=null, sndBus=null, noiseBuf=null;
function lsGet(k){ try{ return localStorage.getItem(k) }catch(x){ return null } }
function lsSet(k,v){ try{ localStorage.setItem(k,v) }catch(x){} }
var sndOn=lsGet("zx_sound")!=="off";
function audio(){
  if(!AC) return null;
  if(!actx){
    try{ actx=new AC(); }catch(e){ return null; }
    master=actx.createGain(); master.gain.value=.55; master.connect(actx.destination);
    var dl=actx.createDelay(); dl.delayTime.value=.19; var fb=actx.createGain(); fb.gain.value=.32;
    var lp=actx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=2600;
    sndBus=actx.createGain(); sndBus.gain.value=1; sndBus.connect(master);
    sndBus.connect(dl); dl.connect(lp); lp.connect(fb); fb.connect(dl); lp.connect(master);
    noiseBuf=actx.createBuffer(1,Math.floor(actx.sampleRate*.05),actx.sampleRate);
    var d=noiseBuf.getChannelData(0); for(var i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  }
  if(actx.state==="suspended") actx.resume();
  return actx;
}
function tick(t,g){
  var s=actx.createBufferSource(), bp=actx.createBiquadFilter(), e=actx.createGain();
  s.buffer=noiseBuf; bp.type="bandpass"; bp.frequency.value=rnd(1700,3400); bp.Q.value=5;
  e.gain.setValueAtTime(g,t); e.gain.exponentialRampToValueAtTime(0.0001,t+.03);
  s.connect(bp); bp.connect(e); e.connect(master); s.start(t); s.stop(t+.05);
  var o=actx.createOscillator(), oe=actx.createGain();
  o.type="triangle"; o.frequency.value=rnd(850,1500);
  oe.gain.setValueAtTime(g*.35,t); oe.gain.exponentialRampToValueAtTime(0.0001,t+.025);
  o.connect(oe); oe.connect(master); o.start(t); o.stop(t+.04);
}
function playShatter(delays){
  if(!sndOn) return;
  var c=audio(); if(!c) return;
  function run(){ var t0=c.currentTime+.03; delays.forEach(function(d){ tick(t0+d+rnd(0,.22),rnd(.05,.11)); }); }
  if(c.state==="running") run(); else c.resume().then(run,function(){});
}
(function(){
  var b=document.createElement("button"); b.type="button"; b.className="snd-btn"; b.id="snd-btn";
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path class="w" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/><path class="x" d="m16 9 5 6m0-6-5 6"/></svg>';
  function paint(){ b.classList.toggle("off",!sndOn); b.setAttribute("aria-pressed",String(sndOn)); b.setAttribute("aria-label",sndOn?"Sound on. Turn sound off":"Sound off. Turn sound on"); }
  paint(); document.body.appendChild(b);
  b.addEventListener("click",function(){ sndOn=!sndOn; lsSet("zx_sound",sndOn?"on":"off"); paint(); if(sndOn) audio(); });
})();

/* ================= LEAD POPUP (once per session, after the hero) ================= */
var leadDlg=document.getElementById("lead"), leadCard=document.getElementById("lead-card"), lform=document.getElementById("lform"), lstatus=document.getElementById("lform-status"), lvia="wa", leadBusy=false;
document.getElementById("l-service").innerHTML=sel.innerHTML;
function leadSeen(){ try{ return sessionStorage.getItem("zx_lead")==="1" }catch(x){ return false } }
function leadMark(){ try{ sessionStorage.setItem("zx_lead","1") }catch(x){} }
function leadOpen(){
  if(leadSeen()||dlg.open||leadDlg.open||!leadDlg.showModal) return;
  var c=document.getElementById("contact").getBoundingClientRect();
  if(c.top<window.innerHeight && c.bottom>0) return;
  leadMark();
  leadDlg.showModal();
  document.documentElement.classList.add("lead-lock");
  if(typeof curOff==="function") curOff();
}
function leadFinish(){
  var w=leadDlg.querySelector(".shards"); if(w) w.remove();
  leadCard.classList.remove("gone"); leadDlg.classList.remove("closing");
  document.documentElement.classList.remove("lead-lock");
  if(leadDlg.open) leadDlg.close();
  leadBusy=false;
  if(typeof curOn==="function") curOn();
}
function leadClose(){
  if(leadBusy||!leadDlg.open) return;
  if(reduce){ leadFinish(); return; }
  leadBusy=true;
  setTimeout(leadFinish,1500);
  var r=leadCard.getBoundingClientRect(), cols=r.width<480?3:4, rows=r.width<480?5:3;
  var wrap=document.createElement("div"); wrap.className="shards"; wrap.setAttribute("aria-hidden","true");
  wrap.style.cssText="left:"+r.left+"px;top:"+r.top+"px;width:"+r.width+"px;height:"+r.height+"px";
  var shards=[];
  for(var ry=0;ry<rows;ry++) for(var cx2=0;cx2<cols;cx2++){
    var s=leadCard.cloneNode(true);
    s.removeAttribute("id"); s.querySelectorAll("[id]").forEach(function(n){n.removeAttribute("id")});
    s.querySelectorAll("button,input,select,textarea,a").forEach(function(n){n.tabIndex=-1});
    s.className="lead-card shard";
    s.style.clipPath="inset("+(ry/rows*100)+"% "+(100-(cx2+1)/cols*100)+"% "+(100-(ry+1)/rows*100)+"% "+(cx2/cols*100)+"%)";
    s.style.transformOrigin=((cx2+.5)/cols*100)+"% "+((ry+.5)/rows*100)+"%";
    s._d=Math.random()*.28; s.style.transitionDelay=s._d+"s";
    s._to="translate("+(((cx2+.5)/cols-.5)*r.width*.9+rnd(-40,40))+"px,"+(((ry+.5)/rows-.5)*r.height*.5+rnd(260,620))+"px) rotate("+rnd(-70,70)+"deg) scale("+rnd(.5,.9)+")";
    wrap.appendChild(s); shards.push(s);
  }
  leadDlg.appendChild(wrap); try{ playShatter(shards.map(function(s){return s._d})); }catch(x){}
  leadCard.classList.add("gone"); leadDlg.classList.add("closing");
  requestAnimationFrame(function(){ requestAnimationFrame(function(){
    shards.forEach(function(s){ s.style.transform=s._to; s.style.opacity="0"; });
  }); });
}
document.getElementById("lead-close").addEventListener("click",leadClose);
leadDlg.addEventListener("cancel",function(e){ e.preventDefault(); leadClose(); });
leadDlg.addEventListener("click",function(e){ if(e.target===leadDlg) leadClose(); });
lform.addEventListener("click",function(e){var b=e.target.closest("[data-via]"); if(b) lvia=b.dataset.via});
lform.addEventListener("submit",function(e){
  e.preventDefault();
  var fN=document.getElementById("l-name"), fP=document.getElementById("l-phone"), fM=document.getElementById("l-msg");
  var n=fN.value.trim(), ph=fP.value.trim(), sv=document.getElementById("l-service").value, m=fM.value.trim(), ok=true, first=null, digits=ph.replace(/\D/g,"");
  if(!n){setErr("le-name",fN,"Enter your name so we know who to reply to.");ok=false;first=first||fN}else setErr("le-name",fN,"");
  if(digits.length<10||digits.length>13){setErr("le-phone",fP,"Enter a 10-digit mobile number.");ok=false;first=first||fP}else setErr("le-phone",fP,"");
  if(m.length<5){setErr("le-msg",fM,"Add a line or two about what you need.");ok=false;first=first||fM}else setErr("le-msg",fM,"");
  if(!ok){first.focus();lstatus.textContent="";return}
  var text="Hi Zytexa, I'm "+n+".\nService: "+sv+"\nPhone: "+ph+"\n\n"+m;
  if(lvia==="mail"){
    location.href="mailto:contact@zytexa.com?cc=Zytexatechnology@gmail.com&subject="+encodeURIComponent("Project enquiry: "+sv+" ("+n+")")+"&body="+encodeURIComponent(text);
    lstatus.textContent="Your email app is opening with the message filled in. Press send there to reach us.";
  }else{
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
    lstatus.textContent="WhatsApp is opening with your message filled in. Press send there to reach us.";
  }
});
if("IntersectionObserver" in window && !leadSeen()){
  new IntersectionObserver(function(es){
    var en=es[0];
    if(!en.isIntersecting && en.boundingClientRect.bottom<0) setTimeout(leadOpen,700);
  }).observe(document.getElementById("hero"));
}

/* ================= HERO 3D PARTICLE LOGO ================= */
var canvas=document.getElementById("scene"), ctx=canvas.getContext("2d",{alpha:true});
var hero=document.getElementById("hero");
var RAW=atob(window.ZYTEXA_POINTS), TOTAL=RAW.length/3, ASPECT=0.9676;
var N, D, tx,ty,tz,sx,sy,sz,dx,dy,dz,del,col,ox,oy, W,H,dpr,isMob,cx,cy,size;
var sprites=[mkSprite("70,130,255"),mkSprite("25,200,225"),mkSprite("150,190,255")];
function mkSprite(rgb){
  var c=document.createElement("canvas"); c.width=c.height=32; var g=c.getContext("2d");
  var gr=g.createRadialGradient(16,16,0,16,16,16);
  gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(.18,"rgba("+rgb+",1)"); gr.addColorStop(.45,"rgba("+rgb+",.35)"); gr.addColorStop(1,"rgba("+rgb+",0)");
  g.fillStyle=gr; g.fillRect(0,0,32,32); return c;
}
function rnd(a,b){return a+Math.random()*(b-a)}
function build(){
  isMob = window.innerWidth<=900;
  N = Math.min(TOTAL, isMob?2000:((navigator.hardwareConcurrency||8)<=4?3200:5200)); D = isMob?90:220;
  var M=N+D;
  tx=new Float32Array(M);ty=new Float32Array(M);tz=new Float32Array(M);sx=new Float32Array(M);sy=new Float32Array(M);sz=new Float32Array(M);
  dx=new Float32Array(M);dy=new Float32Array(M);dz=new Float32Array(M);del=new Float32Array(M);col=new Uint8Array(M);ox=new Float32Array(M);oy=new Float32Array(M);
  for(var i=0;i<N;i++){
    var x=RAW.charCodeAt(i*3)/255-.5, y=RAW.charCodeAt(i*3+1)/255-.5, c=RAW.charCodeAt(i*3+2);
    tx[i]=x*ASPECT; ty[i]=y; tz[i]=rnd(-.07,.07)+(c?.07:0); col[i]=c;
    var th=rnd(0,Math.PI*2), ph=Math.acos(rnd(-1,1)), r=rnd(1.3,2.4);
    sx[i]=r*Math.sin(ph)*Math.cos(th); sy[i]=r*Math.sin(ph)*Math.sin(th); sz[i]=r*Math.cos(ph);
    var th2=rnd(0,Math.PI*2), ph2=Math.acos(rnd(-1,1)), r2=rnd(.8,2.2);
    dx[i]=r2*Math.sin(ph2)*Math.cos(th2); dy[i]=r2*Math.sin(ph2)*Math.sin(th2); dz[i]=r2*Math.cos(ph2);
    del[i]=rnd(0,.15) + (ty[i]+0.5)*0.5;
  }
  for(var j=N;j<M;j++){ tx[j]=rnd(-2.2,2.2); ty[j]=rnd(-1.3,1.3); tz[j]=rnd(-1.5,.6); col[j]=2; del[j]=rnd(0,1); }
}
function layout(){
  var rect=hero.getBoundingClientRect();
  W=rect.width; H=rect.height;
  dpr=Math.min(window.devicePixelRatio||1, isMob?1:1.25);
  canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  if(isMob){ size=Math.min(W*.62, H*.34); cx=W/2; cy=Math.max(H*.25, 72+size*.58); }
  else { size=Math.min(H*.66, W*.36); cx=W*.72; cy=H*.52; }
}
var lastW=0;
function resize(){
  var w=window.innerWidth;
  if(Math.abs(w-lastW)>2 || !tx){ lastW=w; var wasMob=isMob; isMob=w<=900; if(!tx||wasMob!==isMob) build(); }
  layout(); if(!running) frame(performance.now());
}

var mx=0,my=0,rx=0,ry=0,px=-9999,py=-9999, t0=performance.now(), running=false, visible=true, scrollP=0;
window.addEventListener("pointermove",function(e){
  mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2;
  var r=canvas.getBoundingClientRect(); px=e.clientX-r.left; py=e.clientY-r.top;
},{passive:true});
window.addEventListener("pointerleave",function(){px=py=-9999});
document.addEventListener("pointerout",function(e){if(!e.relatedTarget){px=py=-9999}});
window.addEventListener("scroll",function(){ scrollP=Math.min(1,Math.max(0,window.scrollY/(H||1))) },{passive:true});

function frame(now){
  var t=(now-t0)/1000;
  var ay = reduce?0: mx*.5 + Math.sin(t*.35)*.22, ax = reduce?0: my*.25 + Math.sin(t*.27)*.05;
  ry+=(ay-ry)*.06; rx+=(ax-rx)*.06;
  var cY=Math.cos(ry), sY=Math.sin(ry), cX=Math.cos(rx), sX=Math.sin(rx);
  var F=2.6, sp=scrollP*1.6, fade=1-scrollP*.85;
  ctx.clearRect(0,0,W,H);
  ctx.globalCompositeOperation="lighter";
  var base=Math.max(isMob?4.5:5, size/95), R=isMob?70:120, R2=R*R;
  var M=N+D;
  var stride=scrollP>.35?2:1;
  for(var i=0;i<M;i+=stride){
    var x,y,z,e;
    if(i<N){
      var p=reduce?1:(t-del[i])/1.7; p=p<0?0:p>1?1:p; e=1-Math.pow(1-p,3);
      x=sx[i]+(tx[i]-sx[i])*e; y=sy[i]+(ty[i]-sy[i])*e; z=sz[i]+(tz[i]-sz[i])*e;
      if(e<1){ var a=(1-e)*2.4, ca=Math.cos(a), sa=Math.sin(a), nx=x*ca-z*sa; z=x*sa+z*ca; x=nx; }
      z+=Math.sin(t*1.5+ty[i]*7+tx[i]*3)*.012;
      if(sp>0){ x+=dx[i]*sp; y+=dy[i]*sp; z+=dz[i]*sp; }
      if(scrollP>0.1){ ox[i]+=tx[i]*sp*4; oy[i]+=ty[i]*sp*4; }
    }else{
      e=reduce?1:Math.min(1,Math.max(0,(t-del[i])/1.5));
      x=tx[i]; y=ty[i]+(reduce?0:Math.sin(t*.2+i)*.02); z=tz[i];
    }
    var x1=x*cY+z*sY, z1=-x*sY+z*cY;
    var y1=y*cX-z1*sX, z2=y*sX+z1*cX;
    var persp=F/(F-z2); if(persp<=0||persp>6) continue;
    var X=cx+x1*size*persp, Y=cy+y1*size*persp;
    if(i<N){
      var ddx=X-px, ddy=Y-py, d2=ddx*ddx+ddy*ddy;
      if(d2<R2 && !reduce){ var d=Math.sqrt(d2)||1, f=(1-d/R); f=f*f*R*1.1; ox[i]+=((ddx/d)*f-ox[i])*.22; oy[i]+=((ddy/d)*f-oy[i])*.22; }
      else { ox[i]*=.82; oy[i]*=.82; }
      X+=ox[i]; Y+=oy[i];
    }
    if(X<-20||X>W+20||Y<-20||Y>H+20) continue;
    var s=(i<N? base*(col[i]?1.12:1) : base*.7)*persp;
    ctx.globalAlpha=(i<N? .9 : .35*e)*fade*(i<N? (0.35+0.65*Math.min(1,e*1.4)) : 1);
    ctx.drawImage(sprites[col[i]], X-s/2, Y-s/2, s, s);
  }
  ctx.globalAlpha=1; ctx.globalCompositeOperation="source-over";
}
function loop(now){
  if(!running) return;
  frame(now);
  requestAnimationFrame(loop);
}
function start(){ if(running||reduce) return; running=true; requestAnimationFrame(loop); }
function stop(){ running=false; }

resize();
if(!reduce){
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(es){ visible=es[0].isIntersecting; if(visible&&!document.hidden) start(); else stop(); }).observe(hero);
  } else start();
  document.addEventListener("visibilitychange",function(){ if(document.hidden) stop(); else if(visible) start(); });
}
var rt; window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(resize,120); });
})();
