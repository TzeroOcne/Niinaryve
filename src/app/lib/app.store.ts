import type { AuthorSummary } from '@types';
import { writable } from 'svelte/store';

export const authorStore = writable<Record<string, AuthorSummary>>({});