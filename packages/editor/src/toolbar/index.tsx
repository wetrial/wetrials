import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button, Popover, Tooltip } from 'antd';
import Icon, {
  LinkOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  FontColorsOutlined,
  MenuOutlined,
  FontSizeOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  BgColorsOutlined, // 背景色
  StrikethroughOutlined, // 删除线
  // TableOutlined, // 表格
  MenuUnfoldOutlined, // 右缩进
  MenuFoldOutlined, // 左缩进
  ClearOutlined, // 清空
} from '@ant-design/icons';
import { noteOnce } from 'rc-util/lib/warning';
import { DEFAULT_COLORS, DEFAULT_SIZE, DEFAULT_BACKGROUNDS, DEFAULT_HEADER } from '../constants';
import blockquote from '../assets/svgs/block-quote.svg';
import codeblock from '../assets/svgs/code-block.svg';
import scriptsub from '../assets/svgs/script-sub.svg';
import scriptsup from '../assets/svgs/script-sup.svg';

/**
 * 自定义插入项定义
 */
interface ICustomInsertOptionItem {
  /**
   * 插入项的值
   */
  value: string;
  /**
   * 插入项标题
   */
  title: string;
  /**
   * 插入项是否可以编辑(默认值 父级editable)
   */
  editable?: boolean;
}

/**
 * 自定义工具栏项基类
 */
interface ICustomBase {
  className?: string;
  /**
   * 在工具栏中显示的标题
   */
  title: string;
  /**
   * 在工具栏中显示的图标
   */
  icon: React.ReactElement;
}

/**
 * 自定义工具栏项插入值
 */
interface ICustomInsertValue extends ICustomBase {
  /**
   * 插入项在编辑器里面是否可以再编辑(默认为 false)
   */
  editable?: boolean;
  /**
   * 该项关联的配置项值列表
   */
  options: ICustomInsertOptionItem[];
  /**
   * 值列表容器的style
   */
  gridStyle?: React.CSSProperties;
  /**
   * 值列表的style，使用Card.Grid 默认:{width:'25%',textAlign:'center'}
   */
  gridItemStyle?: React.CSSProperties;
}

interface ICustomItem extends ICustomBase {
  /**
   * 自定义处理程序
   */
  handle: (...args: any[]) => void;
}

interface ICustomInsert {
  [key: string]: ICustomItem | ICustomInsertValue;
}

export interface IToolbar {
  className?: string;
  style: React.CSSProperties;
  toolbar?: any[];
  formatPainterActive?: boolean;
  /**
   * 自定义工具栏菜单栏配置
   */
  customInsert?: ICustomInsert;
  /**
   * 容器，默认 document.body
   */
  getPopupContainer: (...args: any[]) => any;
  /**
   * 背景颜色格式化
   */
  handleFormatBackground: (...args: any[]) => any;
  /**
   * 前景颜色格式化
   */
  handleFormatColor: (...args: any[]) => any;
  /**
   * 文字大小
   */
  handleFormatSize: (...args: any[]) => any;
  /**
   * 格式化标题
   */
  handleFormatHeader: (...args: any[]) => any;
  /**
   * 处理插入值
   */
  handleInsertValue: (...args: any[]) => any;
  /**
   * 获取当前大小
   */
  getCurrentSize: (...args: any[]) => any;
  /**
   * 保存选择的格式
   */
  saveSelectionFormat: (...args: any[]) => any;
  /**
   * 取消选择的格式化
   */
  unsaveSelectionFormat: (...args: any[]) => any;
}

const Toolbar: React.FunctionComponent<IToolbar> = (props) => {
  const {
    className,
    style,
    customInsert,
    handleFormatColor,
    handleFormatBackground,
    getPopupContainer,
    formatPainterActive,
    saveSelectionFormat,
    unsaveSelectionFormat,
    handleFormatHeader,
  } = props;

  // 记录当前激活的文字大小
  const [currentSize, setCurrentSize] = useState<string>('');
  const [sizePopoverVisible, setSizePopoverVisible] = useState<boolean>(false);

  const handleSizeItemClick = (e) => {
    const { handleFormatSize } = props;
    const { target } = e;

    if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      handleFormatSize && handleFormatSize(target.getAttribute('value'));
      setSizePopoverVisible(false);
    }
  };

  const handleSizePopoverVisibleChange = (visible) => {
    setSizePopoverVisible(visible);

    if (!visible) return;
    const { getCurrentSize } = props;

    const curSize = getCurrentSize && getCurrentSize();

    if (curSize !== currentSize) {
      setCurrentSize(curSize);
    }
  };

  const handleFormatPainterClick = () => {
    if (formatPainterActive) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      unsaveSelectionFormat && unsaveSelectionFormat();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      saveSelectionFormat && saveSelectionFormat();
    }
  };

  /**
   * 根据单项配置生成工具栏菜单
   * @param toolbarItem 单个配置项
   * @param index 在当前组中的下标 0开始
   */
  const getToolbarItem = (mType: string | object, key: number) => {
    /**
     * 显示的元素
     */
    let result: React.ReactElement = <></>;
    /**
     * 显示的提示文字
     */
    let tooltip: string = '';
    /**
     * 当前项的key
     */
    let configKey: string;
    /**
     * 当前项的配置值
     */
    let configValue: string | string[] = [];
    /**
     * 当前项的样式
     */
    let cls: string;
    // mType 对象格式：
    // {'align': 'right'}
    // {size: ['32px', '24px', '18px', '16px', '13px', '12px']}
    if (typeof mType === 'object') {
      [[configKey, configValue]] = Object.entries(mType);
    } else {
      configKey = mType;
    }
    // 如果配置了自定义插入处理程序，先试用自定义的
    // 处理自定义的插入
    if (customInsert && configKey in customInsert) {
      const customConfig = customInsert[configKey];
      // 自定义按钮
      if ('handle' in customConfig) {
        cls = classNames('action custom-insert', {
          [`ql-${configKey}-custom-insert`]: true,
          [`${customConfig.className}`]: !!customConfig.className,
        });
        result = <Button key={key} className={cls} icon={customConfig.icon} size="small" />;
      }
      // 自定义插入值
      else {
        cls = classNames('action custom-insert custom-insert-value', {
          [`${customConfig.className}`]: !!customConfig.className,
        });

        tooltip = customConfig.title;
        result = (
          <Popover
            trigger="click"
            content={customConfig.options.map((item, index) => {
              return (
                <Button
                  className="insert-value-item"
                  size="small"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`insert_value_${index}`}
                  title={item.title}
                  value={JSON.stringify({
                    value: item.value,
                    editable: item.editable ?? customConfig.editable ?? false,
                  })}
                >
                  {item.title}
                </Button>
              );
            })}
            key={key}
            placement="bottom"
            getPopupContainer={getPopupContainer}
          >
            <Tooltip trigger="hover" placement="top" title={tooltip} mouseEnterDelay={0.3}>
              <div className="item">
                <Button
                  data-row="custom-insert-value"
                  key={`toolbar-item${key}`}
                  className={cls}
                  icon={customConfig.icon}
                  size="small"
                />
              </div>
            </Tooltip>
          </Popover>
        );
      }
    }
    // 处理其他预定义类型
    else {
      switch (configKey) {
        case 'link': {
          result = (
            <Button className="action ql-link" size="small" key={key} icon={<LinkOutlined />} />
          );
          tooltip = '超链接';
          break;
        }
        case 'bold': {
          result = (
            <Button className="action ql-bold" size="small" key={key} icon={<BoldOutlined />} />
          );
          tooltip = '粗体';
          break;
        }
        case 'italic': {
          result = (
            <Button className="action ql-italic" size="small" key={key} icon={<ItalicOutlined />} />
          );
          tooltip = '斜体';
          break;
        }
        case 'underline': {
          result = (
            <Button
              className="action ql-underline"
              size="small"
              key={key}
              icon={<UnderlineOutlined />}
            />
          );
          tooltip = '下划线';
          break;
        }
        case 'color': {
          let colorHTML = DEFAULT_COLORS;
          if (Array.isArray(configValue) && configValue.length) {
            colorHTML = configValue.map((color, index) => (
              <Button
                className="color-item"
                // eslint-disable-next-line react/no-array-index-key
                key={`custom_color_${index}`}
                value={color}
                title={color}
                style={{ backgroundColor: color }}
              />
            ));
          }
          result = (
            <Popover
              trigger="click"
              content={
                <div className="color-container" onClick={handleFormatColor}>
                  {colorHTML}
                </div>
              }
              key={key}
              placement="bottom"
              getPopupContainer={getPopupContainer}
            >
              <Tooltip trigger="hover" placement="top" title="文字颜色" mouseEnterDelay={0.3}>
                <div className="action custom-color">
                  <Button
                    className="ql-color"
                    size="small"
                    data-role="color"
                    value=""
                    icon={<FontColorsOutlined />}
                  />
                </div>
              </Tooltip>
            </Popover>
          );
          tooltip = '文字颜色';
          break;
        }
        case 'align': {
          if (typeof configValue === 'string') {
            let alignIcon = <AlignLeftOutlined />;
            tooltip = '居左';
            if (configValue === 'right') {
              alignIcon = <AlignRightOutlined />;
              tooltip = '居右';
            } else if (configValue === 'center') {
              alignIcon = <AlignCenterOutlined />;
              tooltip = '居中';
            } else if (configValue === 'justify') {
              alignIcon = <MenuOutlined />;
              tooltip = '两端对齐';
            }

            result = (
              <Button
                className="action ql-align"
                size="small"
                key={key}
                value={configValue}
                icon={alignIcon}
              />
            );
          }
          break;
        }
        case 'list': {
          let listIcon = <UnorderedListOutlined />;
          tooltip = '无序列表';
          if (configValue === 'ordered') {
            listIcon = <OrderedListOutlined />;
            tooltip = '有序列表';
          }
          result = (
            <Button
              className="action ql-list"
              size="small"
              key={key}
              value={configValue}
              icon={listIcon}
            />
          );
          break;
        }
        case 'size': {
          let sizeList = DEFAULT_SIZE;
          if (Array.isArray(configValue) && configValue.length) {
            sizeList = configValue;
          }
          result = (
            <Popover
              trigger="click"
              content={
                <div
                  className="size-container"
                  key="custom_size_content"
                  onClick={handleSizeItemClick}
                >
                  {sizeList.map((size, index) => {
                    const sizeItemCls = classNames('size-item', {
                      active: size && currentSize === size.trim(),
                    });

                    return (
                      <Button
                        size="small"
                        className={sizeItemCls}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`custom_size_${index}`}
                        value={size}
                        style={{ fontSize: size }}
                      >
                        {size}
                      </Button>
                    );
                  })}
                </div>
              }
              title={null}
              key={key}
              visible={sizePopoverVisible}
              placement="bottom"
              getPopupContainer={getPopupContainer}
              onVisibleChange={handleSizePopoverVisibleChange}
            >
              <Tooltip trigger="hover" placement="top" title="文字大小" mouseEnterDelay={0.3}>
                <Button className="action custom-size" size="small" icon={<FontSizeOutlined />} />
              </Tooltip>
            </Popover>
          );
          tooltip = '文字大小';

          break;
        }
        case 'clean': {
          result = (
            <Button className="action ql-clean" size="small" key={key} icon={<ClearOutlined />} />
          );
          tooltip = '清除格式';
          break;
        }
        case 'formatPainter': {
          cls = classNames('action ql-formatPainter', {
            'ql-active': formatPainterActive,
          });

          result = (
            <Button
              className={cls}
              size="small"
              key={key}
              onClick={handleFormatPainterClick}
              icon={<ClearOutlined />}
            />
          );
          tooltip = '格式刷';
          break;
        }
        case 'strike': {
          result = (
            <Button
              className="action ql-strike"
              size="small"
              key={key}
              icon={<StrikethroughOutlined />}
            />
          );
          tooltip = '删除线';
          break;
        }
        case 'blockquote': {
          result = (
            <Button
              className="action ql-blockquote"
              size="small"
              key={key}
              icon={<Icon component={blockquote} />}
            />
          );
          tooltip = '块引用';
          break;
        }
        case 'code-block': {
          result = (
            <Button
              className="action ql-code-block"
              size="small"
              key={key}
              icon={<Icon component={codeblock} />}
            />
          );
          tooltip = '代码块';
          break;
        }
        case 'script': {
          if (configValue === 'super') {
            result = (
              <Button
                className="action ql-script"
                size="small"
                key={key}
                value={configValue}
                icon={<Icon component={scriptsub} />}
              />
            );
            tooltip = '上脚标';
          } else {
            <Button
              className="action ql-script"
              size="small"
              key={key}
              value={configValue}
              icon={<Icon component={scriptsup} />}
            />;
            tooltip = '下脚标';
          }

          break;
        }
        case 'indent': {
          if (configValue === '-1') {
            <Button
              className="action ql-indent"
              size="small"
              key={key}
              value={configValue}
              icon={<MenuFoldOutlined />}
            />;
            tooltip = '减少缩进';
          } else {
            <Button
              className="action ql-indent"
              size="small"
              key={key}
              value={configValue}
              icon={<MenuUnfoldOutlined />}
            />;
            tooltip = '增加缩进';
          }

          break;
        }
        case 'background': {
          let backgroundHTML = DEFAULT_BACKGROUNDS;
          if (Array.isArray(configValue) && configValue.length) {
            backgroundHTML = configValue.map((color, index) => {
              return (
                <Button
                  className="background-item"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`custom_background_${index}`}
                  value={color}
                  title={color}
                  style={{ backgroundColor: color }}
                />
              );
            });
          }
          result = (
            <Popover
              trigger="click"
              content={
                <div className="background-container" onClick={handleFormatBackground}>
                  {backgroundHTML}
                </div>
              }
              title={null}
              key={key}
              placement="bottom"
              getPopupContainer={getPopupContainer}
            >
              <Tooltip trigger="hover" placement="top" title="背景色" mouseEnterDelay={0.3}>
                <div className="action custom-background">
                  <Button
                    className="ql-background"
                    size="small"
                    data-role="background"
                    value=""
                    icon={<BgColorsOutlined />}
                  />
                </div>
              </Tooltip>
            </Popover>
          );

          tooltip = '背景色';
          break;
        }
        case 'header': {
          let headerList = DEFAULT_HEADER;
          if (Array.isArray(configValue) && configValue.length) {
            headerList = configValue;
          }

          result = (
            <Popover
              trigger="click"
              content={
                <div className="header-container" key="header_content" onClick={handleFormatHeader}>
                  {headerList.map((headerType, index) => {
                    if (typeof headerType === 'string') {
                      return (
                        <Button
                          size="small"
                          className="action ql-header"
                          // eslint-disable-next-line react/no-array-index-key
                          key={`header_${index}`}
                          value={headerType}
                        >
                          {`H${headerType}`}
                        </Button>
                      );
                    }
                    return (
                      <Button
                        size="small"
                        className="action ql-header"
                        // eslint-disable-next-line react/no-array-index-key
                        key={`header_${index}`}
                        value=""
                      >
                        正文
                      </Button>
                    );
                  })}
                </div>
              }
              title={null}
              key={key}
              visible={sizePopoverVisible}
              placement="bottom"
              getPopupContainer={getPopupContainer}
              onVisibleChange={handleSizePopoverVisibleChange}
            >
              <Tooltip trigger="hover" placement="top" title="文字大小" mouseEnterDelay={0.3}>
                <Button className="action custom-size" size="small" icon={<FontSizeOutlined />} />
              </Tooltip>
            </Popover>
          );
          tooltip = '标题';
          break;
        }
        default:
          break;
      }
    }

    const popoverTypes = ['background', 'color', 'emoji', 'size', 'header'];
    if (
      tooltip &&
      configValue &&
      popoverTypes.indexOf(configKey) !== -1 &&
      !(customInsert && configKey in customInsert)
    ) {
      return (
        <Tooltip key={key} trigger="hover" placement="top" title={tooltip} mouseEnterDelay={0.3}>
          <div className="item">{result}</div>
        </Tooltip>
      );
    }

    return result;
  };

  /**
   * 根据分组配置项生成菜单
   * @param toolbarGroup 分组的菜单项
   * @param group 当前行中第几组
   */
  const getToolbarGroup = (toolbarGroup: any[], group: number) => {
    const result = toolbarGroup.map((toolbarItem, index) => getToolbarItem(toolbarItem, index));
    return (
      <div className="group" key={`group${group}`}>
        {result}
      </div>
    );
  };

  /**
   * 根据配置项生成单项菜单组(同一行的)
   * @param singleGroupProp
   * @param index 所属行,默认从1开始
   */
  const getRowToolbar = (singleGroupProp: { toolbar: any[] }, row: number) => {
    noteOnce(Array.isArray(singleGroupProp.toolbar), 'toolbar行配置必须为数组');
    return (
      <div key={`row${row}`} className="ant-wt-editor-toolbar-row">
        {singleGroupProp.toolbar.map((item: any[], group) => getToolbarGroup(item, group))}
      </div>
    );
  };

  /**
   * 根据配置项生成分组的工具栏
   * @param param0
   * @example:[
   * // 第一行工具栏
   *  [
   *    ['link', 'bold', 'italic', 'underline'],
   *    ['color', 'background']
   *  ],
   * // 第二行工具栏
   * [
   *   ['size'],
   * ]
   * ]
   */
  const getRowsToolbar = (toolbar: any[] | undefined) => {
    if (toolbar) {
      if (Array.isArray(toolbar[0][0])) {
        return toolbar.map((item, index) => getRowToolbar(item, index + 1));
      }
      return getRowToolbar({ toolbar }, 1);
    }
    return null;
  };

  const groupToolbar = useMemo(() => getRowsToolbar(props.toolbar), [props.toolbar]);

  return groupToolbar ? (
    <div className={`ant-wt-editor-toolbar-row-container ${className ?? ''}`} style={style}>
      {groupToolbar}
    </div>
  ) : null;
};

Toolbar.displayName = 'Toolbar';

Toolbar.defaultProps = {
  formatPainterActive: false,
  toolbar: [],
  getPopupContainer: () => document.body,
};

export default Toolbar;
