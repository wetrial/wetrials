import React, { useContext } from 'react';
import WetrialConfigContext from '@wetrial/provider';
import { noteOnce } from 'rc-util/lib/warning';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconBaseProps } from '@ant-design/icons/es/components/Icon';

interface IconFontProps extends IconBaseProps {
  type: string;
}

let IconFont: React.FunctionComponent<IconFontProps>;

export default (props: IconFontProps) => {
  const { iconFontUrl } = useContext(WetrialConfigContext);
  noteOnce(!!iconFontUrl, 'iconFontUrl is not config');
  if (!IconFont) {
    IconFont = createFromIconfontCN({
      scriptUrl: iconFontUrl,
    });
  }
  noteOnce(!!IconFont, 'IconFont is not init');
  return IconFont ? <IconFont {...props} /> : null;
};
