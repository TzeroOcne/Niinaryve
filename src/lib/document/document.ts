import type { EventData, NNRYVCustomEvent, NNRYVEventListener, NNRYVEventName } from '@types';

export const getRoot = () => document.querySelector(':root') as HTMLElement;

export const waitForElm = <
  R extends Element = HTMLElement,
>(selector:string, parentTarget?:Element) => {
  const target = parentTarget ?? document.body;
  return new Promise<R>(resolve => {
    const selected = target.querySelector(selector) as R;
    if (selected) {
      return resolve(selected);
    }

    const observer = new MutationObserver(() => {
      const selected = target.querySelector(selector) as R;
      if (selected) {
        observer.disconnect();
        resolve(selected);
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });
  });
};

export const changeProperty = (target:HTMLElement, name:string, value:string) => {
  target.style.setProperty(`--${name}`, value);
};

export const dispatchDocumentEvent = <
  EventType extends NNRYVEventName,
  DetailType extends EventData<EventType> = EventData<EventType>,
>(name:EventType, detail:DetailType) =>
    document.dispatchEvent(new CustomEvent(name, {
      detail,
    }));

export const listenDocumentEvent = <
  EventName extends NNRYVEventName,
  EventType extends NNRYVCustomEvent<EventName> = NNRYVCustomEvent<EventName>,
  ListenerType extends NNRYVEventListener<EventName> = NNRYVEventListener<EventName>,
>(name:EventName, listener:ListenerType) =>
    document.addEventListener(name, (event) => {
      listener(event as EventType);
    });