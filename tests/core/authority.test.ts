import { setToken, getToken, clearToken } from '../../packages/core/src/authority';

describe('store', () => {
  describe('setToken && getToken && clearToken', () => {
    it('without exp', () => {
      setToken({
        token: 'test',
      });
      const token = getToken();
      expect(token.token).toEqual('test');
    });
  });

  describe('setToken with exp', () => {
    it('without exp', () => {
      setToken({ token: 'test' }, 1);
      setTimeout(() => {
        const token = getToken();
        expect(token).toEqual(null);
      }, 1.1);
    });
  });

  describe('setToken with clearToken', () => {
    it('without exp', () => {
      setToken({
        token: 'test',
      });
      clearToken();
      const token = getToken();
      expect(token).toEqual(null);
    });
  });
});
