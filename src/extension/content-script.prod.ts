import type { TagArray } from '@types';
import runExtension from './content-script';

const fileUrl = (name:string, folder: 'runner' | 'app', type: 'css' | 'js', version:string) =>
  `https://cdn.jsdelivr.net/gh/TzeroOcne/Niinaryve@${version}/dist/${folder}/${name}.${type}`;
const getTagUrl = 'https://api.github.com/repos/TzeroOcne/Niinaryve/tags?per_page=1';

(async () => {
  const tagList:TagArray = await (await fetch(getTagUrl)).json();
  if (tagList.length === 0) {
    throw Error('cannot found latest tag');
  }
  const [{ name:latestTagName }] = tagList;
  
  runExtension({
    injectedCSSUrl: fileUrl('injected', 'runner', 'css', latestTagName),
    injectedJSUrl: fileUrl('injected', 'runner', 'js', latestTagName),
    openCSSUrl: fileUrl('open', 'app', 'css', latestTagName),
    openJSUrl: fileUrl('open', 'app', 'js', latestTagName),
    appCSSUrl: fileUrl('app', 'app', 'css', latestTagName),
    appJSUrl: fileUrl('app', 'app', 'js', latestTagName),
  });
})();