import { useRef } from "react";
const useCache = (() => {
  const cacheMap: Map<number, any> = new Map();
  const cacheSetMap: Map<symbol, any> = new Map();
  let keyUp = 0;

  const getCache = (key: number) => {
    return cacheMap.get(key);
  };

  const setCache = (key: number, _value: any) => {
    cacheMap.set(key, _value);
  };

  const useCache = (value: any) => {
    let _key = keyUp
    const _getCache = () => {
      console.log(cacheMap);

      return getCache(_key);
    };

    const _setCache = ($value: any) => {
      return setCache(_key, $value);
    };

    cacheMap.set(_key, value);
    keyUp ++ 

    return [_getCache, _setCache] as const;
  };

  return useCache;
})();

export default useCache;
