export default {
  plugins: [
    '@semantic-release/github',
    {
      assets: [
        { path: 'dist/main.css', label: 'App CSS distribution' },
        { path: 'dist/main.js', label: 'App JS distribution' }
      ]
    }
  ],
  branches: 'main',
};