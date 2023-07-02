export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: [
          'dist/**/*.{js,css}',
          '!dist/archive/**/*',
        ]
      }
    ],
    // '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/archive/chrome-extension.zip', label: 'Chrome Extension' },
        ]
      }
    ]
  ],
  branches: 'release',
};