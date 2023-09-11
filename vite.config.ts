import { crx } from '@crxjs/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    crx({
      manifest: {
        manifest_version: 3,
        name: 'niinaryve',
        version: '2.0.0',
      },
    }),
  ],
});
