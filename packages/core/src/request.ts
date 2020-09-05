/* eslint-disable @typescript-eslint/dot-notation */
import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { message } from 'antd';
import { getToken, setToken } from './authority';
// import { UnAuthorizedException, UserFriendlyException, ErrorShowType } from './exception';
import { newGuid } from './utils';
import { encrypt, decrypt, encryptKey } from './crypto';
import { CryptoType, IKeyValue } from './core';

export interface IRequestOption extends AxiosRequestConfig {
  /**
   * 操作成功是否提示
   */
  successTip?: boolean;
  /**
   * 请求方式
   */
  method?: Method;
  /**
   * 加密传输方式
   */
  crypto?: CryptoType;
}

// eslint-disable-next-line
let instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 6000,
  timeoutErrorMessage: '请求超时，请重试!',
});

/**
 * 修改axios实例
 * @param config 配置
 */
export const configInstance = (config: AxiosRequestConfig) => {
  instance = axios.create(config);
};

/**
 * 全局设置的header
 */
// eslint-disable-next-line import/no-mutable-exports
let globalHeaders: () => IKeyValue<string>;

export const configGlobalHeader = (func: () => IKeyValue<string>) => {
  globalHeaders = func;
};

/**
 * 全局设置刷新token请求
 */
let refreshToken: () => Promise<any> = () => {
  return Promise.reject(new Error('尚未初始化refreshToken'));
};

export const configRefreshToken = (func: () => Promise<any>) => {
  refreshToken = func;
};

/**
 * 通用请求拦截器
 */
const commonRequestInterceptor = [
  (option: any) => {
    const config: IRequestOption = option as IRequestOption;

    // 全局设置的请求头
    if (globalHeaders) {
      const otherHeaders = globalHeaders();
      if (otherHeaders) {
        config.headers = {
          ...config.headers,
          ...otherHeaders,
        };
      }
    }

    const tokenStore = getToken();
    if (tokenStore && tokenStore.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokenStore.token}`,
      };
    }
    if (config.crypto) {
      config['cryptoKey'] = newGuid();
      if (config.crypto === CryptoType.In || config.crypto === CryptoType.Both) {
        config.data = encrypt(config.data, config['cryptoKey']);
      }
      config.headers = {
        ...config.headers,
        Triple_DES_Key: encryptKey(config['cryptoKey']),
      };
    }

    return config;
  },
];

/**
 * 通用响应拦截，拦截异常信息(非200-302之间的状态码)、未授权等
 */
const commonResponseInterceptor = [
  (response: AxiosResponse): any => {
    const { data, config } = response;
    const requestConfig = config as IRequestOption;
    if (requestConfig.responseType && requestConfig.responseType.toLowerCase() === 'arraybuffer') {
      return Promise.resolve(data);
    }
    if (requestConfig.successTip) {
      message.success('操作成功', 2);
    }

    if (requestConfig.crypto === CryptoType.Out || requestConfig.crypto === CryptoType.Both) {
      if (typeof data === 'string') {
        const decryptData = decrypt(data, config['cryptoKey']);
        return Promise.resolve(JSON.parse(decryptData));
      }
    }
    return Promise.resolve(data);
  },
  ({ response }: { response: AxiosResponse }) => {
    return Promise.reject(response);
  },
];

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests: Function[] = [];

/**
 * 通用响应拦截，拦截异常信息(非200-302之间的状态码)、未授权等
 */
const commonResponseWithRefreshTokenInterceptor = [
  (response: AxiosResponse): any => {
    const { data, config } = response;
    const requestConfig = config as IRequestOption;
    if (requestConfig.responseType && requestConfig.responseType.toLowerCase() === 'arraybuffer') {
      return Promise.resolve(data);
    }
    if (requestConfig.successTip) {
      message.success('操作成功', 2);
    }

    if (requestConfig.crypto === CryptoType.Out || requestConfig.crypto === CryptoType.Both) {
      if (typeof data === 'string') {
        const decryptData = decrypt(data, config['cryptoKey']);
        return Promise.resolve(JSON.parse(decryptData));
      }
    }
    return Promise.resolve(data);
  },
  ({ response }: { response: AxiosResponse }) => {
    if (!response || response.status !== 401) {
      return Promise.reject(response);
    }
    const token = getToken();
    if (!token) {
      return Promise.reject(response);
    }
    const { config } = response;
    // 401 而且有本地token说明token过期需要刷token
    if (!isRefreshing) {
      isRefreshing = true;

      return refreshToken()
        .then((result) => {
          if (!result || !result.token) {
            throw new Error('刷新token失败，没有获取到新token');
          }
          setToken({
            token: result.token,
            refreshToken: result.refreshToken,
          });
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach((cb) => cb());
          requests = [];
          return request(config);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    // 正在刷新token，将返回一个未执行resolve的promise
    return new Promise((resolve) => {
      requests.push(() => {
        resolve(request(config));
      });
    });
  },
];

export async function request<TResult = any>(opt: IRequestOption) {
  const result = await instance.request<TResult>(opt);
  return (result as unknown) as TResult;
}

export async function get<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    ...omit(opt, 'data'),
    method: 'get',
    params: { timespan: new Date().getTime(), ...opt?.data },
    successTip: false,
  });
}

export async function post<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'post',
  });
}

export async function put<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'put',
  });
}

export async function patch<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'patch',
  });
}

export async function del<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'delete',
  });
}

export async function head<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'HEAD',
  });
}

export async function options<TResult = any>(url: string, opt?: IRequestOption) {
  return await request<TResult>({
    url,
    successTip: true,
    ...opt,
    method: 'OPTIONS',
  });
}

function addRequestInterceptor(
  onFulfilled?: (value: any) => any | Promise<any>,
  onRejected?: (error: any) => any,
) {
  return instance.interceptors.request.use(onFulfilled, onRejected);
}

function ejectRequestInterceptor(interceptorId: number) {
  return instance.interceptors.request.eject(interceptorId);
}

function addResponseInterceptor(
  onFulfilled?: (value: any) => any | Promise<any>,
  onRejected?: (error: any) => any,
) {
  return instance.interceptors.response.use(onFulfilled, onRejected);
}

function ejectResponseInterceptor(interceptorId: number) {
  return instance.interceptors.response.eject(interceptorId);
}

export {
  axios,
  instance,
  globalHeaders,
  commonRequestInterceptor,
  commonResponseInterceptor,
  commonResponseWithRefreshTokenInterceptor,
  addRequestInterceptor,
  ejectRequestInterceptor,
  addResponseInterceptor,
  ejectResponseInterceptor,
};
