import React from 'react';
import { ProSelect } from '@wetrial/component';

export default () => {
  const list = [
    { id: 'C#', text: 'C#' },
    { id: 'PPT', text: '最好的语言' },
    { id: 'react', text: 'React' },
  ];
  return <ProSelect style={{ width: 200 }} enums={list} keyProp="id" labelProp="text" allowClear />;
};
