import { APP_ID, PREFIX, waitForElm } from '../global';

const injectedCSSUrl = 'https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve/dist/runner/injected.css';
const injectedJSUrl = 'https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve/dist/runner/injected.js';

console.log('[YTChatVer] verfier loaded');
document.addEventListener('DOMContentLoaded', async () => {
  console.log(`${PREFIX} waiting chat app`);
  const chatApp = await waitForElm('body > yt-live-chat-app');
  const chatDocument = chatApp.ownerDocument;
  const head = chatDocument.head || chatDocument.documentElement;
  
  const appContainer = document.createElement('div');
  appContainer.id = APP_ID;
  appContainer.classList.add('hide');
  chatApp.appendChild(appContainer);

  waitForElm('yt-live-chat-button', chatApp).then((buttonMenu) => {
    const openButton = document.createElement('div') as HTMLDivElement;
    openButton.id = 'nnryv-open';
    buttonMenu.prepend(openButton);
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