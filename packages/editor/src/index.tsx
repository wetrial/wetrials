import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import { Spin, Radio, Modal, Input, Button, message } from 'antd';
import QuillBetterTable from 'quill-better-table';
import CustomToolbar, { ICustomInsert } from './toolbar/index';

import CustomSizeBlot from './formats/size';
import PlainClipboard from './modules/plainClipboard';
import EmojiBlot from './formats/emoji';
import LinkBlot from './formats/link';
import ImageBlot from './formats/image';
import ImageDrop from './modules/imageDrop';
import FileDrop from './modules/fileDrop';
import { QUILL_SOURCES } from './constants';
// import VideoBlot from './formats/video'
import './style/index.less';

Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
// Quill.register(VideoBlot)
Quill.register('modules/imageDrop', ImageDrop, true);
Quill.register('modules/fileDrop', FileDrop, true);
Quill.register('modules/better-table', QuillBetterTable, true);

interface IEditor {
  className?: string;
  style?: React.CSSProperties;
  toolbar?: any[];
  /**
   * 自定义工具栏菜单栏配置
   */
  customInsert?: ICustomInsert;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 值
   */
  value?: string;
  /**
   * 提示内容
   */
  placeholder?: string;
  /**
   * loading状态
   */
  loading?: boolean;
  /**
   * 允许调节尺寸
   */
  resizable?: boolean;
  /**
   * 以纯文本形式粘贴
   */
  pastePlainText?: boolean;
  /**
   * 自定义容器
   */
  getPopupContainer?: () => React.ReactNode;
  /**
   * 内容改动
   */
  onChange?: (content: any, delta: any, source: any, editor: Quill) => void;
  onToolbarClick: (type: string) => void;
  onSelectionChange: (range: any, source: any, editor: Quill) => void;
  onFocus: (range: any, source: any, editor: Quill) => void;
  onBlur: (previousRange: any, source: any, editor: Quill) => void;
  onKeyPress: (event: KeyboardEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
}

interface IEditorState {
  lastValue: string | HTMLElement;
  value: string | HTMLElement;
  loading: boolean;
  curRange: any;
  formatPainterActive: boolean;
}

class Editor extends Component<IEditor, IEditorState> {
  static defaultProps = {
    placeholder: '请输入内容',
    loading: false,
    resizable: false,
    pastePlainText: false,
    toolbar: [
      ['link', 'bold', 'italic', 'underline', 'header'],
      // ['color', 'background'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      // [{size: ['32px', '24px', '18px']}]
      // ['size'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['strike'],
      ['blockquote'],
      ['code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean', 'formatPainter'],
    ],
    getPopupContainer: () => document.body,
  };

  private toolbarRef: any;
  private reactQuillNode: HTMLElement;
  private defaultFontSize: string;
  // 格式刷保存的格式
  private prevSelectionFormat = null;

  private reactQuillRef: any;

  private handlers = {
    clean: () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const { parchment: Parchment } = Quill['imports'];
      const quill: Quill = this.getEditor();
      const range = quill.getSelection();
      if (range == null) {
        return;
      }
      if (range.length === 0) {
        const formats = quill.getFormat();
        Object.keys(formats).forEach((name) => {
          // Clean functionality in existing apps only clean inline formats
          if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
            quill.format(name, false);
          }
        });
      } else {
        quill.removeFormat(range.index, range.length, QUILL_SOURCES.USER);
      }
    },
    customInsert: (value) => {
      const quill = this.getEditor();
      const range = quill.getSelection();
      const configValue = JSON.parse(value);
      if (!range) {
        return;
      }
      if (configValue.editable === false) {
        quill.insertText(
          range.index,
          configValue.value,
          {
            customAttr: {
              editable: false,
            },
          },
          QUILL_SOURCES.USER,
        );
      } else {
        quill.insertText(range.index, configValue.value);
      }
    },
  };

  state = {
    lastValue: this.props.value ?? this.props.defaultValue ?? '',
    value: this.props.value ?? this.props.defaultValue ?? '',
    loading: false,
    curRange: null,
    formatPainterActive: false,
    toolbarContainer:Element
  };

  constructor(props) {
    super(props);
    this.reactQuillNode = document.body;
    this.defaultFontSize = '14px';
    const { pastePlainText } = props;

    // 粘贴时将富文本转为纯文本
    if (pastePlainText) {
      Quill.register('modules/clipboard', PlainClipboard, true);
    }
  }

  componentDidMount() {
    this.setState({
      this.reactQuillNode=findDOMNode(this.toolbarRef)
    }, () => {
      if(!this.reactQuillRef){
        return;
      }
      this.reactQuillNode=findDOMNode(this.reactQuillRef);

      this.onBlur
    });
  }

  getEditor = (): Quill => {
    return this.reactQuillRef.getEditor();
  };

  render() {
    const {
      loading,
      value,
      toolbar
    }=this.state;
    return <div>{this.state.value}</div>;
  }
}

export { Quill, Editor };
