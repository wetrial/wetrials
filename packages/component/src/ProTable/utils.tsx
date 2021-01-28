import { Space, Tooltip, Typography } from 'antd';
import defaultRenderText from './defaultRender';
import type { ProFieldValueType } from '@ant-design/pro-utils';
import type { ProColumnType, ProColumnGroupType, ColumnRenderInterface } from './interface';

/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: React.ReactText | undefined, index?: number): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};

const isNil = (value: any) => value === null || value === undefined;

const isMergeCell = (
  dom: any, // 如果是合并单元格的，直接返回对象
) => dom && typeof dom === 'object' && dom?.props?.colSpan;

/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
export const genEllipsis = (dom: React.ReactNode, item: ProColumnType<any>, text: string) => {
  if (!item.ellipsis) {
    return dom;
  }
  return (
    <Tooltip title={text}>
      <span>{dom}</span>
    </Tooltip>
  );
};

export const genCopyable = (dom: React.ReactNode, item: ProColumnType<any>, text: string) => {
  if (item.copyable || item.ellipsis) {
    return (
      <Typography.Text
        style={{
          maxWidth: '100%',
          margin: 0,
          padding: 0,
        }}
        copyable={
          item.copyable && text
            ? {
                text,
                tooltips: ['', ''],
              }
            : undefined
        }
        ellipsis={item.ellipsis}
      >
        {dom}
      </Typography.Text>
    );
  }
  return dom;
};

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
export function columnRender<T>({
  columnProps,
  text,
  rowData,
  index,
}: ColumnRenderInterface<T>): any {
  const textDom = defaultRenderText<T>({
    text,
    valueType: (columnProps.valueType as ProFieldValueType) || 'text',
    index,
    rowData,
    columnProps,
  });

  const dom: React.ReactNode = genEllipsis(
    genCopyable(textDom, columnProps, text),
    columnProps,
    text,
  );

  if (columnProps.render) {
    const renderDom = columnProps.render(dom, rowData, index);

    // 如果是合并单元格的，直接返回对象
    if (isMergeCell(renderDom)) {
      return renderDom;
    }

    if (renderDom && columnProps.valueType === 'option' && Array.isArray(renderDom)) {
      return <Space size={16}>{renderDom}</Space>;
    }
    return renderDom as React.ReactNode;
  }
  return !isNil(dom) ? dom : null;
}

/**
 * 转化 columns 到 pro 的格式
 * 主要是 render 方法的自行实现
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genColumnList<T>(props: { columns: ProColumnType<T>[] }): ProColumnType<T>[] {
  const { columns } = props;

  return columns.map((columnProps, columnsIndex) => {
    const { dataIndex, valueEnum, valueType, children } = columnProps as ProColumnGroupType<T>;
    // 这些都没有，说明是普通的表格不需要 pro 管理
    const noNeedPro = !dataIndex && !valueEnum && !valueType && !children;
    if (noNeedPro) {
      return {
        index: columnsIndex,
        ...columnProps,
      };
    }

    const tempColumns = {
      index: columnsIndex,
      ...columnProps,
      valueEnum,
      children: (columnProps as ProColumnGroupType<T>).children
        ? genColumnList({
            ...props,
            columns: (columnProps as ProColumnGroupType<T>)?.children,
          })
        : undefined,
      render: (text: any, rowData: T, index: number) => {
        const renderProps = {
          columnProps,
          text,
          rowData,
          index,
        };
        return columnRender<T>(renderProps);
      },
    };
    return tempColumns as ProColumnType<T>;
  });
}
