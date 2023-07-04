import { APP_ID, PREFIX, waitForElm } from '@global';
import type { YouTubeScriptConfig } from '@types';

console.log(`${PREFIX} extension loaded`);

const injectedIdentifier = 'nnryv-injected';
const addIdentifier = (target:HTMLElement) => target.classList.add(injectedIdentifier);

export default ({
  injectedCSSUrl,
  injectedJSUrl,
  openCSSUrl,
  openJSUrl,
}:YouTubeScriptConfig) => {
  document.addEventListener('DOMContentLoaded', async () => {
    console.log(`${PREFIX} Waiting chat app`);
    const chatApp = await waitForElm('body > yt-live-chat-app');
    console.log(`${PREFIX} Chat app found`);
    const chatDocument = chatApp.ownerDocument;
    const head = chatDocument.head || chatDocument.documentElement;
  
    const appContainer = document.createElement('div');
    appContainer.id = APP_ID;
    appContainer.classList.add('hide');
    addIdentifier(appContainer);
    chatApp.appendChild(appContainer);

    waitForElm('yt-live-chat-button', chatApp).then(async (buttonMenu:HTMLElement) => {
      const openButton = document.createElement('div') as HTMLDivElement;
      openButton.id = 'nnryv-open';
      addIdentifier(openButton);
      buttonMenu.prepend(openButton);
    
      const openStyle = document.createElement('link') as HTMLLinkElement;
      openStyle.rel = 'stylesheet';
      openStyle.href = openCSSUrl;
      addIdentifier(openStyle);
      head.appendChild(openStyle);
    
      const openScript = document.createElement('script') as HTMLScriptElement;
      openScript.src = openJSUrl;
      openScript.type = 'module';
      openScript.setAttribute('extension_origin', openJSUrl);
      addIdentifier(openScript);
      head.appendChild(openScript);
    });
  
    const injectedStyle = document.createElement('link');
    injectedStyle.rel = 'stylesheet';
    injectedStyle.href = injectedCSSUrl;
    addIdentifier(injectedStyle);
    head.appendChild(injectedStyle);

    const injectedScript = document.createElement('script');
    injectedScript.src = injectedJSUrl;
    injectedScript.type = 'module';
    injectedScript.setAttribute('extension_origin', injectedJSUrl);
    addIdentifier(injectedScript);
    head.appendChild(injectedScript);

    console.log(`${PREFIX} Done injecting script`);
  });
};
