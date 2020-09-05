import React from 'react';
import { ConfigProvider, Form, Input, InputNumber, Button } from 'antd';
import validateMessages from '../src/validation';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export default () => {
  const onFinish = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Form
        style={{
          width: 600,
        }}
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="项目编号"
          name="projectNo"
          rules={[{ required: true, whitespace: true, max: 15 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="设计例数"
          name="designCount"
          rules={[{ type: 'number', required: true, min: 1, max: 1000 }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
