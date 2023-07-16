export const createIdSelector = (idSet:Set<string> = new Set()) => {
  return [...idSet]
    .map(id => `[id="${id}"] span#message`)
    .join(',');
};