import { useFormTable } from '@wetrial/hooks';
import type { PaginatedParams } from '@wetrial/hooks/es/useFormTable';
import { Button, Form, Input, Table } from 'antd';
import React from 'react';
import { history } from 'umi';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = (pageInfo: PaginatedParams[0], formData): Promise<Result> => {
  // eslint-disable-next-line no-console
  console.log(pageInfo, formData);
  const { current, pageSize } = pageInfo;
  return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const [form] = Form.useForm();

  // TODO filters and sorter
  const { tableProps, params, search, sorter } = useFormTable(getTableData, {
    defaultPageSize: 5,
    form,
    cacheKey: 'antd/use-form-table',
  });

  const { filters = {} } = params[0] || ({} as any);
  const { type, changeType, submit, reset } = search || {};

  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true,
      sortOrder: sorter.field === 'phone' && sorter.order,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
      ],
      filteredValue: filters.gender,
    },
  ];

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="name">
          <Input placeholder="enter name" style={{ width: 140, marginRight: 16 }} />
        </Form.Item>

        {type === 'advance' && (
          <>
            <Form.Item name="email">
              <Input placeholder="enter email" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="enter phone" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
          </>
        )}
        <Button type="primary" onClick={submit}>
          搜索
        </Button>
        <Button onClick={reset} style={{ marginLeft: 8 }}>
          重置
        </Button>
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? '展开' : '折叠'}
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      <Button
        danger
        onClick={() => {
          history.push({
            pathname: '/component/other/sample',
            hash: '#useformtable-数据缓存',
          });
        }}
        style={{ marginBottom: 16 }}
      >
        切换到demo页面(再切换回来，搜索状态还在)
      </Button>
      {searchFrom}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
