import { isEqual } from 'lodash';
import moment from 'moment';
import { utils } from '@wetrial/core';

const {
  urlToList,
  isPromise,
  isUrl,
  isBrowser,
  listToFlat,
  getDateString,
  fixedZero,
  newGuid,
  formatMaskInfo,
  mergeCells,
} = utils;

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

  describe('isBrowser', () => {
    it('empty', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('getDateString', () => {
    it('default format is Y-MM-DD', () => {
      expect(getDateString({ date: moment('2020-12-09') })).toEqual('2020-12-09');
    });
  });

  describe('fixedZero', () => {
    it('should add zero before', () => {
      expect(fixedZero(0)).toEqual('00');
    });

    it('can not add zero', () => {
      expect(fixedZero(10)).toEqual('10');
    });
  });

  describe('newGuid', () => {
    it('contains split', () => {
      const guid = newGuid(true);
      const reg = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/gi;
      expect(reg.test(guid)).toBe(true);
    });

    it('not contains split', () => {
      const guid = newGuid();
      const reg = /^[0-9a-f]{32}$/gi;
      expect(reg.test(guid)).toBe(true);
    });
  });

  describe('formatMaskInfo', () => {
    it('mobile', () => {
      const formatResult = formatMaskInfo('17508442930', 'mobile');
      expect(formatResult).toEqual('175*****930');
    });

    it('other mobile', () => {
      const formatResult = formatMaskInfo('175084842930', 'mobile');
      expect(formatResult).toEqual('175*****2930');
    });

    it('phone', () => {
      const formatResult = formatMaskInfo('7090641', 'phone');
      expect(formatResult).toEqual('709****');
    });
  });

  describe('mergeCells', () => {
    it('merge', () => {
      const dataSource = [
        { name: 'xxg', title: 'code' },
        { name: '刘德华', title: 'code' },
        { name: '古天乐', title: 'other' },
      ];

      const testResult = mergeCells(dataSource, 'title');
      expect(testResult).toEqual({
        0: 2,
        1: 0,
        2: 1,
      });
    });
  });
});
