# @wetrial/hooks

> @wetrial/hooks.

See website [@wetrial/hooks](https://wetrial.github.io/wetrials/hooks) for more information.

## Install

Using npm:

```bash
$ npm install --save-dev @wetrial/hooks
```

or using yarn:

```bash
$ yarn add @wetrial/hooks --dev
```

## 🔨 Usage

```
import { useFormTable } from '@wetrial/hooks';
```

## 文档说明

### nav

对应顶部菜单栏，排在第二位；配置如下；

| 配置项 | 说明                   | 值     |
| ------ | ---------------------- | ------ |
| title  | 显示在顶部菜单中的名称 | hooks  |
| order  | 在顶部菜单中的顺序     | 2      |
| path   | 路由的基础路径         | /hooks |

### group

对应左边的左侧菜单栏分组

| order | title | path     |
| ----- | ----- | -------- |
| 1     | 请求  | /ajax    |
| 2     | 高级  | /advance |
| 3     | Dom   | /dom     |
| 10    | 其他  | /other   |
