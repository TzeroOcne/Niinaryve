import { APP_ID, PREFIX, getChatApp } from '$lib/app/app';
import { waitForElm } from '$lib/document';

console.log(`${PREFIX} extension loaded`);

const injectedIdentifier = 'nnryv-injected';
const addIdentifier = (target:HTMLElement) => target.classList.add(injectedIdentifier);

export const injectApp = async () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector(':root') as HTMLElement;
    console.log(1);

    const chatApp = await getChatApp(root);
    console.log(`${PREFIX} Chat app found`);

    const chatDocument = chatApp.ownerDocument;
    const head = chatDocument.head || chatDocument.documentElement;

    const appContainer = document.createElement('div');
    appContainer.id = APP_ID;
    appContainer.classList.add('hide');
    addIdentifier(appContainer);
    chatApp.appendChild(appContainer);

    const injectedCSSUrl = chrome.runtime.getURL('src/resources/injected/injected.css');
    const injectedStyle = document.createElement('link');
    injectedStyle.rel = 'stylesheet';
    injectedStyle.href = injectedCSSUrl;
    addIdentifier(injectedStyle);
    head.prepend(injectedStyle);

    // const customElementJSURL = chrome.runtime.getURL('src/resources/custom-elements.js');
    // const customElementScript = document.createElement('script');
    // customElementScript.src = customElementJSURL;
    // customElementScript.type = 'module';
    // customElementScript.setAttribute('extension_origin', customElementJSURL);
    // addIdentifier(customElementScript);
    // head.appendChild(customElementScript);
    waitForElm('yt-live-chat-button', chatApp).then(async (buttonMenu:HTMLElement) => {
      const appMenu = document.createElement('div') as HTMLDivElement;
      appMenu.id = 'nnryv-app-menu';
      addIdentifier(appMenu);
      buttonMenu?.parentNode?.insertBefore(appMenu, buttonMenu);

      // const openScript = document.createElement('script') as HTMLScriptElement;
      // openScript.src = openJSUrl;
      // openScript.type = 'module';
      // openScript.setAttribute('extension_origin', openJSUrl);
      // addIdentifier(openScript);
      // head.appendChild(openScript);
    });


    const injectedJSURL = chrome.runtime.getURL('src/resources/injected/injected.js');
    const injectedScript = document.createElement('script');
    injectedScript.src = injectedJSURL;
    injectedScript.type = 'module';
    injectedScript.setAttribute('extension_origin', injectedJSURL);
    addIdentifier(injectedScript);
    head.appendChild(injectedScript);
  });
};

injectApp();
