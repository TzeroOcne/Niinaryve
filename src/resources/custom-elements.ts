import ChatName from '$components/ChatName.svelte';
import type { ComponentType } from 'svelte';

const defineCustomElement = (name:string, { element }:ComponentType) => {
  if (element)
    return customElements.define(name, element);
};

setTimeout(() => {
  defineCustomElement('nnryv-chat-username', ChatName);
}, 0);