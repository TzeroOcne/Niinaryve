import { waitForElm } from '$lib/document';

export const PREFIX = '[NNRUV]';
export const APP_ID = 'nnryv';

export const getChatApp = async (target?:HTMLElement) => {
  return waitForElm('body > yt-live-chat-app', target);
};