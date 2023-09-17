import { waitForElm } from '$lib/document';

export const PREFIX = '[NNRUV]';
export const APP_ID = 'nnryv';
export const injectedIdentifier = 'nnryv-injected';

export const addIdentifier = (target:HTMLElement) => target.classList.add(injectedIdentifier);

export const getChatApp = async (target:HTMLElement = document.body) => {
  return waitForElm('body > yt-live-chat-app', target);
};