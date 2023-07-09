import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { EntryOptions } from '@types';
import { copy } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { build, defineConfig } from 'vite';
import { generateManifest } from './generator';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
// const youtubeURLPattern = 'https://*.youtube.com/*';

const iconName = (size:16 | 32 | 48 | 128) => `icons/stripe-white-lined-boxed-${size}.png`;

const extensionSrcDir = resolve('src', 'extension');
const extensionDir = resolve('dist', 'extension');
const manifestPath = resolve(extensionDir, 'manifest.json');
const iconAssetDir = resolve('assets', 'icons');
const popupAssetDir = resolve('assets', 'popup');
const __dirname = dirname(fileURLToPath(import.meta.url));

const extensionDescription = '\
Enhance livestream chat experience. Automatically link youtube live chat username with \
their channel link.\
';

const entryFile:EntryOptions[] = [
  {
    name: 'app',
    path: 'src/app/app.ts',
    empty: true
  },
  {
    name: 'open',
    path: 'src/app/open.ts',
  },
  {
    name: 'content-script',
    path: resolve(extensionSrcDir, 'content-script.prod.ts'),
    dir: 'dist/extension',
    empty: true
  },
  {
    name: 'popup',
    path: 'src/extension/popup/popup.ts',
    dir: 'dist/extension/popup',
    empty: true
  },
  {
    name: 'injected',
    path: 'src/runner/injected.ts',
    dir: 'dist/runner',
    empty: true
  },
];

const defaultConfig = defineConfig({
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
    svelte(),
  ],
});

async function buildPackages () {
  for (const { name, path, dir, empty } of entryFile) {
    await build({
      ...defaultConfig,
      publicDir: false,
      configFile: false,
      build: {
        emptyOutDir: empty ?? false,
        outDir: dir ?? 'dist/app',
        rollupOptions: {
          input: {
            [name]: path,
          },
          output: {
            assetFileNames: '[name].[ext]',
            entryFileNames: '[name].js',
          }
        }
      }
    });
  }
  
  await copy(iconAssetDir, resolve(extensionDir, 'icons'));
  await copy(popupAssetDir, resolve(extensionDir, 'popup'));
  
  await writeFile(manifestPath, generateManifest({
    manifest_version: 3,
    name: 'Niinaryve',
    version: '1.1.0',
    icons: {
      '16': iconName(16),
      '32': iconName(32),
      '48': iconName(48),
      '128': iconName(128),
    },
    action: {
      default_popup: 'popup/popup.html'
    },
    permissions: [
      'storage',
    ],
    description: extensionDescription,
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
  }));
}

buildPackages();