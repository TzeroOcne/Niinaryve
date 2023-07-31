import { APP_ID, PREFIX, waitForElm } from '@global';
import type { Actions, AuthorBadgeObject, AuthorPhoto, AuthorSummary, BadgeType, LiveChatData, ReplayChatItemAction, Thumbnail } from '@types';

import './injected.css';

const { fetch: originalFetch } = window;
let appContainer:HTMLDivElement;
const memberRegex = /member/i;
const moderatorRegex = /moderator/i;
const verfiedRegex = /verified/i;
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
const isVerified = (badges:AuthorBadgeObject[] = []) => isBadge(badges, verfiedRegex);
const getBadgeList = (badges:AuthorBadgeObject[]) => {
  const badgeList:BadgeType[] = [];
  if (isMember(badges)) badgeList.push('member');
  if (isModerator(badges)) badgeList.push('moderator');
  if (isVerified(badges)) badgeList.push('verified');
  return badgeList;
};

const removeNameDup = async () => {
  for (const nameDup of document.querySelectorAll('.nnryv-verifier ~ .nnryv-verifier')) {
    nameDup.remove();
  }
};

const modifyNameDisplay = async (id:string, channelId:string, badges:BadgeType[], type?: 'init') => {
  const nameContainer = await waitForElm(`[id="${id}"] span#author-name:not(.nnryv-marked)`);
  if (!nameContainer) return;
  nameContainer.classList.add('nnryv-marked');
  const anchor = document.createElement('a') as HTMLAnchorElement;
  anchor.href = `/channel/${channelId}`;
  anchor.innerText = nameContainer.textContent;
  const coloredName = document.createElement('span');
  coloredName.appendChild(anchor);
  coloredName.classList.add('nnryv-verifier');
  for (const badge of badges) {
    coloredName.classList.add(badge);
  }
  for (const child of nameContainer.childNodes) {
    nameContainer.removeChild(child);
  }
  nameContainer.appendChild(coloredName);
  setTimeout(removeNameDup, 0);
};

const modifyTimestamp = async (id:string, timestamp:number, type?: 'init') => {
  const timestampContainer = await waitForElm(`[id="${id}"] span#timestamp:not(.nnryv-marked)`) as HTMLSpanElement;
  if (!timestampContainer) return;
  timestampContainer.classList.add('nnryv-marked');
  const chatTimestamp = new Date(timestamp);
  const timestampRelative = document.createElement('span') as HTMLSpanElement;
  timestampRelative.id = 'timestamp-relative';
  timestampRelative.innerText = timestampContainer.innerText;
  const timestampAbsolute = document.createElement('span') as HTMLSpanElement;
  timestampAbsolute.id = 'timestamp-absolute-local';
  const hour = chatTimestamp.getHours().toString();
  const minute = chatTimestamp.getMinutes().toString();
  timestampAbsolute.innerText = `${hour}:${minute.padStart(2, '0')}`;
  for (const child of timestampContainer.childNodes) {
    timestampContainer.removeChild(child);
  }
  timestampContainer.appendChild(timestampRelative);
  timestampContainer.appendChild(timestampAbsolute);
};

const replayReducer = (prev: Actions[], curr:Actions|ReplayChatItemAction) => {
  const { actions } = curr as ReplayChatItemAction;
  if (actions) {
    return prev.concat(...actions);
  }
  return prev.concat(curr as Actions);
};

const getBiggestThumbnail = (thumbnails:Thumbnail[] = []) => {
  if (thumbnails.length === 0) return;
  let result:Thumbnail = thumbnails[0];
  for (const curr of thumbnails.slice(1)) {
    if (curr.height > result.height) result = curr;
  }
  return result;
};

const getBiggestPhoto = (authorPhoto:AuthorPhoto | AuthorPhoto[]) => {
  let thumbnail:Thumbnail;
  if (authorPhoto instanceof Array) {
    const filteredThumbnails = authorPhoto
      .map(({ thumbnails }) => getBiggestThumbnail(thumbnails))
      .filter(thumbnail => thumbnail);
    thumbnail = getBiggestThumbnail(filteredThumbnails);
  } else {
    thumbnail = getBiggestThumbnail(authorPhoto?.thumbnails);
  }
  return thumbnail?.url;
};

const getBiggestBadge = (authorBadges:AuthorBadgeObject[] = []) => {
  if (authorBadges.length === 0) return;
  const filteredBagdes = authorBadges.filter(badge =>
    badge?.liveChatAuthorBadgeRenderer?.customThumbnail?.thumbnails)
    .map(badge => badge.liveChatAuthorBadgeRenderer.customThumbnail.thumbnails)
    .reduce((prev, curr) => [...prev, ...curr], []);
  return getBiggestThumbnail(filteredBagdes)?.url;
};

const modifyLiveChat = async (liveChatData:LiveChatData, type?:'init') => {
  const content =
    liveChatData?.contents?.liveChatRenderer ??
    liveChatData?.continuationContents?.liveChatContinuation;
  if (!content) return;
  const { actions } = content;
  const actionTarget = (actions ?? []).map((currentAction) =>
    currentAction.replayChatItemAction ? currentAction.replayChatItemAction : currentAction)
    .reduce(replayReducer, []);
  const authorList:AuthorSummary[] = (actionTarget ?? [])
    .map(({ addChatItemAction, addLiveChatTickerItemAction }) => {
      const renderer =
        addChatItemAction?.item?.liveChatTextMessageRenderer ??
        addChatItemAction?.item?.liveChatPaidMessageRenderer ??
        addLiveChatTickerItemAction?.item?.liveChatTickerSponsorItemRenderer;
      return renderer && {
        renderer,
        paid: !!addChatItemAction?.item?.liveChatTextMessageRenderer,
      };
    }).filter(val => val)
    .map(({ renderer, paid }) => {
      const {
        authorName, authorExternalChannelId, id, authorBadges,
        authorPhoto, timestampUsec,
      } = renderer;
      
      const photo = getBiggestPhoto(authorPhoto);
      const badgeImg = getBiggestBadge(authorBadges);
      const badgeList = getBadgeList(authorBadges);
      return {
        authorName, authorExternalChannelId, authorBadges,
        id, paid, photo, badgeList, badgeImg,
        timestamp: Number(timestampUsec) / 1000,
      };
    });
  if (appContainer) {
    if (type) {
      console.log(`${PREFIX} Dispatching chat init event`);
    }
    appContainer.dispatchEvent(new CustomEvent('livechat', {detail: authorList}));
  }
  for (const { id, authorExternalChannelId, badgeList, timestamp } of authorList) {
    modifyNameDisplay(id, authorExternalChannelId, badgeList, type);
    modifyTimestamp(id, timestamp, type);
  }
};

(async () => {
  appContainer = await waitForElm(`div#${APP_ID}`) as HTMLDivElement;
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
  
  window.fetch = async (resource, config) => {
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
  console.log(`${PREFIX} Done injecting fetch Capture`);
})();
