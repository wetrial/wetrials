/* eslint-disable max-classes-per-file */
export enum ErrorShowType {
  /**
   * 静默，不做任何提示
   */
  SILENT = 0,
  /**
   * 警告
   */
  WARN_MESSAGE = 1,
  /**
   * 错误提示
   */
  ERROR_MESSAGE = 2,
  /**
   * 通知
   */
  NOTIFICATION = 4,
  /**
   * 重定向
   */
  REDIRECT = 9,
}

/**
 * 后台抛出的异常信息
 */
export class UserFriendlyException extends Error {
  // constructor(details,showType,code,validationErrors){
  //   super(details)
  //   this.showType=showType;
  //   this.code=code;
  //   this.validationErrors=validationErrors;
  // }
  showType?: ErrorShowType;
  code?: string;
  details?: any;
  validationErrors?: any;
}

/**
 * 未登录异常
 */
export class UnAuthorizedException extends UserFriendlyException {}
