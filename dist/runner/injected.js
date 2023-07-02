const x={},R=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),{env:g={},argv:y=[],platform:T=""}=typeof process>"u"?{}:process,k="NO_COLOR"in g||y.includes("--no-color"),O="FORCE_COLOR"in g||y.includes("--color"),v=T==="win32",E=g.TERM==="dumb",_=R&&void 0,M="CI"in g&&("GITHUB_ACTIONS"in g||"GITLAB_CI"in g||"CIRCLECI"in g),L=!k&&(O||v&&!E||_||M),f=(t,r,i,n,o=r.substring(0,t)+n,c=r.substring(t+i.length),a=c.indexOf(i))=>o+(a<0?c:f(a,c,i,n)),S=(t,r,i,n,o)=>t<0?i+r+n:i+f(t,r,n,o)+n,$=(t,r,i=t,n=t.length+1)=>o=>o||!(o===""||o===void 0)?S((""+o).indexOf(r,n),o,t,r,i):"",e=(t,r,i)=>$(`\x1B[${t}m`,`\x1B[${r}m`,i),m={reset:e(0,0),bold:e(1,22,"\x1B[22m\x1B[1m"),dim:e(2,22,"\x1B[22m\x1B[2m"),italic:e(3,23),underline:e(4,24),inverse:e(7,27),hidden:e(8,28),strikethrough:e(9,29),black:e(30,39),red:e(31,39),green:e(32,39),yellow:e(33,39),blue:e(34,39),magenta:e(35,39),cyan:e(36,39),white:e(37,39),gray:e(90,39),bgBlack:e(40,49),bgRed:e(41,49),bgGreen:e(42,49),bgYellow:e(43,49),bgBlue:e(44,49),bgMagenta:e(45,49),bgCyan:e(46,49),bgWhite:e(47,49),blackBright:e(90,39),redBright:e(91,39),greenBright:e(92,39),yellowBright:e(93,39),blueBright:e(94,39),magentaBright:e(95,39),cyanBright:e(96,39),whiteBright:e(97,39),bgBlackBright:e(100,49),bgRedBright:e(101,49),bgGreenBright:e(102,49),bgYellowBright:e(103,49),bgBlueBright:e(104,49),bgMagentaBright:e(105,49),bgCyanBright:e(106,49),bgWhiteBright:e(107,49)},I=({useColor:t=L}={})=>t?m:Object.keys(m).reduce((r,i)=>({...r,[i]:String}),{}),{reset:H,bold:X,dim:z,italic:J,underline:U,inverse:V,hidden:K,strikethrough:Q,black:Z,red:A,green:D,yellow:ee,blue:te,magenta:ne,cyan:re,white:ie,gray:oe,bgBlack:ce,bgRed:se,bgGreen:ae,bgYellow:ge,bgBlue:le,bgMagenta:de,bgCyan:he,bgWhite:be,blackBright:ue,redBright:me,greenBright:Be,yellowBright:ye,blueBright:fe,magentaBright:j,cyanBright:we,whiteBright:pe,bgBlackBright:Ce,bgRedBright:xe,bgGreenBright:Re,bgYellowBright:Te,bgBlueBright:ke,bgMagentaBright:Oe,bgCyanBright:ve,bgWhiteBright:Ee}=I(),h=`[${j("YTChatVer")}]`;function b(t){return new Promise(r=>{if(document.querySelector(t))return r(document.querySelector(t));const i=new MutationObserver(()=>{document.querySelector(t)&&(r(document.querySelector(t)),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0})})}const{fetch:N}=window;let u;const G=/member/i,W=/moderator/i,w=(t=[],r)=>t.length===0?!1:t.filter(({liveChatAuthorBadgeRenderer:n})=>n).map(({liveChatAuthorBadgeRenderer:n})=>n).filter(({tooltip:n})=>n).map(({tooltip:n})=>n).filter(n=>r.test(n)).length>0,q=(t=[])=>w(t,G),F=(t=[])=>w(t,W),P=async(t,r,i)=>{const n=await b(`#${t} span#author-name:not(.ytc-marked)`);n.classList.add("ytc-marked");const o=document.createElement("a");o.href=`/channel/${r}`,o.innerText=n.textContent;const c=document.createElement("span");switch(c.appendChild(o),c.classList.add("ytc-verifier"),i){case"member":c.classList.add("member");break;case"moderator":c.classList.add("moderator");break}for(const a of n.childNodes)n.removeChild(a);n.appendChild(c)},B=async(t,r)=>{var c,a;const i=((c=t==null?void 0:t.contents)==null?void 0:c.liveChatRenderer)??((a=t==null?void 0:t.continuationContents)==null?void 0:a.liveChatContinuation);if(!i)return;const{actions:n}=i,o=(n==null?void 0:n.map(({addChatItemAction:s})=>{var l;return(l=s==null?void 0:s.item)==null?void 0:l.liveChatTextMessageRenderer}).filter(s=>s).map(s=>{const{authorName:l,authorExternalChannelId:d,id:p,authorBadges:C,authorPhoto:Y}=s;return{authorName:l,authorExternalChannelId:d,id:p,authorBadges:C}}))??[];u&&r&&(console.log(`${h} Dispatching chat init event`),u.dispatchEvent(new CustomEvent("livechat",{detail:o})));for(const{id:s,authorExternalChannelId:l,authorBadges:d}of o)await P(s,l,F(d)&&"moderator"||q(d)&&"member")};(async()=>(u=await b("div#ytclinker"),console.log(`${h} Modify Init`),b("body>script:not([src])").then(async t=>{const i=t.text.replace(/^(.*?) = /,"").replace(/;*$/,""),n=JSON.parse(i);B(n,"init")}),console.log(`${h} Injecting fetch Capture`),window.fetch=async(...t)=>{const[r,i]=t,n=await N(r,i);if(r instanceof Request&&r.method==="POST"&&r.url.startsWith("https://www.youtube.com/youtubei/v1/live_chat/get_live_chat")){const o=n.clone();setTimeout(async()=>{await B(await o.json())},0)}return n},console.log(`${h} Done injecting XHR Capture`)))();