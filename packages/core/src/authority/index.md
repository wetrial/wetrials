---
title: authority - 权限相关
order: 5
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# authority - 权限相关

提供获取 token、权限等相关方法

## 使用方式

```tsx |pure
import { tokener } from '@wetrial/core';

const { getToken, setToken, clearToken } = tokener;

const token = getToken();
```

<Alert type="info">
  根据需要使用，也可以在自己系统中定义辅助方法来管理token，不强制使用
</Alert>

## Methods

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| setToken | 将 token 保存到客户端，token: 要存储的 `token` 值,`exp`:过期时长(秒) | `(token:string,exp?number)=>void` |
| getToken | 获取当前 token 值 | `()=>string` |
| clearToken | 删除当前保存的 token，用于退出登录的场景 | `()=>void` |
