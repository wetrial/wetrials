import React from 'react';
import { Button, Form, Table, Space } from 'antd';
import type { ProColumns } from '@wetrial/component/lib/ProTable/interface';
import { ProTable, ProTableDropdown } from '@wetrial/component';
import { useFormTable } from '@wetrial/hooks';
import { PageContainer } from '@ant-design/pro-layout';
import { QueryFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';

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
  updatedTime: number;
  createdTime: number;
  progress: number;
  money: number;
  province: string;
  city: string;
}

// 模拟数据请求
const getList = async (data) => {
  return new Promise<any>((resolve) => {
    const tableListDataSource: TableListItem[] = [];
    for (let i = 0; i < 100; i++) {
      tableListDataSource.push({
        key: i,
        name: `TradeCode ${i}`,
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        updatedTime: Date.now() - Math.floor(Math.random() * 1000),
        createdTime: Date.now() - Math.floor(Math.random() * 2000),
        money: Math.floor(Math.random() * 2000) * i,
        progress: Math.ceil(Math.random() * 100) + 1,
        province: '湖南省',
        city: '长沙市',
      });
    }
    return resolve({
      total: 100,
      list: tableListDataSource,
    });
  });
};

export default () => {
  const [form] = Form.useForm();
  const { tableProps, search, sorter } = useFormTable(getList, {
    form,
    // defaultParams: [
    //   { current: 2, pageSize: 5 },
    //   { name: 'hello', email: 'abc@gmail.com', gender: 'female' },
    // ],
    // defaultType: 'advance',
  });
  const { type, changeType, submit, reset } = search;

  const columns: ProColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 65,
      valueType: 'indexBorder',
    },
    {
      title: '标题',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorter.field === 'name' && sorter.order,
      copyable: true,
      ellipsis: true,
      render: (_) => <a>{_}</a>,
    },
    {
      title: '地址',
      dataIndex: 'address',
      children: [
        {
          title: '省份',
          dataIndex: 'province',
          width: 120,
          sorter: true,
          sortOrder: sorter.field === 'province' && sorter.order,
        },
        {
          title: '城市',
          dataIndex: 'city',
          width: 100,
          sorter: true,
          sortOrder: sorter.field === 'city' && sorter.order,
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      sortOrder: sorter.field === 'status' && sorter.order,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
      sorter: true,
      sortOrder: sorter.field === 'createdTime' && sorter.order,
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      width: 180,
      dataIndex: 'updatedTime',
      sorter: true,
      sortOrder: sorter.field === 'updatedTime' && sorter.order,
      valueType: 'dateTime',
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
        <ProTableDropdown
          key="other"
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
      title="基础使用"
      extra={[<Button key="1">新增</Button>, <Button key="2">导出</Button>]}
      content={
        <QueryFilter
          submitter={{
            onSubmit: submit,
            onReset: reset,
          }}
          form={form}
          onCollapse={changeType}
          collapsed={type === 'simple'}
        >
          <ProFormText name="name" label="标题" />
          <ProFormDatePicker name="createdTime" label="创建时间" />
          <ProFormText name="status" label="状态" />
          <ProFormDatePicker name="updatedTime" label="更新日期" />
          <ProFormDatePicker name="enddate" label="结束时间" />
        </QueryFilter>
      }
    >
      <ProTable
        resizeable
        sticky={{
          offsetHeader: 64,
        }}
        rowKey="key"
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          columnWidth: 60,
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            <span>{`容器数量: ${selectedRows.reduce((pre) => pre + 1, 0)} 个`}</span>
            <span>{`调用量: ${selectedRows.reduce((pre) => pre + 2, 0)} 次`}</span>
          </Space>
        )}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          );
        }}
        {...tableProps}
        columns={columns}
      />
    </PageContainer>
  );
};
