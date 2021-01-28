---
title: Exception - 异常
order: 30
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 数据展示
  order: 3
  path: /data-display
---

# Exception - 异常

异常页用于对页面特定的异常状态进行反馈。通常，它包含对错误状态的阐述，并向用户提供建议或操作，避免用户感到迷失和困惑。

## 案例

### 403

<code src="./demos/403.tsx" />

### 404

<code src="./demos/404.tsx" />

### 500

<code src="./demos/500.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| backText | 默认的返回按钮文本 | ReactNode | back to home |
| type | 页面类型，若配置，则自带对应类型默认的 `title`，`desc`，`img`，此默认设置可以被 `title`，`desc`，`img` 覆盖 | Enum {'403', '404', '500'} | - |
| title | 标题 | ReactNode | - |
| desc | 补充描述 | ReactNode | - |
| img | 背景图片地址 | string | - |
| actions | 建议操作，配置此属性时默认的『返回首页』按钮不生效 | ReactNode | - |
| linkElement | 定义链接的元素 | string\|ReactElement | 'a' |
| redirect | 返回按钮的跳转地址 | string | '/' |
