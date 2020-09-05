import React from 'react';
import { ProSelect } from '@wetrial/component';

export default () => {
  const list = [
    { key: 'C#', label: 'C#' },
    { key: 'PPT', label: '最好的语言' },
    { key: 'react', label: 'React' },
  ];
  return <ProSelect style={{ width: 200 }} list={list} allowClear />;
};
