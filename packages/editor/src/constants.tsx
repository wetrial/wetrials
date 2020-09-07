import React from 'react';
import { Button } from 'antd';

/**
 * 定义默认前景色、背景色
 */
const COLORS = [
  '#E53333',
  '#E56600',
  '#FF9900',
  '#64451D',
  '#DFC5A4',
  '#FFE500',
  '#009900',
  '#006600',
  '#99BB00',
  '#B8D100',
  '#60D978',
  '#00D5FF',
  '#337FE5',
  '#003399',
  '#4C33E5',
  '#9933E5',
  '#CC33E5',
  '#EE33EE',
  '#ffffff',
  '#cccccc',
  '#999999',
  '#666666',
  '#333333',
  '#000000',
];
// 存储默认前景颜色
const defaultColors: React.ReactElement[] = [];

// 存储默认背景颜色
const defaultBackgrounds: React.ReactElement[] = [];

COLORS.forEach((color, index) => {
  defaultBackgrounds.push(
    <Button
      size="small"
      className="background-item"
      // eslint-disable-next-line react/no-array-index-key
      key={`bg_color_${index}`}
      value={color}
      style={{ backgroundColor: color }}
    />,
  );

  defaultColors.push(
    <Button
      size="small"
      className="background-item"
      // eslint-disable-next-line react/no-array-index-key
      key={`color_${index}`}
      value={color}
      style={{ backgroundColor: color }}
    />,
  );
});

export { defaultColors, defaultBackgrounds };
