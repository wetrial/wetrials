export interface ISlideCaptcha {
  /**
   * 显示方式
   */
  showType?: 'fixed' | 'hover';
  /**
   * 刷新方式
   */
  resetType?: 'auto' | 'manual';
  /**
   * 重置按钮 none:不现实  inline:内嵌
   */
  resetButton?: 'none' | 'inline';
  /**
   * 浮动显示验证码图片的情况下，相对拖拽块的显示位置
   */
  hoverPosition?: 'top' | 'bottom';
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
  bgUrl: string;
  /**
   * 填充图片地址,img src支持的地址
   */
  captchUrl: string;
  /**
   * 提交验证的方法,需要返回一个 true(成功)或者false(失败)
   */
  validate: (validateValue: number) => Promise<string>;
  /**
   * 验证成功执行的函数
   */
  onValidateSuccess?: (validKey: string) => void;
  /**
   * 验证失败执行的函数
   */
  onValidatedFail?: (error: any) => void;
  /**
   * 重置执行的函数
   */
  onReset?: () => void;
  /**
   * 滑动元素
   */
  slideElement?: React.ReactElement;
  /**
   * 滑动中显示的元素
   */
  slideElementMoving?: React.ReactElement;
  /**
   * 成功显示的滑块元素
   */
  slideElementSuccess?: React.ReactElement;
  /**
   * 失败显示的滑块元素
   */
  slideElementError?: React.ReactElement;
  /**
   * 滑块容器上的样式
   */
  className?: string;
  /**
   * 滑块容器上的style
   */
  style?: React.CSSProperties;
  /**
   * 提提示块上的样式
   */
  tipClassName?: React.CSSProperties;
  /**
   * 提示块上的style
   */
  tipStyle?: React.CSSProperties;
  /**
   * 浮窗面板className
   */
  hoverPanelClassName?: string;
  /**
   * 浮窗面板style
   */
  hoverPanelStyle?: React.CSSProperties;
}
