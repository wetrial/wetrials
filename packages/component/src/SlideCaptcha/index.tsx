import React, { useEffect, useMemo, useReducer } from 'react';
import { Spin, Button } from 'antd';
import type { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigConsumer } from 'antd/es/config-provider';
import { initState, reducer } from './reducer';
import classNames from 'classnames';
import type { ISlideCaptcha, ISlideCaptchaRefProp } from './props';
import './index.less';

const RefreshSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M1007.2 262.4c-12.8-6.4-32 0-38.4 19.2L943.2 352c-38.4-96-96-172.8-185.6-224-108.8-64-230.4-89.6-352-57.6C232.8 108.8 104.8 236.8 60 409.6c-6.4 19.2 6.4 32 19.2 38.4 19.2 0 32-6.4 38.4-25.6C156 268.8 271.2 153.6 424.8 121.6 533.6 96 642.4 115.2 732 172.8c76.8 44.8 134.4 115.2 166.4 198.4l-76.8-32c-12.8-6.4-32 0-38.4 19.2-6.4 12.8 0 32 12.8 38.4L924 448c6.4 6.4 12.8 6.4 19.2 6.4H956c6.4 0 12.8-6.4 12.8-12.8l57.6-147.2c6.4-12.8-6.4-25.6-19.2-32zM949.6 576c-12.8-6.4-32 6.4-32 19.2C879.2 748.8 764 864 610.4 896c-108.8 25.6-217.6 6.4-307.2-51.2-76.8-44.8-134.4-115.2-166.4-198.4l76.8 32c12.8 6.4 32 0 38.4-19.2 6.4-12.8 0-32-12.8-38.4L104.8 576c-6.4 0-12.8-6.4-19.2-6.4h-6.4-6.4C66.4 576 60 582.4 60 588.8L2.4 729.6c-6.4 12.8 0 32 19.2 38.4 12.8 6.4 32 0 38.4-19.2l25.6-70.4C124 768 181.6 844.8 271.2 896c108.8 64 230.4 89.6 352 57.6C796 915.2 930.4 780.8 968.8 608c6.4-12.8-6.4-25.6-19.2-32z"></path>
  </svg>
);

const SlideCaptcha: React.ForwardRefRenderFunction<ISlideCaptchaRefProp, ISlideCaptcha> = (
  props,
  ref,
) => {
  const { width = 200, height = 100, onRefresh, validate, tracks } = props;
  // 最大滑动距离
  const maxSlideWidth = width - 40;

  const [state, dispatch] = useReducer(
    reducer,
    {
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
    },
    initState,
  );

  const refresh = useMemo(
    () => () => {
      onRefresh?.();
      dispatch({ type: 'reset' });
    },
    [onRefresh],
  );

  /**
   * 鼠标/手指开始滑动
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragStart = useMemo(
    () => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      dispatch({ type: 'setMove', payload: true });
      // 当前位置减去已拖拽的位置作为位置差
      dispatch({ type: 'setPoorX', payload: event.pageX - state.distance });
      dispatch({ type: 'setStartTime', payload: new Date() });
    },
    [state.distance],
  );

  /**
   * 拖拽移动过程触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragMoving = useMemo(
    () => (currentPageX) => {
      const distance = currentPageX - state.poorX;
      if (
        state.isMove &&
        distance !== state.distance &&
        state.distance >= 0 &&
        distance < maxSlideWidth &&
        distance >= 0
      ) {
        dispatch({ type: 'setDistance', payload: distance });
        if (tracks) {
          dispatch({ type: 'appendTracks', payload: `${distance},${new Date().getTime()}` });
        }
      }
    },
    [state.poorX, state.isMove, state.distance, maxSlideWidth, tracks],
  );

  /**
   * 拖拽结束触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragEnd = useMemo(
    () => () => {
      if (!state.isMove) {
        return;
      }
      if (state.distance < 20) {
        dispatch({ type: 'reset' });
        return;
      }
      dispatch({ type: 'setMove', payload: false });
      if (state.poorX === undefined) {
        return;
      }
      dispatch({ type: 'setEndTime', payload: new Date() });
      setTimeout(() => {
        // 调用远程进行校验
        validate?.({
          token: props.token,
          point: state.distance,
          timespan: Math.abs(Number(state.endTime) - Number(state.startTime)),
          datelist: state.tracks.join('|'),
        })
          .then((result) => {
            props.onFinish?.(result);
            return result;
          })
          .catch((err) => {
            if (props.onFinishFailed) {
              props.onFinishFailed(err);
            }
            refresh();
          });
      });
    },
    [
      state.isMove,
      state.distance,
      state.poorX,
      state.endTime,
      state.startTime,
      state.tracks,
      validate,
      props,
      refresh,
    ],
  );

  const handleMouseMove = useMemo(
    () => (e) => {
      dragMoving(e.pageX);
    },
    [dragMoving],
  );

  const handleMouseUp = useMemo(
    () => () => {
      dragEnd();
    },
    [dragEnd],
  );

  useEffect(() => {
    // 移动鼠标、松开鼠标
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  React.useImperativeHandle(ref, () => ({
    refresh,
  }));

  const handleRefreshCaptcha = (e) => {
    e.preventDefault();
    refresh();
  };

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => (
        <Spin spinning={props.loading}>
          <div
            unselectable="on"
            className={getPrefixCls('wt-slide-captcha')}
            style={{ height: height + 34, width }}
          >
            <div style={{ width, height, background: '#e8e8e8' }}>
              <div
                className="captcha-img"
                style={{
                  backgroundImage: `url(${props.bgSrc})`,
                  width: props.width,
                  height: props.height,
                }}
              />
              <div
                className="small-drag"
                style={{
                  backgroundImage: `url(${props.captchSrc})`,
                  top: props.top,
                  left: state.distance,
                }}
              />
            </div>
            <div className="drag" style={{ width: props.width }}>
              <div className="drag-bg" style={{ width: state.distance }} />
              <div className="drag-text" unselectable="on" style={{ width: props.width }}>
                {props.tip}
              </div>
              <div
                onMouseDown={dragStart}
                className="handler handler-bg"
                style={{ left: state.distance }}
              />
              <Button
                onClick={handleRefreshCaptcha}
                style={{ visibility: state.isMove ? 'hidden' : 'visible' }}
                title={props.refreshTitle}
                shape="circle"
                className={classNames('refesh-btn', {
                  hidden: state.isMove,
                })}
                icon={<RefreshSvg />}
              />
            </div>
          </div>
        </Spin>
      )}
    </ConfigConsumer>
  );
};

const SlideCaptchaComponent = React.forwardRef(SlideCaptcha);

SlideCaptchaComponent.defaultProps = {
  tip: '向右滑动完成拼图',
  refreshTitle: '换一张',
  loading: true,
  height: 100,
  width: 200,
  tracks: false,
};

export default SlideCaptchaComponent;
