import { svelte } from '@sveltejs/vite-plugin-svelte';
import { build, defineConfig } from 'vite';

const entryFile = [
  ['main', 'src/main.ts'],
  ['content-script', 'src/content-script.ts'],
  ['injected', 'src/injected.ts'],
];

const defaultConfig = defineConfig({
  plugins: [
    svelte(),
  ],
});

async function buildPackages () {
  for (const index in entryFile) {
    const [ name, path ] = entryFile[index];
    await build({
      ...defaultConfig,
      publicDir: false,
      configFile: false,
      build: {
        emptyOutDir: index === 0,
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