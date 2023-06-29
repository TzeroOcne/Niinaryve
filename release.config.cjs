const { generateReleaseConfig } = await import('./generator/release-config.generator');

export default generateReleaseConfig({
  branches: 'main',
});