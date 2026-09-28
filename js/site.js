/* Shared on every page: nav, services mega menu, footer year, service-page enquiry form, "How we work" timeline */
(function(){
"use strict";
var WA="919166720321";
var nav=document.getElementById("nav"), menuBtn=document.getElementById("menu-btn");
var li=document.getElementById("has-mega"), trig=document.getElementById("mega-btn"), mega=document.getElementById("mega");
var desk=window.matchMedia("(min-width: 901px)"), fine=window.matchMedia("(hover: hover) and (pointer: fine)");

/* ---------- scrolled state ---------- */
function onScroll(){ nav.classList.toggle("scrolled", window.scrollY>30) }
onScroll();
window.addEventListener("scroll",onScroll,{passive:true});

/* ---------- mobile menu ---------- */
function setSub(o){ li.classList.toggle("sub-open",o); if(!desk.matches) trig.setAttribute("aria-expanded",o); }
function setMenu(o){
  nav.classList.toggle("open",o);
  menuBtn.setAttribute("aria-expanded",o); menuBtn.setAttribute("aria-label",o?"Close menu":"Open menu");
  if(!o) setSub(false);
}
menuBtn.addEventListener("click",function(){ setMenu(!nav.classList.contains("open")) });

/* ---------- desktop mega menu ---------- */
var hideT=0, openedBy="";
function setMega(o,by){
  clearTimeout(hideT);
  nav.classList.toggle("mega-open",o);
  trig.setAttribute("aria-expanded",o);
  openedBy=o?(by||openedBy||"click"):"";
}
trig.addEventListener("click",function(e){
  e.preventDefault();
  if(!desk.matches){ setSub(!li.classList.contains("sub-open")); return; }
  if(nav.classList.contains("mega-open") && openedBy==="hover"){ openedBy="click"; return; }
  setMega(!nav.classList.contains("mega-open"),"click");
});
li.addEventListener("mouseenter",function(){ if(desk.matches && fine.matches) setMega(true,"hover"); });
li.addEventListener("mouseleave",function(){
  if(desk.matches && fine.matches) hideT=setTimeout(function(){ setMega(false) },180);
});
li.addEventListener("focusout",function(e){
  if(desk.matches && e.relatedTarget && !li.contains(e.relatedTarget)) setMega(false);
});
document.addEventListener("click",function(e){
  if(nav.classList.contains("mega-open") && !li.contains(e.target)) setMega(false);
});
document.addEventListener("keydown",function(e){
  if(e.key!=="Escape") return;
  if(nav.classList.contains("mega-open")){ setMega(false); trig.focus(); }
  else if(nav.classList.contains("open")){ setMenu(false); menuBtn.focus(); }
});
(desk.addEventListener?desk.addEventListener.bind(desk,"change"):desk.addListener.bind(desk))(function(){
  setMega(false); setMenu(false); trig.setAttribute("aria-expanded","false");
});

/* pillar tabs: hover, focus or click switches the panel */
var tabs=[].slice.call(mega.querySelectorAll(".mega-tab")), panels=[].slice.call(mega.querySelectorAll(".mega-panel"));
function act(p){
  tabs.forEach(function(t){ var on=t.dataset.p===p; t.classList.toggle("is-on",on); t.setAttribute("aria-pressed",on); });
  panels.forEach(function(x){ x.classList.toggle("is-on",x.dataset.p===p); });
}
function tabFrom(e){ return e.target.closest?e.target.closest(".mega-tab"):null; }
mega.addEventListener("mouseover",function(e){ var t=tabFrom(e); if(t) act(t.dataset.p); });
mega.addEventListener("focusin",function(e){ var t=tabFrom(e); if(t) act(t.dataset.p); });
mega.addEventListener("click",function(e){ var t=tabFrom(e); if(t) act(t.dataset.p); });

/* any real link in the nav closes menus (in-page anchors stay on this page) */
document.getElementById("nav-links").addEventListener("click",function(e){
  var a=e.target.closest("a"); if(!a || a===trig) return;
  setMega(false); setMenu(false);
});

/* ---------- footer year ---------- */
var y=document.getElementById("year"); if(y) y.textContent=new Date().getFullYear();

/* ---------- service page enquiry form ---------- */
var f=document.getElementById("svc-form");
if(f){
  var st=document.getElementById("svc-status"), via="wa", svc=f.dataset.service;
  var setErr=function(id,input,msg){ document.getElementById(id).textContent=msg; input.setAttribute("aria-invalid",msg?"true":"false"); };
  f.addEventListener("click",function(e){ var b=e.target.closest("[data-via]"); if(b) via=b.dataset.via; });
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var fN=document.getElementById("s-name"), fP=document.getElementById("s-phone"), fM=document.getElementById("s-msg");
    var n=fN.value.trim(), ph=fP.value.trim(), m=fM.value.trim(), digits=ph.replace(/\D/g,""), ok=true, first=null;
    if(!n){ setErr("se-name",fN,"Enter your name so we know who to reply to."); ok=false; first=first||fN; } else setErr("se-name",fN,"");
    if(digits.length<10||digits.length>13){ setErr("se-phone",fP,"Enter a 10-digit mobile number."); ok=false; first=first||fP; } else setErr("se-phone",fP,"");
    if(m.length<5){ setErr("se-msg",fM,"Add a line or two about what you need."); ok=false; first=first||fM; } else setErr("se-msg",fM,"");
    if(!ok){ first.focus(); st.textContent=""; return; }
    var text="Hi Zytexa, I'm "+n+".\nService: "+svc+"\nPhone: "+ph+"\n\n"+m;
    if(via==="mail"){
      location.href="mailto:contact@zytexa.com?cc=Zytexatechnology@gmail.com&subject="+encodeURIComponent("Project enquiry: "+svc+" ("+n+")")+"&body="+encodeURIComponent(text);
      st.textContent="Your email app is opening with the message filled in. Press send there to reach us.";
    }else{
      window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
      st.textContent="WhatsApp is opening with your message filled in. Press send there to reach us.";
    }
  });
}

/* ---------- how we work: timeline reveal + scroll-linked line ---------- */
(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
})();
