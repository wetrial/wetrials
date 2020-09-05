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

## 使用场景

一般用于主列表页面，需要复杂搜索、记录搜索条件等的；(请根据情况使用，勿滥用.)

## 案例

### 基础使用

<code src="../demos/pro-table/base.tsx" />

### 显示提示块

<code src="../demos/pro-table/custom-container.tsx" />

### 伸缩列

<code src="../demos/pro-table/resize-columns.tsx" />

### 有记忆功能的列表

<code src="../demos/pro-table/with-record.tsx" />

### 自定义显示列

<code src="../demos/pro-table/columns-state.tsx" />

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| resizeable | 是否允许自定义列宽 | `boolean` | - |
| containerClassName | 设置容器元素的 class | string | - |
| containerStyle | 设置容器元素的 style | CSSProperties | - |
| options | table 的工具栏，设置为 false 可以关闭它 | { density: true, fullScreen:true, setting: true} |
| onSizeChange | table 尺寸发生改变 | function(size: 'default' \|'middle' \|'small' \|undefined) => void | - |
| columnsStateMap | columns 的状态枚举 | {[key: string]: { show:boolean, fixed: "right"\|"left"} } | - |
| onColumnsStateChange | columns 状态发生改变 | function(props: {[key: string]: { show:boolean, fixed: "right"\|"left"} }) => void | - |
| [更多属性 ](https://ant.design/components/table-cn/#API) |  |  |  |

### Columns

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueType | 值的类型,相当于简化版的 render | `'money'、'option'、'date'、'dateRange'、'dateTime'、'dateTimeRange'、'time'、'index'、'indexBorder'、'progress'、'digit'` | 'text' |
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
| index | 序号列 | - |
| indexBorder | 带 border 的序号列 | - |
| progress | 进度条 | - |
| digit | 单纯的数字 | - |
