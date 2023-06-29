import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.ts',
        // injected: 'src/injected.ts',
        // background: 'src/background.ts',
        // main: 'index.html',
        // 'content-script': 'src/content-script.ts',
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
      }
    },
  }
});
