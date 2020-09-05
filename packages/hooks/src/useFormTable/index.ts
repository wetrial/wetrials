/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-underscore-dangle */
import useRequest from '@ahooksjs/use-request';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { useUpdateEffect, usePersistFn } from 'ahooks';
import useSessionStorageDestroyState from './extensions';

type TFormatResult = (response: any) => any | undefined;
// eslint-disable-next-line @typescript-eslint/naming-convention
let _formatResult: TFormatResult;
// 缓存前缀
const TABLECACHEPREFIX = '__WETRIAL_USEFORMTABLE__';

export {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
};

export interface Store {
  [name: string]: any;
}

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

  const result = useRequest(service, {
    formatResult: _formatResult,
    ...restOptions,
    paginated: true as true,
    manual: true,
  });

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
    // antd 4
    return form.getFieldsValue(null, () => true);
  }, [form]);

  const formRef = useRef(form);
  formRef.current = form;
  /* 初始化，或改变了 searchType, 恢复表单数据 */
  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    // antd 3
    if (formRef.current.getFieldInstance) {
      // antd 3 需要判断字段是否存在，否则会抛警告
      const filterFiledsValue: Store = {};
      Object.keys(allFormData).forEach((key: string) => {
        if (formRef.current!.getFieldInstance ? formRef.current!.getFieldInstance(key) : true) {
          filterFiledsValue[key] = allFormData[key];
        }
      });
      formRef.current.setFieldsValue(filterFiledsValue);
    } else {
      // antd 4
      formRef.current.setFieldsValue(allFormData);
    }
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
      submit(defaultParams);
    }
  }, []);

  const changeType = useCallback(() => {
    const currentFormData = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...currentFormData });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  }, [type, allFormData, getActivetFieldValues]);

  const submit = useCallback(
    (initParams?: any) => {
      setTimeout(() => {
        const activeFormData = getActivetFieldValues();
        // 记录全量数据
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
            // @ts-ignore
            pageSize: options.defaultPageSize || 10,
            ...(params[0] || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
            current: 1,
          },
          activeFormData,
          {
            allFormData: _allFormData,
            type,
          },
        );
      });
    },
    [getActivetFieldValues, run, params, allFormData, type],
  );

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    submit();
  }, [form, submit]);

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

  return {
    ...result,
    search: {
      submit: () => {
        submit();
      },
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

export const configUseFormTableFormatResult = (formatResult: (data: any) => any) => {
  _formatResult = formatResult;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
let _defaultFormatFormTablePrams = (
  { current, pageSize, sorter }: PaginatedParams[0],
  formData: any,
): any => {
  let sortParam: any = {};
  if (sorter && sorter.order) {
    let sortName: string;
    // 对象的情况下 列为数组
    if (Array.isArray(sorter.field)) {
      sortName = sorter.field[sorter.field.length - 1];
    } else {
      sortName = sorter.field;
    }
    sortParam = {
      sorting: `${sortName} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
    };
  }

  return {
    ...sortParam,
    skipCount: (current - 1) * pageSize,
    maxResultCount: pageSize,
    ...formData,
  };
};

/**
 * 格式化请求参数 来符合abp后端
 * @param param0 分页页码信息
 * @param formData 搜索表单信息
 */
export const formatFormTableParams = _defaultFormatFormTablePrams;

/**
 * 格式化请求参数
 * @param formatParams 默认格式化参数的方法
 */
export const configFormTableParamsFormat = (
  formatParams: ({ current, pageSize, sorter }: PaginatedParams[0], formData: any) => any,
) => {
  _defaultFormatFormTablePrams = formatParams;
};
