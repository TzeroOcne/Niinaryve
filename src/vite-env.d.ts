/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@samrum/vite-plugin-web-extension/client" />

declare module '*.svelte' {
  export { SvelteComponent as default };
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}
