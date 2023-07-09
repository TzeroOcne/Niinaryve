import { resolve } from 'path';
import { defineConfig } from 'vite';
import chromeExtension from './plugin/rollup-plugin-chrome-extension';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@global',
        replacement: resolve(__dirname, 'src', 'global'),
      },
      {
        find: '@popup',
        replacement: resolve(__dirname, 'src', 'extension', 'popup'),
      },
    ],
  },
  plugins: [
    // svelte(),
    chromeExtension({
      manifest_version: 3,
      name: 'YT Chat Verifier',
      version: '0.0.1',
      content_security_policy: {
        extension_pages: 'script-src \'self\' ; object-src \'self\';',
      },
      content_scripts: [
        {
          run_at: 'document_start',
          js: [
            'content-script.js'
          ],
          matches: [
            youtubeLivechatURLPattern
          ],
          all_frames: true,
        }
      ],
      web_accessible_resources: [
        {
          resources: [
            'main.js',
            'injected.js',
            'main.css',
          ],
          matches: [
            youtubeURLPattern
          ]
        }
      ]
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // main: 'src/main.ts',
        // injected: 'src/injected.ts',
        // 'content-script': 'src/content-script.ts',
      },
      output: {
        // assetFileNames: '[name].[ext]',
        // entryFileNames: '[name].js',
      }
    },
  }
});
