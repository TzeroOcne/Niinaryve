import { svelte } from '@sveltejs/vite-plugin-svelte';
import { build, defineConfig } from 'vite';
import type { EntryOptions } from './@types/entry';

const entryFile:EntryOptions[] = [
  {
    name: 'main',
    path: 'src/app/app.ts',
    empty: true
  },
  {
    name: 'content-script',
    path: 'src/extension/content-script.ts',
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
}

buildPackages();