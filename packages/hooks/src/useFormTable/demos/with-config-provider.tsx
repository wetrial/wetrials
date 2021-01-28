/**
 * title:  通过@wetrial/provider 修改全局配置
 * desc: 通过ConfigProvider来配置formatFormTableResult、formatFormTableResult 已达到不同后端接口的定制化,更多内容参考/wetrials/core/config-provider
 *
 * title.en-US:  use @wetrial/provider change global method
 * desc.en-US: use ConfigProvider to config formatFormTableResult、formatFormTableResult
 */
import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useFormTable } from '@wetrial/hooks';
import type { PaginatedParams } from '@wetrial/hooks/es/useFormTable';
import { ConfigProvider } from '@wetrial/provider';

const { Option } = Select;

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

const getTableData = ({ current, pageSize }: PaginatedParams[0], formData): Promise<Result> => {
  // eslint-disable-next-line no-console
  console.log(current, pageSize);
  // eslint-disable-next-line no-console
  console.log('formData', formData);
  return fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const Demo = () => {
  const [form] = Form.useForm();

  const { tableProps, search } = useFormTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { type, changeType, submit, reset } = search;

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
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="name" name="name">
              <Input placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email" name="email">
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="gender">
          <Select
            placeholder="-- 请选择 --"
            style={{ width: 120, marginRight: 16 }}
            onChange={submit}
          >
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {type === 'simple' ? searchFrom : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

export default () => {
  return (
    <ConfigProvider
      value={{
        formatFormTableResult: (result) => {
          // TODO 修改为符合要求的结构
          return result;
        },
        formatFormTableRequest: (req) => {
          // TODO 修改为符合要求的结构
          return req;
        },
      }}
    >
      <Demo />
    </ConfigProvider>
  );
};
