import webExtension from '@samrum/vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { defineConfig } from 'vite';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

const sourceDir = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
    webExtension({
      manifest: {
        name: 'niinaryve',
        manifest_version: 3,
        version: '2.0.0',
        permissions: [
          'storage',
        ],
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
        web_accessible_resources: [
          {
            matches: [ youtubeURLPattern ],
            resources: [
              'src/resources/injected.js',
              'src/resources/custom-elements.js',
            ],
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
      '~': sourceDir,
      '$lib': path.resolve(sourceDir, 'lib'),
      '$components': path.resolve(sourceDir, 'components'),
      '@types': path.resolve(__dirname, '@types', 'index.ts'),
      '@consts': path.resolve(__dirname, '@consts', 'index.ts'),
    },
  },
  build: {
    watch: {
      include: 'src/**',
    },
    rollupOptions: {
      input: {
        '@resources/injected': 'src/resources/injected.ts',
        '@resources/custom-elements': 'src/resources/custom-elements.ts',
      },
      output: {
        manualChunks: (id) => {
          if (path.resolve(id).startsWith(path.resolve(__dirname, 'src', 'resources'))) {
            const chunkName = path.basename(id).replace(/ts$/i, 'js');
            console.log(id, chunkName);

            return chunkName;
          }
        },
        entryFileNames(chunkInfo) {
          if (chunkInfo.name.startsWith('@resources')) {
            return `${chunkInfo.name.replace('@resources', 'src/resources')}.js`;
          }
          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
