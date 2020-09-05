import * as React from 'react';
import { RadioChangeEvent } from 'antd/es/radio';
import { AbstractCheckboxProps } from 'antd/es/checkbox/Checkbox';
import { ConfigContext } from 'antd/es/config-provider';
import RadioGroupContext from 'antd/es/radio/context';
import Radio from './radio';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;

const RadioButton = (props: RadioButtonProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, ...radioProps } = props;
  const prefixCls = getPrefixCls('radio-button', customizePrefixCls);
  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value;
    radioProps.disabled = props.disabled || radioGroupContext.disabled;
  }
  return <Radio prefixCls={prefixCls} {...radioProps} type="radio" ref={ref} />;
};

export default React.forwardRef(RadioButton);
