import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/lib/table';
import type { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigConsumer } from 'antd/es/config-provider';
import { Resizable } from 'react-resizable';
import type { ProTableProps } from './interface';
import { genColumnList } from './utils';
import './index.less';

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
          className="resizable-handle"
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

/**
 * 将column映射成对象形式
 * @param key 列的唯一标识，dataIndex或者key
 * @param parentKey 父层级,有父层级的情况，会默认使用-隔开
 */
const getColumnKey = (key: string[] | string, parentKey?: string): string => {
  const result = Array.isArray(key) ? key.join('.') : key;
  return parentKey ? `${parentKey}-${result}` : result;
};

/**
 * 递归生成列的宽度映射对象
 * @param columns 表格的列
 * @param parentKey 父层级,有父层级的情况，会默认使用-隔开
 */
const flattenDeepGetColumnKey = (columns: any[], parentKey?: string) => {
  return columns.reduce((size: any, column: any) => {
    let newSize = { ...size };
    const columnKey = getColumnKey(column.dataIndex || column.key, parentKey);
    if (Array.isArray(column.children)) {
      const subSize = flattenDeepGetColumnKey(column.children, columnKey);
      newSize = { ...size, ...subSize };
      // const widths = Object.values(subSize) as number[];
      // newSize[columnKey] = widths.reduce((sumWidth: number | undefined, width: number) => {
      //   if (sumWidth !== undefined && isNumber(width)) {
      //     return sumWidth + width;
      //   }
      //   return undefined;
      // }, 0);
    } else {
      newSize[columnKey] = column.width;
    }
    return newSize;
  }, {});
};

const flatDeepGetColumns = (
  columns: any[],
  columnSize: any,
  handleResize: Function,
  parentKey?: string,
) => {
  return columns?.map((col: any) => {
    const columnKey = getColumnKey(col.dataIndex || col.key, parentKey);
    const width = col.children ? undefined : columnSize[columnKey];
    return {
      ...col,
      width,
      onHeaderCell: () => {
        return {
          width,
          onResize: handleResize(columnKey),
        };
      },
      children: col.children
        ? flatDeepGetColumns(col.children, columnSize, handleResize, columnKey)
        : undefined,
    };
  });
};

function ProTable<RecordType extends object = any>(props: ProTableProps<RecordType>) {
  const { resizeable, columns = [], tableLayout = 'fixed', scroll, ...restProps } = props;

  const [tableProps, setTableProps] = useState<Partial<TableProps<RecordType>>>({
    columns,
    tableLayout,
    scroll: {
      x: 'max-content',
      scrollToFirstRowOnChange: true,
      ...scroll,
    },
  });

  const tableColumns = useMemo(() => {
    return genColumnList<RecordType>({
      columns,
    });
  }, [columns]);

  const [columnSize, setColumnSize] = useState<Record<string, number>>(() =>
    flattenDeepGetColumnKey(columns),
  );

  const handleResize = useCallback(
    (key) => (e, { size }) => {
      setColumnSize({
        ...columnSize,
        [key]: size.width,
      });
    },
    [columnSize],
  );

  useEffect(() => {
    if (resizeable) {
      setTableProps({
        bordered: true,
        components: {
          header: {
            cell: ResizeableTitle,
          },
        },
        columns: flatDeepGetColumns(tableColumns, columnSize, handleResize),
      });
    } else {
      setTableProps({
        columns: tableColumns,
      });
    }
  }, [resizeable, columnSize, tableColumns]);

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <Table<RecordType>
          {...restProps}
          {...tableProps}
          className={`${restProps.className} ${getPrefixCls('wt-pro-table')}`}
        />
      )}
    </ConfigConsumer>
  );
}

export default ProTable;
