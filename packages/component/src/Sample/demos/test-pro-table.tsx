import React, { useMemo } from 'react';
import { Button, Space } from 'antd';
import { activeCache } from '@wetrial/hooks';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  const { handleBackHooks, handleBackProTable } = useMemo(() => {
    const backProTable = () => {
      const listPath = '/component/data-display/pro-table';
      activeCache(listPath);
      history.push(`${listPath}#带记录功能`);
    };

    const backHooks = () => {
      const listPath = '/hooks/table/use-form-table';
      activeCache(listPath);
      history.push(`${listPath}#带数据缓存`);
    };

    return {
      handleBackProTable: backProTable,
      handleBackHooks: backHooks,
    };
  }, []);

  return (
    <Space>
      <Button onClick={handleBackProTable} type="link">
        返回ProTable列表页
      </Button>

      <Button onClick={handleBackHooks} type="link">
        返回Hooks列表页
      </Button>
    </Space>
  );
};
