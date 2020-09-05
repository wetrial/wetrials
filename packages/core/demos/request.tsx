import React from 'react';
import { get, CryptoType } from '@wetrial/core';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '../src/request';

addRequestInterceptor(...commonRequestInterceptor);
addResponseInterceptor(...commonResponseInterceptor);

/**
 * 获取当前用户信息
 */
export async function getCurrent() {
  return await get(`/api/user/getCurrent?pid=526337162939974206`, {
    crypto: CryptoType.Out,
  });
}

export default () => {
  const handleRequest = () => {
    getCurrent().then((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
    });
  };

  return (
    <button onClick={handleRequest} type="button">
      请求
    </button>
  );
};
