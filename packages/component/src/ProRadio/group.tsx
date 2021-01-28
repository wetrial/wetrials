import * as React from 'react';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type {
  RadioGroupProps,
  RadioChangeEvent,
  RadioGroupButtonStyle,
} from 'antd/lib/radio/interface';
import { ConfigContext } from 'antd/lib/config-provider';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import { RadioGroupContextProvider } from 'antd/lib/radio/context';

import Radio from './radio';

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  let initValue;
  if (props.value !== undefined) {
    initValue = props.value;
  } else if (props.defaultValue !== undefined) {
    initValue = props.defaultValue;
  }
  const [value, setValue] = useMergedState(props.defaultValue, {
    value: initValue,
  });

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const { onChange } = props;
    // 如果是从有值到置空
    if (!ev) {
      const v: any = undefined;
      setValue(v);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(ev);
      return;
    }
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };

  const renderGroup = () => {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      options,
      optionType,
      buttonStyle = 'outline' as RadioGroupButtonStyle,
      disabled,
      children,
      size: customizeSize,
      style,
      id,
      onMouseEnter,
      onMouseLeave,
    } = props;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;
    let childrenToRender = children;
    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      const optionsPrefixCls = optionType === 'button' ? `${prefixCls}-button` : prefixCls;
      childrenToRender = options.map((option) => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              prefixCls={optionsPrefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
            >
              {option}
            </Radio>
          );
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={optionsPrefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        );
      });
    }

    const mergedSize = customizeSize || size;
    const classString = classNames(
      groupPrefixCls,
      `${groupPrefixCls}-${buttonStyle}`,
      {
        [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
        [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );
    return (
      <div
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
        ref={ref}
      >
        {childrenToRender}
      </div>
    );
  };

  return (
    <RadioGroupContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name,
      }}
    >
      {renderGroup()}
    </RadioGroupContextProvider>
  );
});

export default React.memo(RadioGroup);
