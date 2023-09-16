export function waitForElm<
  R extends Element = HTMLElement,
>(selector:string, parentTarget?:Element) {
  const target = parentTarget ?? document.body;
  return new Promise<R>(resolve => {
    const selected = target.querySelector(selector) as R;
    if (selected) {
      return resolve(selected);
    }

    const observer = new MutationObserver(() => {
      const selected = target.querySelector(selector) as R;
      if (selected) {
        resolve(selected);
        observer.disconnect();
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });
  });
}