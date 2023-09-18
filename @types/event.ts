import type { NNRYVEventNameList } from '@consts';
import type { AuthorSummary } from './livechat';
import type { StyleVarName } from './style';

export type NNRYVEventName = typeof NNRYVEventNameList[number];

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

export interface ToggleDisplayChat {
  name: string;
  show: boolean;
}

export type EventData<T extends NNRYVEventName> =
  T extends 'nnryv-toggle-display-chat' ? ToggleDisplayChat :
  T extends 'nnryv-livechat' ? AuthorSummary[] :
  undefined;

export type NNRYVCustomEvent<
  EventType extends NNRYVEventName,
  DetailType extends EventData<EventType> = EventData<EventType>,
> = { detail: DetailType } & CustomEvent<DetailType>;

export type NNRYVEventListener<T extends NNRYVEventName> = (event:NNRYVCustomEvent<T>) => void;
