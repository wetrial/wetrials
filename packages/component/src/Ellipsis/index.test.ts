import { getStrFullLength, getEllips } from './index';

describe('test calculateShowLength', () => {
  it('get full length', () => {
    expect(getStrFullLength('一二，a,')).toEqual(8);
  });
  it('cut str by full length', () => {
    expect(getEllips('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', () => {
    expect(getEllips('一22三', 5)).toEqual('一22');
  });
});
