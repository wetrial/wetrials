/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { Button, Spin } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import { ArrowRightOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { ISlideCaptcha } from './props';

enum EValidateStatus {
  init = 1,
  success = 2,
  error = 3,
}

interface ISlideCaptchaState {
  originX: number;
  offsetX: number;
  originY: number;
  totalY: number;
  isMoving: boolean;
  isTouchEndSpan: boolean;
  isSliderHover: boolean;
  validated: EValidateStatus;
}

export default class SlideCaptcha extends React.Component<ISlideCaptcha, ISlideCaptchaState> {
  public static defaultProps = {
    showType: 'fixed',
    resetType: 'auto',
    resetButton: 'inline',
    hoverPosition: 'top',
    tip: '向右滑动滑块填充拼图',
    loading: false,
    slideElement: <Button icon={<ArrowRightOutlined />} />,
    slideElementError: <Button icon={<CloseOutlined />} />,
    slideElementSuccess: <Button icon={<CheckOutlined />} />,
  };

  state: ISlideCaptchaState = {
    offsetX: 0,
    originX: 0,
    originY: 0,
    totalY: 0,
    isTouchEndSpan: false,
    isMoving: false,
    isSliderHover: false,
    validated: EValidateStatus.init,
  };

  private maxSlidedWidth: number = 0;
  private ctrlWidth: any = null;
  private sliderWidth: any = null;
  private timeout: any = null;
  private reset: any = null;

  componentDidMount() {
    document.addEventListener('mouseup', this.listenMouseUp);

    document.addEventListener('mousemove', this.listenMouseMove);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<ISlideCaptcha>): void {
    if (nextProps.resetType === 'manual') {
      this.resetCaptcha(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.listenMouseUp);
    document.removeEventListener('mousemove', this.listenMouseMove);
  }

  private getClientX = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientX;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientX;
    }
    return 0;
  };

  private getClientY = (e): number => {
    if (e.type.indexOf('mouse') > -1) {
      return e.clientY;
    }
    if (e.type.indexOf('touch') > -1) {
      return e.touches[0].clientY;
    }
    return 0;
  };

  private move = (e): void => {
    const clientX = this.getClientX(e);
    const clientY = this.getClientY(e);
    let offsetX = clientX - this.state.originX;
    const offsetY = Math.abs(clientY - this.state.originY);
    const totalY = this.state.totalY + offsetY;
    if (offsetX > 0) {
      if (offsetX > this.maxSlidedWidth) {
        offsetX = this.maxSlidedWidth;
      }
      this.setState({
        offsetX,
        totalY,
      });
    }
  };

  public validatedSuccess = (callback: () => any): void => {
    this.setState(
      {
        validated: EValidateStatus.success,
      },
      () => {
        callback();
        if (this.props.resetType === 'auto') {
          setTimeout(() => {
            this.resetCaptcha();
          }, 500);
        }
      },
    );
  };

  public validatedFail = (callback: () => any): any => {
    this.setState(
      {
        validated: EValidateStatus.error,
      },
      () => {
        callback();
        if (this.props.resetType === 'auto') {
          setTimeout(() => {
            this.resetCaptcha();
          }, 500);
        }
      },
    );
  };

  private handleTouchStart = (e): void => {
    e.preventDefault();
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
    });
  };

  private handleTouchMove = (e): void => {
    e.preventDefault();
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }
    this.move(e);
    this.setState({
      isMoving: true,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleTouchEnd = async (e) => {
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }

    if (this.state.offsetX > 0) {
      if (this.state.isTouchEndSpan || this.props.loading) {
        return;
      }

      if (this.state.offsetX > 0) {
        const validateValue = this.state.offsetX / this.maxSlidedWidth;
        this.setState({
          isTouchEndSpan: true,
          isMoving: false,
        });

        try {
          const result = await this.props.validate(validateValue);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.props.onValidateSuccess && this.props.onValidateSuccess(result);
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.props.onValidatedFail && this.props.onValidatedFail(error);
        }

        // if (this.props.validate) {
        //   this.props.onRequest(validateValue,
        //                       this.validatedSuccess,
        //                       this.validatedFail,
        //                       this.resetCaptcha,
        //                       );
        // }
      }
    }
  };

  resetCaptcha = (isReset: boolean = true) => {
    const targetPercent = 0;
    const speed = this.maxSlidedWidth / 30;
    const animate = () => {
      const percent = this.state.offsetX;
      const currentProgress = percent < speed ? 0 : percent - speed;
      if (percent > targetPercent) {
        this.setState(
          {
            offsetX: currentProgress,
          },
          () => {
            window.requestAnimationFrame(animate);
          },
        );
      } else {
        this.setState(
          {
            offsetX: 0,
            originX: 0,
            originY: 0,
            totalY: 0,
            isTouchEndSpan: false,
            isMoving: false,
            validated: EValidateStatus.init,
            isSliderHover: false,
          },
          () => {
            if (this.props.onReset && isReset) {
              this.props.onReset();
            }
          },
        );
      }
    };
    window.requestAnimationFrame(animate);
  };

  handlerMouseDown = (e) => {
    e.preventDefault();
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }
    this.setState({
      originX: this.getClientX(e),
      originY: this.getClientY(e),
      isMoving: true,
    });
  };

  handlerMouseMove = (e) => {
    e.preventDefault();
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }
    if (this.state.isMoving) {
      this.move(e);
    }
  };

  handlerMouseUp = (e) => {
    e.preventDefault();
    if (this.state.isTouchEndSpan || this.props.loading) {
      return;
    }
    this.setState({
      isMoving: false,
      // isTouchEndSpan: true,
    });
    this.handleTouchEnd(e);
  };

  handleMoveOut = (e) => {
    e.preventDefault();
    if (this.state.validated === EValidateStatus.init) {
      this.setState({
        isSliderHover: false,
      });
    }
  };

  listenMouseUp = (e) => {
    if (this.state.isMoving === true) {
      this.handlerMouseUp(e);
    }
  };

  listenMouseMove = (e) => {
    this.handlerMouseMove(e);
  };

  renderCtrlClassName = (
    slideElement,
    slideElementSuccess,
    slideElementError,
    slideElementMoving,
  ) => {
    let ctrlClassName;
    let slidedImageValue = slideElement;
    if (this.state.isMoving) {
      ctrlClassName = 'slider-moving';
      slidedImageValue = slideElementMoving;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.state.isTouchEndSpan) {
        if (this.state.validated === EValidateStatus.success) {
          ctrlClassName = 'slider-end slider-success';
          slidedImageValue = slideElementSuccess;
        } else if (this.state.validated === EValidateStatus.error) {
          ctrlClassName = 'slider-end slider-error';
          slidedImageValue = slideElementError;
        } else {
          ctrlClassName = 'slider-moving';
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.state.validated === EValidateStatus.init && this.state.isSliderHover) {
          ctrlClassName = 'slider-moving';
          slidedImageValue = slideElementMoving;
        } else {
          ctrlClassName = '';
        }
      }
    }
    return { ctrlClassName, slidedImage: slidedImageValue };
  };

  render() {
    const { ctrlClassName, slidedImage } = this.renderCtrlClassName(
      this.props.slideElement,
      this.props.slideElementSuccess,
      this.props.slideElementError,
      this.props.slideElementMoving,
    );

    let positionObj;

    let buttonElement;
    let tipsText;

    if (this.state.isMoving) {
      if (this.props.loading) {
        tipsText = '加载中...';
      } else {
        tipsText = null;
      }
    } else if (this.props.loading) {
      tipsText = '加载中...';
    } else {
      tipsText = this.props.tip;
    }

    if (this.state.validated !== EValidateStatus.init) {
      tipsText = null;
    }

    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => (
          <div
            className={getPrefixCls('wt-slide-captcha')}
            style={this.props.style}
            onMouseMove={this.handlerMouseMove}
            onMouseUp={this.handlerMouseUp}
          >
            <div className="panel" style={{ ...positionObj, display: 'block' }}>
              <Spin spinning={this.props.loading}>
                <div className="bgContainer">
                  <img alt="验证码" src={this.props.bgUrl} className="bgImg" />
                  <img
                    alt="验证码"
                    src={this.props.captchUrl}
                    className="puzzleImg"
                    style={{ left: `${this.state.offsetX}px` }}
                  />
                </div>
              </Spin>
              <div
                className="reset reset-inline"
                ref={(el) => {
                  this.reset = el;
                }}
              >
                <div className="rest-container" onClick={() => this.resetCaptcha()}>
                  {buttonElement}
                </div>
              </div>
            </div>
            <div>
              <div
                className={`control ${ctrlClassName || ''}`}
                ref={(el) => {
                  this.ctrlWidth = el;
                }}
              >
                <div className="slided" style={{ width: `${this.state.offsetX}px` }} />
                <div
                  className="slider"
                  ref={(el) => {
                    this.sliderWidth = el;
                  }}
                  style={{ left: `${this.state.offsetX}px` }}
                  onTouchStart={this.handleTouchStart}
                  onTouchMove={this.handleTouchMove}
                  onTouchEnd={this.handleTouchEnd}
                  onMouseDown={this.handlerMouseDown}
                  onMouseOut={this.handleMoveOut}
                >
                  {slidedImage}
                </div>
                <div
                  className={`tips ${this.props.tipClassName ? this.props.tipClassName : ''}`}
                  style={this.props.tipStyle || {}}
                >
                  <span>{tipsText}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ConfigConsumer>
    );
  }
}
