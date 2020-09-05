---
title: useFormTable - 分页列表
order: 1
nav:
  title: hooks
  order: 2
  path: /hooks
group:
  title: hooks
  order: 1
  path: /ajax
---

# useFormTable - 分页列表

封装了常用的 AntD [Form](https://ant.design/components/form-cn/) 与 AntD [Table](https://ant.design/components/table-cn/) 联动逻辑

## 代码演示

### 基础使用

<code src="../demos/useFormTableDemo1.tsx" />

### 带数据缓存

<code src="../demos/useFormTableDemo2.tsx" />

## API

useFormTable 基于 [useRequest](/zh-CN/async) 实现，所有的 [useRquest Pagination](/zh-CN/async?anchor=pagination#api-1) API 均可以直接使用。比如 `manual` 等等。

useFormTable 额外增加了 `result.search` 和 `options.form`。

```javascript
const {
  ...,
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
} = useFormTable(
  service,
  {
    ...,
    form
  }
);
```

## 尚未解决的问题

记录是在组件销毁的时候进行的，如果是浏览器刷新操作，是被浏览器直接销毁，而不会进入组件的销毁生命周期，所以刷新的情况不会被记录;
