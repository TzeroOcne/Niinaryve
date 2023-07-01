import { svelte } from '@sveltejs/vite-plugin-svelte';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { build, defineConfig } from 'vite';
import type { EntryOptions } from './@types/entry';
import { generateManifest } from './generator';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';


const exntensionDir = resolve('src', 'extension');
const manifestPath = resolve('dist', 'extension', 'manifest.json');

const entryFile:EntryOptions[] = [
  {
    name: 'main',
    path: 'src/app/app.ts',
    empty: true
  },
  {
    name: 'content-script',
    path: resolve(exntensionDir, 'content-script.ts'),
    dir: 'dist/extension',
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
  
  await writeFile(manifestPath, generateManifest({
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
  }));
}

buildPackages();