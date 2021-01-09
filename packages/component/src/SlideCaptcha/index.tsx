import React, { useEffect, useReducer } from 'react';
import { Spin } from 'antd';
import type { ConfigConsumerProps } from 'antd/es/config-provider';
import { ConfigConsumer } from 'antd/es/config-provider';
import { initState, reducer } from './reducer';
import type { ISlideCaptcha, ISlideCaptchaRefProp } from './props';
import './index.less';

const SlideCaptcha: React.ForwardRefRenderFunction<ISlideCaptchaRefProp, ISlideCaptcha> = (
  props,
  ref,
) => {
  const { width = 200, height = 100, onRefresh, validate, tracks } = props;
  // 最大滑动距离
  const maxSlideWidth = width - 36;

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

  const defaultEvent = (e) => {
    e.preventDefault();
  };

  const refresh = () => {
    onRefresh?.();
    dispatch({ type: 'reset' });
  };

  /**
   * 鼠标/手指开始滑动
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragStart = (currentPageX) => {
    dispatch({ type: 'setMove', payload: true });
    // 当前位置减去已拖拽的位置作为位置差
    dispatch({ type: 'setPoorX', payload: currentPageX - state.distance });
    dispatch({ type: 'setStartTime', payload: new Date() });
  };

  /**
   * 拖拽移动过程触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragMoving = (currentPageX) => {
    const distance = currentPageX - state.poorX;
    if (state.isMove && distance !== state.distance) {
      dispatch({ type: 'setDistance', payload: distance });
      if (distance >= 0 && distance <= maxSlideWidth) {
        if (tracks) {
          dispatch({ type: 'appendTracks', payload: `${distance},${new Date().getTime()}` });
        }
      }
      // 鼠标指针移动距离超过最大时清空事件
      else {
        dispatch({ type: 'reset' });
      }
    }
  };

  /**
   * 拖拽结束触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  const dragEnd = () => {
    // 距离不能少于5 否则算没拖动
    if (!state.isMove || state.distance < 5) {
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
          } else {
            refresh();
          }
        });
    });
  };

  const handleMouseMove = (e) => {
    dragMoving(e.pageX);
  };

  const handleMouseUp = () => {
    dragEnd();
  };

  const handleTouchMove = (e) => {
    dragMoving(e.originalEvent.touches[0].pageX);
  };

  const handleTouchend = () => {
    dragEnd();
    // 阻止页面的滑动默认事件
    document.removeEventListener('touchmove', defaultEvent, false);
  };

  useEffect(() => {
    // 移动鼠标、松开鼠标
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 触摸移动 结束
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchend);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchend]);

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
          <div className={getPrefixCls('wt-slide-captcha')} style={{ height: height + 34, width }}>
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
                onMouseDown={(e) => dragStart(e.pageX)}
                onTouchStart={(e) => {
                  dragStart(e.touches[0].pageX);
                  document.addEventListener('touchmove', defaultEvent, false);
                }}
                className="handler handler-bg"
                style={{ left: state.distance }}
              />
              <a title={props.refreshTitle} style={{ width: 16, height: 16 }}>
                <div
                  className="refesh-bg"
                  onClick={handleRefreshCaptcha}
                  style={{
                    left: width - 20,
                    display: 'block',
                    visibility: state.isMove ? 'hidden' : 'visible',
                  }}
                />
              </a>
            </div>
          </div>
        </Spin>
      )}
    </ConfigConsumer>
  );
};

const SlideCaptchaComponent = React.forwardRef(SlideCaptcha);

SlideCaptchaComponent.defaultProps = {
  tip: '向右滑动滑块填充拼图',
  refreshTitle: '换一张',
  loading: true,
  height: 100,
  width: 200,
  tracks: false,
};

export default SlideCaptchaComponent;
