import React from 'react';
import { noteOnce } from 'rc-util/lib/warning';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/es/components/Icon';

interface IconFontProps extends IconBaseProps {
  type: string;
}

let IconFont: React.SFC<IconFontProps> = () => null;

export function configIconUrl(scriptUrl: string | string[]) {
  IconFont = createFromIconfontCN({
    scriptUrl,
  });
}

export default (props: IconFontProps) => {
  noteOnce(!!IconFont, 'IconFont is not init');
  return IconFont ? <IconFont {...props} /> : null;
};
