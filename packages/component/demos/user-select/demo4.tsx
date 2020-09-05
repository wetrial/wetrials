import React from 'react';
import { Form, Button } from 'antd';
import { UserSelect } from '@wetrial/component';

const data = [
  {
    Id: '001',
    UserName: '张三',
    RoleName: '管理员',
    Avatar: null,
  },
  {
    Id: '002',
    UserName: '李四',
    RoleName: '秘书',
    Avatar: null,
  },
  {
    Id: '003',
    UserName: '王五',
    RoleName: '研究者',
    Avatar: null,
  },
  {
    Id: '004',
    UserName: '令狐冲',
    RoleName: '秘书',
    Avatar: null,
  },
  {
    Id: '005',
    UserName: '任我行',
    RoleName: '秘书',
    Avatar: null,
  },
];
const handleChange = (v) => {
  // eslint-disable-next-line no-console
  console.log(v);
};

const onFinish = (values) => {
  // eslint-disable-next-line no-console
  console.log('Success:', values);
};

export default () => {
  return (
    <Form name="basic" onFinish={onFinish} initialValues={{ userSelect: ['001'] }}>
      <Form.Item name="userSelect" label="UserSelect">
        <UserSelect
          dataSource={data}
          onChange={handleChange}
          fields={{ id: 'Id', name: 'UserName', avatar: 'Avatar' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
