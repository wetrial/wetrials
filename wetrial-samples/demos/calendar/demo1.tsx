import React from 'react';
import './demo1.less';
import { Calendar, Row, Col, Tag, Tooltip } from 'antd';
import moment from 'moment';

const eventList = [
  {
    key: '001',
    startTime: moment('20200912'),
    endTime: moment('20200925'),
    type: 'warning',
    content: '长事件',
  },
  {
    key: '002',
    startTime: moment('20200917'),
    endTime: moment('20200918'),
    type: 'success',
    content: '两天',
  },
  {
    key: '003',
    startTime: moment('20200920'),
    endTime: moment('20200920'),
    type: 'processing',
    content: '单日',
  },
  {
    key: '004',
    startTime: moment('20200920'),
    endTime: moment('20200920'),
    type: 'processing',
    content: '单日',
  },
  {
    key: '005',
    startTime: moment('20200920'),
    endTime: moment('20200920'),
    type: 'processing',
    content: '单日',
  },
  {
    key: '006',
    startTime: moment('20200920'),
    endTime: moment('20200920'),
    type: 'processing',
    content: '单日',
  },
];
export default function sample() {
  function getListData(value) {
    const listData = [] as any[];
    eventList.map((item) => {
      if (
        item.startTime.format('YYYY-MM-DD') < value.format('YYYY-MM-DD') &&
        value.format('YYYY-MM-DD') < item.endTime.format('YYYY-MM-DD')
      ) {
        listData.push({
          key: item.key,
          type: item.type,
          content: item.content,
          position: 'middle',
        });
      } else if (
        item.startTime.format('YYYY-MM-DD') === value.format('YYYY-MM-DD') &&
        item.endTime.format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
      ) {
        listData.push({
          key: item.key,
          type: item.type,
          content: item.content,
          position: 'single',
        });
      } else if (value.format('YYYY-MM-DD') === item.startTime.format('YYYY-MM-DD')) {
        listData.push({ key: item.key, type: item.type, content: item.content, position: 'start' });
      } else if (value.format('YYYY-MM-DD') === item.endTime.format('YYYY-MM-DD')) {
        listData.push({ key: item.key, type: item.type, content: item.content, position: 'end' });
      }

      return null;
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <Tooltip key={item.key} title={item.content}>
            <li className={item.position}>
              <Tag color={item.type}>{item.content}</Tag>
            </li>
          </Tooltip>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
    return null;
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Calendar fullscreen={false} />
      </Col>
      <Col span={18}>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          className="wt-calendar-compact"
        />
      </Col>
    </Row>
  );
}
