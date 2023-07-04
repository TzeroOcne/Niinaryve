import { svelte } from '@sveltejs/vite-plugin-svelte';
import type { EntryOptions } from '@types';
import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { build, defineConfig } from 'vite';
import { generateManifest } from './generator';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

const __dirname = dirname(fileURLToPath(import.meta.url));

const entryFile:EntryOptions[] = [
  {
    name: 'content-script',
    path: 'src/extension/content-script.local.ts',
    empty: true,
  },
  {
    name: 'app',
    path: 'src/app/app.ts',
    dir: 'dist/app',
    empty: true
  },
  {
    name: 'open',
    path: 'src/app/open.ts',
    dir: 'dist/app',
  },
  {
    name: 'injected',
    path: 'src/runner/injected.ts',
    dir: 'dist/runner',
    empty: true,
  },
];

const defaultConfig = defineConfig({
  resolve: {
    alias: [
      {
        find: '@global',
        replacement: resolve(__dirname, 'src', 'global'),
      }
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
        outDir: dir ?? 'dist',
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
  
  await writeFile('dist/manifest.json', generateManifest({
    manifest_version: 3,
    name: 'Niinaryve-alpha',
    version: '1.0.0',
    version_name: '1.0.0 alpha',
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
          '*/*.js',
          '*/*.css',
        ],
        matches: [
          youtubeURLPattern
        ]
      }
    ],
  }));
}

buildPackages();