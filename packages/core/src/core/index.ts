export type TWithFalse<T> = T | false;

/**
 * Key value简写
 */
export type TKeyValue<ValueType = any, KeyType extends string | number | symbol = string> = Record<
  KeyType,
  ValueType
>;

/**
 * 加密类型
 */
export enum CryptoType {
  /**
   * 传入加密
   */
  In = 1,
  /**
   * 传出加密
   */
  Out = 2,
  /**
   * 传入+传出 都加密
   */
  Both = 4,
}
