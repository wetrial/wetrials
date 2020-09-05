import React, { useState } from 'react';
import { ProRadio } from '@wetrial/component';
import { Form, Button } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const [v, setV] = useState('PPT');

  const handleSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Form onFinish={handleSubmit} initialValues={{ language: v }} form={form}>
      <Form.Item label="最爱" name="language" rules={[{ required: true }]}>
        <ProRadio.Group value={v}>
          <ProRadio value="C#">C#</ProRadio>
          <ProRadio value="PPT">最好的语言</ProRadio>
          <ProRadio value="react">React</ProRadio>
        </ProRadio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button
          type="default"
          onClick={() => {
            setV('C#');
          }}
        >
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};
