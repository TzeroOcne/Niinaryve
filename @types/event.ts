import type { StyleVarName } from './style';

export type ButtonEvent = MouseEvent & {
  currentTarget: EventTarget & HTMLButtonElement;
};
export type ButtonEventHandler = (e:ButtonEvent) => void;
export type MouseEventHandler = <T>(e?:MouseEvent) => T|void;
export type InputEvent = Event & {
  target: EventTarget & HTMLInputElement;
  currentTarget: EventTarget & HTMLInputElement;
};
export type InputEventHandler = (e:InputEvent) => void;

export type StorageChange = Record<StyleVarName, chrome.storage.StorageChange>;
