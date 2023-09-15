import '$components/ChatName.svelte';
import { PREFIX } from '$lib/app/app';

console.log(`${PREFIX} Register custom element`);

// const defineCustomElement = (name:string, { element }:ComponentType) => {
//   console.log({ element });
//   if (element)
//     return customElements.define(name, element);
// };

// (async () => {
//   console.log({ ChatName });
//   defineCustomElement('nnryv-chat-username', ChatName);
// })();