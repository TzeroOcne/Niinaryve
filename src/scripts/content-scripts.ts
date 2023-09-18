import { changeProperty, listenDocumentEvent } from '$lib/document';
import { APP_ID, PREFIX, addIdentifier, getChatApp } from '$lib/extension/global';
import { getStoreStyleValue } from '$lib/extension/storage';
import { StyleDefaultValue, StyleVarNameList } from '@consts';

console.log(`${PREFIX} extension loaded`);

const injectStyle = (source:string, head:HTMLHeadElement = document.head) => {
  const element = document.createElement('link');
  element.rel = 'stylesheet';
  element.href = source;
  addIdentifier(element);
  head.prepend(element);
};

const injectScript = (source:string, head:HTMLHeadElement = document.head) => {
  const element = document.createElement('script');
  element.src = source;
  element.type = 'module';
  element.setAttribute('extension_origin', source);
  addIdentifier(element);
  head.appendChild(element);
};

export const injectApp = async () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector(':root') as HTMLElement;

    const chatApp = await getChatApp(root);
    console.log(`${PREFIX} Chat app found`);

    const appContainer = document.createElement('div');
    appContainer.id = APP_ID;
    appContainer.classList.add('hide');
    addIdentifier(appContainer);
    chatApp.appendChild(appContainer);

    injectStyle(chrome.runtime.getURL('src/resources/chatter/chatter.css'));
    injectScript(chrome.runtime.getURL('src/resources/chatter/chatter.js'));

    injectStyle(chrome.runtime.getURL('src/resources/app/app.css'));
    injectScript(chrome.runtime.getURL('src/resources/app/app.js'));

    injectStyle(chrome.runtime.getURL('src/resources/injected/injected.css'));
    injectScript(chrome.runtime.getURL('src/resources/injected/injected.js'));

    console.log(`${PREFIX} Done injecting script`);

    console.log(`${PREFIX} Loading color`);
    for (const name of StyleVarNameList) {
      const value = await getStoreStyleValue(name);
      if (value) {
        changeProperty(root, name, value);
      }
    }
    listenDocumentEvent('nnryv-toggle-display-chat', (event) => {
      const { name, show } = event.detail;
      if (show) {
        chatApp.classList.remove(name);
      } else {
        chatApp.classList.add(name);
      }
    });

    console.log(`${PREFIX} Listen to config change`);
    chrome.storage.onChanged.addListener((changes) => {
      for (const name of StyleVarNameList) {
        if (!changes[name]) continue;
        changeProperty(root, name,
          changes[name].newValue ?? StyleDefaultValue[name],
        );
      }
    });
  });
};

injectApp();
