import { waitForElm } from '$lib/document';
import { APP_ID, PREFIX } from '$lib/extension/global';
import type { Actions, AuthorBadgeObject, AuthorPhoto, AuthorSummary, BadgeType, LiveChatData, ReplayChatItemAction, Thumbnail } from '@types';
import ChatName from './ChatName.svelte';
import ChatTimestamp from './ChatTimestamp.svelte';
import './injected.css';

const { fetch: originalFetch } = window;
let appContainer:HTMLDivElement;
const memberRegex = /(member|pelanggan)/i;
const moderatorRegex = /moderator/i;
const verfiedRegex = /verified/i;
const markedList:Record<string,boolean> = {};

const isBadge = (badges:AuthorBadgeObject[] = [], regex:RegExp):boolean => {
  if (badges.length === 0) {
    return false;
  }

  for (const badgeItem of badges) {
    if (regex.test(badgeItem?.liveChatAuthorBadgeRenderer?.tooltip ?? '')) {
      return true;
    }
  }
  return false;
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
  for (const nameDup of document.querySelectorAll('.nnryv-chat-usernaem ~ .nnryv-chat-username')) {
    nameDup.remove();
  }
};

const modifyChatContainer = async (id:string, channelId: string, badges:BadgeType[]) => {
  const chatContainer = await waitForElm(`yt-live-chat-text-message-renderer[id="${id}"]`);
  chatContainer.setAttribute('data-channel-id', channelId);
  if (!badges.includes('member') && !badges.includes('moderator'))
    chatContainer.setAttribute('data-badge-chatter', 'true');
  if (badges.includes('member'))
    chatContainer.setAttribute('data-badge-member', 'true');
  if (badges.includes('moderator'))
    chatContainer.setAttribute('data-badge-moderator', 'true');
};

const modifyNameDisplay = async (id:string, channelId:string, badges:BadgeType[], type?: 'init') => {
  const nameContainer = await waitForElm(`[id="${id}"] span#author-name:not(.nnryv-marked)`);
  nameContainer.classList.add('nnryv-marked');
  const rawName = nameContainer?.textContent ?? '';
  for (const child of nameContainer.childNodes) {
    nameContainer.removeChild(child);
  }

  new ChatName({
    target: nameContainer,
    props: {
      label: rawName,
      channelId,
      link: `/channel/${channelId}`,
      isMember: badges.includes('member'),
      isModerator: badges.includes('moderator'),
      isVerified: badges.includes('verified'),
    },
  });
  setTimeout(removeNameDup, 0);
  if (type) {
    // Do something
  }
};

const modifyTimestamp = async (id:string, timestamp:number, type?: 'init') => {
  const timestampContainer = await waitForElm(`[id="${id}"] span#timestamp:not(.nnryv-marked)`) as HTMLSpanElement;
  timestampContainer.classList.add('nnryv-marked');
  const original = timestampContainer?.innerText?.toString() ?? '';
  const chatTimestamp = new Date(timestamp);
  const hour = chatTimestamp.getHours().toString();
  const minute = chatTimestamp.getMinutes().toString();
  const absolute = `${hour}:${minute.padStart(2, '0')}`;
  for (const child of timestampContainer.childNodes) {
    timestampContainer.removeChild(child);
  }
  new ChatTimestamp({
    target: timestampContainer,
    props: {
      original,
      absolute,
    },
  });
  if (type) {
    // Do something
  }
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
    if (curr.height && result.height && curr.height > result.height) result = curr;
  }
  return result;
};

const getBiggestPhoto = (authorPhoto:AuthorPhoto | AuthorPhoto[]) => {
  let thumbnail:Thumbnail|undefined;
  if (authorPhoto instanceof Array) {
    const filteredThumbnails:Thumbnail[] = [];
    for (const phoyoItem of authorPhoto) {
      if (phoyoItem?.thumbnails) {
        const biggestThumbnail = getBiggestThumbnail(phoyoItem.thumbnails);
        if (biggestThumbnail) filteredThumbnails.push(biggestThumbnail);
      }
    }
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
    .map(badge => badge?.liveChatAuthorBadgeRenderer?.customThumbnail?.thumbnails)
    .reduce((prev, curr) => [...(prev ?? []), ...(curr ?? [])], []);
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
    }).flatMap(val => val ? [val] : [])
    .map(({ renderer, paid }) => {
      const {
        authorName, authorExternalChannelId, id, authorBadges,
        authorPhoto, timestampUsec,
      } = renderer;
      const photo = (authorPhoto) ? getBiggestPhoto(authorPhoto) : undefined;
      const badgeImg = getBiggestBadge(authorBadges);
      const badgeList = (authorBadges) ? getBadgeList(authorBadges) : undefined;
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
    document.dispatchEvent(new CustomEvent('nnryv-livechat', {detail: authorList}));
  }
  for (const { id, authorExternalChannelId, badgeList, timestamp } of authorList) {
    if (markedList[id ?? '']) continue;
    markedList[id ?? ''] = true;
    modifyChatContainer(id ?? '', authorExternalChannelId ?? '' , badgeList ?? []);
    modifyNameDisplay(id ?? '', authorExternalChannelId ?? '', badgeList ?? [], type);
    modifyTimestamp(id ?? '', timestamp ?? 0, type);
  }
};

(async () => {
  appContainer = await waitForElm(`div#${APP_ID}`) as HTMLDivElement;
  console.log(`${PREFIX} Modify Init`);
  waitForElm<HTMLScriptElement>('body>script:not([src])').then(async (scriptElement:HTMLScriptElement) => {
    const initialText = scriptElement.text;
    const dataText = initialText.replace(/^(.*?) = /, '')
      .replace(/;*$/, '');
    const initData:LiveChatData = JSON.parse(dataText);
    modifyLiveChat(initData, 'init');
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
      }, 0);
    }
    return response;
  };
  console.log(`${PREFIX} Done injecting fetch Capture`);
})();