---
title: ConfigProvider- 全局配置
order: 100
nav:
  title: 核心库
  order: 3
  path: /core
group:
  title: '核心库'
  path: /
---

# WetrialConfigContext

注意，WetrialConfigContext 的位置在包 `@wetrial/provider`中，算@wetrial 的依赖，不需要单独安装，可以直接使用

## 使用方式

当做普通的 Provider 使用，用来修改全局的配置项；

```tsx | pure
import { ConfigProvider } from '@wetrial/provider';

// 在最外层容器中
<ConfigProvider
  value={{
    iconFontUrl: '', // 修改为项目中使用的icon地址
    formatResultData: (result) => {
      // TODO 修改为符合要求的结构
      return result;
    },
    formatRequestParams: (req) => {
      // TODO 修改为符合要求的结构
      return req;
    },
  }}
>
  {children}
</ConfigProvider>;
```

umi 项目中可以在 app.[t|j]sx 文件的 rootContainer 中包裹一层

```ts | pure
import { ConfigProvider } from '@wetrial/provider';

// 如
export function rootContainer(container) {
  return React.createElement(
    ConfigProvider,
    {
      form: { validateMessages },
      input: {
        autoComplete: 'off',
      },
      locale: zhCN,
    },
    React.createElement(
      ConfigProvider,
      {
        value: {
          // iconFontUrl:'', // 修改为项目中使用的icon地址
          // formatResultData:()=>{return null;}, // 修改为符合api的结构
          // formatRequestParams:()=>{return null;} // 修改为符合api的结构
        },
      },
      React.createElement(
        UseRequestProvider,
        {
          value: {
            requestMethod: (param) => requestMethod(param),
            onError: (response) => {
              if (response && response.status) {
                const { status, statusText, data } = response;
                const notifyFunc = status >= 500 ? notification.error : notification.info;
                let message;
                if (data && typeof data === 'object' && 'error' in data) {
                  message = data.error?.message;
                }
                const errorText = message || codeMessage[status] || statusText;
                notifyFunc({
                  key: '__global_message',
                  message: '温馨提示',
                  description: errorText,
                });
              }
              if (!response) {
                notification.error({
                  key: '__global_message',
                  message: '网络开小差啦',
                  description: '您的网络发生异常，请重试或者联系客服',
                });
              }
              throw response;
            },
          },
        },
        container,
      ),
    ),
  );
}
```
