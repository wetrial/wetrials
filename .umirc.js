import { readdirSync } from 'fs';
import chalk from 'chalk';
import { join } from 'path';
const { REACT_APP_ENV } = process.env;

const isSite = REACT_APP_ENV !== 'dev';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@wetrial/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
  // .map((path) => [join('packages', path, 'src'), join('packages', path, 'docs')])
  .map((path) => [join('packages', path, 'src')])
  .reduce((acc, val) => acc.concat(val), []);

// const isProduction = process.env.NODE_ENV === 'production';

export default {
  title: 'Wetrial',
  mode: 'site',
  hash: true,
  // history: 'hash',
  base: '/wetrials',
  publicPath: '/wetrials/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  // ssr: {},
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  alias: {
    // 增加其他不是index导出的模块alias
    '@wetrial/component/es': join(__dirname, 'packages', 'component/src'),
    ...alias,
  },
  resolve: { includes: [...tailPkgList, 'docs'] },
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/wetrial/wetrials',
    },
  ],
  // analytics: isProduction
  //   ? {
  //       ga: 'UA-173569162-1',
  //     }
  //   : false,
  hash: true,
  dynamicImport: {},
  metas: [
    {
      name: 'keywords',
      content: 'wetrial,components',
    },
    {
      name: 'description',
      content: '🍙 这里放置了 Wetrials 系列组件',
    },
  ],
  styles: [
    `${isSite ? 'https://wetrial.github.io' : 'http://localhost:10000'}/wetrials/global.css`,
  ],
};
