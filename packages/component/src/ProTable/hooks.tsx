/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
import useRequest from '@ahooksjs/use-request';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { SortOrder } from 'antd/lib/table/interface';

export interface Result<Item> extends PaginatedResult<Item> {
  args: {
    pageSize: number;
    current: number;
    [key: string]: any;
  };
  sort: { [key: string]: string };
  filter: { [key: string]: string };
}

function run<U>(
  params: U & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  sort: {
    [key: string]: SortOrder;
  },
  filter: {
    [key: string]: React.ReactText[];
  },
) {
  console.log(params, sort, filter);
}

export interface BaseOptions<U> extends Omit<BasePaginatedOptions<U>, 'paginated'> {}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {}

function useFormTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
function useFormTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;
function useFormTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
): any {
  const { pagination, tableProps, ...result } = useRequest(service, {
    paginated: true as true,
    manual: true,
    ...options,
  });

  return {
    pagination,
    tableProps,
    ...result,
  };
}

export default useFormTable;

// let _defaultFormatFormTablePrams = (
//   { current, pageSize, sorter }: PaginatedParams[0],
//   formData: any,
// ): any => {
//   let sortParam: any = {};
//   if (sorter && sorter.order) {
//     let sortName: string;
//     // 对象的情况下 列为数组
//     if (Array.isArray(sorter.field)) {
//       sortName = sorter.field[sorter.field.length - 1];
//     } else {
//       sortName = sorter.field;
//     }
//     sortParam = {
//       sorting: `${sortName} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
//     };
//   }

//   return {
//     ...sortParam,
//     skipCount: (current - 1) * pageSize,
//     maxResultCount: pageSize,
//     ...formData,
//   };
// };

// const { tableProps, search, sorter, refresh } = useFormTable(
//   (paginatedParams, formData) => getList(formatFormTableParams(paginatedParams, formData)),
//   {
//     form,
//     cacheKey: pathname,
//   },
// );
