import { render } from 'enzyme';
import React from 'react';
import { Input } from 'antd';
import { ProTable } from '@wetrial/component';
import { columns } from './data/table';

describe('BasicTable', () => {
  it('🎏 base use', () => {
    const html = render(
      <ProTable
        size="small"
        columns={columns}
        rowKey="key"
        pagination={{
          defaultCurrent: 10,
        }}
        searchType="simple"
        renderSearch={() => {
          return (
            <Input.Search
              style={{
                width: 200,
              }}
            />
          );
        }}
      />,
    );
    expect(html).toMatchSnapshot();
  });
});
