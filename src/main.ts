import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: __dirname,
    resolve: {
      alias: [
        {
          find: '@global',
          replacement: resolve(__dirname, 'global'),
        },
        {
          find: '@popup',
          replacement: resolve(__dirname, 'extension', 'popup'),
        },
      ],
    },
    plugins: [
      svelte(),
    ]
  });
  await server.listen();

  server.printUrls();
})();