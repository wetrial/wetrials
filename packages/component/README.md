# @wetrial/component

> @wetrial/component.

See website [@wetrial/component](https://wetrial.github.io/wetrials/component) for more information.

## Install

Using npm:

```bash
$ npm install --save-dev @wetrial/component
```

or using yarn:

```bash
$ yarn add @wetrial/component --dev
```

## 🔨 Usage

```
import { Ellipsis } from '@wetrial/component';
```

## 文档说明

### nav

对应顶部菜单栏，排在第一位；配置如下；

| 配置项 | 说明                   | 值         |
| ------ | ---------------------- | ---------- |
| title  | 显示在顶部菜单中的名称 | 组件       |
| order  | 在顶部菜单中的顺序     | 1          |
| path   | 路由的基础路径         | /component |

### group

对应左边的左侧菜单栏分组

| order | title    | path             |
| ----- | -------- | ---------------- |
| 1     | 通用     | /common          |
| 2     | 数据录入 | /data-collection |
| 3     | 数据展示 | /data-display    |
| 10    | 其他     | /other           |
