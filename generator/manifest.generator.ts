import type { ManifestV3 } from '@types';
export const DEFAULT_MANIFEST:ManifestV3 = {
  manifest_version: 3,
  name: '',
  version: '',
};

export function generateManifest(manifestConfig: ManifestV3) {
  return JSON.stringify({
    ...DEFAULT_MANIFEST,
    ...manifestConfig,
  }, undefined, 2);
}