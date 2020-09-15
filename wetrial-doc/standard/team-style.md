---
title: 代码规范
order: 1
group:
  title: 团队风格
  path: /standard
  order: 1
nav:
  title: 前端文档
  path: /doc
  order: 100
---

# 代码规范

一个好的代码风格可以方便其他开发人员快速熟悉、上手开发工作，也方便自己快速查找定位问题。

<!-- ## 注释

- 文件顶部的注释，包括描述、作者、日期

```tsx | pure
/**
 * @desc 描述改文件的用途
 * @create xxg
 * @createdDate 2019-09-09
 */
``` -->

- 模块的注释

```tsx | pure
/**
 * 格式化日期
 * @param  {string}  data   要格式化的日期
 * @param  {format} [format='yyyy-MM-dd'] 格式，默认为yyyy-MM-dd
 * @return {string}         返回格式化后的字符串
 */
```

- 业务代码注释

```tsx | pure
/*业务代码注释*/
```

- 接口注释

```tsx | pure
export interface IRouteMenu {
  /**
   *路由列表
   */
  routes?: string[];
}
```

## 引用组件顺序

先引用外部组件库, 再引用系统级全局库(最外层的先引用)、再引用当前组件块级组件、最后是 css 样式

```tsx | pure
import * as React from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import { SelectPlus } from 'wetrial';
import ScrollBar from '@/components/ScrollBar';
import { IListProps } from './interface';
import styles from './index.less';
```

## 引号

- 常量字符串使用单引号
- react 组件中的属性使用双引号
- 字符串拼接使用 es6 的反引号

## 缩进、分号

系统中已经配置了一套规则，会在保存的时候自动格式化代码

## 括号

下列关键字后必须有大括号（即使代码块的内容只有一行）：if, else, for, while, do, switch, try, catch, finally, with

```tsx | pure
// 不推荐
if (condition) doSomething();

// 推荐做法
if (condition) {
  doSomething();
}
```

## 数组、对象

- 对象属性名不需要加引号
- 对象以缩进的形式书写，不要写在一行
- 数组最后不要有逗号
- 对象最后不要有逗号

## 命名

- 类名: 大驼峰式风格，字母和数字，例如：AbcTest。禁止汉字、特殊符号，禁止非大驼峰式风格
- 函数名、变量名: 小驼峰式风格，字母和数字，例如：abcTest。禁止汉字、特殊符号，禁止非小驼峰式风格，例如 snake_case 等
- 常量字符串: 全大写风格，大写字母、数字和下划线，单词之间以下划线分隔，例如：ABC_TEST。禁止汉字、特殊符号、小写字母
- 组件、页面: 文件夹大驼峰式风格、文件名(除 index、layout 外)其他一律大写

```bash
├─src
│  │  app.ts
│  │  defaultSettings.ts
│  │  global.less
│  │  global.tsx
│  │  service-worker.ts
│  ├─b-components
│  ├─components
│  ├─constants
│  │      index.ts
│  │      permissions.js
│  ├─models
│  │      user.ts
│  │      global.ts
│  ├─pages
│  │  ├─Example
│  │  │ ├─List
│  │  │ │ ├─index.tsx
│  │  │ │ ├─model.ts
│  │  │ │ ├─service.ts
│  │  │ │ ├─View.tsx
│  ├─services
│  │      authority.test.ts
│  ├─utils
│  │      authority.test.ts
│  │      authority.ts
└─typings
```

- 组件中回调属性：使用 onXxx

```tsx | pure
<Button onClick={... }></Button>

```

- onXXX 绑定的事件：使用 handleXXXX

```tsx | pure
<Button onClick={this.handlePay}>支付</Button>
```

- 接口命名前面带上 I 表示 interface
- 类型命名签名带上 T 表示 Type
- 使用 withXxx 形式的词作为高阶组件的名称

## interface 声明顺序

日常用到比较多的是四种，只读参数放第一位，必选参数第二位，可选参数次之，不确定参数放最后

```tsx | pure
interface IProps {
  readonly x: number;
  readonly y: number;
  name: string;
  age: number;
  height?: number;
  [key: string]: string;
}
```

## ts 好用的相关工具泛型

- Record<string,any> 用这个来声明对象结构的类型

```tsx | pure
// 用于定义一个ts对象，key是字符串，value是任意类型
const people:Record<string,any> = {
    name: 'chengfeng',
    age: 10
```

- Partial 作用是将传入的属性变为可选项.

```tsx | pure
interface IPeople {
  title: string;
  name: string;
}
// 定义的结构可以是接口IPeople的任意key
const people: Partial<IPeople> = {
  title: 'test',
};
```

- Readonly 作用是将传入的属性变为变成只读

```tsx | pure
interface IPeople {
    title: string;
    name: string;
}

// title name属性就是只读的了
const people: Readonly<Todo> = {
    title: 'test',
    name: chenfeng;
};
```

- Required 的作用是将传入的属性变为必选项

```tsx | pure
interface IPeople {
  title?: string;
  name?: string;
}
const people: Required<IPeople> = { title: 'ts' }; // Error: property 'name' missing
```

> [查看更多](https://github.com/Microsoft/TypeScript-Handbook/diffs/0?base_sha=22b37a2d8c9a1dd378795444baf954c2e7ecccf5&commentable=true&head_user=csantos42&pull_number=801&sha1=22b37a2d8c9a1dd378795444baf954c2e7ecccf5&sha2=9d4c56f5d414dbe23780719885baa3df40222412&short_path=0b2da51&unchanged=expanded&utf8=%E2%9C%93#requiredt)

## ts 一些好用的小 tips

- keyof

```tsx | pure
interface IPeople {
  name: string;
  age: number;
}

type T = keyof IPeople; // -> "name" | "age"
```

- in

```tsx | pure
type Keys = 'a' | 'b';

// -> { a: any, b: any }
type Obj = { [p in Keys]: any };
```

## 其他规范

- 不要使用 var 声明变量
- 不会被修改的变量使用 const 声明
- 去除声明但未被引用的代码
- 禁止在代码里使用 debug
- 不允许有空的代码块(代码保存的时候会自动去掉)
- 禁止 console.log 调试信息

## react 组件规范

- 如果不自己优化 render 性能，尽量用 PureComponent 代替 Component
- 简单的组件尽量使用函数组件，使用 useState、useEffect 等

## render 里面计算型数据尽量缓存，使用 momoize-One

```tsx | pure
import memoizeOne from 'memoize-one';
...
/**
 * 对数据源按key进行相邻行合并，返回生成的跨行对象,建议使用memoizeOne进行缓存调用
 * @param list 要进行合并的数据源列表
 * @param key key
 * @example mergeCells([{name:'xxg',title:'code'},{name:'刘德华',title:'code'},{name:'古天乐',title:'other'}],'title')==>{0:2,1:0,2:1}
 */
export function mergeCells<T>(list: T[], key: string | ((item: T) => string)): IKeyValue {
  const mergeObj = {};
  let startIndex = 0;
  list &&
    list.forEach((item, index, arr) => {
      let curValue;
      let preValue;
      if (typeof key === 'string') {
        curValue = item[key];
        preValue = arr[startIndex][key];
      } else {
        curValue = key(item);
        preValue = key(arr[startIndex]);
      }
      mergeObj[index] = 0;
      if (curValue === preValue) {
        mergeObj[startIndex] += 1;
      } else {
        mergeObj[index] = 1;
        startIndex = index;
      }
    });
  return mergeObj;
}

const editionDisplayNameMergeCell = memoizeOne(mergeCells);

{
  title: '版本',
  dataIndex: 'editionDisplayName',
  render: (name, _, index) => {
    const {
      pagedData: { items },
    } = this.props;
    // 因为render会频繁调用，此处计算得到的数据源基本是固定的，所以使用缓存 重复调用从缓存中获取哦
    const rowSpanMap = editionDisplayNameMergeCell(items, 'editionDisplayName');

    const obj = {
      children: name,
      props: {
        rowSpan: rowSpanMap[index],
      },
    };
    return obj;
  },
}
```

## 在 componentWillUnmount 里面去除副作用的函数

- 清除 EventListener
- 中止数据请求
- 清除定时器

## react 中的 key

- 对于组件中的 key 优化，起到最大化重用 dom
- 尽量别使用 index 作为 key

## 防止 xss 攻击

- input，textarea 等标签，不要直接把 html 文本直接渲染在页面上, 使用 xssb 等过滤之后再输出到标签上;

```tsx | pure
import { html2text } from 'xss';
render(){
  <div
  dangerouslySetInnerHTML={{

    __html: html2text(htmlContent)

  }}
/>
}

```

## 在组件中获取真实 dom

- 使用 16 版本后的 createRef()函数

```tsx | pure
class MyComponent extends React.Component<IProps, IState> {
  private inputRef = React.createRef();

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

## 减少魔法数字

- 写代码的时候尽量减少一些未知含义的数字，尽量用枚举, 例如 type === 0 的时候做了一些操作，让人不知所以然。

```tsx | pure
if (type !== 0) {
  // TODO
}

// good
const STATUS: Record<string, number> = {
  READY: 0,
  FETCHING: 1,
  FAILED: 2,
};

if (type === STATUS.READY) {
  // TODO
}

// best
enum STATUS {
  // 就绪
  READY = 0,
  // 请求中
  FETCHING = 1,
  // 请求失败
  FAILED = 2,
}
```

## Event 事件对象类型

- 很多小伙伴用了很久的 ts,都不知道常用 Event 事件对象类型：
- ClipboardEvent<T = Element> 剪贴板事件对象
- DragEvent<T = Element> 拖拽事件对象
- ChangeEvent<T = Element> Change 事件对象
- KeyboardEvent<T = Element> 键盘事件对象
- MouseEvent<T = Element> 鼠标事件对象
- TouchEvent<T = Element> 触摸事件对象
- WheelEvent<T = Element> 滚轮事件对象
- AnimationEvent<T = Element> 动画事件对象
- TransitionEvent<T = Element> 过渡事件对象

```tsx | pure
import { MouseEvent } from 'react';

interface IProps {
  onClick(event: MouseEvent<HTMLDivElement>): void;
}
```

## 使用私有属性取代 state 状态

- 对于一些不需要控制 ui 的状态属性，我们可以直接绑到 this 上， 即私有属性，没有必要弄到 this.state 上，不然会触发渲染机制，造成性能浪费 例如请求翻页数据的时候, 我们都会有个变量

```tsx | pure
// bad
state: IState = {
  pageNo:1,
  pageSize:10
};

// good
queryParams: Record<string, any> = {
  pageNo:1,
  pageSize:10
}

```

## 代码细粒度的思考

写组件或者函数的时候，工具函数和业务逻辑抽离，表单校验和业务抽离、事件函数和业务抽离，ajax 和业务抽离。例如有些页面是通过 location.href 跳转的，我们有些业务逻辑等都是放到 didMount,但是后期改需求，可能要用 react-router 进行跳转，可能要改的逻辑就会很多了，所以函数抽离出来，需求更新就少改一点代码。如果还不确定如何划分函数的细粒度，我有个建议。使用过两次以上的代码，要抽离组件或者函数，两次的可以不用

## 可以不挂在载组件内部的，尽量不要放在组件内部

```tsx | pure
// bad
renderHeader = () => {
  return (<div />)
}
renderBody = () => {
  return (<div />)
}
renderFooter = () => {
  return (<div />)
}
render(){
  return(
    <div>
      renderHeader()
      renderBody()
      renderFooter()
    </div>
  )
}

// good
function RenderHeader(props) =  {
  return (<div />)
}
function RenderBody(props) =  {
  return (<div />)
}
function RenderFooter(props) =  {
  return (<div />)
}
class Component extends React.Component<iProps, iState>{
  render () {
    return(
      <div>
        <RenderHeader />
        <RenderBody />
        <RenderFooter />
      </div>
    )
  }
}
```
