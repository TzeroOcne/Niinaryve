const _={},$=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"})),{env:m={},argv:x=[],platform:k=""}=typeof process>"u"?{}:process,L="NO_COLOR"in m||x.includes("--no-color"),N="FORCE_COLOR"in m||x.includes("--color"),j=k==="win32",q=m.TERM==="dumb",G=$&&void 0,W="CI"in m&&("GITHUB_ACTIONS"in m||"GITLAB_CI"in m||"CIRCLECI"in m),F=!L&&(N||j&&!q||G||W),C=(e,n,r,t,s=n.substring(0,e)+t,c=n.substring(e+r.length),a=c.indexOf(r))=>s+(a<0?c:C(a,c,r,t)),Y=(e,n,r,t,s)=>e<0?r+n+t:r+C(e,n,t,s)+t,P=(e,n,r=e,t=e.length+1)=>s=>s||!(s===""||s===void 0)?Y((""+s).indexOf(n,t),s,e,n,r):"",i=(e,n,r)=>P(`\x1B[${e}m`,`\x1B[${n}m`,r),T={reset:i(0,0),bold:i(1,22,"\x1B[22m\x1B[1m"),dim:i(2,22,"\x1B[22m\x1B[2m"),italic:i(3,23),underline:i(4,24),inverse:i(7,27),hidden:i(8,28),strikethrough:i(9,29),black:i(30,39),red:i(31,39),green:i(32,39),yellow:i(33,39),blue:i(34,39),magenta:i(35,39),cyan:i(36,39),white:i(37,39),gray:i(90,39),bgBlack:i(40,49),bgRed:i(41,49),bgGreen:i(42,49),bgYellow:i(43,49),bgBlue:i(44,49),bgMagenta:i(45,49),bgCyan:i(46,49),bgWhite:i(47,49),blackBright:i(90,39),redBright:i(91,39),greenBright:i(92,39),yellowBright:i(93,39),blueBright:i(94,39),magentaBright:i(95,39),cyanBright:i(96,39),whiteBright:i(97,39),bgBlackBright:i(100,49),bgRedBright:i(101,49),bgGreenBright:i(102,49),bgYellowBright:i(103,49),bgBlueBright:i(104,49),bgMagentaBright:i(105,49),bgCyanBright:i(106,49),bgWhiteBright:i(107,49)},D=({useColor:e=F}={})=>e?T:Object.keys(T).reduce((n,r)=>({...n,[r]:String}),{}),{reset:se,bold:oe,dim:ce,italic:ae,underline:le,inverse:ge,hidden:me,strikethrough:ue,black:de,red:he,green:be,yellow:fe,blue:pe,magenta:ye,cyan:Be,white:ve,gray:we,bgBlack:Te,bgRed:Re,bgGreen:xe,bgYellow:Ce,bgBlue:Ee,bgMagenta:Se,bgCyan:Me,bgWhite:Oe,blackBright:_e,redBright:$e,greenBright:ke,yellowBright:Le,blueBright:Ne,magentaBright:H,cyanBright:je,whiteBright:qe,bgBlackBright:Ge,bgRedBright:We,bgGreenBright:Fe,bgYellowBright:Ye,bgBlueBright:Pe,bgMagentaBright:De,bgCyanBright:He,bgWhiteBright:Ue}=D(),p=`[${H("Niinaryve")}]`,U="nnryv-app";function B(e,n){const r=n??document.body;return new Promise(t=>{if(r.querySelector(e))return t(r.querySelector(e));const s=new MutationObserver(()=>{r.querySelector(e)&&(t(r.querySelector(e)),s.disconnect())});s.observe(r,{childList:!0,subtree:!0})})}const{fetch:z}=window;let v;const J=/member/i,V=/moderator/i,X=/verified/i,w=(e=[],n)=>e.length===0?!1:e.filter(({liveChatAuthorBadgeRenderer:t})=>t).map(({liveChatAuthorBadgeRenderer:t})=>t).filter(({tooltip:t})=>t).map(({tooltip:t})=>t).filter(t=>n.test(t)).length>0,I=(e=[])=>w(e,J),K=(e=[])=>w(e,V),Q=(e=[])=>w(e,X),Z=e=>{const n=[];return I(e)&&n.push("member"),K(e)&&n.push("moderator"),Q(e)&&n.push("verified"),n},A=async()=>{for(const e of document.querySelectorAll(".nnryv-verifier ~ .nnryv-verifier"))e.remove()},ee=async(e,n,r,t)=>{const s=await B(`[id="${e}"] span#author-name:not(.nnryv-marked)`);if(!s)return;s.classList.add("nnryv-marked");const c=document.createElement("a");c.href=`/channel/${n}`,c.innerText=s.textContent;const a=document.createElement("span");a.appendChild(c),a.classList.add("nnryv-verifier");for(const g of r)a.classList.add(g);for(const g of s.childNodes)s.removeChild(g);s.appendChild(a),setTimeout(A,0)},te=async(e,n,r)=>{const t=await B(`[id="${e}"] span#timestamp:not(.nnryv-marked)`);if(!t)return;t.classList.add("nnryv-marked");const s=new Date(n),c=document.createElement("span");c.id="timestamp-relative",c.innerText=t.innerText;const a=document.createElement("span");a.id="timestamp-absolute-local";const g=s.getHours().toString(),o=s.getMinutes().toString();a.innerText=`${g}:${o.padStart(2,"0")}`;for(const l of t.childNodes)t.removeChild(l);t.appendChild(c),t.appendChild(a)},ne=(e,n)=>{const{actions:r}=n;return r?e.concat(...r):e.concat(n)},y=(e=[])=>{if(e.length===0)return;let n=e[0];for(const r of e.slice(1))r.height>n.height&&(n=r);return n},re=e=>{let n;if(e instanceof Array){const r=e.map(({thumbnails:t})=>y(t)).filter(t=>t);n=y(r)}else n=y(e==null?void 0:e.thumbnails);return n==null?void 0:n.url},ie=(e=[])=>{var r;if(e.length===0)return;const n=e.filter(t=>{var s,c;return(c=(s=t==null?void 0:t.liveChatAuthorBadgeRenderer)==null?void 0:s.customThumbnail)==null?void 0:c.thumbnails}).map(t=>t.liveChatAuthorBadgeRenderer.customThumbnail.thumbnails).reduce((t,s)=>[...t,...s],[]);return(r=y(n))==null?void 0:r.url},R=async(e,n)=>{var a,g;const r=((a=e==null?void 0:e.contents)==null?void 0:a.liveChatRenderer)??((g=e==null?void 0:e.continuationContents)==null?void 0:g.liveChatContinuation);if(!r)return;const{actions:t}=r,c=((t??[]).map(o=>o.replayChatItemAction?o.replayChatItemAction:o).reduce(ne,[])??[]).map(({addChatItemAction:o,addLiveChatTickerItemAction:l})=>{var d,b,h,f;const u=((d=o==null?void 0:o.item)==null?void 0:d.liveChatTextMessageRenderer)??((b=o==null?void 0:o.item)==null?void 0:b.liveChatPaidMessageRenderer)??((h=l==null?void 0:l.item)==null?void 0:h.liveChatTickerSponsorItemRenderer);return u&&{renderer:u,paid:!!((f=o==null?void 0:o.item)!=null&&f.liveChatTextMessageRenderer)}}).filter(o=>o).map(({renderer:o,paid:l})=>{const{authorName:u,authorExternalChannelId:d,id:b,authorBadges:h,authorPhoto:f,timestampUsec:E}=o,S=re(f),M=ie(h),O=Z(h);return{authorName:u,authorExternalChannelId:d,authorBadges:h,id:b,paid:l,photo:S,badgeList:O,badgeImg:M,timestamp:Number(E)/1e3}});v&&(n&&console.log(`${p} Dispatching chat init event`),v.dispatchEvent(new CustomEvent("livechat",{detail:c})));for(const{id:o,authorExternalChannelId:l,badgeList:u,timestamp:d}of c)ee(o,l,u),te(o,d)};(async()=>(v=await B(`div#${U}`),console.log(`${p} Modify Init`),B("body>script:not([src])").then(async e=>{const r=e.text.replace(/^(.*?) = /,"").replace(/;*$/,""),t=JSON.parse(r);R(t,"init")}),console.log(`${p} Injecting fetch Capture`),window.fetch=async(e,n)=>{const r=await z(e,n);if(e instanceof Request&&e.method==="POST"&&e.url.startsWith("https://www.youtube.com/youtubei/v1/live_chat/get_live_chat")){const t=r.clone();setTimeout(async()=>{await R(await t.json())},0)}return r},console.log(`${p} Done injecting fetch Capture`)))();
