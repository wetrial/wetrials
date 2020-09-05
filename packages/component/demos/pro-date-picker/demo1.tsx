import React from 'react';
import { ProDatePicker } from '@wetrial/component';

const handleChange = (val) => {
  // eslint-disable-next-line no-console
  console.log(val);
};
export default () => {
  return (
    <div>
      <ProDatePicker picker="date" onChange={handleChange} />
      <br />
      <ProDatePicker picker="year" onChange={handleChange} />
      <br />
      <ProDatePicker picker="month" onChange={handleChange} />
      <br />
      <ProDatePicker picker="week" onChange={handleChange} />
    </div>
  );
};
