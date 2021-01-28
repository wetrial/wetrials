import React from 'react';
import { Button } from 'antd';
import { Exception } from '@wetrial/component';

const actions = (
  <div>
    <Button type="primary">Home</Button>
    <Button>Detail</Button>
  </div>
);
export default () => {
  return <Exception type="403" actions={actions} />;
};
