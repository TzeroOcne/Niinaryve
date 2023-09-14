import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/vite-plugin-svelte').CompileOptions} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
};
