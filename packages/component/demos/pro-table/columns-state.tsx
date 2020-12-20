import React from 'react';
import { Button, Form } from 'antd';
import { ProTable } from '@wetrial/component';
import { ColumnsState, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { useLocalStorageState } from 'ahooks';
import { useFormTable, formatFormTableParams } from '@wetrial/hooks';
import { PageContainer } from '@ant-design/pro-layout';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
}

export default () => {
  const [columnStateMaps, setColumnStateMaps] = useLocalStorageState<{
    [key: string]: ColumnsState;
  }>('wetrial-testxxx', { name: { show: false } });

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 70,
    },
    {
      title: '标题',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorter.field === 'name' && sorter.order,
      render: (_) => <a>{_}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 200,
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      width: 120,
      dataIndex: 'updatedAt',
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      valueType: 'option',
      render: () => [
        <a key="view" target="_blank" rel="noopener noreferrer">
          查看
        </a>,
        <TableDropdown
          key="other"
          // eslint-disable-next-line no-alert
          onSelect={(key) => window.alert(key)}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer
      title="自定义显示列(设置显示的列后，刷新看看效果)"
      extra={[<Button key="1">新增</Button>]}
    >
      <ProTable<TableListItem>
        request={() => {
          return new Promise((resolve) => {
            const tableListDataSource: TableListItem[] = [];
            for (let i = 0; i < 100; i++) {
              tableListDataSource.push({
                key: i,
                name: `TradeCode ${i}`,
                status: valueEnum[Math.floor(Math.random() * 10) % 4],
                updatedAt: Date.now() - Math.floor(Math.random() * 1000),
                createdAt: Date.now() - Math.floor(Math.random() * 2000),
                money: Math.floor(Math.random() * 2000) * i,
                progress: Math.ceil(Math.random() * 100) + 1,
              });
            }
            return resolve({
              total: 100,
              success: true,
              data: tableListDataSource,
            });
          });
        }}
        columns={columns}
        columnsStateMap={columnStateMaps}
        onColumnsStateChange={setColumnStateMaps}
        rowKey="key"
      />
    </PageContainer>
  );
};
