import React, { useMemo } from 'react';

/**
 * 自定义插入项定义
 */
interface ICustomInsertOptionItem {
  /**
   * 插入项的值
   */
  value: string;
  /**
   * 插入项标题
   */
  title: string;
  /**
   * 插入项是否可以编辑(默认值 父级editable)
   */
  editable?: boolean;
}

interface ICustomInsert {
  [key: string]: {
    className?: string;
    /**
     * 在工具栏中显示的标题
     */
    title: string;
    /**
     * 在工具栏中显示的图标
     */
    icon: React.ReactElement;
    /**
     * 插入项在编辑器里面是否可以再编辑(默认为 false)
     */
    editable?: boolean;
    /**
     * 该项关联的配置项值列表
     */
    options: ICustomInsertOptionItem[];
    /**
     * 值列表容器的style
     */
    gridStyle?: React.CSSProperties;
    /**
     * 值列表的style，使用Card.Grid 默认:{width:'25%',textAlign:'center'}
     */
    gridItemStyle?: React.CSSProperties;
  };
}

export interface IToolbar {
  className?: string;
  style: React.CSSProperties;
  toolbar?: any[];
  formatPainterActive?: boolean;
  /**
   * 自定义工具栏菜单栏配置
   */
  customInserts?: ICustomInsert[];
  /**
   * 容器，默认 document.body
   */
  getPopupContainer: (...args: any[]) => any;
  /**
   * 背景颜色格式化
   */
  handleFormatBackground: (...args: any[]) => any;
  /**
   * 前景颜色格式化
   */
  handleFormatColor: (...args: any[]) => any;
  /**
   * 文字大小
   */
  handleFormatSize: (...args: any[]) => any;
  /**
   * 处理插入值
   */
  handleInsertValue: (...args: any[]) => any;
  /**
   * 获取当前大小
   */
  getCurrentSize: (...args: any[]) => any;
  /**
   * 保存选择的格式
   */
  saveSelectionFormat: (...args: any[]) => any;
  /**
   * 取消选择的格式化
   */
  unsaveSelectionFormat: (...args: any[]) => any;
}

/**
 * 根据配置项生成分组的工具栏
 * @param param0
 */
const getGroupToolbars = ({ toolbar }: { toolbar: undefined | any[] }) => {
  return <div>{JSON.stringify(toolbar)}</div>;
};

const Toolbar: React.SFC<IToolbar> = (props) => {
  const { toolbar, ...restProps } = props;

  const groupToolbar = useMemo(
    () =>
      getGroupToolbars({
        toolbar,
      }),
    toolbar,
  );

  return <div {...restProps}>{groupToolbar}</div>;
};

Toolbar.displayName = 'Toolbar';

Toolbar.defaultProps = {
  formatPainterActive: false,
  toolbar: [],
  getPopupContainer: () => document.body,
};

export default Toolbar;
