import { isEqual } from 'lodash';
import { urlToList, isPromise, isUrl, isBrowser, listToFlat } from '../../packages/core/src/utils';

describe('util', () => {
  describe('urlToList', () => {
    it('empty', () => {
      expect(urlToList()).toEqual(['/']);
    });

    it('url', () => {
      expect(urlToList('/userinfo/211/id')).toEqual([
        '/userinfo',
        '/userinfo/211',
        '/userinfo/211/id',
      ]);
    });
  });

  describe('isPromise', () => {
    it('number is not promise', () => {
      expect(isPromise(1)).toBe(false);
    });

    it('string is not promise', () => {
      expect(isPromise('1')).toBe(false);
    });

    it('boolean is not promise', () => {
      expect(isPromise(true)).toBe(false);
    });

    it('new Promise() is promise', () => {
      expect(isPromise(new Promise((resolve) => resolve(1)))).toEqual(true);
    });
  });

  describe('isUrl', () => {
    it('empty', () => {
      expect(isUrl('')).toBe(false);
    });

    it('https', () => {
      expect(isUrl('https://blog.xxgtalk.cn')).toBe(true);
    });

    it('http', () => {
      expect(isUrl('http://blog.xxgtalk.cn')).toBe(true);
    });

    it('related path', () => {
      expect(isUrl('blog.xxgtalk.cn')).toBe(false);
    });
  });

  describe('isBrowser', () => {
    it('empty', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('listToFlat', () => {
    it('default convert', () => {
      const dict = [
        { label: 'label1', value: '001' },
        { label: 'label2', value: '002' },
      ];
      const result = listToFlat(dict);
      const isTrue = isEqual(result, { '001': 'label1', '002': 'label2' });
      expect(isTrue).toBe(true);
    });

    it('self key convert', () => {
      const dict = [
        { Text: '广州', Code: 'guanghzou' },
        { Text: '上海', Code: 'shanghai' },
      ];
      const result = listToFlat(dict, 'Code', 'Text');
      const isTrue = isEqual(result, { guanghzou: '广州', shanghai: '上海' });
      expect(isTrue).toBe(true);
    });
  });
});
