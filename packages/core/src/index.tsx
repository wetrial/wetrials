/* eslint-disable @typescript-eslint/no-unused-expressions */

// 只导出高频使用的，其他一律通过import {} from '@wetrial/core/es/xxxx' 形式使用
import { configBase64Map, configRSAKey } from './crypto';
import { configRoutePrefix } from './route-helper';
import { configGlobalHeader, configRefreshToken } from './request';
import { IKeyValue } from './core';

export { request, get, post, put, del, patch, head, options } from './request';

export { default as store } from './store';

export { base64, debase64, encrypt, decrypt, encryptKey, encryptBtoa, decryptAtob } from './crypto';

export type { IWithFalse, IKeyValue } from './core';

export { CryptoType } from './core';

interface IWetrialCoreProps {
  /**
   * crypto中RSA加解密使用的Key
   */
  RSAKey?: string;
  /**
   * crypto中base64使用的map
   */
  Base64MAP?: string;
  /**
   * 动态追加的路由前缀
   */
  routeProfix?: string;
  /**
   * 自定义全局的ajax请求头
   */
  getGlobalHeader?: () => IKeyValue<string>;
  /**
   * 配置置换token的请求
   */
  configRefreshToken?: () => Promise<any>;
}

/**
 * 初始化wetrial core库的配置
 * @param props
 */
export function initWetrialCore(props: IWetrialCoreProps) {
  props.RSAKey && configRSAKey(props.RSAKey);
  props.Base64MAP && configBase64Map(props.Base64MAP);
  props.routeProfix && configRoutePrefix(props.routeProfix);
  props.getGlobalHeader && configGlobalHeader(props.getGlobalHeader);
  props.configRefreshToken && configRefreshToken(props.configRefreshToken);
}
