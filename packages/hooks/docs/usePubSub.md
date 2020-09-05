---
title: usePubSub - 发布订阅
order: 80
nav:
  title: hooks
  path: /hooks
group:
  title: hooks
  path: /
---

# usePubSub - 发布订阅

在多个组件之间进行事件通知有时会让人非常头疼，借助 PubSub ，可以让这一过程变得更加简单。

在组件中调用 `useSubscribe` 可以订阅一个事件(组件消费时会自动取消订阅)

通过`PubSub.publish` 可以发布一个事件

如果有需要，在非组件中可以使用`PubSub.publish`、`PubSub.subscribe`来进行订阅、发布(注:如果自行 PubSub.subscribe 请注意调用`PubSub.unsubscribe`进行取消订阅)

```js
useSubscribe(event:string,(event:string,data:any)=>void);
```

> 在组件多次渲染时，每次渲染调用 `useSubscribe` 得到的返回值会保持不变，不会重复订阅。

```js
PubSub.publish((event: string), (data: any));
```

对于**子组件**通知**父组件**的情况，我们仍然推荐直接使用 `props` 传递一个 `event` 函数。`useSubscribe` 适合的是在**距离较远**的组件之间进行事件通知，或是在**多个**组件之间共享事件通知。

## 代码演示

### 子组件发布父组件订阅

<code src="../demos/usePubSub.tsx">

## API

```typescript
import { usePublish, PubSub } from '@wetrial/hooks';

useSubscribe(event:string,(event:string,data:any)=>void);
PubSub.publish(event:string,data:any);
```
