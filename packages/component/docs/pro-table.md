---
title: ProTable Table组件
order: 20
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 数据展示
  order: 3
  path: /data-display
---

# ProTable Table 组件

pro-table 在 antd 的 table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd table 不同的 api。

## 案例

### 基础使用

<code src="../demos/pro-table/base.tsx" />

### 列宽调节

<code src="../demos/pro-table/resize-columns.tsx" />

### 行选择操作

<code src="../demos/pro-table/row-selector.tsx" />

### 表头分组

<code src="../demos/pro-table/header-group.tsx" />

### 表头吸附

<code src="../demos/pro-table/with-sticky.tsx" />

### 带记录功能

<code src="../demos/pro-table/with-record.tsx" />

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| resizeable | 是否允许自定义列宽 | `boolean` | - |
| tableAlertRender | 自定义批量操作工具栏左侧信息区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |
| tableAlertOptionRender | 自定义批量操作工具栏右侧选项区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => ReactNode)`\|`false` | - |
| columns | 表格的列 | [Column](#column)[] | [] |
| [更多属性 ](https://ant.design/components/table-cn/#API) |  |  |  |

### Column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueType | 值的类型,相当于简化版的 render | `money` \| `option` \| `date` \| `dateTime` \| `time` \| `text`\| `index`\|`indexBorder` | `text` |
| copyable | 是否支持 copy | `boolean` | 'false' |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](#valueenum) | - |
| [更多 属性 ](https://ant.design/components/table-cn/#Column) |  |

#### valueType

现在支持的值如下

| 类型 | 描述 | 示例 |
| --- | --- | --- |
| money | 转化值为金额 | ¥10,000.26 |
| date | 日期 | 2019-11-16 |
| dateRange | 日期区间 | 2019-11-16 2019-11-18 |
| dateTime | 日期和时间 | 2019-11-16 12:50:00 |
| dateTimeRange | 日期和时间区间 | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
| time | 时间 | 12:50:00 |
| option | 操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略 | `[<a>操作a</a>,<a>操作b</a>]` |
| text | 默认值，不做任何处理 | - |
| select | 选择 | - |
| textarea | 与 text 相同， form 转化时会转为 textarea 组件 | - |
| index | 序号列 | - |
| indexBorder | 带 border 的序号列 | - |
| progress | 进度条 | - |
| digit | [格式化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)数字展示，form 转化时会转为 inputNumber | - |
| percent | 百分比 | +1.12 |
| code | 代码块 | `const a = b` |
| avatar | 头像 | 展示一个头像 |
| password | 密码框 | 密码相关的展示 |

### valueEnum

当前列值的枚举

```typescript | pure
interface IValueEnum {
  [key: string]:
    | ReactNode
    | {
        text: ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      };
}
```
