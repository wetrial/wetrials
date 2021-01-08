/**
 * title:  通过@wetrial/provider 修改全局配置
 * desc: 通过ConfigProvider来配置iconFontUrl 已达到不同后端接口的定制化,更多内容参考/wetrials/core/config-provider
 *
 * title.en-US:  use @wetrial/provider change global method
 * desc.en-US: use ConfigProvider to config iconFontUrl address,more info visit /wetrials/core/config-provider
 */
import React from 'react';
import { IconFont } from '@wetrial/component';
import { ConfigProvider } from '@wetrial/provider';

const Demo = () => {
  return <IconFont style={{ fontSize: 32 }} type="icon-wt-logo" />;
};

export default () => {
  return (
    <ConfigProvider
      value={{
        iconFontUrl: '//at.alicdn.com/t/font_1830224_kbe7ufh34m.js',
      }}
    >
      <Demo />
    </ConfigProvider>
  );
};
