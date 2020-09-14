export interface ISlideCaptcha {
  /**
   * 当前标识客户端的token，验证的时候会发送回服务器端
   */
  token: string;
  /**
   * 图形高度
   */
  height?: number;
  /**
   * 图形宽度
   */
  width?: number;
  /**
   * 拼接块距离顶部的像素
   */
  top: number;
  /**
   * 显示的提示文字
   */
  tip?: string;
  /**
   * loading状态
   */
  loading?: boolean;
  /**
   * 背景图片地址,img src支持的地址
   */
  bgSrc: string;
  /**
   * 填充图片地址,img src支持的地址
   */
  captchSrc: string;
  /**
   * 提交验证的方法,需要返回一个 true(成功)或者false(失败)
   */
  validate: (validateValue: any) => Promise<string>;
  /**
   * 验证成功执行的函数
   */
  onFinish?: (validKey: string) => void;
  /**
   * 验证失败执行的函数
   */
  onFinishFailed?: (error: any) => void;
  /**
   * 重置执行的函数
   */
  onReset?: () => void;
  /**
   * 滑块容器上的样式
   */
  className?: string;
  /**
   * 滑块容器上的style
   */
  style?: React.CSSProperties;
  /**
   * 刷新提示文字
   */
  refreshTitle?: string;
  onRefresh: () => void;
}

export interface ISlideCaptchaState {
  /**
   * 记录开始滑动的时间
   */
  startTime: Date;
  /**
   * 记录结束滑动的时间
   */
  endTime: Date;
  /**
   * 当前是否正在移动中
   */
  isMove: boolean;
  /**
   * 位置差(相当于页面浏览器最左端)
   */
  poorX: number;
  /**
   * 拖拽记录
   */
  tracks: string[];
  /**
   * 拖拽元素距离左边的距离
   */
  distance: 0;
}

export interface ISlideCaptchaAction {
  type: string;
  payload?: any;
}

export interface ISlideCaptchaRefProp {
  refresh: () => void;
}
