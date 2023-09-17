import { PREFIX } from '$lib/extension/global';
import ChatName from 'src/resources/injected/ChatName.svelte';
import type { ComponentType } from 'svelte';

const defineCustomElement = ({ element }:ComponentType, options?:ElementDefinitionOptions) => {
  if (element) {
    return customElements.define('nnryv-chat-username', element, options);
  }
};

defineCustomElement(ChatName, { extends: 'a' });

console.log(`${PREFIX} Register custom element`);
