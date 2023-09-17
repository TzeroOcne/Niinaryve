import webExtension from '@samrum/vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { existsSync, mkdirSync } from 'fs';
import { copy } from 'fs-extra';
import { readdir, rm } from 'fs/promises';
import minimist from 'minimist';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import extensionConfig from './extension.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const sourceDir = path.resolve(__dirname, './src');
const argv = minimist(process.argv.slice(2));

const isWatch = argv?.w ?? argv?.watch ?? false;
const rawOutDir = argv?.o ?? argv?.['out-dir'];

const outDir = rawOutDir instanceof String ? rawOutDir.toString() : 'dist';

/** @type {import('vite').BuildOptions} */
const defaultBuildOptions = {
  outDir,
  emptyOutDir: false,
};

if (isWatch) {
  defaultBuildOptions.watch = {
    include: [ 'src/**' ],
  };
}

const defaultAlias = {
  '~': sourceDir,
  '$lib': path.resolve(sourceDir, 'lib'),
  '$assets': path.resolve(sourceDir, 'assets'),
  '$components': path.resolve(sourceDir, 'components'),
  '@types': path.resolve(__dirname, '@types', 'index.ts'),
  '@consts': path.resolve(__dirname, '@consts', 'index.ts'),
};

const buildExtension = async () => {
  /** @type {import('vite').BuildOptions} */
  const extensionBuidOptions = {};

  if (isWatch) {
    extensionBuidOptions.watch = {
      include: [
        'src/**',
        'extension.config.js',
      ],
      exclude: [
        'src/resources/**',
      ],
    };
  }

  await build({
    configFile: false,
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true,
        },
      }),
      webExtension(extensionConfig),
    ],
    resolve: {
      alias: defaultAlias,
    },
    build: {
      ...(defaultBuildOptions),
      ...(extensionBuidOptions),
    },
  });
};

/**
 * @param {string} name
 * @param {string} input
 */
const buildSingleEntry = async (name,input) => {
  /** @type {import('vite').BuildOptions} */
  const resourcesBuidOptions = {};

  if (isWatch) {
    resourcesBuidOptions.watch = {
      include: [
        path.posix.join(path.posix.dirname(input), '**'),
      ],
    };
  }

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
      ...(defaultBuildOptions),
      ...(resourcesBuidOptions),
      rollupOptions: {
        input: {
          [name]: input,
        },
        output: {
          assetFileNames() {
            return path.posix.join(path.dirname(name ?? ''), '[name][extname]');
          },
          manualChunks: () => '',
          entryFileNames: '[name].js',
        },
      },
    },
  });
};

const buildPackages = async () => {
  for (const file of await readdir(outDir)) {
    await rm(path.join(outDir, file), { recursive: true });
  }
  if (!existsSync('dist')) {
    mkdirSync('dist');
  }
  await copy('assets/icons', 'dist/assets/icons');
  await buildExtension();
  await buildSingleEntry(
    'src/resources/injected/injected',
    'src/resources/injected/injected.ts',
  );
  await buildSingleEntry(
    'src/resources/app/app',
    'src/resources/app/app.ts',
  );
  await buildSingleEntry(
    'src/resources/chatter/chatter',
    'src/resources/chatter/chatter.ts',
  );
  // await buildSingleEntry(
  //   'src/resources/custom-elements',
  //   'src/resources/custom-elements.ts',
  // );
};

buildPackages();
