import React from 'react';
import { ScrollBar } from '@wetrial/component';

export default () => {
  return (
    <ScrollBar
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      style={{ width: 500, height: 300 }}
    >
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
    </ScrollBar>
  );
};
