
export const HOSTNAME_SUPPORTED_REGEXP = /([a-z0-9]+[.])*(youtube|kick)[.]com/;
// Register content scripts
// const activeTabs = new Set<number>();
// if (!chrome.scripting) {
//   chrome.tabs.onUpdated.addListener((tabId, i, t) => {
//     if (!i.status || !t.url) {
//       return undefined;
//     }
//     if (!activeTabs.has(tabId)) {
//       activeTabs.add(tabId);
//     }

//     const loc = new URL(t.url);
//     if (HOSTNAME_SUPPORTED_REGEXP.test(loc.host)) {
//       chrome.tabs.executeScript(tabId, {
//         file: 'content-script.js',
//       });
//     }
//   });
// } else {
//   chrome.scripting.registerContentScripts([
//     {
//       id: 'ytchat-verifier',
//       js: ['content-script.js'],
//       matches: ['*://*.youtube.com/*', '*://*.kick.com/*'],
//     },
//   ]);
// }

// // DEBUG: reload background runner
// ((self || window) as object & { r?: () => void }).r = () => chrome.runtime.reload();
/*
const tabIdList = [];
const version = '1.0';

chrome.tabs.query( //get current Tab
  {
    currentWindow: true,
    url: '*://*.youtube.com/*',
  },
  function(tabArray) {
    for (const { url, id } of tabArray) {
      if (!id || url.startsWith('chrome://')) {
        continue;
      }
      tabIdList.push(id);
    
      chrome.debugger.attach({ //debug at current tab
        tabId: id,
      }, version, onAttach.bind(null, id));
    }
  }
);


function onAttach(tabId) {

  chrome.debugger.sendCommand({ //first enable the Network
    tabId: tabId
  }, 'Network.enable');

  chrome.debugger.onEvent.addListener(allEventHandler);

}


function allEventHandler(debuggeeId, message, params) {

  if (!tabIdList.includes(debuggeeId.tabId)) {
    return;
  }

  if (message == 'Network.responseReceived') { //response return 
    chrome.debugger.sendCommand({
      tabId: debuggeeId.tabId
    }, 'Network.getResponseBody', {
      'requestId': params.requestId
    }, function(response) {
      // you get the response body here!
      // you can close the debugger tips by:
      console.log(response);
      chrome.debugger.detach(debuggeeId);
    });
  }

}
*/
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url === 'https://www.youtube.com/youtubei/v1/live_chat/get_live_chat') {
      return { redirectUrl: 'http://localhost:8080' };
    }
  },
  { urls: ['https://www.youtube.com/youtubei/v1/live_chat/get_live_chat'] },
  ['blocking']
);
