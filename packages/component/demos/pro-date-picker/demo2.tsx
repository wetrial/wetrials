import React from 'react';
import { ProDatePicker } from '@wetrial/component';
import moment from 'moment';

const handleChange = (val) => {
  // eslint-disable-next-line no-console
  console.log(val);
};
export default () => {
  return (
    <ProDatePicker
      defaultValue={moment('2015/01', 'YYYY-MM')}
      format="YYYY-MM"
      picker="month"
      onChange={handleChange}
    />
  );
};
