import { readFileSync } from 'fs';

const youtubeLivechatURLPattern = 'https://*.youtube.com/live_chat*';
const youtubeURLPattern = 'https://*.youtube.com/*';
const publicKey = readFileSync('extension.public.key', 'utf-8');

/** @type {import("@samrum/vite-plugin-web-extension").ViteWebExtensionOptions} */
export default {
  manifest: {
    name: 'Niinaryve',
    manifest_version: 3,
    version: '2.1.2',
    permissions: [
      'storage',
    ],
    icons: {
      '16': 'assets/icons/stripe-white-lined-boxed-16.png',
      '32': 'assets/icons/stripe-white-lined-boxed-32.png',
      '48': 'assets/icons/stripe-white-lined-boxed-48.png',
      '128': 'assets/icons/stripe-white-lined-boxed-128.png',
    },
    content_security_policy: {
      extension_pages: 'script-src \'self\' ; object-src \'self\';',
    },
    action: {
      default_popup: 'index.html',
    },
    content_scripts: [
      {
        run_at: 'document_end',
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
        matches: [youtubeURLPattern],
        resources: [
          'src/resources/injected/*',
          'src/resources/app/*',
          'src/resources/chatter/*',
        ],
      },
    ],
    key: publicKey,
  },
  additionalInputs: {
    scripts: [
    ],
  },
};
