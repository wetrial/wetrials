---
title: 全局异常
order: 16
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# exception - 全局异常

提供基础的异常基类

## 使用方式

```tsx |pure
import { UnAuthorizedException, UserFriendlyException } from '@wetrial/core/es/exception';

throw new UnAuthorizedException();
```

## Methods

| 名称                  | 描述                                           | 类型 |
| --------------------- | ---------------------------------------------- | ---- |
| UnAuthorizedException | 未登录抛出的异常基类，会对此异常类进行全局拦截 | -    |
| UserFriendlyException | 友好提示异常基类，会对此异常类进行全局拦截     | -    |
