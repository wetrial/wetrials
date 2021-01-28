---
title: initWetrialCore- 全局配置
order: 99
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: 核心库
  path: /
---

# initWetrialCore - 全局配置

提供 wetrial/core 包的全局配置

## 使用方式

```ts | pure
import { initWetrialCore } from '@wetrial/core';

// 在入口页面
initWetrialCore({
  RSAKey: '',
  Base64MAP: '',
  routeProfix: '',
  getGlobalHeader: () => {
    return {};
  },
});
```

### Props

| 参数               | 说明                        | 类型                 | 默认值 |
| ------------------ | --------------------------- | -------------------- | ------ |
| RSAKey             | 加解密密钥                  | `string`             | -      |
| Base64MAP          | crypto 中 base64 使用的 map | `string`             | -      |
| routeProfix        | 动态追加的路由前缀          | `string`             | -      |
| getGlobalHeader    | 自定义全局的 ajax 请求头    | `()=>Object`         | -      |
| configRefreshToken | 自定义刷新 token            | `() => Promise<any>` | -      |

<Alert type="info">
如果使用了默认的ajax拦截器，当后端ajax响应为401，而本地有token的时候，算作token失效，将通过配置的configRefreshToken来自动刷新token
</Alert>
