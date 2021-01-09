import React from 'react';
import { ProRadio } from '@wetrial/component';
import { RadioChangeEvent } from 'antd/es/radio';

export default () => {
  const list = [
    { value: 'C#', label: 'C#' },
    { value: 'PPT', label: '最好的语言' },
    { value: 'react', label: 'React' },
  ];

  const handleChange = (e: RadioChangeEvent) => {
    // eslint-disable-next-line no-console
    console.log(e?.target?.value);
  };

  return <ProRadio.Group onChange={handleChange} options={list} />;
};
