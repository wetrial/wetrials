import React from 'react';
import { Button } from 'antd';
import { activeCache } from '@wetrial/hooks';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();
  const handleBack = () => {
    const listPath = '/component/data-display/pro-table';
    activeCache(listPath);
    history.push(`${listPath}#带记录功能`);
  };
  return (
    <Button onClick={handleBack} type="link">
      返回列表页
    </Button>
  );
};
