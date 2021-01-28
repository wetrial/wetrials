import React from 'react';
import { omit } from 'lodash';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

const getDataSource = (enums: any) => {
  if (enums !== undefined) {
    if (Array.isArray(enums)) {
      return enums.map((item) => {
        if (typeof item === 'object') {
          return item;
        }
        return {
          label: item,
          value: item,
        };
      });
    }
  }
  return null;
};

export interface IEnumSelectProps<T, VT = string> extends SelectProps<VT> {
  /**
   * 数据源列表
   */
  enums?: T[];
  /**
   * key&值对应的 属性名
   */
  keyProp?: keyof Record<string, T>; // string, // keyof T,
  /**
   * label对应的属性名
   */
  labelProp?: keyof Record<string, T>; // keyof T
}

// eslint-disable-next-line func-names
export default function <T>(props: IEnumSelectProps<T>) {
  const { enums, keyProp = 'value', labelProp = 'label' } = props;

  const selectProps = React.useMemo(() => omit(props, 'keyProp', 'labelProp', 'enums'), [props]);

  const dataSource = React.useMemo(() => getDataSource(enums), [props.enums]);

  return (
    <Select optionFilterProp="children" placeholder="-- 请选择 --" {...selectProps}>
      {dataSource &&
        dataSource.map((item) => (
          <Select.Option key={`${item[keyProp]}`} value={item[keyProp]}>
            {item[labelProp]}
          </Select.Option>
        ))}
    </Select>
  );
}
