---
title: crypto - 加密方法
order: 2
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: 核心库
  path: /
---

# crypto - 加密方法

提供了一套前端加解密的方法，用于页面上部分敏感信息需要加解密传输的情况使用

<Alert type="info">
ajax传输过程中的加密，可以在ajax相关方法中增加一个配置参数 crypto来控制，ajax方法会自动对数据进行加解密传输(需要添加预定义的拦截器以及后端api的配合)
</Alert>

## 使用方式

```tsx | pure
import { crypto } from '@wetrial/core';

const { base64 } = crypto;

const isPromiseFunction = base64({ userName: 'admin', password: 'AAAAAA' });
```

## Methods

| 名称 | 描述 | 类型 | 结果案例 |
| --- | --- | --- | --- |
| base64 | 对内容进行 base64 处理 | `(content: string\| object): string` |  |
| debase64 | 对内容进行反向 base64 | `(content: string): string` |  |
| encrypt | 对数据内容进行加密-3des 加密 | `(content: string\| object, key: string): string` |  |
| decrypt | 对数据进行解密-3des 解密 | `(cryptoBody: string, key: string): string` |  |
| encryptKey | 对密钥进行 RAS 加密 | `(key: string): string` |  |

<Alert type="warning">
encrypt、decrypt、encryptKey方法需要初始化initWetrialCore方法传递了对应的密文才可正常使用,关于如何初始化initWetrialCore，请<a href="config" target="_blank">查看文档</a>
</Alert>
