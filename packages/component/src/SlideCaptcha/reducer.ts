import type { ISlideCaptchaState, ISlideCaptchaAction } from './props';

/**
 * 初始化默认状态
 * @param state
 */
export function initState(state: ISlideCaptchaState): ISlideCaptchaState {
  return {
    ...state,
  };
}

export function reducer(
  state: ISlideCaptchaState,
  action: ISlideCaptchaAction,
): ISlideCaptchaState {
  switch (action.type) {
    // 重置
    case 'reset':
      return {
        // 记录开始滑动的时间
        startTime: new Date(),
        // 记录结束滑动的时间
        endTime: new Date(),
        // 当前是否正在移动中
        isMove: false,
        // 位置差(相当于页面浏览器最左端)
        poorX: 0,
        // 拖拽记录
        tracks: [],
        // 拖拽元素距离左边的距离
        distance: 0,
      };
    // 记录开始时间
    case 'setStartTime':
      return {
        ...state,
        startTime: action.payload,
      };
    // 记录结束时间
    case 'setEndTime':
      return {
        ...state,
        endTime: action.payload,
      };
    // 记录移动状态
    case 'setMove':
      return {
        ...state,
        isMove: action.payload,
      };
    // 记录位置差
    case 'setPoorX':
      return {
        ...state,
        poorX: action.payload,
      };
    // 追加拖拽轨迹
    case 'appendTracks':
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };
    // 重置拖拽轨迹
    case 'resetTracks':
      return {
        ...state,
        tracks: [],
      };
    // 设置拖拽元素距离左边的距离
    case 'setDistance':
      return {
        ...state,
        distance: action.payload,
      };
    default:
      throw new Error(`unsupport dispatch type:${action} in SlideCaptcha reducer`);
  }
}
