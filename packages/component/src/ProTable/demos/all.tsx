import React from 'react';
import { Button, Form, Table, Space, Tag } from 'antd';
import type { ProColumns } from '@wetrial/component/lib/ProTable/interface';
import { ProTable, ProTableDropdown } from '@wetrial/component';
import { useFormTable } from '@wetrial/hooks';
import { PageContainer } from '@ant-design/pro-layout';
import { QueryFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';
import { getList } from './_services';
import type { IGitHubIssue } from './_services';

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

  const columns: ProColumns<IGitHubIssue> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 65,
      valueType: 'indexBorder',
    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: true,
      sortOrder: sorter.field === 'title' && sorter.order,
      copyable: true,
      width: 180,
      render: (value, record) => (
        <a target="_blank" href={`${record.url}`}>
          {value}
        </a>
      ),
    },
    {
      title: '标签',
      dataIndex: 'labels',
      width: 200,
      render: (_, record) => (
        <Space>
          {record.labels.map(({ label, color }) => (
            <Tag color={color} key={label}>
              {label}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      valueEnum: {
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
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
      title: '关闭时间',
      dataIndex: 'closeTime',
      width: 180,
      sorter: true,
      sortOrder: sorter.field === 'closeTime' && sorter.order,
      valueType: 'dateTime',
    },
    {
      title: '评论数',
      width: 100,
      dataIndex: 'comments',
      sorter: true,
      sortOrder: sorter.field === 'comments' && sorter.order,
      valueType: 'digit',
    },
    {
      title: '内容',
      dataIndex: 'content',
      sorter: true,
      sortOrder: sorter.field === 'content' && sorter.order,
      ellipsis: true,
      valueType: 'text',
    },
    {
      title: '责任人',
      dataIndex: 'assigner',
      width: 120,
      sorter: true,
      sortOrder: sorter.field === 'assigner' && sorter.order,
    },
    {
      title: '当前进度',
      dataIndex: 'progress',
      sorter: true,
      width: 180,
      sortOrder: sorter.field === 'progress' && sorter.order,
      valueType: 'progress',
    },
    {
      title: '打赏额度',
      dataIndex: 'money',
      sorter: true,
      width: 160,
      sortOrder: sorter.field === 'money' && sorter.order,
      valueType: 'money',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 140,
      fixed: 'right',
      valueType: 'option',
      render: () => [
        <a key="view" target="_blank" rel="noopener noreferrer">
          查看
        </a>,
        <a key="close" target="_blank" rel="noopener noreferrer">
          关闭
        </a>,
        <ProTableDropdown
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
        rowKey="id"
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
