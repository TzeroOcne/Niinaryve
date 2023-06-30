// rollup-plugin-content-script.ts

import { cyan, cyanBright, redBright } from 'colorette';
import { writeFile } from 'fs/promises';
import Handlebars from 'handlebars';
import { resolve } from 'path';
import type { NormalizedOutputOptions } from 'rollup';
import type { ManifestV3 } from '../@types/manifest';
import type { AssetInfo, ChunkInfo } from '../@types/rollup';
import { generateManifest } from '../generator/manifest.generator';
import { distFileColorLog } from '../logger';
const MANIFEST_FILENAME = 'manifest.json';

export default function chromeExtension(manifest: ManifestV3) {
  console.log(cyan(`Handlebars v${Handlebars.VERSION}`));

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
