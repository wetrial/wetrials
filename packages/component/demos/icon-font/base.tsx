import React from 'react';
import { IconFont, initComponent } from '@wetrial/component';

initComponent({
  iconFontUrl: ['//at.alicdn.com/t/font_1830224_kbe7ufh34m.js'],
});

export default () => {
  return <IconFont style={{ fontSize: 32 }} type="icon-wt-logo" />;
};
