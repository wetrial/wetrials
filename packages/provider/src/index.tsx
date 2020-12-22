import React, { useContext } from 'react';
import { ConfigContext as AntdConfigContext } from 'antd/lib/config-provider';
// import { noteOnce } from 'rc-util/lib/warning';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import viVN from './locale/vi_VN';
import itIT from './locale/it_IT';
import esES from './locale/es_ES';
import jaJP from './locale/ja_JP';
import ruRU from './locale/ru_RU';
import msMY from './locale/ms_MY';
import zhTW from './locale/zh_TW';
import frFR from './locale/fr_FR';
import ptBR from './locale/pt_BR';

export interface IntlType {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
}

function get(source: object, path: string, defaultValue?: string): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}

/**
 * 创建一个操作函数
 * @param locale
 * @param localeMap
 */
const createIntl = (locale: string, localeMap: { [key: string]: any }): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
});

const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);
const viVNIntl = createIntl('vi_VN', viVN);
const itITIntl = createIntl('it_IT', itIT);
const jaJPIntl = createIntl('ja_JP', jaJP);
const esESIntl = createIntl('es_ES', esES);
const ruRUIntl = createIntl('ru_RU', ruRU);
const msMYIntl = createIntl('ms_MY', msMY);
const zhTWIntl = createIntl('zh_TW', zhTW);
const frFRIntl = createIntl('fr_FR', frFR);
const ptBRIntl = createIntl('pt_BR', ptBR);

const intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'js-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ru-RU': ruRUIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
};

const intlMapKeys = Object.keys(intlMap);

export type ParamsType = {
  [key: string]: React.ReactText | React.ReactText[];
};

export {
  enUSIntl,
  zhCNIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  intlMap,
  intlMapKeys,
};

const ConfigContext = React.createContext<{
  intl?: IntlType;
  /**
   * 配置wetrial component中的iconFontUrl
   */
  iconFontUrl?: string | string[];
  /**
   * 全局修改wetrial hooks中useFormTable响应数据结构以符合前端特定要求
   */
  formatResultData?: (res: any) => any;
  /**
   * 全局修改wetrial hooks中useFormTable请求参数以符合后端定制结构
   */
  formatRequestParams?: (...data) => any;
}>({
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
  formatRequestParams: ({ current, pageSize, sorter }, formData: any): any => {
    let sortParam: any = {};
    if (sorter && sorter.order) {
      let sortName: string;
      // 对象的情况下 列为数组
      if (Array.isArray(sorter.field)) {
        sortName = sorter.field[sorter.field.length - 1];
      } else {
        sortName = sorter.field;
      }
      sortParam = {
        sorting: `${sortName} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
      };
    }

    return {
      ...sortParam,
      skipCount: (current - 1) * pageSize,
      maxResultCount: pageSize,
      ...formData,
    };
  },
});

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 * @param localeKey
 */
const findIntlKeyByAntdLocaleKey = (localeKey: string | undefined) => {
  if (!localeKey) {
    return 'zh-CN';
  }
  const localeName = localeKey.toLocaleLowerCase();
  return (
    intlMapKeys.find((intlKey) => {
      const LowerCaseKey = intlKey.toLocaleLowerCase();
      return LowerCaseKey.includes(localeName);
    }) || 'zh-CN'
  );
};

/**
 *  如果没有配置 locale，这里组件会根据 antd 的 key 来自动选择
 * @param param0
 */
const ConfigProviderWarp: React.FC<{}> = ({ children }) => {
  const { locale } = useContext(AntdConfigContext);
  return (
    <ConfigConsumer>
      {(value) => {
        const localeName = locale?.locale;
        const key = findIntlKeyByAntdLocaleKey(localeName);
        // antd 的 key 存在的时候以 antd 的为主
        const intl =
          localeName && value.intl?.locale === 'default' ? intlMap[key] : value || intlMap[key];
        return <ConfigProvider value={intl || zhCNIntl}>{children}</ConfigProvider>;
      }}
    </ConfigConsumer>
  );
};

export { ConfigConsumer, ConfigProvider, ConfigProviderWarp, createIntl };

export function useIntl(): IntlType {
  const context = useContext(ConfigContext);

  if (!context.intl) {
    return ((context as unknown) as IntlType) || zhCNIntl;
  }
  return context.intl || zhCNIntl;
}

export default ConfigContext;
