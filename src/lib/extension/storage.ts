export const store = async (data:Record<string,unknown>) => {
  const result = await chrome?.storage?.sync?.set(data);
  return result;
};

export const getStore = async (keys?:string|string[]|object) => {
  return await chrome?.storage?.sync?.get(keys);
};

export const getStoreValue = async <T>(key:string,defaultValue?:T) => {
  return (await getStore(key))?.[key] ?? defaultValue;
};