import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Input, Menu, Dropdown } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { DownOutlined } from '@ant-design/icons';

interface MyDatePickerProps {
  partialDate?: boolean;
  allowNa?: boolean;
  onChange?: (value) => void;
  value?: any;
}

type TProDatePickerProps = MyDatePickerProps & DatePickerProps;

const { Item } = Menu;

const ProDatePicker: React.SFC<TProDatePickerProps> = (props: TProDatePickerProps) => {
  const { partialDate, onChange, allowNa, value, ...rest } = props;
  const [partial, setPartial] = useState('none');
  const [partialText, setPartialText] = useState('默认');
  const [partialValue, setPartialValue] = useState(value);
  useEffect(() => {
    if (partialDate || allowNa) {
      if (typeof value === 'string') {
        if (value === 'NA') {
          setPartial('na');
          setPartialText('NA');
        } else if (value.indexOf('UN') === 0) {
          setPartial('year');
          setPartialText('年');
        } else if (value.indexOf('UN') === 5) {
          setPartial('month');
          setPartialText('月');
        } else if (value.indexOf('UN') === 8) {
          setPartial('day');
          setPartialText('日');
        }
      }
    }
  }, []);

  const changeStatus = (val) => {
    setPartial(val.key);
    let text;
    if (val.key === 'year') {
      text = '年';
    } else if (val.key === 'month') {
      text = '月';
    } else if (val.key === 'day') {
      text = '日';
    } else if (val.key === 'none') {
      text = '默认';
    } else {
      text = 'NA';
    }
    setPartialValue(undefined);
    setPartialText(text);
    if (val.key === 'year') {
      const result = 'UNUN-UN-UN';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(result);
    }
    if (val.key === 'na') {
      const result = 'NA';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(result);
    }
  };

  const handleChangeDate = (val) => {
    let result;
    if (partial === 'none') {
      result = val;
    } else if (partial === 'month') {
      const mydate = val.format('YYYY');
      result = `${mydate.toString()}-UN-UN`;
      setPartialValue(result);
    } else if (partial === 'day') {
      const mydate = val.format('YYYY-MM');
      result = `${mydate.toString()}-UN`;
      setPartialValue(result);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(result);
  };

  const handleChangePartialValue = (e) => {
    const result = e.target.value;
    if (result.length < 1) {
      setPartialValue(undefined);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(undefined);
    }
  };

  const menu = (
    <Menu onClick={changeStatus}>
      <Item key="none">默认</Item>
      {allowNa && <Item key="na">NA</Item>}
      {partialDate && <Item key="year">年未知</Item>}
      {partialDate && <Item key="month">月未知</Item>}
      {partialDate && <Item key="day">日未知</Item>}
    </Menu>
  );

  return (
    <div>
      <Input.Group compact>
        {(allowNa || partialDate) && (
          <Dropdown overlay={menu}>
            <Button style={{ width: '65px', textAlign: 'center' }}>
              {partialText}
              <DownOutlined style={{ position: 'relative', left: '-4px' }} />
            </Button>
          </Dropdown>
        )}
        {partial === 'none' && <DatePicker inputReadOnly {...rest} onChange={handleChangeDate} />}
        {partial === 'year' && <Input style={{ width: '142px' }} value="UNUN-UN-UN" readOnly />}
        {partial === 'month' && !partialValue && (
          <DatePicker picker="year" inputReadOnly onChange={handleChangeDate} />
        )}
        {partial === 'day' && !partialValue && (
          <DatePicker picker="month" inputReadOnly onChange={handleChangeDate} />
        )}
        {partial === 'na' && <Input style={{ width: '142px' }} value="NA" readOnly />}
        <Input
          style={{
            width: '142px',
            display: partialValue && partialValue !== 'UNUN-UN-UN' ? 'inline-flex' : 'none',
          }}
          value={partialValue}
          allowClear
          onChange={handleChangePartialValue}
        />
      </Input.Group>
    </div>
  );
};

export default ProDatePicker;
