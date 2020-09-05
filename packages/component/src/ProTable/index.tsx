import ProTable, { ProColumns, ProTableProps, ColumnsState } from './Table';
import IndexColumn from './component/indexColumn';
import TableDropdown from './component/dropdown';
import TableStatus from './component/status';
import {
  IntlProvider,
  IntlConsumer,
  createIntl,
  IntlType,
  zhCNIntl,
  enUSIntl,
  zhTWIntl,
} from './component/intlContext';
import defaultRenderText, { ProColumnsValueType } from './defaultRender';

export type { ProTableProps, IntlType, ColumnsState, ProColumnsValueType, ProColumns };

export {
  IndexColumn,
  TableDropdown,
  TableStatus,
  IntlProvider,
  IntlConsumer,
  zhCNIntl,
  defaultRenderText,
  createIntl,
  enUSIntl,
  zhTWIntl,
};

export default ProTable;
