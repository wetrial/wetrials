/**
 * title:  用于记录table中控制显示隐藏的列
 * desc: 记录到localstorage中
 */
import React, { useState, useEffect } from 'react';
import { Button, Card, Radio, Divider, Row, Col } from 'antd';
import { useTableColumnStateMapStorage } from '@wetrial/hooks';

type OpType = 'all' | 'even' | 'odd' | 'none';

// 模拟摆表格设置显示列
const getColumnsByType = (columns: any[], type: OpType) => {
  let result = {};
  if (type === 'all') {
    result = {};
  } else if (type === 'even') {
    columns.forEach((v, i) => {
      if (i % 2 === 1) {
        result[v.dataIndex] = {
          show: false,
        };
      }
    });
  } else if (type === 'odd') {
    columns.forEach((v, i) => {
      if (i % 2 === 0) {
        result[v.dataIndex] = {
          show: false,
        };
      }
    });
  } else {
    columns.forEach((v, i) => {
      result[v.dataIndex] = {
        show: false,
      };
    });
  }
  return result;
};

export default () => {
  // 定义所有的列
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const [type, setType] = useState<OpType>('all');

  const { tableProps, getColumns } = useTableColumnStateMapStorage(
    '/hooks/useTableColumnStateMapStorage',
  );

  useEffect(() => {
    const columnStateMaps = getColumnsByType(columns, type);
    tableProps.onColumnsStateChange(columnStateMaps);
  }, [type]);

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <Card>
      <Radio.Group value={type} onChange={handleChangeType}>
        <Radio.Button value="all">显示所有</Radio.Button>
        <Radio.Button value="even">显示基数</Radio.Button>
        <Radio.Button value="odd">显示偶数</Radio.Button>
        <Radio.Button value="none">全部隐藏</Radio.Button>
      </Radio.Group>
      <Row>
        <Col span="8">
          <Card bordered={false} title="所有列">
            {JSON.stringify(columns, null, '\t')}
          </Card>
        </Col>
        <Col span="8">
          <Card bordered={false} title="tableProps">
            {JSON.stringify(tableProps)}
          </Card>
        </Col>
        <Col span="8">
          <Card bordered={false} title="显示的列">
            {JSON.stringify(getColumns(columns))}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
