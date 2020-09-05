---
title: ProDatePicker 日期选择器
order: 39
nav:
  title: 组件
  path: /component
group:
  title: 组件
  path: /
---

## 日期选择器

扩展 antd 日期选择器，可设置 NA，可设置部分未知（UN）

## 案例

### 一般应用

> 通过`picker`属性指定日期格式，分别有 date | week | month | quarter | year

<code src="../demos/pro-date-picker/demo1.tsx" />

### 自定义日期显示格式

> 使用`format`属性，可以自定义日期显示格式

<code src="../demos/pro-date-picker/demo2.tsx" />

### 带 NA 或者 UN 的日期选择器

> 设置属性`allowNa`可填写值为 NA，设置属性`partialDate`可设置值为部分未知（UN）

<code src="../demos/pro-date-picker/demo3.tsx" />

### 禁用部分日期

> 可用`disabledDate`和`disabledTime`分别禁止选择部分日期和时间，其中`disabledTime`需要和`showTime`一起使用。

<code src="../demos/pro-date-picker/demo4.tsx" />

## API

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| picker | date/week/month/quarter/year | date | 必填，决定日期选择器的模式 |
| value | array | undefined | 当前值 |
| allow | boolean | false | 是否可以填写 NA 日期 |
| partialDate | boolean | false | 是否可以填写部分未知日期 |
| onChange | function | undefined | change 事件，参数`v`为已选中用户 id 的字符串数组 |
