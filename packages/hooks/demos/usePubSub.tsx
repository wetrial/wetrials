import React, { useState } from 'react';
import { Button, Input, Badge, Divider, Row, Col } from 'antd';
import { PubSub, useSubscribe } from '@wetrial/hooks';

const eventType = {
  sendMessage: 'sendMessage',
};

function MessageList() {
  const [messages, setMessages] = useState('');

  useSubscribe(eventType.sendMessage, (_, data) => {
    setMessages(data);
  });

  return (
    <>
      <Badge dot>消息</Badge>
      <Input.TextArea value={messages} />
    </>
  );
}

function Chat() {
  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    PubSub.publish(eventType.sendMessage, `${message}-${new Date().getTime()}`);
    setMessage('');
  };

  return (
    <Input.Group>
      <Row>
        <Col span={22}>
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            defaultValue="receive"
          />
        </Col>
        <Col span={2}>
          <Button onClick={sendMessage} type="primary">
            发送
          </Button>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default () => {
  return (
    <>
      <MessageList />
      <Divider />
      <Chat />
    </>
  );
};
