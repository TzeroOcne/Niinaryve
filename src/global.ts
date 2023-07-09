import { magentaBright } from 'colorette';
import type { StyleVarName } from '../@types/style';

export const PREFIX = `[${magentaBright('Niinaryve')}]`;
export const APP_ID = 'nnryv-app';

export const styleNameList:StyleVarName[] = [
  'nnryv-name-base',
  'nnryv-name-member',
  'nnryv-name-moderator',
];

export const styleDefaultValue:Record<StyleVarName, string> = {
  'nnryv-name-base': '#7fffd4',
  'nnryv-name-member': '#2ba640',
  'nnryv-name-moderator': '#5e84f1',
};

export const styleDefaultList = styleNameList.map(name => ({
  name,
  defaultValue: styleDefaultValue[name],
}));

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
