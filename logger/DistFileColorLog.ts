import { Color } from 'colorette';
import { posix, relative, resolve, win32 } from 'path';

export function distFileColorLog(dir: string, filepath: string, filename: string, color: Color) {
  const scriptFilepath = resolve(dir, filename);
  const scriptRelPath = relative(resolve(dir, '..'), scriptFilepath).split(win32.sep).join(posix.sep);
  return scriptRelPath.replace(filename, color(filename));
}