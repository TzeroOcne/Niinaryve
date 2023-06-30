import { PREFIX, waitForElm } from './global';

console.log('[YTChatVer] verfier loaded');
document.addEventListener('DOMContentLoaded', async () => {
  console.log(`${PREFIX} waiting chat app`);
  const chatApp = await waitForElm('body > yt-live-chat-app');
  const chatDocument = chatApp.ownerDocument;
  const head = chatDocument.head || chatDocument.documentElement;
  
  const container = document.createElement('div');
  container.id = 'ytclinker';
  container.classList.add('hide');
  chatApp.appendChild(container);

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
  injectedStyle.href = chrome.runtime.getURL('injected.css');
  head.appendChild(injectedStyle);

  const injectedScript = document.createElement('script');
  injectedScript.src = chrome.runtime.getURL('injected.js');
  injectedScript.type = 'module';
  injectedScript.setAttribute('extension_origin', chrome.runtime.getURL(''));
  head.appendChild(injectedScript);
});