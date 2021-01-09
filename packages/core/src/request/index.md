---
title: request - 请求库
order: 1
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# request - 请求库

提供 ajax 请求的封装,包括请求拦截、响应拦截、异常处理等(不建议直接使用)

> 通常会在项目中提取一层，如:src/utils/request.ts

```ts | pure
import {
  addRequestInterceptor,
  addResponseInterceptor,
  commonRequestInterceptor,
  commonResponseInterceptor,
} from '@wetrial/core/es/request';

// 添加请求拦截器(自动带上Authority请求头)
addRequestInterceptor(...commonRequestInterceptor);
// 添加响应拦截器(处理tip、全局错误等)
addResponseInterceptor(...commonResponseInterceptor);

export { request, get, post, put, patch } from '@wetrial/core';
```

## 使用方式

```tsx |pure
import { get, post, request } from '@/utils/request';

const result = await get('');
```

### 基础使用

<code src="./demos/basic.tsx" />

## Methods

| 名称 | 描述 | 类型 |
| --- | --- | --- | --- |
| get | 发送 get 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption | string):Promise<T>` |
| post | 发送 post 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| put | 发送 put 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| del | 发送 delete 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| patch | 发送 patch 请求，返回 Promise 类型的泛型 T，[IRequestOption](#irequestoption) | `(opt:IRequestOption):Promise<T>` |
| request | 各类请求的基类，get、post、put、del、patch 都是在该方法的基础上进行扩展的(比如设置 method) | `(opt:IRequestOption):Promise<T>` |
| instance | axios 的实例 |  |
| commonRequestInterceptor | 通用请求拦截器，会将 getToken 获取到的值设置到请求头的 Authorization |  |
| commonResponseInterceptor | 通用响应拦截器，会处理`showTip`、未授权请求、数据转换等 |  |
| addRequestInterceptor | 添加请求拦截器 |  |
| ejectRequestInterceptor | 删除请求拦截器 |  |
| addResponseInterceptor | 添加响应拦截器 |  |
| ejectResponseInterceptor | 删除响应拦截器 |  |
| configGlobalHeader | 用于配置全局添加的请求头,一次配置所有请求生效 |  |

### IRequestOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| successTip | 是否显示操作成功的提示 | boolean? | get 请求 false,其他 true |
| url | 请求的 url 地址 | string | - |
| method | 请求的 method,可以通过扩展方法比如，post 不需要提供该参数 | string? 'post'、'get'、'put','delete','patch' | - |
| [更多配置](https://github.com/axios/axios#request-config) |  |  | - |

#### commonRequestInterceptor

- 会将 configGlobalHeader 中反回的值设置到 headers 中去
- 会自动添加 Authorization 请求头,会调用 authority 中的 getToken 方法获取 token 值
- 根据配置是否加密来对请求内容进行加密以及解密的密钥以请求头的形式传递给后端

#### commonResponseInterceptor

- 根据配置参数 successTip 弹成功提示
- 根据配置的加密来解密响应内容
- 处理非 200-302 的请求进入异常处理
