import ChatName from '$components/ChatName.svelte';
import { PREFIX } from '$lib/app/app';
import type { ComponentType } from 'svelte';

const defineCustomElement = ({ element }:ComponentType, options?:ElementDefinitionOptions) => {
  if (element) {
    return customElements.define('nnryv-chat-username', element, options);
  }
};

defineCustomElement(ChatName, { extends: 'a' });

console.log(`${PREFIX} Register custom element`);
