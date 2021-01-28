import React from 'react';
import { ProSelect } from '@wetrial/component';

export default () => {
  const list = ['C#', 'PPT', 'react'];
  return <ProSelect style={{ width: 200 }} enums={list} allowClear />;
};
