import { PaginatedParams } from '@ahooksjs/use-request/lib/types';

import { configResponsive, useResponsive } from './useResponsive';
import useTableColumnStateMapStorage from './useTableColumnStateMapStorage';
import useFormTable, {
  activeCache,
  formatFormTableParams,
  configUseFormTableFormatResult,
  configFormTableParamsFormat,
} from './useFormTable';
import { useSubscribe, PubSub } from './usePubSub';

export {
  useResponsive,
  configResponsive,
  useTableColumnStateMapStorage,
  useFormTable,
  useSubscribe,
  PubSub,
  activeCache,
  formatFormTableParams,
};

interface WetrialHooksProps {
  /**
   * 格式化后端返回的数据
   */
  formTableResultFormat?: (data: any) => { total: number; list: any[] };
  formTableParamsFormat?: ({ current, pageSize, sorter }: PaginatedParams[0], formData: any) => any;
}

export const initHooks = (props: WetrialHooksProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  props.formTableResultFormat && configUseFormTableFormatResult(props.formTableResultFormat);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  props.formTableParamsFormat && configFormTableParamsFormat(props.formTableParamsFormat);
};
