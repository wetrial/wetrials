import React, { useState } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { Resizable } from 'react-resizable';
import { IKeyValue } from '@wetrial/core';

import './index.less';

export interface IResizeableTableProps<RecordType = any> extends TableProps<RecordType> {
  /**
   * 是否允许伸缩列
   */
  resizeable?: boolean;
}

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="wetrial-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const getColumnKey = (key: string[] | string): string => {
  return Array.isArray(key) ? key.join('_') : key;
};

// const getWidth = (columnSize, columnKey: string, defaultWidth: number) => {
//   return columnSize[columnKey] || defaultWidth;
// };

const ResizeableTalbe = <RecordType extends object = any>(
  props: IResizeableTableProps<RecordType>,
) => {
  const { resizeable, columns = [], tableLayout = 'fixed', scroll, ...restProps } = props;

  const [columnSize, setColumnSize] = useState<IKeyValue<number>>(() => {
    return columns.reduce((size: any, column: any) => {
      const columnKey = getColumnKey(column.dataIndex || column.key);
      // eslint-disable-next-line no-param-reassign
      size[columnKey] = column.width;
      return size;
    }, {});
  });

  const handleResize = (key) => (e, { size }) => {
    setColumnSize({
      ...columnSize,
      [key]: size.width,
    });
  };

  let tableProps: any = {
    columns,
    tableLayout,
    scroll: {
      x: 'max-content',
      scrollToFirstRowOnChange: true,
      ...scroll,
    },
  };

  if (resizeable) {
    tableProps = {
      ...tableProps,
      bordered: true,
      components: {
        header: {
          cell: ResizeableTitle,
        },
      },
      columns: columns?.map((col: any) => {
        const columnKey = getColumnKey(col.dataIndex || col.key);
        const width = columnSize[columnKey];
        return {
          ...col,
          width,
          onHeaderCell: () => {
            return {
              width,
              onResize: handleResize(columnKey),
            };
          },
        };
      }),
    };
  }

  return <Table {...restProps} {...tableProps} sticky={{ offsetHeader: 64 }} />;
};

export default ResizeableTalbe;
