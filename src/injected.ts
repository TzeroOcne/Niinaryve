import type { AuthorBadgeObject, AuthorSummary, LiveChatData } from '../@types/livechat';
import { PREFIX, waitForElm } from './global';

import './injected.css';

const { fetch: originalFetch } = window;
let appContainer:HTMLDivElement;
const memberRegex = /member/i;
const moderatorRegex = /moderator/i;
const isBadge = (badges:AuthorBadgeObject[] = [], regex:RegExp):boolean => {
  if (badges.length === 0) {
    return false;
  }
  const memberBadges = badges
    .filter(({ liveChatAuthorBadgeRenderer }) => liveChatAuthorBadgeRenderer)
    .map(({ liveChatAuthorBadgeRenderer }) => liveChatAuthorBadgeRenderer)
    .filter(({ tooltip }) => tooltip).map(({ tooltip }) => tooltip)
    .filter(val => regex.test(val));
  return memberBadges.length > 0;
};
const isMember = (badges:AuthorBadgeObject[] = []) => isBadge(badges, memberRegex);
const isModerator = (badges:AuthorBadgeObject[] = []) => isBadge(badges, moderatorRegex);

const modifyNameDisplay = async (id:string, channelId:string, type?:'member'|'moderator'|'') => {
  const nameContainer = await waitForElm(`#${id} span#author-name:not(.ytc-marked)`);
  nameContainer.classList.add('ytc-marked');
  const anchor = document.createElement('a') as HTMLAnchorElement;
  anchor.href = `/channel/${channelId}`;
  anchor.innerText = nameContainer.textContent;
  const coloredName = document.createElement('span');
  coloredName.appendChild(anchor);
  coloredName.classList.add('ytc-verifier');
  switch (type) {
  case 'member':
    coloredName.classList.add('member');
    break;
  case 'moderator':
    coloredName.classList.add('moderator');
    break;
  }
  for (const child of nameContainer.childNodes) {
    nameContainer.removeChild(child);
  }
  nameContainer.appendChild(coloredName);
};

const modifyLiveChat = async (liveChatData:LiveChatData, type?:'init') => {
  const content = liveChatData?.contents?.liveChatRenderer ?? liveChatData?.continuationContents?.liveChatContinuation;
  if (!content) return;
  const { actions } = content;
  const authorList:AuthorSummary[] = actions?.map(({ addChatItemAction }) => addChatItemAction?.item?.liveChatTextMessageRenderer)
    .filter(val => val)
    .map(renderer => {
      const {
        authorName, authorExternalChannelId, id, authorBadges,
        authorPhoto,
      } = renderer;
      return {authorName, authorExternalChannelId, id, authorBadges };
    }) ?? [];
  if (appContainer && type) {
    console.log(`${PREFIX} Dispatching chat init event`);
    appContainer.dispatchEvent(new CustomEvent('livechat', {detail: authorList}));
  }
  for (const { id, authorExternalChannelId, authorBadges } of authorList) {
    await modifyNameDisplay(id, authorExternalChannelId,
      isModerator(authorBadges) && 'moderator' ||
      isMember(authorBadges) && 'member'
    );
  }
};

(async () => {
  appContainer = await waitForElm('div#ytclinker') as HTMLDivElement;
  console.log(`${PREFIX} Modify Init`);
  waitForElm('body>script:not([src])').then(async (scriptElement:HTMLScriptElement) => {
    const initialText = scriptElement.text;
    const dataText = initialText.replace(/^(.*?) = /, '')
      .replace(/;*$/, '');
    const initData:LiveChatData = JSON.parse(dataText);
    modifyLiveChat(initData, 'init');
  /*
  console.log(initData.continuationContents.liveChatContinuation.actions);
  await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      start: dataText.slice(0, 10),
      end: dataText.slice(dataText.length - 10),
    }),
  });
  */
  });

  console.log(`${PREFIX} Injecting fetch Capture`);
  
  window.fetch = async (...args) => {
    const [resource, config ] = args;

    const response = await originalFetch(resource, config);
    if (resource instanceof Request &&
      resource.method === 'POST' &&
      resource.url.startsWith('https://www.youtube.com/youtubei/v1/live_chat/get_live_chat')) {
      const responseClone = response.clone();
      setTimeout(async () => {
        await modifyLiveChat(await responseClone.json());
        /*
        fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authorList)
        });
        */
      }, 0);
    }
    return response;
  };
  console.log(`${PREFIX} Done injecting XHR Capture`);
})();
