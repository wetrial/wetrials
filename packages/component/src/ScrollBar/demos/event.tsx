import React from 'react';
import { ScrollBar } from '@wetrial/component';

export default () => {
  const handleLog = (eventType: string) => {
    // eslint-disable-next-line no-console
    console.log(eventType);
  };

  return (
    <ScrollBar
      onScroll={() => handleLog('onScroll:on native scroll event')}
      // Runs inside the animation frame. Passes some handy values about the current scroll position
      onScrollFrame={() => handleLog('onScrollFrame')}
      // Called when scrolling starts
      onScrollStart={() => handleLog('onScrollStart')}
      // Called when scrolling stops
      onScrollStop={() => handleLog('onScrollStop')}
      // Called when ever the component is updated. Runs inside the animation frame
      onUpdate={() => handleLog('onUpdate')}
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
