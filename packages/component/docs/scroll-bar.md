---
title: ScrollBar - 虚拟滚动条
order: 10
nav:
  title: 组件
  path: /component
group:
  title: 组件
  path: /
---

# ScrollBar - 虚拟滚动条

自定义虚拟滚动条

## 案例

### 基础使用

<code src="../demos/scroll-bar/basic.tsx" />

### 自定隐藏滚动条

<code src="../demos/scroll-bar/autoHide.tsx" />

### 自动高度

<code src="../demos/scroll-bar/autoHeight.tsx" />

### universal

<code src="../demos/scroll-bar/universal.tsx" />

### 滚动条事件

<code src="../demos/scroll-bar/event.tsx" />

### 自定义滚动条

<code src="../demos/scroll-bar/customization.tsx" />

[更多案例](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/customization.md)

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onScroll | 当发送滚动时触发 | `(event)=>void` | - |
| onScrollFrame | 在动画帧内运行滚动时触发，查看[参数](#positionvalues) | `(values:positionValues)=>void` | - |
| onScrollStart | 开始滚动时触发 | `()=>void` | - |
| onScrollStop | 停止滚动时触发 | `()=>void` | - |
| onUpdate | 在动画帧内运行每当组件更新时触发,查看[参数](#positionvalues) | `(values:positionValues)=>void` | - |
| renderView | 渲染内容的方法 | `()=>ReactNode` | - |
| renderTrackHorizontal | Horizontal track element | `()=>ReactNode` | - |
| renderTrackVertical | Vertical track element | `()=>ReactNode` | - |
| renderThumbHorizontal | Horizontal thumb element | `()=>ReactNode` | - |
| renderThumbVertical | Vertical thumb element | `()=>ReactNode` | - |
| hideTracksWhenNotNeeded | Hide tracks (visibility: hidden) when content does not overflow container | boolean | false |
| thumbSize | 滚动条尺寸 px | number | - |
| thumbMinSize | 滚动条最小尺寸 px | number | 30 |
| autoHide | 是否自动隐藏滚动条，true 将自动隐藏滚动条只有当滚动的时候才显示滚动条 | boolean | false |
| autoHideTimeout | 隐藏滚动条超时时长(ms) | number | 1000 |
| autoHideDuration | 隐藏滚动条延迟的时间(ms) | number | 200 |
| autoHeight | 是否开启根据内容自动高度 | boolean | false |
| autoHeightMin | 当高度大于该值时，自动高度生效 | number\|string | 0 |
| autoHeightMax | 当高度小于该值时，自动高度生效 | number\|string | 200 |
| universal | 启用通用渲染 | boolean | false |

## Methods

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scrollTop | 滚动到离顶部指定的值 | `scrollTop(top:number)` | - |
| scrollLeft | 滚动到离左部指定的值 | `scrollLeft(left:number)` | - |
| scrollToTop | 滚动到顶部 | `scrollToTop()` | - |
| scrollToBottom | 滚动到底部 | `scrollToBottom()` | - |
| scrollToLeft | 滚动到最左边 | `scrollToLeft()` | - |
| scrollToRight | 滚动到最右边 | `scrollToRight()` | - |
| getScrollLeft | 获取离左边的值 | `getScrollLeft():number` | - |
| getScrollTop | 获取离顶部的值 | `getScrollTop():number` | - |
| getScrollWidth | 获取滚动区域的宽度 | `getScrollWidth():number` | - |
| getScrollHeight | 获取滚动区域的高度 | `getScrollHeight():number` | - |
| getClientWidth | 获取容器宽度 | `getClientWidth():number` | - |
| getClientHeight | 获取容器高度 | `getClientHeight():number` | - |
| getValues | 获取容器高度,查看[参数](#positionvalues) | `getValues():positionValues` | - |

### positionValues

| 参数         | 说明                    | 类型   | 默认值 |
| ------------ | ----------------------- | ------ | ------ |
| top          | 离顶部的进度,取值 0 - 1 | number | -      |
| left         | 离左边的进度,取值 0 - 1 | number | -      |
| clientWidth  | 容器宽度                | number | -      |
| clientHeight | 容器高度                | number | -      |
| scrollWidth  | 滚动宽度                | number | -      |
| scrollHeight | 滚动高度                | number | -      |
| scrollLeft   | 离左边的距离            | number | -      |
| scrollTop    | 离顶部的距离            | number | -      |
