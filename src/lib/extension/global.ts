import { waitForElm } from '$lib/document';
import type { LiveChatData } from '@types';

export const PREFIX = '[NNRYV]';
export const APP_ID = 'nnryv';
export const injectedIdentifier = 'nnryv-injected';

export const addIdentifier = (target:HTMLElement) => target.classList.add(injectedIdentifier);

export const getYtInitialData = (target:Window & { ytInitialData?: LiveChatData } = window) => {
  console.log(target.ytInitialData);

  return target?.ytInitialData ?? {};
};

export const getChatApp = async (target:HTMLElement = document.body) => {
  return waitForElm('body > yt-live-chat-app', target);
};