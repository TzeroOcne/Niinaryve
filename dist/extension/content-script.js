const I={},x=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),{env:d={},argv:k=[],platform:R=""}=typeof process>"u"?{}:process,D="NO_COLOR"in d||k.includes("--no-color"),M="FORCE_COLOR"in d||k.includes("--color"),N=R==="win32",A=d.TERM==="dumb",P=x&&void 0,G="CI"in d&&("GITHUB_ACTIONS"in d||"GITLAB_CI"in d||"CIRCLECI"in d),W=!D&&(M||N&&!A||P||G),L=(t,n,r,o,i=n.substring(0,t)+o,g=n.substring(t+r.length),u=g.indexOf(r))=>i+(u<0?g:L(u,g,r,o)),q=(t,n,r,o,i)=>t<0?r+n+o:r+L(t,n,o,i)+o,F=(t,n,r=t,o=t.length+1)=>i=>i||!(i===""||i===void 0)?q((""+i).indexOf(n,o),i,t,n,r):"",e=(t,n,r)=>F(`\x1B[${t}m`,`\x1B[${n}m`,r),O={reset:e(0,0),bold:e(1,22,"\x1B[22m\x1B[1m"),dim:e(2,22,"\x1B[22m\x1B[2m"),italic:e(3,23),underline:e(4,24),inverse:e(7,27),hidden:e(8,28),strikethrough:e(9,29),black:e(30,39),red:e(31,39),green:e(32,39),yellow:e(33,39),blue:e(34,39),magenta:e(35,39),cyan:e(36,39),white:e(37,39),gray:e(90,39),bgBlack:e(40,49),bgRed:e(41,49),bgGreen:e(42,49),bgYellow:e(43,49),bgBlue:e(44,49),bgMagenta:e(45,49),bgCyan:e(46,49),bgWhite:e(47,49),blackBright:e(90,39),redBright:e(91,39),greenBright:e(92,39),yellowBright:e(93,39),blueBright:e(94,39),magentaBright:e(95,39),cyanBright:e(96,39),whiteBright:e(97,39),bgBlackBright:e(100,49),bgRedBright:e(101,49),bgGreenBright:e(102,49),bgYellowBright:e(103,49),bgBlueBright:e(104,49),bgMagentaBright:e(105,49),bgCyanBright:e(106,49),bgWhiteBright:e(107,49)},U=({useColor:t=W}={})=>t?O:Object.keys(O).reduce((n,r)=>({...n,[r]:String}),{}),{reset:Q,bold:Z,dim:J,italic:ee,underline:te,inverse:ne,hidden:re,strikethrough:oe,black:ie,red:ae,green:ce,yellow:se,blue:le,magenta:de,cyan:ge,white:he,gray:ue,bgBlack:be,bgRed:me,bgGreen:pe,bgYellow:ye,bgBlue:Be,bgMagenta:fe,bgCyan:Ce,bgWhite:ve,blackBright:we,redBright:Ee,greenBright:Se,yellowBright:Oe,blueBright:je,magentaBright:V,cyanBright:_e,whiteBright:ke,bgBlackBright:Le,bgRedBright:Te,bgGreenBright:$e,bgYellowBright:Ie,bgBlueBright:xe,bgMagentaBright:Re,bgCyanBright:De,bgWhiteBright:Me}=U(),y=`[${V("Niinaryve")}]`,Y="nnryv-app",E=["nnryv-name-base","nnryv-name-member","nnryv-name-moderator"],T={"nnryv-name-base":"#7fffd4","nnryv-name-member":"#2ba640","nnryv-name-moderator":"#5e84f1"},z=E.map(t=>({name:t,defaultValue:T[t]}));function j(t,n){const r=n??document.body;return new Promise(o=>{if(r.querySelector(t))return o(r.querySelector(t));const i=new MutationObserver(()=>{r.querySelector(t)&&(o(r.querySelector(t)),i.disconnect())});i.observe(r,{childList:!0,subtree:!0})})}console.log(`${y} extension loaded`);const H="nnryv-injected",s=t=>t.classList.add(H),_=(t,n,r)=>{t.style.setProperty(`--${n}`,r)},X=({injectedCSSUrl:t,injectedJSUrl:n,openCSSUrl:r,openJSUrl:o,appCSSUrl:i,appJSUrl:g})=>{document.addEventListener("DOMContentLoaded",async()=>{const u=document.querySelector(":root"),$=await chrome.storage.sync.get(E);for(const{name:a,defaultValue:l}of z)_(u,a,$[a]??l);console.log(`${y} Waiting chat app`);const w=await j("body > yt-live-chat-app");console.log(`${y} Chat app found`);const S=w.ownerDocument,h=S.head||S.documentElement,B=document.createElement("link");B.rel="stylesheet",B.href=t,s(B),h.appendChild(B);const f=document.createElement("link");f.rel="stylesheet",f.href=i,s(f),h.appendChild(f);const C=document.createElement("div");C.id=Y,C.classList.add("hide"),s(C),w.appendChild(C);const b=document.createElement("script");b.src=g,b.type="module",b.setAttribute("extension_origin",g),s(b),h.appendChild(b),j("yt-live-chat-button",w).then(async a=>{const l=document.createElement("link");l.rel="stylesheet",l.href=r,s(l),h.appendChild(l);const c=document.createElement("div");c.id="nnryv-open",s(c),a.parentNode.insertBefore(c,a);const p=document.createElement("script");p.src=o,p.type="module",p.setAttribute("extension_origin",o),s(p),h.appendChild(p)});const m=document.createElement("script");m.src=n,m.type="module",m.setAttribute("extension_origin",n),s(m),h.appendChild(m),console.log(`${y} Done injecting script`),console.log(`${y} Listen to event`),chrome.storage.onChanged.addListener((a,l)=>{for(const c of E)a[c]&&_(u,c,a[c].newValue??T[c])})})},v=(t,n,r,o)=>`https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve@${o}/dist/${n}/${t}.${r}`,K="https://api.github.com/repos/TzeroOcne/Niinaryve/tags?per_page=1";(async()=>{const t=await(await fetch(K)).json();if(t.length===0)throw Error("cannot found latest tag");const[{name:n}]=t;X({injectedCSSUrl:v("injected","runner","css",n),injectedJSUrl:v("injected","runner","js",n),openCSSUrl:v("open","app","css",n),openJSUrl:v("open","app","js",n)})})();
