---
title: IconFont - 字体图标
order: 40
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 通用
  order: 1
  path: /common
---

# IconFont - 字体图标

IconFont 用于显示自定义的图标库:http://www.iconfont.cn/

## 何时使用

antd 图标库中没有的情况，由前端人员添加http://www.iconfont.cn/上自定义的图库

## 代码演示

### 基本使用

<code src="./demos/base.tsx" />

## API

| 参数 | 说明                            | 类型   | 默认值 |
| :--- | :------------------------------ | :----- | :----- |
| type | 图标类型，建议命名以`icon-`开头 | string | -      |

## 注意事项

系统提供了全局的注册方法，只需要在系统入口处进行一次注册即可本方法已经在系统入口处注册过，无需开发人员进行处理 `tsx` import { initComponent } from '@wetrial/component';

initComponent({ iconFontUrl:'' //icon 图库地址 })

```

```
