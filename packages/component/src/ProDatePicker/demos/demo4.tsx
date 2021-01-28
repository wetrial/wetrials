import React from 'react';
import { ProDatePicker } from '@wetrial/component';
import moment from 'moment';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

export default () => {
  return <ProDatePicker picker="month" disabledDate={disabledDate} />;
};
