import { mount } from 'enzyme';
import React from 'react';
import ProSelect from './index';

describe('ProSelect', () => {
  it('simple list', () => {
    const list = [
      { label: 'C#', key: 'C#' },
      { label: '最好的语言', key: 'PPT' },
      { label: 'REACT', key: 'REACT' },
    ];
    const wraper = mount(<ProSelect list={list} />);
    expect(wraper.find('_default').props().list).toEqual(list);
  });
});
