import { TableProps, ColumnsType } from 'antd/lib/table';

export declare interface IProTableColumnsType extends ColumnsType<any> {}

export declare interface IProTableProps<T> extends TableProps<T> {
  /**
   * 是否允许伸缩列
   */
  resizeable?: boolean;
  columns: IProTableColumnsType;
}
