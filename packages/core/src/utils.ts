/* eslint-disable no-bitwise */
import { reduce } from 'lodash';
import { parse } from 'querystring';
import moment, { Moment } from 'moment';
import { IKeyValue } from './core';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/**
 * 将url拆分成列表
 * @param url 要转换的url
 * @returns 拆分后的数组
 * @example /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 */
export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter((i) => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * 判断对象是否是Promise类型
 * @param {any} obj 要判断的对象
 * @returns {boolean} 如果是 返回true，否则 false
 */
export function isPromise(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 判断给定的字符串是否是个url地址
 * @param path 地址
 * @returns {boolean} 如果是 返回 true，否则 false
 */
export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 将数组对象转换成object对象
 * @param items 要转换的数组
 * @param key 作为key的属性名 默认为 'label'
 * @param value  作为值的属性名 默认为'value'
 * @example  listToFlat([{label:'label1',value:'001'},{label:'label2',value:'002'}],'value','label')==>{'001':'label1','002':'label2'}])
 * @returns IKeyValue
 * @summary 建议配合memoize方法使用避免不必要的转换，提高性能
 */
export function listToFlat<T>(items: T[], key: string | number = 'value', text: string = 'label') {
  return reduce(
    items,
    (redu: IKeyValue<keyof T>, item) => {
      const reduKey = item[key];
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      redu[reduKey] = item[text];
      return redu;
    },
    {},
  );
}

/**
 * 判断是否是浏览器环境
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * 获取查询对象
 */
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 *
 * @param {object}
 * @param {Moment} param.date
 * @param {string} param.format 格式 默认为年月日
 */
export function getDateString({
  date,
  format = 'Y-MM-DD',
}: {
  date: string | Moment;
  format?: string;
}): string {
  if (!date) {
    return '';
  }
  let tempDate: Moment;
  if (typeof date === 'string') {
    tempDate = moment(date);
  } else {
    tempDate = date as Moment;
  }

  if (tempDate) {
    return tempDate.format(format);
  }
  return '';
}

/**
 * 补足两位数字(example:02)
 * @param val 值
 */
export function fixedZero(val: number): string {
  return val * 1 < 10 ? `0${val}` : `${val}`;
}

/**
 * 生成guid
 * @param withSplit [true|false] 是否带分隔符
 */
export function newGuid(withSplit?: boolean): string {
  const tmp = withSplit
    ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
  return tmp.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 打码显示，ex: 18585858585==> 185*****222
 * @param text 加密前的内容
 * @param type 类型 mobile:手机   phone:电话号码    fax:传真号码    mail:邮箱   card:银行卡   identity:身份证   name:姓名
 */
export function formatSecuredInfo(
  text: string,
  type: 'mobile' | 'phone' | 'fax' | 'mail' | 'card' | 'identity' | 'name',
  filterNA?: boolean,
) {
  if (!text) {
    return '';
  }
  if (text.toUpperCase() === 'NA' && filterNA) {
    return text;
  }
  let result = '';
  switch (type) {
    case 'mobile':
      result = text.replace(/(\d{1,3})(\d{5})(\d+)/g, '$1*****$3');
      break;
    case 'phone':
      result = text.replace(/(\d+)(\d{4})/g, '$1*****');
      break;
    case 'fax':
      result = text.replace(/(\d+)(\d{4})/g, '$1*****');
      break;
    case 'mail':
      if (text.indexOf('@') < 5) {
        result = text.substring(1, text.lastIndexOf('@') - 1);
      } else {
        result = text.substring(2, text.lastIndexOf('@') - 2);
      }
      result = text.replace(result, '***');
      break;
    case 'card':
      result = text.replace(/(.+)(.{4})$/gi, (_, m1, m2) => {
        return `${m1.replace(/./gi, '*')}${m2}`;
      });
      break;
    case 'identity':
      result = text.replace(/(\d{4}).*(\w{3})/gi, '$1***********$2');
      break;
    case 'name':
      result = text.replace(/./gi, (_, index, match) => {
        if (index === 0) {
          return '*';
        }
        return match;
      });
      result = text.replace(/./gi, '$1*****');
      break;
    default:
      break;
  }
  return result;
}

/**
 * 对数据源按key进行相邻行合并，返回生成的跨行对象,建议使用memoizeOne进行缓存调用
 * @param list 要进行合并的数据源列表
 * @param key key
 * @example mergeCells([{name:'xxg',title:'code'},{name:'刘德华',title:'code'},{name:'古天乐',title:'other'}],'title')==>{0:2,1:0,2:1}
 */
export function mergeCells<T>(list: T[], key: string | ((item: T) => string)): IKeyValue {
  const mergeObj = {};
  let startIndex = 0;

  list?.forEach((item, index, arr) => {
    let curValue;
    let preValue;
    if (typeof key === 'string') {
      curValue = item[key];
      preValue = arr[startIndex][key];
    } else {
      curValue = key(item);
      preValue = key(arr[startIndex]);
    }
    mergeObj[index] = 0;
    if (curValue === preValue) {
      mergeObj[startIndex] += 1;
    } else {
      mergeObj[index] = 1;
      startIndex = index;
    }
  });
  return mergeObj;
}
