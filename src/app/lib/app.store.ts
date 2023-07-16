import type { AuthorSummary } from '@types';
import { writable } from 'svelte/store';

export const authorStore = writable<Record<string, AuthorSummary>>({});
export const authorSet = writable<Set<string>>(new Set<string>());
export const authorChatSet = writable<Record<string, Set<string>>>({});
export const selectedAuthor = writable<AuthorSummary>();

export const addChat = (author:AuthorSummary) => {
  const { authorExternalChannelId: channelId, id:chatId } = author;
  authorChatSet.update(chatSet => {
    if (!chatSet[channelId]) chatSet[channelId] = new Set();
    chatSet[channelId].add(chatId);
    return chatSet;
  });
  authorSet.update(authorSetValue => {
    if (authorSetValue.has(channelId)) {
      return authorSetValue;
    }
    authorSetValue.add(channelId);
    authorStore.update(authorStoreValue => {
      authorStoreValue[channelId] = author;
      return authorStoreValue;
    });
    return authorSetValue;
  });
};