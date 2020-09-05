---
title: UserSelect - 人员选择器
order: 30
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 数据录入
  order: 2
  path: /data-collect
---

## UserSelect - 人员选择器

WT 人员选择插件（单一层级）

## 案例

### 默认应用

> 数据源需要带有用户 id、用户名、头像（可选），可在`fields`中自定义，有初始值的情况下先传入`value`。

<code src="../demos/user-select/demo1.tsx" />

### 单选

> 由于插件默认是多选，单选要配置属性`multiple={false}`，并且`value`由数组变成字符串。

<code src="../demos/user-select/demo2.tsx" />

### 自定义用户信息卡内容

> 用户头像悬停的信息卡可通过`cardRender`属性自定义渲染内容。

<code src="../demos/user-select/demo3.tsx" />

### 在表单中使用以及自定义 fields

> 在表单中使用，想要 submit 的时候直接获取组件值，必须用`Form.Item`包裹组件，并指定组件`name`，此时默认值不配置在组件本身，而是通过`Form`的`initialValues`来定义，组件自身的`onChange`仍然可以使用。

> 可以通过配置 fields 属性自定义数据源对应的字段名称

<code src="../demos/user-select/demo4.tsx" />

## API

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dataSource | array | undefined | 数据源，必须包含用户 id,用户名称，用户头像 |
| value | array | undefined | 当前值 |
| defaultValue | array | undefined | 默认值 |
| multiple | boolean | true | 是否多选模式 |
| fields | object | `{id:'UserId',name:'FullName',avatar:'Avatar'}` | 数据源中 id，名称，头像对应的字段名，可以自定义 |
| cardRender | function | undefined | 用户信息卡上显示的内容，通过参数(id)查找并返回自己需要的内容 |
| onChange | function | undefined | change 事件，参数`v`为已选中用户 id 的字符串数组 |
