import { APP_ID, PREFIX, waitForElm } from '@global';
import type { TagArray } from '@types';

const fileUrl = (name:string, folder: 'runner' | 'app', type: 'css' | 'js', version:string) =>
  `https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve@${version}/dist/${folder}/${name}.${type}`;
const getTagUrl = 'https://api.github.com/repos/TzeroOcne/Niinaryve/tags?per_page=1';

console.log('[YTChatVer] verfier loaded');
document.addEventListener('DOMContentLoaded', async () => {
  const tagList:TagArray = await (await fetch(getTagUrl)).json();
  if (tagList.length === 0) {
    throw Error('cannot found latest tag');
  }
  const [{ name:latestTagName }] = tagList;
  
  const injectedCSSUrl = fileUrl('injected', 'runner', 'css', latestTagName);
  const injectedJSUrl = fileUrl('injected', 'runner', 'js', latestTagName);
  const openCSSUrl = fileUrl('open', 'app', 'css', latestTagName);
  const openJSUrl = fileUrl('open', 'app', 'js', latestTagName);

  console.log(`${PREFIX} waiting chat app`);
  const chatApp = await waitForElm('body > yt-live-chat-app');
  const chatDocument = chatApp.ownerDocument;
  const head = chatDocument.head || chatDocument.documentElement;
  
  const appContainer = document.createElement('div');
  appContainer.id = APP_ID;
  appContainer.classList.add('hide');
  chatApp.appendChild(appContainer);

  waitForElm('yt-live-chat-button', chatApp).then(async (buttonMenu:HTMLElement) => {
    const openButton = document.createElement('div') as HTMLDivElement;
    openButton.id = 'nnryv-open';
    buttonMenu.prepend(openButton);
    
    const openStyle = document.createElement('link') as HTMLLinkElement;
    openStyle.rel = 'stylesheet';
    openStyle.href = openCSSUrl;
    head.appendChild(openStyle);
    
    const openScript = document.createElement('script') as HTMLScriptElement;
    openScript.src = openJSUrl;
    openScript.type = 'module';
    openScript.setAttribute('extension_origin', openJSUrl);
    head.appendChild(openScript);
  });

  // const appScript = document.createElement('script');
  // appScript.src = chrome.runtime.getURL('main.js');
  // appScript.type = 'module';
  // appScript.setAttribute('extension_origin', chrome.runtime.getURL(''));
  // head.appendChild(appScript);
  
  // const appStyle = document.createElement('link');
  // appStyle.rel = 'stylesheet';
  // appStyle.href = chrome.runtime.getURL('main.css');
  // head.appendChild(appStyle);
  
  const injectedStyle = document.createElement('link');
  injectedStyle.rel = 'stylesheet';
  injectedStyle.href = injectedCSSUrl;
  head.appendChild(injectedStyle);

  const injectedScript = document.createElement('script');
  injectedScript.src = injectedJSUrl;
  injectedScript.type = 'module';
  injectedScript.setAttribute('extension_origin', injectedJSUrl);
  head.appendChild(injectedScript);
});