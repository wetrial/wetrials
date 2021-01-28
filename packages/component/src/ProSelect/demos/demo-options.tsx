import React from 'react';
import { ProSelect } from '@wetrial/component';

export default () => {
  const list = [
    { value: 'C#', label: 'C#' },
    { value: 'PPT', label: '最好的语言' },
    { value: 'react', label: 'React' },
  ];
  return <ProSelect style={{ width: 200 }} options={list} allowClear />;
};
