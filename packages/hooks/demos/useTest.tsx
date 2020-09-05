import React from 'react';
import { Button } from 'antd';
import { activeCache } from '@wetrial/hooks';
import { history } from 'umi';

export default () => {
  return (
    <Button
      type="default"
      onClick={() => {
        activeCache('antd/use-form-table');
        history.push({
          pathname: '/hooks/antd/use-form-table',
          hash: '#数据缓存',
        });
      }}
    >
      返回useFormTable页面
    </Button>
  );
};
