import type { StyleVarName } from '@types';

export const StyleVarNameList = [
  'nnryv-name-base',
  'nnryv-name-member',
  'nnryv-name-moderator',
  'nnryv-timestamp-display-relative',
  'nnryv-timestamp-display-absolute',
] as const;

export const StyleDefaultValue:Record<StyleVarName, string> = {
  'nnryv-name-base': '#7fffd4',
  'nnryv-name-member': '#2ba640',
  'nnryv-name-moderator': '#5e84f1',
  'nnryv-timestamp-display-absolute': 'none',
  'nnryv-timestamp-display-relative': 'inline',
};