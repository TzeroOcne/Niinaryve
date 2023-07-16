import runExtension from './content-script';

(async () => {
  runExtension({
    injectedCSSUrl: chrome.runtime.getURL('runner/injected.css'),
    injectedJSUrl: chrome.runtime.getURL('runner/injected.js'),
    openCSSUrl: chrome.runtime.getURL('app/open.css'),
    openJSUrl: chrome.runtime.getURL('app/open.js'),
    appCSSUrl: chrome.runtime.getURL('app/app.css'),
    appJSUrl: chrome.runtime.getURL('app/app.js'),
  });
})();
