import store from 'store';

const storeWithExp = {
  /**
   * 设置缓存值
   */
  set: (key: string, val: any, exp?: number) => {
    store.set(key, { val, exp, time: exp !== undefined ? new Date().getTime() : undefined });
  },
  get: (key: string) => {
    const info = store.get(key);
    if (!info) {
      return null;
    }
    if (info.exp && new Date().getTime() - info.time > info.exp * 1000) {
      // 过期 移除
      storeWithExp.remove(key);
      return null;
    }
    return info.val;
  },
  remove: (key: string) => {
    store.remove(key);
  },
  clear: () => {
    store.clearAll();
  },
};

export default storeWithExp;
