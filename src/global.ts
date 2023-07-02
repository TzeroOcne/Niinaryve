import { magentaBright } from 'colorette';

export const PREFIX = `[${magentaBright('YTChatVer')}]`;
export const APP_ID = 'nnryv-app';

export function waitForElm(selector:string, parentTarget?:Element) {
  const target = parentTarget ?? document.body;
  return new Promise<Element>(resolve => {
    if (target.querySelector(selector)) {
      return resolve(target.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (target.querySelector(selector)) {
        resolve(target.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true
    });
  });
}
