---
title: utils - 辅助方法
order: 2
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# utils - 辅助方法

提供常用辅助方法

## 使用方式

```tsx |pure
import { isPromise } from '@wetrial/core/es/utils';

const isP = isPromise(()=>{
    return new Promise(resolve=>{
        resolve(1)
    });
}));
```

## Methods

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| urlToList | 将路由转成 list 形式 | `(url?:string)=>string[]` |
| isPromise | 判断是否是 Promise 对象 | `(obj)=>boolean` |
| isUrl | 判断是否是一个合法的 url | `(path:string)=>boolean` |
| getQuery | 获取查询字符串 | `(query?:string)=>Object` |
| isBrowser | 判断是否是浏览器环境 | `()=>boolean` |
| listToFlat | 将列表字典转换成对象 | `(any[])=>Object` |
| getDateString | 日期格式化，采用 moment 的格式 | `({date,format})=>string` |
| fixedZero | 不足两位补 0 | `(val:number)=>string` |
| newGuid | 生成一个 guid | `(withSplit?:boolean)=>string` |
| formatSecuredInfo | 打码显示 | `(text,type,filterNA?)=>string` |
| mergeCells | 对数据源按 key 进行相邻行合并，返回生成的跨行对象,建议使用 memoizeOne 进行缓存调用 | - |
