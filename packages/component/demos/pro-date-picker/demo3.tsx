import React from 'react';
import { ProDatePicker } from '@wetrial/component';

const handleChange = (val) => {
  // eslint-disable-next-line no-console
  console.log(val);
};
export default () => {
  return (
    <ProDatePicker value="2019-UN-UN" allowNa partialDate picker="date" onChange={handleChange} />
  );
};
