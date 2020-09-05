---
title: useTableColumnStateMapStorage - 分页列表状态记录
order: 10
nav:
  title: hooks
  path: /hooks
group:
  title: hooks
  path: /
---

# useTableColumnStateMapStorage - 分页列表状态记录

一个可以自动管理 ProTable 的列状态持久化存储在 localStorage 中的 Hook 。

## 代码演示

### 简单实用

<code src="../demos/useTableColumnStateMapStorage.tsx">

## API

```typescript
import { useTableColumnStateMapStorage } from '@wetrial/hooks';

const { tableProps, getColumns } = useTableColumnStateMapStorage('/organizations/list');

const { tableProps, getColumns } = useTableColumnStateMapStorage('/organizations/list', {
  name: { show: false },
});
```
