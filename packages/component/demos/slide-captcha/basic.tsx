import React from 'react';
import { SlideCaptcha } from '@wetrial/component';

export default () => {
  return (
    <SlideCaptcha
      bgUrl=""
      captchUrl=""
      validate={() => {
        return Promise.resolve('');
      }}
    />
  );
};
