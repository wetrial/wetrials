import React from 'react';
import { useResponsive } from '@wetrial/hooks';

// configResponsive({
//   small: 0,
//   middle: 800,
//   large: 1200,
// });

export default () => {
  const { screen, size } = useResponsive();
  return (
    <>
      <p>Please change the width of the browser window to see the effect: </p>
      <p>screen:{screen}</p>
      <p>
        height:{size.height},width:{size.width}
      </p>
    </>
  );
};
