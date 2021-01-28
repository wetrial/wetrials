---
title: ProSelect - 下拉选择
order: 30
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 数据录入
  order: 2
  path: /data-collection
---

# ProSelect - 下拉选择

扩展 Select 功能，支持直接传递一个数据源，指定数据源的 key、labe 即可

## 案例

### 基础使用

<code src="./demos/demo1.tsx" />

### 字符串数组

<code src="./demos/demo-string-array.tsx" />

### 指定 keyProp、labelProp

<code src="./demos/demo2.tsx" />

### 使用默认 options

<code src="./demos/demo-options.tsx" />

### 案例

## API

### ProSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enums | 数据源数组 | Array<string \| T> | - |
| keyProp | 数据源中作为 key 的属性名 | `string` | key |
| labelProp | 数据源中作为 label 的属性名 | `string` | label |
| [更多 属性 ](https://next.ant.design/components/select-cn/#Select-props) |  |  |  |
