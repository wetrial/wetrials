// import React, { useState } from 'react';
// import { Table } from 'antd';
// import { Resizable } from 'react-resizable';
// import '../index.less';

// const ResizeableTitle = props => {
//   const { onResize, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       onResize={onResize}
//       handle={
//         <span
//           className="wetrial-resizable-handle"
//           onClick={e => {
//             e.stopPropagation();
//           }}
//         />
//       }
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// const tableListDataSource: any[] = [];

// for (let i = 0; i < 10; i += 1) {
//   tableListDataSource.push({
//     key: i,
//     name: `TradeCode ${i}`,
//     status: 3333,
//     updatedAt: Date.now() - Math.floor(Math.random() * 1000),
//     createdAt: Date.now() - Math.floor(Math.random() * 2000),
//     money: Math.floor(Math.random() * 2000) * i,
//     progress: Math.ceil(Math.random() * 100) + 1,
//   });
// }

// export default () => {
//   const [defineColumns, setDefineColumns] = useState([
//     {
//       title: '标题',
//       dataIndex: 'name',
//       width: 100,
//       render: _ => <a>{_}</a>,
//     },
//     {
//       title: '状态',
//       dataIndex: 'status',
//       width: 100,
//     },
//     {
//       title: '创建时间',
//       dataIndex: 'createdAt',
//       width: 200,
//     },
//     {
//       title: '更新时间',
//       width: 120,
//       dataIndex: 'updatedAt',
//     },
//     {
//       title: '操作',
//       key: 'option',
//       width: 120,
//       render: () => [
//         <a key="view" target="_blank" rel="noopener noreferrer">
//           查看
//         </a>,
//       ],
//     },
//   ]);

//   const components = {
//     header: {
//       cell: ResizeableTitle,
//     },
//   };

//   const handleResize = index => (e, { size }) => {
//     const nextColumns = [...defineColumns];
//     nextColumns[index] = {
//       ...nextColumns[index],
//       width: size.width,
//     };
//     setDefineColumns(nextColumns);
//   };

//   const columns = defineColumns.map((col, index) => ({
//     ...col,
//     onHeaderCell: column => ({
//       width: column.width,
//       onResize: handleResize(index),
//     }),
//   }));

//   return (
//     <Table
//       bordered
//       scroll={{ x: 'max-content' }}
//       components={components}
//       columns={columns}
//       dataSource={tableListDataSource}
//     />
//   );
// };
