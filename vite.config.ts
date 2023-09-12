import webExtension from '@samrum/vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { defineConfig } from 'vite';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
// const youtubeURLPattern = 'https://*.youtube.com/*';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      manifest: {
        name: 'niinaryve',
        manifest_version: 3,
        version: '2.0.0',
        action: {
          default_popup: 'index.html',
        },
        content_scripts: [
          {
            run_at: 'document_start',
            js: [
              'src/scripts/content-scripts.ts',
            ],
            matches: [
              youtubeLivechatURLPattern,
            ],
            all_frames: true,
          },
        ],
      },
      additionalInputs: {
        scripts: [
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
