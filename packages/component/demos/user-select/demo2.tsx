import React from 'react';
import { UserSelect } from '@wetrial/component';

const selected = '001';

const data = [
  {
    UserId: '001',
    FullName: '张三',
    RoleName: '管理员',
    Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    UserId: '002',
    FullName: '李四',
    RoleName: '秘书',
    Avatar: null,
  },
  {
    UserId: '003',
    FullName: '王五',
    RoleName: '研究者',
    Avatar: null,
  },
  {
    UserId: '004',
    FullName: '令狐冲',
    RoleName: '秘书',
    Avatar: null,
  },
  {
    UserId: '005',
    FullName: '任我行',
    RoleName: '秘书',
    Avatar: null,
  },
];
const handleChange = (v) => {
  // eslint-disable-next-line no-console
  console.log(v);
};

export default () => {
  return <UserSelect value={selected} dataSource={data} onChange={handleChange} multiple={false} />;
};
