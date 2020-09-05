import React from 'react';
import { ScrollBar } from '@wetrial/component';

export default () => {
  return (
    <ScrollBar
      style={{ width: 500, height: 300 }}
      renderTrackHorizontal={(props) => {
        return <div {...props} className="track-horizontal" />;
      }}
      renderTrackVertical={(props) => <div {...props} className="track-vertical" />}
      renderThumbHorizontal={(props) => <div {...props} className="thumb-horizontal" />}
      renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
      renderView={(props) => <div {...props} className="view" />}
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
      <p>测试内容区块</p>
      <p>测试内容区块</p>
      <p>测试内容区块</p>
    </ScrollBar>
  );
};
