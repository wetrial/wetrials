import React, { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/lib/table';
import type { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigConsumer } from 'antd/es/config-provider';
import { Resizable } from 'react-resizable';
import { useMountMergeState } from '@ant-design/pro-utils';
import ProTableAlert from './components/Alert';
import type { ProTableProps, TableRowSelection } from './interface';
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
  const {
    resizeable,
    columns = [],
    tableLayout = 'fixed',
    scroll,
    rowSelection: propsRowSelection = false,
    tableAlertRender,
    tableAlertOptionRender,
    ...restProps
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useMountMergeState<React.ReactText[]>([], {
    value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined,
  });

  const [selectedRows, setSelectedRows] = useMountMergeState<RecordType[]>([]);

  const setSelectedRowsAndKey = useCallback(
    (keys: React.ReactText[], rows: RecordType[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
    [setSelectedRowKeys, setSelectedRows],
  );

  /**
   * 清空所有的选中项
   */
  const onCleanSelected = useCallback(() => {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], []);
    }
    setSelectedRowsAndKey([], []);
  }, [propsRowSelection, setSelectedRowsAndKey]);

  /**
   * 行选择相关的问题
   */
  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    ...propsRowSelection,
    onChange: (keys, rows) => {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows);
      }
      setSelectedRowsAndKey(keys, rows);
    },
  };

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
    let resizeProps = {};
    if (resizeable) {
      resizeProps = {
        bordered: true,
        components: {
          header: {
            cell: ResizeableTitle,
          },
        },
      };
    }
    setTableProps({
      ...resizeProps,
      columns: flatDeepGetColumns(tableColumns, columnSize, handleResize),
    });
  }, [resizeable, columnSize, tableColumns]);

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <Fragment>
          {propsRowSelection !== false && (
            <ProTableAlert<RecordType>
              selectedRowKeys={selectedRowKeys}
              selectedRows={selectedRows}
              onCleanSelected={onCleanSelected}
              alertOptionRender={tableAlertOptionRender}
              alertInfoRender={tableAlertRender}
            />
          )}
          <Table<RecordType>
            {...restProps}
            {...tableProps}
            rowSelection={propsRowSelection === false ? undefined : rowSelection}
            className={`${restProps.className || ''} ${getPrefixCls('wt-pro-table')}`}
          />
        </Fragment>
      )}
    </ConfigConsumer>
  );
}

export default ProTable;
