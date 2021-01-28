---
title: useTableColumnStateMapStorage - 分页列表状态记录
order: 10
nav:
  title: hooks
  order: 2
  path: /hooks
group:
  title: hooks
  order: 3
  path: /advance
---

# useTableColumnStateMapStorage - 分页列表状态记录

一个可以自动管理 ProTable 的列状态持久化存储在 localStorage 中的 Hook 。

## 代码演示

### 简单实用

<code src="./demos/basic.tsx">

## API

```typescript
import { useTableColumnStateMapStorage } from '@wetrial/hooks';

const { tableProps, getColumns } = useTableColumnStateMapStorage('/organizations/list');

const { tableProps, getColumns } = useTableColumnStateMapStorage('/organizations/list', {
  name: { show: false },
});
```
