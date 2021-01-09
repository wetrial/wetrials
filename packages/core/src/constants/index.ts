import type { TablePaginationConfig } from 'antd/lib/table';

/**
 * 通用布局，固定label宽度为98px，其他自适应
 */
export const LAYOUT_FIXED_LABEL = {
  labelCol: {
    flex: '98px',
  },
  // wrapperCol: {
  //   flex: 'auto',
  // },
};

/**
 * 表单项单列布局 响应式配置(建议赋到Form上)
 */
export const LAYOUT_FORM_SINGLE = {
  labelCol: { flex: '98px' },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 20 },
    xl: { span: 20 },
    xxl: { span: 22 },
  },
};

/**
 * 表单两列布局 响应式配置(建议赋到Form上)
 */
export const LAYOUT_FORM_TWO = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
    md: { span: 19 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 20 },
  },
};

/**
 * Col两列布局 响应式(在From里面使用)
 */
export const LAYOUT_COL_TWO = {
  xs: 24, // <576px
  sm: 24, // ≥576px
  md: 24, // ≥768px
  lg: 12, // ≥992px
  xl: 12, // ≥1200px
  xxl: 12, // ≥1600px
};

/**
 * 搜索表单Col两列 响应式配置
 */
export const LAYOUT_COL_SEARCH_TWO = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

/**
 * 搜索表单Col三列 响应式配置
 */
export const LAYOUT_COL_SEARCH_THREE = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 8,
};

/**
 * 搜索表单Col四列 响应式配置
 */
export const LAYOUT_COL_SEARCH_FOUR = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

/**
 * 搜索表单Col六列 响应式配置
 */
export const LAYOUT_COL_SEARCH_SIX = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 4,
};

/**
 * 单选、复选 六列 响应式配置
 */
export const LAYOUT_CHECK_SIX = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 4,
  xl: 6,
  xxl: 6,
};

/**
 * 单选、复选 八列 响应式配置
 */
export const LAYOUT_CHECK_EIGHT = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
  xxl: 3,
};

/**
 * 显示滚动条的宽度界限
 */
export const TABLE_SCROLL_WIDTH = 'max-content';

/**
 * 预定义日期时间格式
 */
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 预定义日期格式
 */
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 预定义页码
 */
export const PAGE_SIZE = 10;

/**
 * 预定义分页属性配置
 */
export const PAGE_PROPS: TablePaginationConfig = {
  defaultCurrent: 1,
  total: 1,
  pageSize: PAGE_SIZE,
  defaultPageSize: PAGE_SIZE,
  // showSizeChanger: true,
  hideOnSinglePage: true,
  // showQuickJumper:true,
  // pageSizeOptions:["10","15","20","25","30","50","100"],
  showTotal: (total, [start, end]) => `第${start}-${end}条，共${total}条`,
};

/**
 * 预定义表单验证消息
 */
export const VALIDATE_MESSAGES = {
  default: '验证失败',
  required: '不能为空',
  enum: '必须是 [${enum}]中的一项',
  whitespace: '不能为空',
  date: {
    format: '不是有效的日期格式',
    parse: '不能转换成日期格式',
    invalid: '无效的日期格式',
  },
  types: {
    string: '只能输入字符串类型',
    method: '只能输入"${type}"类型',
    array: '只能输入"${type}"类型',
    object: '只能输入"${type}"类型',
    number: '只能输入数字',
    date: '只能输入日期',
    boolean: '只能输入"${type}"类型',
    integer: '只能输入整数',
    float: '只能输入数值',
    regexp: '输入不符合要去',
    email: 'email格式不正确',
    url: 'url格式不正确',
    hex: '只能输入"${type}"类型',
  },
  string: {
    len: '必须为 ${len} 个字符',
    min: '不能少于 ${min} 个字符',
    max: '不能多于 ${max} 个字符',
    range: '字符个数在 ${min} - ${max} 之间',
  },
  number: {
    len: '值只能为 ${len}',
    min: '不能小于 ${min}',
    max: '不能大于 ${max}',
    range: '只能在 ${min} - ${max}之间',
  },
  array: {
    len: '必须选择 ${len} 项',
    min: '不能少于 ${min} 项',
    max: '不能多于 ${max} 项',
    range: '必须选择在 ${min} - ${max} 项之间',
  },
  pattern: {
    mismatch: '输入的内容不符合要求',
  },
};
