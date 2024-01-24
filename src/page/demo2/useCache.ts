import React, { useRef, useCallback } from "react";

const useCache = (() => {
  let keyUp = 0;
  const _cache: any = {};

  const _useCache = (_initialValue?: any) => {
    let _keyUp = keyUp;
    keyUp++;
    const _getCache = () => {
      return _cache[_keyUp];
    };
    const _setCache = (value: any) => {
      _cache[_keyUp] = value;
    };
    _setCache(_initialValue);
    return [_getCache, _setCache] as const;
  };

  return _useCache;
})()

export default useCache;
