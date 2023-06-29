import { writable } from 'svelte/store';
import type { AuthorSummary } from '../../@types/livechat';

export const authorStore = writable<Record<string, AuthorSummary>>({});