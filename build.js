import webExtension from '@samrum/vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const sourceDir = path.resolve(__dirname, './src');

const defaultAlias = {
  '~': sourceDir,
  '$lib': path.resolve(sourceDir, 'lib'),
  '$components': path.resolve(sourceDir, 'components'),
  '@types': path.resolve(__dirname, '@types', 'index.ts'),
  '@consts': path.resolve(__dirname, '@consts', 'index.ts'),
};

const buildExtension = async () => {
  await build({
    configFile: false,
    plugins: [
      svelte(),
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
      alias: defaultAlias,
    },
    build: {
      watch: {
        include: [ 'src/**' ],
      },
    },
  });
};

/**
 * @param {string} name
 * @param {string} input
 */
const buildSingleEntry = async (name,input) => {
  await build({
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true,
        },
      }),
    ],
    configFile: false,
    resolve: {
      alias: defaultAlias,
    },
    build: {
      emptyOutDir: false,
      watch: {
        include: [ 'src/**' ],
      },
      rollupOptions: {
        input: {
          [name]: input,
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  });
};

const buildPackages = async () => {
  console.log(__dirname);
  await buildExtension();
  await buildSingleEntry(
    'src/resources/injected',
    'src/resources/injected.ts',
  );
  await buildSingleEntry(
    'src/resources/custom-elements',
    'src/resources/custom-elements.ts',
  );
};

buildPackages();