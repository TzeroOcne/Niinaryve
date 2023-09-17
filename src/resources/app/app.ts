import { waitForElm } from '$lib/document';
import { PREFIX, addIdentifier, getChatApp } from '$lib/extension/global';
import App from './App.svelte';
import './app.css';

const injectApp = async () => {
  console.log(`${PREFIX} Injecting app`);
  const root = document.querySelector(':root') as HTMLElement;
  const chatApp = await getChatApp(root);
  const chatAppButton = await waitForElm('yt-live-chat-button', chatApp);
  const appContainer = document.createElement('div') as HTMLDivElement;
  appContainer.id = 'nnryv-app';
  addIdentifier(appContainer);
  new App({
    target: appContainer,
  });
  chatAppButton?.parentNode?.insertBefore(appContainer, chatAppButton);
};

injectApp();