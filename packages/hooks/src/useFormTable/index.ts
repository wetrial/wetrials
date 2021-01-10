/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
import useRequest from '@ahooksjs/use-request';
import { useState, useContext, useCallback, useEffect, useRef } from 'react';
import type {
  Service,
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { useUpdateEffect, usePersistFn } from 'ahooks';
import WetrialConfigContext from '@wetrial/provider';
import useSessionStorageDestroyState from './extensions';

// 缓存前缀
const TABLECACHEPREFIX = '__WETRIAL_USEFORMTABLE__';

export type {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
};

export type Store = Record<string, any>;

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  [key: string]: any;
}

export interface Result<Item> extends PaginatedResult<Item> {
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U> extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

function useFormTable<R = any, Item = any, U extends Item = any>(
  service: Service<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useFormTable<R = any, Item = any, U extends Item = any>(
  service: Service<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;
function useFormTable<R = any, Item = any, U extends Item = any>(
  service: Service<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
): any {
  const { formatFormTableRequest, formatFormTableResult } = useContext(WetrialConfigContext);

  const [recordCache] = useSessionStorageDestroyState(
    `${TABLECACHEPREFIX}${options.cacheKey}`,
    (): any => {
      return getSearchQuery();
    },
  );

  const {
    active,
    defaultType: recordDefaultType = 'simple',
    defaultParams: recordDefaultParams,
  } = (recordCache || {}) as any;

  const {
    form,
    refreshDeps = [],
    manual,
    defaultType = options.cacheKey && active ? recordDefaultType : 'simple',
    defaultParams = options.cacheKey && active ? recordDefaultParams : undefined,
    cacheKey,
    ...restOptions
  } = options;

  const result = useRequest(
    (paginatedParams, formData, filters) =>
      formatFormTableRequest
        ? service(formatFormTableRequest(paginatedParams, formData, filters))
        : service,
    {
      formatResult: (formatFormTableResult as any) || undefined,
      ...restOptions,
      paginated: true as true,
      manual: true,
    },
  );

  const { params, run } = result;

  const cacheFormTableData = params[2] || ({} as any);

  // 优先从缓存中读
  const [type, setType] = useState(cacheFormTableData.type || defaultType);

  // 全量 form 数据，包括 simple 和 advance
  const [allFormData, setAllFormData] = useState<Store>(
    cacheFormTableData.allFormData || (defaultParams && defaultParams[1]) || {},
  );

  // 获取当前展示的 form 字段值
  const getActivetFieldValues = useCallback((): Store => {
    if (!form) {
      return {};
    }
    return form.getFieldsValue(null, () => true);
  }, [form]);

  const formRef = useRef(form);
  formRef.current = form;
  /* 初始化，或改变了 searchType, 恢复表单数据 */
  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    formRef.current.setFieldsValue(allFormData);
  }, [type]);

  // 首次加载，手动提交。为了拿到 form 的 initial values
  useEffect(() => {
    // 如果有缓存，则使用缓存，重新请求
    if (params.length > 0) {
      run(...params);
      return;
    }

    // 如果没有缓存，触发 submit
    if (!manual) {
      _submit(defaultParams);
    }
  }, []);

  const changeType = useCallback(() => {
    const currentFormData = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...currentFormData });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  }, [type, allFormData, getActivetFieldValues]);

  const validateFields: () => Promise<any> = useCallback(() => {
    const fieldValues = getActivetFieldValues();
    if (!form) {
      return Promise.resolve();
    }

    const fields = Object.keys(fieldValues);
    if (!form.getInternalHooks) {
      return new Promise((resolve, reject) => {
        form.validateFields(fields, (errors, values) => {
          if (errors) {
            reject(errors);
          } else {
            resolve(values);
          }
        });
      });
    }

    return form.validateFields(fields);
  }, [form]);

  const _submit = useCallback(
    (initParams?: any) => {
      setTimeout(() => {
        validateFields()
          .then(() => {
            const activeFormData = getActivetFieldValues();
            // 记录全量数据
            const _allFormData = { ...allFormData, ...activeFormData };
            setAllFormData(_allFormData);

            // has defaultParams
            if (initParams) {
              run(initParams[0], activeFormData, {
                allFormData: _allFormData,
                type,
              });
              return;
            }

            run(
              {
                pageSize: options.defaultPageSize || 10,
                ...((params[0] as PaginatedParams[0] | undefined) || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
                current: 1,
              },
              activeFormData,
              {
                allFormData: _allFormData,
                type,
              },
            );
          })
          .catch((err) => err);
      });
    },
    [getActivetFieldValues, run, params, allFormData, type],
  );

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    _submit();
  }, [form, _submit]);

  const resetPersistFn = usePersistFn(reset);

  const getSearchQuery = () => {
    const {
      tableProps: { pagination },
    } = result;
    const { sorter } = params[0] || ({} as any);
    return {
      active: false,
      defaultType: type,
      defaultParams: [
        {
          current: pagination.current,
          pageSize: pagination.pageSize,
          sorter: sorter
            ? {
                order: sorter.order,
                field: sorter.field,
              }
            : undefined,
          // filters,
        },
        allFormData,
      ],
    };
  };

  // refreshDeps 变化，reset。
  useUpdateEffect(() => {
    if (!manual) {
      resetPersistFn();
    }
  }, [...refreshDeps]);

  const submit = usePersistFn((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    _submit();
  });

  return {
    ...result,
    search: {
      submit,
      type,
      changeType,
      reset,
    },
  };
}

export default useFormTable;

export const activeCache = (key: string) => {
  if (sessionStorage) {
    const cacheKey = `${TABLECACHEPREFIX}${key}`;
    const cache = sessionStorage.getItem(cacheKey);
    if (cache !== null) {
      const cacheData = JSON.parse(cache);
      // if (reset) {
      //   if (typeof reset === 'boolean') {
      //     delete cacheData.pageSize;
      //     cacheData = {
      //       ...cacheData,
      //       current: 1,
      //       sorter: {},
      //       // _count: 1,
      //     };
      //   } else {
      //     cacheData = { ...cacheData, ...reset };
      //   }
      // }
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          ...cacheData,
          active: true,
        }),
      );
    }
  }
};

// export const configUseFormTableFormatResult = (formatResult: (data: any) => any) => {
//   _formatResult = formatResult;
// };

// // eslint-disable-next-line @typescript-eslint/naming-convention
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

// /**
//  * 格式化请求参数 来符合abp后端
//  * @param param0 分页页码信息
//  * @param formData 搜索表单信息
//  */
// export const formatFormTableParams = _defaultFormatFormTablePrams;

// /**
//  * 格式化请求参数
//  * @param formatParams 默认格式化参数的方法
//  */
// export const configFormTableParamsFormat = (
//   formatParams: ({ current, pageSize, sorter }: PaginatedParams[0], formData: any) => any,
// ) => {
//   _defaultFormatFormTablePrams = formatParams;
// };
