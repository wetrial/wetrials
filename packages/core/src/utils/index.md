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

提供了一套预定义常用的辅助方法

## 使用方式

```tsx | pure
import { utils } from '@wetrial/core';

const {isPromise}=utils;

const isPromiseFunction = isPromise(()=>{
    return new Promise(resolve=>{
        resolve(1)
    });
}));
```

## Methods

| 名称 | 描述 | 类型 | 结果案例 |
| --- | --- | --- | --- |
| urlToList | 将路由转成 list 形式 | `(url?:string)=>string[]` |  |
| isPromise | 判断是否是 Promise 对象 | `(obj)=>boolean` |  |
| isUrl | 判断是否是一个合法的 url | `(path:string)=>boolean` |  |
| listToFlat | 将数组对象转换成 object 对象 | `(items: T[], key: string\|number = 'value', text: string = 'label'):` | `listToFlat([{label:'label1',value:'001'},{label:'label2',value:'002'}],'value','label')==>{'001':'label1','002':'label2'}])` |
| isBrowser | 判断是否是浏览器环境 | `()=>boolean` |  |
| getPageQuery | 根据当前 url 获取查询对象 | `()=>Object` |  |
| getDateString | 日期格式化，采用 moment 的格式 | `({date,format})=>string` |  |
| fixedZero | 不足两位补 0 | `(val:number)=>string` |  |
| newGuid | 生成一个 guid | `(withSplit?:boolean)=>string` |  |
| formatMaskInfo | 打码显示 | `(text,type,filterNA?)=>string` |  |
| mergeCells | 对数据源按 key 进行相邻行合并，返回生成的跨行对象,建议使用 memoizeOne 进行缓存调用 | `(list:T[],key:string\|((item:T)=>string))=>TKeyValue<number,number>` | `mergeCells([{name:'xxg',title:'code'},{name:'刘德华',title:'code'},{name:'古天乐',title:'other'}],'title')==>{0:2,1:0,2:1}` |
