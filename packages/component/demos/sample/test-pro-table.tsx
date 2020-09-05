import React from 'react';
import { Button } from 'antd';
import { activeCache } from '@wetrial/hooks';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();
  const handleBack = () => {
    const listPath = '/list/data-display/pro-table#有记忆功能的列表';
    activeCache(listPath);
    history.push(listPath);
  };
  return (
    <Button onClick={handleBack} type="link">
      返回列表页
    </Button>
  );
};
