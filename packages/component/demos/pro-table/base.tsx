import React from 'react';
import { Button, Form } from 'antd';
import { IProTableColumnsType } from '@wetrial/component/lib/ProTable/interface';
import { ProTable } from '@wetrial/component';
import { useFormTable, formatFormTableParams } from '@wetrial/hooks';
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
  // eslint-disable-next-line no-console
  console.log(data);
  return new Promise((resolve) => {
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
  const { tableProps, search, sorter } = useFormTable(
    (paginatedParams, formData) => getList(formatFormTableParams(paginatedParams, formData)),
    {
      form,
      // defaultParams: [
      //   { current: 2, pageSize: 5 },
      //   { name: 'hello', email: 'abc@gmail.com', gender: 'female' },
      // ],
      // defaultType: 'advance',
    },
  );
  const { type, changeType, submit, reset } = search;

  const columns: IProTableColumnsType = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
    },
    {
      title: '标题',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorter.field === 'name' && sorter.order,
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
      width: 200,
      sorter: true,
      sortOrder: sorter.field === 'createdTime' && sorter.order,
    },
    {
      title: '更新时间',
      width: 120,
      dataIndex: 'updatedTime',
      sorter: true,
      sortOrder: sorter.field === 'updatedTime' && sorter.order,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: () => [
        <a key="view" target="_blank" rel="noopener noreferrer">
          查看
        </a>,
        // <TableDropdown
        //   key="other"
        //   // eslint-disable-next-line no-alert
        //   onSelect={(key) => window.alert(key)}
        //   menus={[
        //     { key: 'copy', name: '复制' },
        //     { key: 'delete', name: '删除' },
        //   ]}
        // />,
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
      <ProTable resizeable sticky rowKey="key" {...tableProps} columns={columns} />
    </PageContainer>
  );
};
