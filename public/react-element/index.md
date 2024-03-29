---
title: "React 类型探究"
date: "2018-12-28"
cta: "react"
spoiler: "React Element, Node, Component, DomElement 和 Instance..."
---

## 1. `ReactElement`

`ReactElement` 是构建 `React` 应用的**最小单元**。

`ReactElement` 是 `React` 用来描述真实 `DOM` 元素的制造出来的 `js` 对象，其主要属性如下表：

| name  | type                   | description                                                            |
| ----- | ---------------------- | ---------------------------------------------------------------------- |
| key   | Key / null             | 元素唯一标识                                                           |
| type  | string / ComponentType | 元素类型（字符串代表 `DOM Element`，函数和类代表 `Component Element`） |
| props | object                 | 元素属性集合                                                           |

完整的定义为：

```javascript
type Key = string | number;
type ComponentType<P = {}> = ComponentClass<P> | StatelessComponent<P>;

interface ReactElement<P> {
  key: Key | null;
  type: string | ComponentType<P>;
  props: P;
}
```

### 1.1 `DOMElement`

当 `ReactElement.type` 为 `string` 时候，`ReactElement` 可看作 `DOMElement`，`DOMElement` 的定义如下：

```javascript
interface DOMElement<P extends HTMLAttributes<T> | SVGAttributes<T>, T extends Element> extends ReactElement<P> {
  type: string;
  ref: Ref<T>;
}
```

`DOMElement` 又分为两大类 `ReactHTMLElement` 和 `ReactSVGElement`:

```javascript
interface ReactHTMLElement<T extends HTMLElement> extends DetailedReactHTMLElement<AllHTMLAttributes<T>, T> {}

interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
  type: keyof ReactHTML;
}

interface ReactSVGElement extends DOMElement<SVGAttributes<SVGElement>, SVGElement> {
  type: keyof ReactSVG;
}
```

### 1.2 `ComponentElement` & `SFCElement`

`ReactElement.type` 类型为 `string | ComponentType`，其中 `ComponentType` 的类型定义如下：

```javascript
type ComponentType<P = {}> = ComponentClass<P> | StatelessComponent<P>;
```

- `ComponentClass`:
  `ComponentClass` 即代表 `class` 类型的组件，它有自己的构造函数 `Component`， `ComponentClass` 定义如下：

```javascript
// 基本 ComponentClass
interface ComponentClass<P = {}> {
  new (props?: P, context?: any): Component<P, ComponentState>;
  propTypes?: ValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  childContextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

// ClassicComponentClass 继承自 ComponentClass
interface ClassicComponentClass<P = {}> extends ComponentClass<P> {
  new (props?: P, context?: any): ClassicComponent<P, ComponentState>;
  getDefaultProps?(): P;
}
```

由 `ComponentClass` 构造出来的 `ReactElement` 叫做 `ComponentElement`，定义如下：

```javascript
interface ComponentElement<P, T extends Component<P, ComponentState>> extends ReactElement<P> {
  type: ComponentClass<P>;
  ref?: Ref<T>;
}
```

- `StatelessComponent`:
  `StatelessComponent` 即无状态组件，简称 `SFC`，定义如下：

```javascript
type SFC<P = {}> = StatelessComponent<P>;

interface StatelessComponent<P = {}> {
  (
    props: P & { children?: ReactNode },
    context?: any
  ): ReactElement<any> | null;
  propTypes?: ValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```

由 `SFC` 构造出来的 `ReactElement` 叫做 `SFCElement`，定义如下：

```javascript
interface SFCElement<P> extends ReactElement<P> {
  type: SFC<P>;
}
```

可以看出，与 `DOMElement` 与 `ComponentElement` 相比，`SFCElement` 不含 `ref`

## 2. `Component`

`Component` 继承自 `ComponentLifecycle`（组件生命周期），同时通过 `Component` 又派生出 `PureComponent` 和 `ClassicComponent`，定义如下：

```javascript
interface ComponentLifecycle<P, S> {
  componentWillMount?(): void;
  componentDidMount?(): void;
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any): void;
  componentWillUnmount?(): void;
}

interface Component<P = {}, S = {}> extends ComponentLifecycle<P, S> { }
  class Component<P, S> {
    constructor(props?: P, context?: any);
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: P) => (Pick<S, K> | S)) | (Pick<S, K> | S),
      callback?: () => any
    ): void;

    forceUpdate(callBack?: () => any): void;
    render(): JSX.Element | null | false;

    props: Readonly<{ children?: ReactNode }> & Readonly<P>;
    state: Readonly<S>;
    context: any;
    refs: {
      [key: string]: ReactInstance
    };
}

class PureComponent<P = {}, S = {}> extends Component<P, S> { }

interface ClassicComponent<P = {}, S = {}> extends Component<P, S> {
  replaceState(nextState: S, callback?: () => any): void;
  isMounted(): boolean;
  getInitialState?(): S;
}
```

## 3. `ReactInstance`

`ReactInstance` 既可以是 `Component` 的实例，也可以是一个 `Element`（最基础的元素）

```javascript
type ReactInstance = Component<any> | Element;
```

## 4. `ReactNode`

```javascript
type ReactText = string | number;
type ReactChild = ReactElement<any> | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;
```

## 5. `SyntheticEvent`

```javascript
interface SyntheticEvent<T> {
  bubbles: boolean;
  currentTarget: EventTarget & T;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  target: EventTarget;
  timeStamp: number;
  type: string;
}
```

参考资料：

> https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v15/index.d.ts

> https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/global.d.ts

> https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
