import type { ReactNode } from 'react';
import type { TableProps, ColumnType } from 'antd/lib/table';
import type { AlertRenderType } from './components/Alert';
import type { ProFieldValueType, ProFieldValueObjectType } from '@ant-design/pro-utils';

type ProSchemaValueType = ProFieldValueType | ProFieldValueObjectType;

export type TableRowSelection = TableProps<any>['rowSelection'];

export type ProSchemaValueEnumType = {
  /**
   * @name 演示的文案
   */
  text: ReactNode;

  /**
   * @name 预定的颜色
   */
  status: string;
  /**
   * @name 自定义的颜色
   */
  color?: string;
  /**
   * @name 是否禁用
   */
  disabled?: boolean;
};

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | ReactNode>;

/**
 * @name ValueEnum 的类型
 * @description 支持 Map 和 Object
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type ProColumnType<T = any> = ColumnType<T> & {
  /**
   * 是否缩略
   */
  ellipsis?: boolean;
  /**
   * 是否拷贝
   */
  copyable?: boolean;
  /**
   * 选择如何渲染相应的模式
   */
  valueType?: ((entity: T) => ProSchemaValueType) | ProSchemaValueType;
  /**
   * @name 映射值的类型
   */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
};

export type ProColumnGroupType<RecordType = any> = ProColumnType<RecordType> & {
  children: ProColumns<RecordType>;
};

export type ProColumns<RecordType = any> = (
  | ProColumnGroupType<RecordType>
  | ProColumnType<RecordType>
)[];

export type ProTableProps<RecordType> = TableProps<RecordType> & {
  /**
   * 是否允许伸缩列
   */
  resizeable?: boolean;
  columns: ProColumns<RecordType>;
  /**
   * @name 选择想配置
   */
  rowSelection?: TableProps<RecordType>['rowSelection'] | false;
  /**
   * @name 自定义 table 的 alert
   * @description 设置或者返回false 即可关闭
   */
  tableAlertRender?: AlertRenderType<RecordType>;
  /**
   * @name  自定义 table 的 alert 的操作
   * @description 设置或者返回false 即可关闭
   */
  tableAlertOptionRender?: AlertRenderType<RecordType>;
};

/**
 * 转化列的定义
 */
export type ColumnRenderInterface<T> = {
  columnProps: ProColumnType<T>;
  text: any;
  rowData: T;
  index: number;
};
