console.log("inject new script.");(()=>{var a=document.createElement("script");a.src=chrome.runtime.getURL("injected.js");a.onload=function(){this.remove()};(document.head||document.documentElement).appendChild(a)})();var auto_extract_flag=!1,leads=[],leads_lnglat=new Set,collect_email=!0;
(()=>{var a=document.createElement("div");a.className="extension_gms_page";var d=document.createElement("h1");d.id="extension_gms_leads_info";d.innerHTML="Leads: 0";const b=document.createElement("button");b.className="extension_gms_button";b.innerText="Start Auto Extract";b.id="extension_gms_start_btn";b.addEventListener("click",async h=>{h=h.target;if(auto_extract_flag)h.innerText="Start Auto Extract",auto_extract_flag=!1,console.log("Begin to stop auto extract!");else{h.innerText="Stop Auto Extract";
h.style="background-color: #ea4335";auto_extract_flag=!0;console.log("Begin to start auto extract!");window.leads=[];window.leads_lnglat.clear();document.getElementById("searchbox-searchbutton").click();await new Promise(m=>setTimeout(m,3E3));var e=document.querySelector('[role="feed"]'),k=0,p=-1;do{console.log("Paging");e.scrollTop=e.scrollHeight;await new Promise(m=>setTimeout(m,1E3*Math.floor(3*Math.random()+1)));if(0<document.getElementsByClassName("HlvSq").length){console.log("No more results.");
break}p==e.scrollHeight?k++:(k=0,p=e.scrollHeight);if(20<k){console.log("Feed list not change for 20 times.");break}console.log(k,e.scrollTop,e.scrollHeight)}while(auto_extract_flag);h.innerText="Start Auto Extract";h.style="";auto_extract_flag=!1;console.log("Finish auto extract!")}});const g=document.createElement("button");g.className="extension_gms_button";g.innerText="Export Leads (0)";g.id="extension_gms_download_btn";g.style="background-color: #54aced";g.addEventListener("click",async()=>{chrome.runtime.sendMessage({action:"openPage",
data:leads});console.log("leads: ",leads)});const n=document.createElement("button");n.className="extension_gms_button";n.innerText="Clear";n.id="extension_gms_clear_btn";n.style="background-color: #4167b2";n.addEventListener("click",async()=>{window.leads=[];window.leads_lnglat.clear();d.innerHTML="Leads: 0";g.innerText="Export Leads (0)"});a.appendChild(d);a.appendChild(b);a.appendChild(g);a.appendChild(n);document.getElementsByClassName("w6VYqd")[0].appendChild(a)})();
function decode_cf_email(a){s="";r=parseInt(a.substr(0,2),16);for(j=2;a.length-j;j+=2)c=parseInt(a.substr(j,2),16)^r,s+=String.fromCharCode(c);return s}
function get_domain(a){const d=new Set("ac ad ae af ag ai al am an ao aq ar as at au aw ax az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cd cf cg ch ci ck cl cm cn co cr cu cv cw cx cy cz de dj dk dm do dz ec ee eg eh er es et eu fi fj fk fm fo fr ga gb gd ge gf gg gh gi gl gm gn gp gq gr gs gt gu gw gy hk hm hn hr ht hu id ie il im in io iq ir is it je jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md me mf mg mh mk ml mm mn mo mp mq mr ms mt mu mv mw mx my mz na nc ne nf ng ni nl no np nr nu nz om pa pe pf pg ph pk pl pm pn pr ps pt pw py qa re ro rs ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr ss st su sv sx sy sz tc td tf tg th tj tk tl tm tn to tr tt tv tw tz ua ug uk us uy uz va vc ve vg vi vn vu wf ws xk ye yt za zm zw".split(" "));a=
(new URL(a)).host.toLowerCase().split(".");return d.has(a[a.length-1])?a[a.length-3]:a[a.length-2]}
function normalize_social_link(a){try{a.startsWith("//")&&(a="https:"+a);a.startsWith("http")||(a="https://"+a);const d=new Set("/reel /about /tr /privacy /download /pg /settings /vp /profiles".split(" "));let b=new URL(a);if("http:"===b.protocol||""===b.protocol)b.protocol="https:";"instagram.com"===b.host&&(b.host="www.instagram.com");"facebook.com"===b.host&&(b.host="www.facebook.com");"yelp.com"===b.host&&(b.host="www.yelp.com");"www.twitter.com"===b.host&&(b.host="twitter.com");"/"===b.pathname[b.pathname.length-
1]&&(b.pathname=b.pathname.slice(0,-1));return d.has(b.pathname)?"":b.toString()}catch(d){console.warn("normalize_social_link error: ",a,d)}return""}
async function extractemail(a,d,b){try{a.startsWith("//")&&(a="https:"+a);a.startsWith("http")||(a="https://"+a);const x=await chrome.runtime.sendMessage({action:"access",data:{url:a}});if(10>x.length)console.warn("visit error: ",a);else{var g=x.normalize("NFKC");d={instagram:/(((http|https):\/\/)?((www\.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9_.]{2,30})))/ig,facebook:/(?:https?:)?\/\/(?:www\.)?(?:facebook|fb)\.com\/((?![A-z]+\.php)(?!marketplace|gaming|watch|me|messages|help|search|groups)[A-z0-9_\-\.]+)\/?/ig,
youtube:/(?:https?:)?\/\/(?:[A-z]+\.)?youtube\.com\/(channel\/([A-z0-9-_]+)|user\/([A-z0-9]+))\/?/ig,linkedin:/(?:https?:)?\/\/(?:[\w]+\.)?linkedin\.com\/((company|school)\/[A-z0-9-\u00c0-\u00ff\.]+|in\/[\w\-_\u00c0-\u00ff%]+)\/?/ig,twitter:/(?:(?:http|https):\/\/)?(?:www.)?(?:twitter.com)\/(?!(oauth|account|tos|privacy|signup|home|hashtag|search|login|widgets|i|settings|start|share|intent|oct)(['"\?\.\/]|$))([A-Za-z0-9_]{1,15})/igm,email:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,yelp:/https?:\/\/(www\.)?yelp\.com\/biz\/[a-zA-Z0-9_-]+/ig};
var n=new Set,h={};for(const f in d){h[f]=new Set;var e=g.match(d[f]);e&&e.forEach(l=>{l&&("email"===f?h[f].add(l):(l=normalize_social_link(l))&&h[f].add(l))})}var k=new URL(a);try{var p=(new DOMParser).parseFromString(g,"text/html").querySelector(".__cf_email__");if(p){const f=p.getAttribute("data-cfemail");f&&h.email.add(decode_cf_email(f))}}catch(f){console.warn("DOMParser parsed error: ",a,f)}p=/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;e=[];for(var m;m=p.exec(g);)e.push((new URL(m[2],k)).toString());
g="/contact /contact-us /contact-me /about /about-me /about-us /team /our-team /meet-the-team /support /customer-service /feedback /help /sales privacy return location policy faq".split(" ");for(k=0;k<e.length;k++){var q=e[k];for(m=0;m<g.length;++m)if(q.includes(g[m])){n.add(q);break}}for(q=0;q<e.length;q++)try{const f=e[q];if(!f)continue;const l=(new URL(f)).host.toLowerCase();for(const u in d)if(l.includes(u)){if(0>=h[u].size){const y=normalize_social_link(f);y&&h[u].add(y)}break}}catch(f){console.warn(`error: ${e[q]}`,
f)}if(b&&0<n.size){const f=[...n].map(async l=>await extractemail(l,"",!1));(await Promise.all(f)).map(l=>{if(l)for(const u in l)l[u].forEach(y=>{h[u].add(y)})})}console.log("Email for : ",a,h,[...n].join());var w=new Set,v=new Set,t=".png .jpg .jpeg .gif .webp wixpress.com sentry.io noreply abuse no-reply subscribe mailer-daemon domain.com email.com yourname wix.com".split(" "),z=get_domain(a);h.email.forEach(f=>{f=f.replace("u003e","").toLowerCase();for(let l=0;l<t.length;++l)if(f.includes(t[l]))return;
w.add(f);z&&f.includes(z)&&v.add(f)});h.email=0<v.size?v:w;return h}}catch(x){console.log(`visit url error: ${a}`,x)}}async function findemails(a){const d=new URL(a);var b=[];"/contact /contact-us /contact-me /about /about-me /about-us /team /our-team /meet-the-team /support /customer-service /feedback /help /sales".split(" ").map(g=>{b.push((new URL(g,d)).toString())});a=b.map(async g=>await extractemail(g,""));return(await Promise.all(a)).filter(g=>g&&""!==g.trim()).join(",")}
window.addEventListener("message",async function(a){if(a.data&&a.data.data){a=JSON.parse(a.data.data.replace('/*""*/',""));results=JSON.parse(a.d.slice(5));feed=results[0][1];a=[];for(var d=1;d<feed.length;++d){item=feed[d][feed[d].length-1];var b=item[11]||"";if(!b)continue;var g="";try{g=item[7][0]}catch(t){}var n="";try{n=item[178][0][0]}catch(t){}let e="";try{e=item[4][8]}catch(t){}let k="";try{k=item[4][7]}catch(t){}let p="";try{p=item[13].join(";")}catch(t){}let m="";try{m=item[78]}catch(t){}let q=
"";try{q=item[37][0][0][29][1]}catch(t){}var h=(item[2]||[]).join(",");let w="",v="";try{w=item[9][2],v=item[9][3]}catch(t){}leads_lnglat.has(m)||(leads_lnglat.add(m),a.push({name:b,phone:n,website:g,address:h,email:"",placeID:m,cID:q,category:p,reviewCount:e,averageRating:k,latitude:w,longitude:v}))}a=a.map(async e=>{try{if(e.website&&collect_email){const k=await extractemail(e.website,b,!0);if(k)for(const p in k)e[p]=[...k[p]].join()}}catch(k){console.warn("collect email error: ",e)}return e});
d=await Promise.all(a);for(a=0;a<d.length;++a)leads.push(d[a]);console.log(leads);document.getElementById("extension_gms_download_btn").innerText=`Export Leads (${leads.length})`;document.getElementById("extension_gms_leads_info").innerHTML=`Leads: ${leads.length}`}});