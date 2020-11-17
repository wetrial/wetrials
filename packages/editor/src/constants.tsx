import React from 'react';
import { Button } from 'antd';
import { Sources } from 'quill';

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
const DEFAULT_COLORS: React.ReactElement[] = [];

// 存储默认背景颜色
const DEFAULT_BACKGROUNDS: React.ReactElement[] = [];

COLORS.forEach((color, index) => {
  DEFAULT_BACKGROUNDS.push(
    <Button
      size="small"
      className="background-item"
      // eslint-disable-next-line react/no-array-index-key
      key={`bg_color_${index}`}
      value={color}
      style={{ backgroundColor: color }}
    />,
  );

  DEFAULT_COLORS.push(
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

/**
 * 默认文字尺寸
 */
const DEFAULT_SIZE = ['32px', '24px', '20px', '18px', '16px', '14px', '13px', '12px'];

/**
 * 默认Header定义
 */
const DEFAULT_HEADER = ['1', '2', '3', '4', '5', '6', false];

/**
 * Quill api常量
 */
const QUILL_SOURCES: {
  API: Sources;
  USER: Sources;
  SILENT: Sources;
} = {
  API: 'api',
  USER: 'user',
  SILENT: 'silent',
};

export { DEFAULT_SIZE, DEFAULT_COLORS, DEFAULT_BACKGROUNDS, DEFAULT_HEADER, QUILL_SOURCES };
