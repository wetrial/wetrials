---
title: SlideCaptcha - 滑动验证码
order: 40
nav:
  title: 组件
  order: 1
  path: /component
group:
  title: 数据录入
  order: 2
  path: /data-collection
---

# SlideCaptcha - 滑动验证码

用于在登录、注册等需要确定是人为操作的场景。

## 说明

滑块验证码需要后端的配合，目的是防止恶意绕开验证而直接操作，执行流程如下

### 获取验证码

请求后端验证码 api，得到返回参数(base64 位的小图、base64 位的大图、当前图片的唯一标识 token、大图宽度、大图高度、拼接小图相对顶部的坐标), 此过程中，后端需要生成一不重复的 token，并设置缓存(根据情况设置过期时间)

### 校验验证码

用户拖拽图片触发验证，调用配置的 onValidate 方法，该方法会传递参数(point、token、timespan)；客户端将这些参数组合发送给后端 api 校验后端根据缓存的 token 查询传递过来的 point 是在可以容错的范围，并返回是否成功(状态码 200 表示成功，其他表示失败)，如果验证成功后端需要将改 token 标记为通过状态

### 提交业务逻辑

正常页面提交如果后端返回 200 状态码，会触发 onFinish 方法客户端提交到正常的业务页面，并带上验证码的 token 后端业务逻辑中检测 token 是否是验证通过的,(记得将该 token 标记为失效，安全性考虑，token 只可用一次)

## 案例

### 基础使用

<code src="./demos/basic.tsx" />

### 自定义内容

<code src="./demos/full.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否加载中 | `boolean` | `false` |
| token | 用来唯一标识当前图片的标识码 | `string` | - |
| bgSrc | 背景大图 base64 位的 image 值 | `string` | - |
| captchSrc | 大图中裁剪的小图,base64 位的 image 值 | `string` | - |
| width | 背景大图的宽度 | `number` | - |
| height | 背景大图的高度 | `number` | - |
| top | captchSrc 小图距离背景图片顶部的距离 | `number` | - |
| onRefresh | 刷新图片时触发 | `()=>{}` | - |
| validate | 拖拽结束后触发验证,如果是 200 则算验证成功 | `({token,point,timespan,datelist})=>{}` | - |
| onFinish | 验证成功的回调,会带上 validate 请求返回的结果 | `(result)=>{}` | - |
| onFinishFailed | 验证失败的回调,会带上 validate 请求返回的结果 | `(result)=>{}` | - |
| refreshTitle | 刷新图标提示文字 | `string` | `换一张` |
| tip | 下方的提示文字内容 | `string` | `向右滑动完成拼图` |

<Alert type="info">
可以自行进行扩展，比如 图片尺寸大小
</Alert>

> 图片可以从 https://picsum.photos/获取
