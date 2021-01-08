import React from 'react';
import type { ProFieldEmptyText, ProFieldPropsType } from '@ant-design/pro-field';
import ProField from '@ant-design/pro-field';
import type { ProFieldValueType, ProSchemaComponentTypes } from '@ant-design/pro-utils';

import type { ProColumnType } from './interface';

const SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

/**
 * 如果是个方法执行一下它
 */
export function runFunction<T extends any[]>(valueEnum: any, ...rest: T) {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
}

/**
 * 拼接用于编辑的 key
 * @param base 基本的 key
 * @param dataIndex 需要拼接的key
 */
export const spellNamePath = (
  base: React.Key,
  dataIndex: React.Key | React.Key[],
): React.Key[] | React.Key | undefined => {
  if (Array.isArray(dataIndex)) {
    return [base, ...dataIndex];
  }
  return [base, dataIndex];
};

/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */
function defaultRenderText<T>(config: {
  text: string | number | React.ReactText[];
  valueType: ProColumnType['valueType'];
  index: number;
  rowData?: T;
  columnEmptyText?: ProFieldEmptyText;
  columnProps?: ProColumnType<T>;
  type?: ProSchemaComponentTypes;
  // 行的唯一 key
  recordKey?: React.Key;
}): React.ReactNode {
  const { text, valueType, rowData, columnProps } = config;
  // 如果 valueType === text ，没必要多走一次 render
  if (
    (!valueType || valueType === 'text') &&
    // valueEnum 存在说明是个select
    !columnProps?.valueEnum
  ) {
    // 如果是''、null、undefined 显示columnEmptyText
    return SHOW_EMPTY_TEXT_LIST.includes(text as any) ? config.columnEmptyText : text;
  }

  if (typeof valueType === 'function' && rowData) {
    // 防止valueType是函数,并且text是''、null、undefined跳过显式设置的columnEmptyText
    return defaultRenderText({
      ...config,
      valueType: valueType(rowData) || 'text',
    });
  }

  /**
   * 生成公用的  proField dom 配置
   */
  const proFieldProps: ProFieldPropsType = {
    valueEnum: runFunction<[T | undefined]>(columnProps?.valueEnum, rowData),
    proFieldKey: columnProps?.dataIndex?.toString() || columnProps?.key,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
    emptyText: config.columnEmptyText,
    renderFormItem: undefined,
    valueType: valueType as ProFieldValueType,
    mode: 'read',
  };

  return <ProField {...proFieldProps} />;
}

export default defaultRenderText;
