import { configIconUrl } from './IconFont';

export { default as UserSelect } from './UserSelect';

export { default as ProDatePicker } from './ProDatePicker';

export { default as Ellipsis } from './Ellipsis';

export { default as Exception } from './Exception';

export { default as IconFont } from './IconFont';

export { default as ProList } from './ProList';

export { default as ProRadio } from './ProRadio';

export { default as ProSelect } from './ProSelect';

export { default as ProTable } from './ProTable';

export { default as ScrollBar } from './ScrollBar';

export { default as Table } from './Table';

interface IWetrialComponentProps {
  /**
   * 字体图标文件地址
   */
  iconFontUrl: string | string[];
}

export const initComponent = (props: IWetrialComponentProps) => {
  configIconUrl(props.iconFontUrl);
};
