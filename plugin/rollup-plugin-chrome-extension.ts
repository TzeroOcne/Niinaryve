// rollup-plugin-content-script.ts

import { generateManifest } from '@generator';
import { distFileColorLog } from '@logger';
import type { AssetInfo, ChunkInfo, ManifestV3 } from '@types';
import { cyanBright, redBright } from 'colorette';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { NormalizedOutputOptions } from 'rollup';
const MANIFEST_FILENAME = 'manifest.json';

export default function chromeExtension(manifest: ManifestV3) {
  return {
    name: 'chrome-extension',
    async generateBundle({ dir }:NormalizedOutputOptions, bundle:{ [fileName: string]: AssetInfo | ChunkInfo }) {
      console.log();
      const manifestFilepath = resolve(dir, MANIFEST_FILENAME);
      const chunkList:ChunkInfo[] = Object.values(bundle).filter((_chunk):_chunk is ChunkInfo => true);
      const nonEntry = chunkList.filter(({ isEntry }) => !isEntry).map(({ fileName }) => fileName);
      manifest?.web_accessible_resources?.forEach(({ resources }) => {
        resources.push(...nonEntry);
      });

      try {
        await writeFile(manifestFilepath, generateManifest(manifest));
        console.log(distFileColorLog(
          dir,
          manifestFilepath,
          MANIFEST_FILENAME,
          cyanBright,
        ));
      } catch (error) {
        console.log(redBright(error.message));
      }
    },
  };
}
