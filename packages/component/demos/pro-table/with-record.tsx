import React from 'react';
import { useLocation, Link } from 'umi';
import { Row, Col, Input, Button, Form, Space, Tooltip, Alert } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ProTable } from '@wetrial/component';
import { LAYOUT_FORM_TWO, LAYOUT_COL_SEARCH_SIX } from '@wetrial/core/es/constants';
import { ProColumns, TableDropdown } from '@wetrial/component/es/ProTable';
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

// 模拟数据请求
const getList = async (data) => {
  // eslint-disable-next-line no-console
  console.log(data);
  return new Promise((resolve) => {
    const tableListDataSource: TableListItem[] = [];
    for (let i = 0; i < 100; i += 1) {
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
      list: tableListDataSource,
    });
  });
};

export default () => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const { tableProps, search, sorter } = useFormTable(
    (paginatedParams, formData) => getList(formatFormTableParams(paginatedParams, formData)),
    {
      form,
      cacheKey: pathname,
    },
  );

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

  const { type, changeType, submit, reset } = search || {};

  const simpleSearchForm = () => (
    <Form className="wt-simple-search-form" layout="inline" form={form}>
      <Form.Item name="search">
        <Input.Search
          allowClear
          placeholder="请输入姓名或者邮箱"
          enterButton
          suffix={
            <Tooltip title="更多搜索条件">
              <Button onClick={changeType} size="small" type="link" icon={<MoreOutlined />} />
            </Tooltip>
          }
          onSearch={submit}
        />
      </Form.Item>
    </Form>
  );

  const advanceSearchForm = () => (
    <Form {...LAYOUT_FORM_TWO} form={form}>
      <Row>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="姓名" name="name">
            <Input autoComplete="off" placeholder="姓名" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="邮箱" name="title">
            <Input autoComplete="off" placeholder="邮箱" />
          </Form.Item>
        </Col>
        <Col {...LAYOUT_COL_SEARCH_SIX}>
          <Form.Item label="描述" name="desc">
            <Input autoComplete="off" placeholder="描述" />
          </Form.Item>
        </Col>
        <Form.Item className="wt-advance-search-form-operator">
          <Space>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
            <Button type="link" onClick={changeType}>
              折叠
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );

  return (
    <PageContainer
      title="搜索、分页后切换页面再切换回来，会恢复之前的搜索状态"
      extra={[
        type === 'simple' ? simpleSearchForm() : undefined,
        <Button key="1">新增</Button>,
        <Button key="2">导出</Button>,
        <Button type="link" key="3">
          <Link to="/list/test/test">进入详情</Link>
        </Button>,
      ]}
    >
      <ProTable<TableListItem>
        columns={columns}
        rowKey="key"
        searchType={type}
        renderSearch={advanceSearchForm}
        tableAlertRender={() => {
          return <Alert message="点击`进入详情` 再通过 `返回列表页` 返回" type="info" showIcon />;
        }}
        {...tableProps}
      />
    </PageContainer>
  );
};
