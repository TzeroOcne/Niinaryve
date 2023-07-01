export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: ['dist/**/*.{js,css}']
      }
    ],
    // '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/extension/**/*', label: 'Extension distribution' },
        ]
      }
    ]
  ],
  branches: 'release',
};