import { APP_ID, PREFIX, getChatApp } from '$lib/app/app';

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

    const customElementJSURL = chrome.runtime.getURL('src/resources/custom-elements.js');
    const customElementScript = document.createElement('script');
    customElementScript.src = customElementJSURL;
    customElementScript.type = 'module';
    customElementScript.setAttribute('extension_origin', customElementJSURL);
    addIdentifier(customElementScript);
    head.appendChild(customElementScript);

    const injectedJSURL = chrome.runtime.getURL('src/resources/injected.js');
    const injectedScript = document.createElement('script');
    injectedScript.src = injectedJSURL;
    injectedScript.type = 'module';
    injectedScript.setAttribute('extension_origin', injectedJSURL);
    addIdentifier(injectedScript);
    head.appendChild(injectedScript);
  });
};

injectApp();
