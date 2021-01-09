---
title: constants - 预定义常量
order: 2
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# constants - 预定义常量

提供一套使用频率高的预定义常量

## 使用方式

```tsx | pure
import { constants } from '@wetrial/core';

const { LAYOUT_FORM_SINGLE } = constants;
```

## API

| 名称                     | 描述                                         |
| ------------------------ | -------------------------------------------- |
| LAYOUT_FIXED_LABEL       | 通用布局，固定 label 宽度为 98px，其他自适应 |
| LAYOUT_FORM_SINGLE       | 表单项单列布局 响应式配置(建议赋到 Form 上)  |
| LAYOUT_FORM_TWO          | 表单两列布局 响应式配置(建议赋到 Form 上)    |
| LAYOUT_COL_TWO           | Col 两列布局 响应式(在 From 里面使用)        |
| LAYOUT_COL_SEARCH_TWO    | 搜索表单 Col 两列 响应式配置                 |
| LAYOUT_COL_SEARCH_THREE  | 搜索表单 Col 三列 响应式配置                 |
| LAYOUT_COL_SEARCH_FOUR   | 搜索表单 Col 四列 响应式配置                 |
| LAYOUT_COL_SEARCH_SIX    | 搜索表单 Col 六列 响应式配置                 |
| LAYOUT_CHECK_SIX         | 单选、复选 六列 响应式配置                   |
| LAYOUT_CHECK_EIGHT       | 单选、复选 八列 响应式配置                   |
| TABLE_SCROLL_WIDTH       | 显示滚动条的宽度界限                         |
| DEFAULT_DATE_TIME_FORMAT | 预定义日期时间格式                           |
| DEFAULT_DATE_FORMAT      | 预定义日期格式                               |
| PAGE_SIZE                | 预定义页码                                   |
| PAGE_PROPS               | 预定义分页属性配置                           |
| VALIDATE_MESSAGES        | 预定义表单验证消息                           |
