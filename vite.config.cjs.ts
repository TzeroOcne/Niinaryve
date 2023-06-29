import { defineConfig } from 'vite';
import chromeExtension from './plugin/rollup-plugin-chrome-extension';

const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

export default defineConfig({
  plugins: [
    chromeExtension({
      manifest_version: 3,
      name: 'YT Chat Verifier',
      version: '0.0.1',
      // background: {
      //   service_worker: 'background.js',
      // },
      permissions: [
        'scripting',
        'activeTab',
        'tabs',
        'tabCapture',
        'tabGroups',
        'debugger',
        'webRequest',
        'webRequest',
      ],
      host_permissions: [
        '*://*.youtube.com/*',
        '*://localhost/*'
      ],
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
    }),
  ],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        injected: 'src/injected.ts',
        'content-script': 'src/content-script.ts',
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
      }
    }
  }
});
