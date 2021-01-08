import * as React from 'react';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import { RadioProps, RadioChangeEvent } from 'antd/lib/radio/interface';
import { ConfigContext } from 'antd/lib/config-provider';
import RadioGroupContext from 'antd/lib/radio/context';
import devWarning from 'antd/lib/_util/devWarning';

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
  const context = React.useContext(RadioGroupContext);
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const innerRef = React.useRef<HTMLElement>();
  const mergedRef = composeRef(ref, innerRef);

  React.useEffect(() => {
    devWarning(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.');
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    if (props.onChange) {
      props.onChange(e);
    }

    if (context?.onChange) {
      context.onChange(e);
    }
  };

  const { prefixCls: customizePrefixCls, className, children, style, ...restProps } = props;
  const prefixCls = getPrefixCls('radio', customizePrefixCls);
  const radioProps: RadioProps = { ...restProps };
  if (context) {
    radioProps.name = context.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }
  const wrapperClassString = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    },
    className,
  );

  const toggleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const oldValue = context?.value;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (`${e.target['value']}` === `${oldValue}`) {
      const v: any = undefined;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      context && context.onChange && context.onChange(v);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    radioProps.onClick && radioProps.onClick(e);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={wrapperClassString}
      style={style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <RcCheckbox
        {...radioProps}
        onChange={(e: any) => radioProps.onChange && radioProps.onChange(e)}
        onClick={toggleClick}
        prefixCls={prefixCls}
        ref={mergedRef as any}
      />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio as any);

Radio.displayName = 'Radio';

Radio.defaultProps = {
  type: 'radio',
};

export default Radio;
