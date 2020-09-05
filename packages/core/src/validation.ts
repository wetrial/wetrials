// eslint-disable-next-line import/no-mutable-exports
let validateMessages = {
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
    method: "只能输入'${type}'类型",
    array: "只能输入'${type}'类型",
    object: "只能输入'${type}'类型",
    number: '只能输入数字',
    date: '只能输入日期',
    boolean: "只能输入'${type}'类型",
    integer: '只能输入整数',
    float: '只能输入数值',
    regexp: '输入不符合要去',
    email: 'email格式不正确',
    url: 'url格式不正确',
    hex: "只能输入'${type}'类型",
  },
  string: {
    len: '必须为 ${len} 个字符',
    min: '不能少于 ${min} 个字符',
    max: '不能多于 ${max} 个字符',
    range: "'字符个数在 ${min} - ${max} 之间",
  },
  number: {
    len: '值只能为 ${len}',
    min: '不能小于 ${min}',
    max: "'不能大于 ${max}",
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

export default validateMessages;

/**
 * 配置默认提示消息
 * @param messages 消息模板
 */
export const configValidateMessage = (messages: Partial<typeof validateMessages>) => {
  validateMessages = {
    ...validateMessages,
    ...messages,
  };
};
