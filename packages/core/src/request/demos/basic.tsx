import React from 'react';
import { get, CryptoType } from '@wetrial/core';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '@wetrial/core';

addRequestInterceptor(...commonRequestInterceptor);
addResponseInterceptor(...commonResponseInterceptor);

/**
 * 获取当前用户信息
 */
export async function getCurrent() {
  return await get(`https://proapi.azurewebsites.net/api/currentUserDetail`, {
    // crypto: CryptoType.Out,
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
      请求(自带cancel)
    </button>
  );
};
