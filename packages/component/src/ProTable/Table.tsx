import React, { useEffect, CSSProperties, useRef } from 'react';
import { ConfigProvider, Card, Space, Empty } from 'antd';
import { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';

import { IntlProvider, IntlConsumer } from './component/intlContext';
import Container from './container';
import Toolbar, { OptionConfig } from './component/toolBar';

import get, { useDeepCompareEffect, genColumnKey } from './component/util';
import defaultRenderText, {
  ProColumnsValueType,
  ProColumnsValueTypeFunction,
} from './defaultRender';
import { DensitySize } from './component/toolBar/DensityIcon';
import ErrorBoundary from './component/ErrorBoundary';
import ResizeableTalbe, { IResizeableTableProps } from '../Table';

import './index.less';

export interface ColumnsState {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
}

export interface ProColumnType<T = unknown> extends ColumnType<T> {
  /**
   * 值的类型
   */
  valueType?: ProColumnsValueType | ProColumnsValueTypeFunction<T>;
}

export interface ProColumnGroupType<RecordType> extends ProColumnType<RecordType> {
  children: ProColumns<RecordType>;
}

export type ProColumns<T = any> = ProColumnGroupType<T> | ProColumnType<T>;

export interface ProTableProps<T, U extends { [key: string]: any }>
  extends Omit<TableProps<T>, 'columns'>,
    IResizeableTableProps<T> {
  columns?: ProColumns<T>[];
  columnsStateMap?: {
    [key: string]: ColumnsState;
  };
  onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;
  /**
   * 自定义搜索 form 的输入
   */
  renderSearch?: (() => JSX.Element) | false | null;
  searchType?: 'simple' | 'advance';
  /**
   * 默认的操作栏配置
   */
  options?: OptionConfig<T> | false;
  onSizeChange?: (size: DensitySize) => void;
  /**
   * 自定义 table 的 alert
   * 设置或者返回false 即可关闭
   */
  tableAlertRender?: () => React.ReactNode | false;
  /**
   * table外层容器的样式
   */
  containerClassName?: string;
  /**
   * 给封装的 table 的 style
   */
  containerStyle?: CSSProperties;
}

interface ColumRenderInterface<T> {
  item: ProColumns<T>;
  text: any;
  row: T;
  index: number;
}

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
const columRender = <T, U = any>({ item, text, row, index }: ColumRenderInterface<T>): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const counter = Container.useContainer();
  const { action } = counter;

  if (!action.current) {
    return null;
  }

  const dom = defaultRenderText<T, {}>(text, item.valueType || 'text', index, row);

  // const columnText = parsingText(text, valueEnum);
  if (item.render) {
    const renderDom = item.render(dom, row, index);

    // 如果是合并单元格的，直接返回对象
    if (
      renderDom &&
      typeof renderDom === 'object' &&
      (renderDom as { props: { colSpan: number } }).props &&
      (renderDom as { props: { colSpan: number } }).props.colSpan
    ) {
      return renderDom;
    }

    if (renderDom && item.valueType === 'option' && Array.isArray(renderDom)) {
      return <Space>{renderDom}</Space>;
    }
    return renderDom as React.ReactNode;
  }
  return dom;
};

const genColumnList = <T, U = {}>(
  columns: ProColumns<T>[],
  map: {
    [key: string]: ColumnsState;
  },
): (ColumnsType<T>[number] & { index?: number })[] =>
  columns.map((item, columnsIndex) => {
    const { key, dataIndex } = item;
    const columnKey = genColumnKey(key, dataIndex, columnsIndex);
    const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
    const tempColumns = {
      onFilter: (value: string, record: T) => {
        let recordElement = get(record, item.dataIndex || '');
        if (typeof recordElement === 'number') {
          recordElement = recordElement.toString();
        }
        const itemValue = String(recordElement || '') as string;
        return String(itemValue) === String(value);
      },
      index: columnsIndex,
      ...item,
      fixed: config.fixed,
      width: item.width || (item.fixed ? 200 : undefined),
      // @ts-ignore
      children: item.children ? genColumnList(item.children, map) : undefined,
      render: (text: any, row: T, index: number) => columRender<T>({ item, text, row, index }),
    };
    if (!tempColumns.children || !tempColumns.children.length) {
      delete tempColumns.children;
    }
    if (!tempColumns.dataIndex) {
      delete tempColumns.dataIndex;
    }
    if (!tempColumns.filters || !tempColumns.filters.length) {
      delete tempColumns.filters;
    }
    return tempColumns;
  }) as ColumnsType<T>[number] &
    {
      index?: number;
    }[];

const ProTable = <T extends {}, U extends object>(props: ProTableProps<T, U>) => {
  const {
    columns: propsColumns = [],
    columnsStateMap,
    onColumnsStateChange,
    options,
    tableAlertRender,
    className,
    style,
    searchType = 'simple',
    renderSearch,
    containerClassName,
    containerStyle,
    ...rest
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const fullScreen = useRef<() => void>();

  const action: any = {};

  useEffect(() => {
    fullScreen.current = () => {
      if (!rootRef.current || !document.fullscreenEnabled) {
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        rootRef.current.requestFullscreen();
      }
    };
  }, [rootRef.current]);

  action.fullScreen = fullScreen.current;

  const counter = Container.useContainer();

  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */
  useDeepCompareEffect(() => {
    const tableColumn = genColumnList<T>(propsColumns, counter.columnsMap);
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
      // 重新生成key的字符串用于排序
      counter.setSortKeyColumns(
        tableColumn.map((item, index) => {
          const key =
            genColumnKey(item.key, (item as ProColumnType).dataIndex, index) || `${index}`;
          return `${key}_${item.index}`;
        }),
      );
    }
    counter.setProColumns(propsColumns);
  }, [propsColumns]);

  counter.setAction(action);

  /**
   * 这里主要是为了排序，为了保证更新及时，每次都重新计算
   */
  useDeepCompareEffect(() => {
    const keys = counter.sortKeyColumns.join(',');
    let tableColumn = genColumnList<T>(propsColumns, counter.columnsMap);
    if (keys.length > 0) {
      // 用于可视化的排序
      tableColumn = tableColumn.sort((a, b) => {
        const { fixed: aFixed, index: aIndex } = a;
        const { fixed: bFixed, index: bIndex } = b;
        if (
          (aFixed === 'left' && bFixed !== 'left') ||
          (bFixed === 'right' && aFixed !== 'right')
        ) {
          return -2;
        }
        if (
          (bFixed === 'left' && aFixed !== 'left') ||
          (aFixed === 'right' && bFixed !== 'right')
        ) {
          return 2;
        }
        // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
        const aKey = `${genColumnKey(a.key, (a as ProColumnType).dataIndex, aIndex)}_${aIndex}`;
        const bKey = `${genColumnKey(b.key, (b as ProColumnType).dataIndex, bIndex)}_${bIndex}`;
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      });
    }
    if (tableColumn && tableColumn.length > 0) {
      counter.setColumns(tableColumn);
    }
  }, [counter.columnsMap, counter.sortKeyColumns.join('-')]);

  useEffect(() => {
    counter.setTableSize(rest.size || 'large');
  }, [rest.size]);

  if (counter.columns.length < 1) {
    return (
      <Card bordered={false} bodyStyle={{ padding: 50 }}>
        <Empty />
      </Card>
    );
  }
  return (
    <ConfigProvider
      getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
    >
      <div className={containerClassName} style={containerStyle} ref={rootRef}>
        {searchType === 'advance' && renderSearch ? renderSearch() : null}
        {tableAlertRender ? tableAlertRender() : null}
        <div style={{ position: 'relative' }}>
          <ResizeableTalbe<T>
            {...rest}
            size={counter.tableSize}
            className={className}
            style={style}
            columns={counter.columns.filter((item) => {
              const { key, dataIndex } = item;
              const columnKey = genColumnKey(key, dataIndex);
              if (!columnKey) {
                return true;
              }
              const config = counter.columnsMap[columnKey];
              if (config && config.show === false) {
                return false;
              }
              return true;
            })}
          />
          {options !== false && <Toolbar<T> options={options} action={action} />}
        </div>
      </div>
    </ConfigProvider>
  );
};

const ProviderWarp = <T, U extends { [key: string]: any } = {}>(props: ProTableProps<T, U>) => (
  <Container.Provider initialState={props}>
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <IntlConsumer>
          {(value) => (
            <IntlProvider value={value}>
              <ErrorBoundary>
                <ProTable className={getPrefixCls('pro-table')} {...props} />
              </ErrorBoundary>
            </IntlProvider>
          )}
        </IntlConsumer>
      )}
    </ConfigConsumer>
  </Container.Provider>
);

export default ProviderWarp;
