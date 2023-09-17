import type { MouseEventHandler } from '@types';

export const onClickOutside = (
  target:HTMLElement,
  callback:MouseEventHandler,
  post?:MouseEventHandler,
) =>
  document.addEventListener('click', (event:MouseEvent) => {
    if (!event.composedPath().includes(target)) callback(event);
    if (post) post(event);
  });