---
title: useResponsive - 响应式
order: 20
nav:
  title: hooks
  order: 2
  path: /hooks
group:
  title: hooks
  order: 3
  path: /dom
---

# useResponsive - 响应式

获取响应式信息。

## 代码演示

### 在组件中获取响应式信息

<code src="./demos/basic.tsx">

## API

```typescript
interface ResponsiveInfo {
  screen: string;
  size: {
    height: number;
    width: number;
  };
}
function useResponsive(): ResponsiveInfo;
```

### 配置

默认的响应式配置和 bootstrap 是一致的：

```javascript
{
   xs: {
    min: -Infinity,
    max: 576,
  },
  sm: {
    min: 576,
    max: 768,
  },
  md: {
    min: 768,
    max: 992,
  },
  lg: {
    min: 992,
    max: 1200,
  },
  xl: {
    min: 1200,
    max: 1600,
  },
  xxl: {
    min: 1600,
    max: +Infinity,
  }
}
```
