// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateReleaseConfig } = require('./generator/release-config.generator');

export default generateReleaseConfig({
  branches: 'main',
});