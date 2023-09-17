import type { StyleVarName } from '@types';

export const store = async <T>(data:Record<string,T>) => {
  return await chrome?.storage?.sync?.set(data);
};

export const getStore = async (keys?:string|string[]|object) => {
  return await chrome?.storage?.sync?.get(keys);
};

export const getStoreValue = async <T>(key:string,defaultValue?:T) => {
  return (await getStore(key))?.[key] ?? defaultValue;
};

export const storeStyleValue = async <T>(name:StyleVarName, value:T) => {
  return await store({
    [name]: value,
  });
};

export const getStoreStyleValue = async <T>(name:StyleVarName) => {
  return await getStoreValue<T>(name);
};
