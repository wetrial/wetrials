---
title: store - 本地存储
order: 3
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# store - 本地存储

提供本地存储相关方法

## 使用方式

```tsx |pure
import { store } from '@wetrial/core';

store.set('', '');
```

## Methods

| 名称   | 描述                            | 类型                                     |
| ------ | ------------------------------- | ---------------------------------------- |
| set    | 键值对，存储到本地,可带过期时间 | `(key:string,val:any,exp?:number)=>void` |
| get    | 获取缓存对象                    | `(key:string)=>any`                      |
| remove | 移除指定缓存                    | `(key:string)=>void`                     |
| clear  | 清空所有缓存                    | `()=>void`                               |

## 其他

store 存储库主要为带过期时间的本地存储而生，非此需求的建议根据情况使用 sessionStorage、localStorage 等
