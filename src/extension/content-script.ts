import { APP_ID, PREFIX, styleDefaultList, styleDefaultValue, styleNameList, waitForElm } from '@global';
import type { StorageChange, StyleVarName, YouTubeScriptConfig } from '@types';

console.log(`${PREFIX} extension loaded`);

const injectedIdentifier = 'nnryv-injected';
const addIdentifier = (target:HTMLElement) => target.classList.add(injectedIdentifier);

const changeProperty = (target:HTMLElement, name:StyleVarName, value) => {
  target.style.setProperty(`--${name}`, value);
};

export default ({
  injectedCSSUrl,
  injectedJSUrl,
  openCSSUrl,
  openJSUrl,
  appCSSUrl,
  appJSUrl,
}:YouTubeScriptConfig) => {
  document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector(':root') as HTMLElement;
    const color = await chrome.storage.sync.get(styleNameList);
    for (const { name, defaultValue } of styleDefaultList) {
      changeProperty(root, name, color[name] ?? defaultValue);
    }
    
    console.log(`${PREFIX} Waiting chat app`);
    const chatApp = await waitForElm('body > yt-live-chat-app');
    console.log(`${PREFIX} Chat app found`);
    const chatDocument = chatApp.ownerDocument;
    const head = chatDocument.head || chatDocument.documentElement;
  
    const injectedStyle = document.createElement('link');
    injectedStyle.rel = 'stylesheet';
    injectedStyle.href = injectedCSSUrl;
    addIdentifier(injectedStyle);
    head.appendChild(injectedStyle);
  
    const appStyle = document.createElement('link');
    appStyle.rel = 'stylesheet';
    appStyle.href = appCSSUrl;
    addIdentifier(appStyle);
    head.appendChild(appStyle);
  
    const appContainer = document.createElement('div');
    appContainer.id = APP_ID;
    appContainer.classList.add('hide');
    addIdentifier(appContainer);
    chatApp.appendChild(appContainer);

    const appScript = document.createElement('script');
    appScript.src = appJSUrl;
    appScript.type = 'module';
    appScript.setAttribute('extension_origin', appJSUrl);
    addIdentifier(appScript);
    head.appendChild(appScript);

    waitForElm('yt-live-chat-button', chatApp).then(async (buttonMenu:HTMLElement) => {
      const openStyle = document.createElement('link') as HTMLLinkElement;
      openStyle.rel = 'stylesheet';
      openStyle.href = openCSSUrl;
      addIdentifier(openStyle);
      head.appendChild(openStyle);
    
      const openButton = document.createElement('div') as HTMLDivElement;
      openButton.id = 'nnryv-open';
      addIdentifier(openButton);
      buttonMenu.parentNode.insertBefore(openButton, buttonMenu);
    
      const openScript = document.createElement('script') as HTMLScriptElement;
      openScript.src = openJSUrl;
      openScript.type = 'module';
      openScript.setAttribute('extension_origin', openJSUrl);
      addIdentifier(openScript);
      head.appendChild(openScript);
    });

    const injectedScript = document.createElement('script');
    injectedScript.src = injectedJSUrl;
    injectedScript.type = 'module';
    injectedScript.setAttribute('extension_origin', injectedJSUrl);
    addIdentifier(injectedScript);
    head.appendChild(injectedScript);

    console.log(`${PREFIX} Done injecting script`);
    
    console.log(`${PREFIX} Listen to event`);
    chrome.storage.onChanged.addListener((changes:StorageChange, area) => {
      for (const name of styleNameList) {
        if (!changes[name]) continue;
        changeProperty(root, name,
          changes[name].newValue ?? styleDefaultValue[name],
        );
      }
    });
  });
};
