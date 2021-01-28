---
title: type- 预定义类型
order: 10
nav:
  title: 预定义类型
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# type- 预定义类型

提供了一些预定义类型可以直接使用

## 使用方式

```ts | pure
import type { TWithFalse } from '@wetrial/core';
```

### Props

| 参数 | 说明 | 案例 |
| --- | --- | --- |
| TKeyValue | 可为 false 的泛型类型 | `let value1:TKeyValue<string>; let value2:TKeyValue<string,number>;` |
| TWithFalse | 可为 false 的泛型类型 | `let value1:TWithFalse<string>; ` |
| CryptoType | 加密方向 | - |
