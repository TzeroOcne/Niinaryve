const youtubeLivechatURLPattern = 'https://*.youtube.com/*';
const youtubeURLPattern = 'https://*.youtube.com/*';

/** @type {import("@samrum/vite-plugin-web-extension").ViteWebExtensionOptions} */
export default {
  manifest: {
    name: 'niinaryve',
    manifest_version: 3,
    version: '2.0.0',
    permissions: [
      'storage',
    ],
    action: {
      default_popup: 'index.html',
    },
    content_scripts: [
      {
        run_at: 'document_start',
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
        matches: [ youtubeURLPattern ],
        resources: [
          'src/resources/injected/injected.js',
          'src/resources/injected/injected.css',
        ],
      },
    ],
  },
  additionalInputs: {
    scripts: [
    ],
  },
};