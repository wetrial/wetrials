import * as React from 'react';
import classNames from 'classnames';
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from 'antd/es/radio';
import { ConfigContext } from 'antd/es/config-provider';
import SizeContext from 'antd/es/config-provider/SizeContext';
import { RadioGroupContextProvider } from 'antd/es/radio/context';
import Radio from './radio';
import { usePrevious } from './_utils'; // 需要替换为 'antd/es/_util/ref';

const RadioGroup = React.forwardRef<unknown, RadioGroupProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  let initValue;
  if (props.value !== undefined) {
    initValue = props.value;
  } else if (props.defaultValue !== undefined) {
    initValue = props.defaultValue;
  }
  const [value, setValue] = React.useState(initValue);
  const prevPropValue = usePrevious(props.value);

  React.useEffect(() => {
    if (props.value !== undefined || prevPropValue !== props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const { onChange } = props;
    // 如果是从有值到置空
    if (!ev) {
      const v: any = undefined;
      setValue(v);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(v);
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
      buttonStyle,
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
              ref={ref}
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
            ref={ref}
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

RadioGroup.defaultProps = {
  buttonStyle: 'outline' as RadioGroupButtonStyle,
};

export default React.memo(RadioGroup);
