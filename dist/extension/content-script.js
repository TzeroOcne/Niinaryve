const I={},x=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),{env:d={},argv:k=[],platform:R=""}=typeof process>"u"?{}:process,D="NO_COLOR"in d||k.includes("--no-color"),M="FORCE_COLOR"in d||k.includes("--color"),N=R==="win32",A=d.TERM==="dumb",P=x&&void 0,G="CI"in d&&("GITHUB_ACTIONS"in d||"GITLAB_CI"in d||"CIRCLECI"in d),U=!D&&(M||N&&!A||P||G),L=(t,r,n,o,i=r.substring(0,t)+o,g=r.substring(t+n.length),u=g.indexOf(n))=>i+(u<0?g:L(u,g,n,o)),W=(t,r,n,o,i)=>t<0?n+r+o:n+L(t,r,o,i)+o,q=(t,r,n=t,o=t.length+1)=>i=>i||!(i===""||i===void 0)?W((""+i).indexOf(r,o),i,t,r,n):"",e=(t,r,n)=>q(`\x1B[${t}m`,`\x1B[${r}m`,n),j={reset:e(0,0),bold:e(1,22,"\x1B[22m\x1B[1m"),dim:e(2,22,"\x1B[22m\x1B[2m"),italic:e(3,23),underline:e(4,24),inverse:e(7,27),hidden:e(8,28),strikethrough:e(9,29),black:e(30,39),red:e(31,39),green:e(32,39),yellow:e(33,39),blue:e(34,39),magenta:e(35,39),cyan:e(36,39),white:e(37,39),gray:e(90,39),bgBlack:e(40,49),bgRed:e(41,49),bgGreen:e(42,49),bgYellow:e(43,49),bgBlue:e(44,49),bgMagenta:e(45,49),bgCyan:e(46,49),bgWhite:e(47,49),blackBright:e(90,39),redBright:e(91,39),greenBright:e(92,39),yellowBright:e(93,39),blueBright:e(94,39),magentaBright:e(95,39),cyanBright:e(96,39),whiteBright:e(97,39),bgBlackBright:e(100,49),bgRedBright:e(101,49),bgGreenBright:e(102,49),bgYellowBright:e(103,49),bgBlueBright:e(104,49),bgMagentaBright:e(105,49),bgCyanBright:e(106,49),bgWhiteBright:e(107,49)},F=({useColor:t=U}={})=>t?j:Object.keys(j).reduce((r,n)=>({...r,[n]:String}),{}),{reset:K,bold:Q,dim:Z,italic:ee,underline:te,inverse:ne,hidden:re,strikethrough:oe,black:ie,red:ae,green:ce,yellow:se,blue:le,magenta:de,cyan:ge,white:he,gray:pe,bgBlack:ue,bgRed:be,bgGreen:me,bgYellow:ye,bgBlue:Be,bgMagenta:fe,bgCyan:Ce,bgWhite:ve,blackBright:we,redBright:Se,greenBright:Ee,yellowBright:je,blueBright:Oe,magentaBright:V,cyanBright:_e,whiteBright:ke,bgBlackBright:Le,bgRedBright:Te,bgGreenBright:$e,bgYellowBright:Ie,bgBlueBright:xe,bgMagentaBright:Re,bgCyanBright:De,bgWhiteBright:Me}=F(),B=`[${V("Niinaryve")}]`,Y="nnryv-app",S=["nnryv-name-base","nnryv-name-member","nnryv-name-moderator"],T={"nnryv-name-base":"#7fffd4","nnryv-name-member":"#2ba640","nnryv-name-moderator":"#5e84f1"},z=S.map(t=>({name:t,defaultValue:T[t]}));function O(t,r){const n=r??document.body;return new Promise(o=>{if(n.querySelector(t))return o(n.querySelector(t));const i=new MutationObserver(()=>{n.querySelector(t)&&(o(n.querySelector(t)),i.disconnect())});i.observe(n,{childList:!0,subtree:!0})})}console.log(`${B} extension loaded`);const H="nnryv-injected",s=t=>t.classList.add(H),_=(t,r,n)=>{t.style.setProperty(`--${r}`,n)},X=({injectedCSSUrl:t,injectedJSUrl:r,openCSSUrl:n,openJSUrl:o,appCSSUrl:i,appJSUrl:g})=>{document.addEventListener("DOMContentLoaded",async()=>{const u=document.querySelector(":root"),$=await chrome.storage.sync.get(S);for(const{name:a,defaultValue:l}of z)_(u,a,$[a]??l);console.log(`${B} Waiting chat app`);const w=await O("body > yt-live-chat-app");console.log(`${B} Chat app found`);const E=w.ownerDocument,h=E.head||E.documentElement,f=document.createElement("link");f.rel="stylesheet",f.href=t,s(f),h.appendChild(f);const C=document.createElement("link");C.rel="stylesheet",C.href=i,s(C),h.appendChild(C);const v=document.createElement("div");v.id=Y,v.classList.add("hide"),s(v),w.appendChild(v);const b=document.createElement("script");b.src=g,b.type="module",b.setAttribute("extension_origin",g),s(b),h.appendChild(b),O("yt-live-chat-button",w).then(async a=>{const l=document.createElement("link");l.rel="stylesheet",l.href=n,s(l),h.appendChild(l);const c=document.createElement("div");c.id="nnryv-open",s(c),a.parentNode.insertBefore(c,a);const y=document.createElement("script");y.src=o,y.type="module",y.setAttribute("extension_origin",o),s(y),h.appendChild(y)});const m=document.createElement("script");m.src=r,m.type="module",m.setAttribute("extension_origin",r),s(m),h.appendChild(m),console.log(`${B} Done injecting script`),console.log(`${B} Listen to event`),chrome.storage.onChanged.addListener((a,l)=>{for(const c of S)a[c]&&_(u,c,a[c].newValue??T[c])})})},p=(t,r,n,o)=>`https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve@${o}/dist/${r}/${t}.${n}`,J="https://api.github.com/repos/TzeroOcne/Niinaryve/tags?per_page=1";(async()=>{const t=await fetch(J),r=await t.json();if(r.length===0)throw Error("cannot found latest tag");const[{name:n}]=t.status<400?r:[{name:"latest"}];X({injectedCSSUrl:p("injected","runner","css",n),injectedJSUrl:p("injected","runner","js",n),openCSSUrl:p("open","app","css",n),openJSUrl:p("open","app","js",n),appCSSUrl:p("app","app","css",n),appJSUrl:p("app","app","js",n)})})();
