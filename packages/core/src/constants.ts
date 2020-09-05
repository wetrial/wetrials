import { TablePaginationConfig } from 'antd/lib/table';

/**
 * 表单项单列布局 响应式配置(建议赋到Form上)
 */
export const LAYOUT_FORM_SINGLE = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
    md: { span: 5 },
    lg: { span: 4 },
    xl: { span: 4 },
    xxl: { span: 2 },
  },
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
 * 默认日期时间格式
 */
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 默认日期时间
 */
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 默认页码
 */
export const PAGE_SIZE = 10;

/**
 * 通用分页属性配置
 */
export const PAGE_PROPS: TablePaginationConfig = {
  defaultCurrent: 1,
  total: 1,
  pageSize: PAGE_SIZE,
  defaultPageSize: PAGE_SIZE,
  // showSizeChanger: true,
  hideOnSinglePage: true,
  // showQuickJumper:true,
  showTotal: (total, [start, end]) => `第${start}-${end}条，共${total}条`,
};
