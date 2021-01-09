import storeWithExp from '../store';

// eslint-disable-next-line @typescript-eslint/naming-convention
let token_name = `WETRIAL.TOKEN`;

export interface ITokenProps {
  /**
   * token值
   */
  token: string;
  /**
   * 刷新token的值
   */
  refreshToken?: string;
}

export const configTokenName = (tokenName: string) => {
  token_name = tokenName;
};

/**
 * 存储token
 * @param {string} token 要存储的token值
 * @param {number} exp 过期时长 秒
 */
export const setToken = (token: ITokenProps, exp?: number): void => {
  storeWithExp.set(token_name, token, exp);
};

/**
 * 获取当前用户的token
 */
export const getToken = (): ITokenProps => {
  return storeWithExp.get(token_name) as ITokenProps;
};

/**
 * 清除当前用户的token、以及权限
 */
export const clearToken = (): void => {
  storeWithExp.remove(token_name);
};
