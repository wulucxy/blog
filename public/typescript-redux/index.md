---
title: "大型项目 typescript + redux 实践"
date: "2019-08-01"
cta: "typescript, redux"
spoiler: "ts 到底香在哪里"
---

### 前言

typescript 是一个有着类型定义的 js 语言的超集。typescript 支持最新的 ESMAScript 特性，并且支持泛型、类型定义等静态语言特征，**是为了大规模应用而生**。我们团队之前在内部一些项目中初步尝试了 `React + Redux + TypeScript` 组合。本文则尝试梳理基于 `typescript` 如何更合理的架构 `redux`。

## 一. 环境配置

当前 `ts + react` 项目基础配置如下：

- 编译：@babel/preset-typescript
- 开发、打包：parcel
- 语法校验：eslint、tsc

其中引入 `babel/preset` 来替代 `ts-loader`，这样既解决了 ts 工程化构建效率问题，同时不影响类型校验，还统一了编译工具。

接入 `babel` 以后，需要对 `tsconfig` 规则稍作修改，此时 ts 的定位仅仅是类型校验，代码编译的工作就完全交给 `babel` 来处理了。

_tsconfig.json_

```json
{
  "compilerOptions": {
    // 解析为最新版本的es版本，babel 负责后续的编译
    "target": "esnext",
    "module": "esnext",
    // ts 的解析规则
    "lib": ["esnext", "dom"],
    // 绝对地址按照 node_modules 解析
    "moduleResolution": "node",
    // 开启 jsx
    "jsx": "react",
    // 不执行构建，交由 babel 执行
    "noEmit": true,
    // 严格模式，包括 strictNullChecks & noImplicitAny.
    "strict": true,
    // 跳过三方包检查
    "skipLibCheck": true,
    // any 类型不警告
    "noImplicitAny": true,
    // 关闭 null 严格检查
    "strictNullChecks": false,
    // 将每个文件作为单独的模块
    "isolatedModules": true,
    // Import non-ES modules as default imports.
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

接下来还需要配置 `eslint` 规则：

_.eslintrc_

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaVersion": 2018
  },
  "extends": [
    "@npm/standard/react",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    // 自定义 lint 规则
    "react/prop-types": false,
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

最后一步就是在 `package.json` 里面添加脚本命令了：

_package.json_

```json
"scripts": {
  "start": "parcel src/public/index.html --open",
  "prebuild": "npm run build:clean",
  "build:clean": "rimraf ./dist",
  "build": "parcel build src/public/index.html --no-source-maps",
  "lint": "eslint src --fix --format codeframe",
  "lint-staged": "lint-staged",
  "ts-compile-check": "tsc --pretty -p tsconfig.json"
}
```

以上，我们就实现了一套完整工程化能力的 `typescript` 开发环境了。

> let's RUN~~~

![run](./images/run.png)

## 二. 数据和分层

### 1. 目录结构

目录即分层，一个好的目录结构能够让我们在开发中更加得心应手。在开发 redux 应用中，有一种普遍的做法是根据 `action`, `reducer` 功能进行分层，一个典型的应用是这样的：

```
.
|-- actions             // 全局 action
|-- components          // 公共组件
|   |-- Footer.tsx
|   |-- Header.tsx
|-- pages               // 页面
|   |-- home
|      |-- components  // 组件入口
|      `-- index.tsx   // 页面入口
|-- reducers           // 全局 reducer
|-- store              // store 入口
|-- types.d.ts         // 三方类型声明
```

在实际开发中，开发往往会在不同文件中来回跳跃，尤其是当项目文件膨胀以后，在不同文件中跳跃式寻找会占据很大比例的时间。基于此，社区开始流行另外一种开发方式，俗称「ducks」规则，简而言之就是将 `action`, `reducer`，`actionType` 放在一起进行管理，[参考链接](https://github.com/erikras/ducks-modular-redux)。 其中 `ducks` 命名来自于`redux` 结尾音。

**ducks**

```
.
|-- components           // 公共组件
|   |-- Footer.tsx
|   |-- Header.tsx
|-- pages
|   |-- home
|   |  |-- index.ts      // 页面入口
|   |  |-- components    // 组件
|   |  |-- types.ts      // 类型声明
|   |  `-- reducer.ts    // action/reducer
|-- store                 // redux store 入口
|-- types.d.ts            // 三方组件类型声明
```

### 2. 数据不可变性

在 redux 开发中，需要遵循的一个原则是`数据不可变性 (immutable)`，每个 reducer 不能修改原始值，而只能返回一个新的 state。

在 接触 `typescript` 之前，[immutable.js](https://immutable-js.github.io/immutable-js/) 是结合 redux 实现数据不可变的最佳辅助工具。然而，`immutable.js` 对 `ts` 的支持就一言难尽了，这两者都是很好的工具，但是放在一起，却是那么的不合适。

所以我们在实际项目中尝试了使用 [immer](https://github.com/immerjs/immer) 来实现数据持久化，`immer` 通过 `proxy` 实现了用原生 js 语法实现了数据不可变。虽然写起来没有像 `immutable.js` 函数式写法那么爽，但至少能用。

> 后续，我们仍然会探索基于 `immutable.js` 的 `typescript` 写法，不再本文范畴之内。

### 3. Store

在 `Store` 中我们将 `reducer` 进行聚合，并对外导出应用级别的状态数据。

_src/store/root-reducers.ts_

```javascript
// 页面 reducer 聚合
import { ReducersMapObject } from "redux";
// 导入每个页面独立的 reducer 和 类型声明
import bitcoin from "../pages/basic/reducer";
import { BitcoinState } from "../pages/basic/types";

// 应用级数据类型接口
export interface AppState {
  bitcoin: BitcoinState;
}

const reducers: ReducersMapObject = {
  bitcoin,
};

export default reducers;
```

_src/store/create.ts_

```javascript
// 导入 redux 和 immer 相应的方法
import { createStore, Reducer } from "redux";
import produce from "immer";
import { combineReducers } from "redux-immer";

// 聚合后的 reducer 和顶层应用数据
import reducers, { AppState } from "./root-reducer";

// 通过 combineReducer 将 reducer 合并为一
// 注意这里的 combineReducers 是基于 immer 的实现
const rootReducer: Reducer<AppState> = combineReducers(produce, reducers);

// 导出 store
export default function (initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(Thunk, promiseMiddleware, Logger)
  );
}
```

### 4. 声明类型文件 .d.ts

我们在项目中会依赖到很多三方、二方包仍然是用纯 js 实现的，将这些代码重构为 `typescript` 显然是不现实的，ts 的做法是我们可以声明 `.d.ts` 类型文件将三方包引入到 ts 工程中。

`.d.ts` 中 `d` 的含义是 `declaration` 即声明，实际使用我们无需关注具体实现，而只需要导出类型声明即可。

最简单的声明文件是这样的：

```
declare module '@npm/r3'
```

但是如果你的项目中类型声明非常重要的话，建议到 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 查看更多优质类型定义文件，并贡献自己的力量。

在声明类型文件还有一种**取巧的做法**是定义全局类型，全局类型无需导入即可对所有文件可见，举例：

_typing.d.ts_

```
interface IUser {
  name: string
  phone: number
}
```

定义好之后你在任意文件中都可以直接使用该类型。

实际上这样做有可商榷之处，在导入三方类型声明的文件中，用来声明当前应用的全局类型。这样的做法 [社区并不推荐](https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript)。实际上你应该定义一个独立的 `.ts` 文件，然后通过 `export/import` 来引用。

## 三. reducer

前面我们提到将 `reducer`，`action`，`actionType` 按照 `ducks` 规则统一到一个文件中管理, 并且将**类型声明**也统一到一个文件。接下来我们展开来介绍这部分内容：

### 1. types

`actionType` 是一种可枚举类型：

```javascript
export enum BitcoinActionTypes {
  // 请求比特币周期价格指数
  BITCOIN_QUERY_LIST = "BITCOIN_QUERY_LIST",
  // 请求比特币当前价格
  BITCOIN_QUERY_CURRENCY = "BITCOIN_QUERY_CURRENCY",
  // 设置当前过滤条件
  BITCOIN_SET_FILTER = "BITCOIN_SET_FILTER"
}
```

通过枚举类型结合 `typescript` 的强类型自动推导能力，可以实现开发自动输入补全：
![enum](./images/infer.png)

### 2. actions

redux 中的 `action` 分为两类：同步和异步。

**同步 action**

```javascript
import { BitcoinActionTypes } from "./types";

export const setFilterType = (filterType: string) => ({
  type: BitcoinActionTypes.BITCOIN_SET_FILTER,
  payload: { filterType },
});
```

借助 `typeof` 关键词，我们在`types` 文件中非常方便地导出类型：

_types.ts_

```javascript
import { setFilterType } from "./reducer";
export type SetFilterType = typeof setFilterType;
```

**异步 action**

在项目中我们使用了 [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) 进行异步 action 的管理，异步 action 会返回 promise，但是写法仍然沿用同步 action 的写法。

```javascript
import { AsyncAction } from "redux-promise-middleware";

export const queryBPICurrency = (): AsyncAction => {
  return {
    type: BitcoinActionTypes.BITCOIN_QUERY_CURRENCY,
    // 这里这里payload 实际返回的是 promise
    payload: axios.get("//api.coindesk.com/v1/bpi/currentprice/cny.json"),
  };
};
```

注意这里的 `AsyncAction` 来自 `redux-promise-middleware` 的 [类型定义](https://github.com/pburtchaell/redux-promise-middleware/blob/master/src/index.d.ts)。

通过 `typeof` 类型推导:

_types.ts_

```javascript
import { queryBPI } from "./reducer";
export type QueryBPI = typeof queryBPI;
```

结果如下：

```
type QueryBPI = (params: BPIParams) => AsyncAction
```

### 3.reducer

结合`redux-promise-middleware`，`type-to-reducer` 和 `immer`，我们来完成具备类型的 `reducer`。

_types.ts_

```javascript
// state 类型
// 其中 Record 泛型是 `{ [key: string]: T }` 的简写
export interface BitcoinState {
  filterType: string;
  requestLoading: boolean;
  currentPrice: Record<string, BitcoinPrice>;
}
```

**reducer.ts**

```javascript
import typeToReducer from "type-to-reducer";
import { BitcoinActionTypes, BPIParams } from "./types";

// 导出 reducer
export default typeToReducer(
  // 同步 action
  [BitcoinActionTypes.BITCOIN_SET_FILTER]: (state, action) => {
    const { filterType } = action.payload;
    // immer 包装后可以直接用原生 js 修改值
    state.filterType = filterType;
    return state;
  },
  // 异步action
  BitcoinActionTypes.BITCOIN_QUERY_CURRENCY]: {
    PENDING: (state, action) => {
      state.requestLoading = true
      return state
    },
    FULFILLED: (state, action) => {
      const { bpi } = action.payload;
      state.currentPrice = bpi;
      return state;
    }
  }
)
```

## 四. 连接组件

接下来我们将类型化后的 redux 连接到 React 组件：

### 1. connect 连接

react 组件和 redux 通过 `react-redux` 的 connect 方法进行连接：

```javascript
import { connect } from "react-redux";
import { AppState } from "../../store/root-reducer";

// 导入类型
import {
  SetFilterType,
  QueryBPICurrency,
  QueryBPI,
  BitcoinState,
  BPIParams,
} from "./types";

// 类型扩展
interface BasicProps extends BitcoinState {
  setFilterType: SetFilterType;
  queryBPICurrency: QueryBPICurrency;
  queryBPI: QueryBPI;
}

// 这里通过 Class 组件引入类型
// 如果是函数式组件，就使用 React.FC<BasicProps> 声明类型
class Basic extends React.Component<BasicProps> {
  render() {
    // do something
  }
}

// 将 state 数据导出为属性
const select = (state: AppState) => {
  const { bitcoin } = state;
  return {
    requestLoading: bitcoin.requestLoading,
    filterType: bitcoin.filterType,
    currentPrice: get(bitcoin, "currentPrice.CNY", {}),
  };
};

// 最后一步：完成 redux 和 组件的连接
// 顺便导入一下 action
export default connect(select, {
  setFilterType,
  queryBPI,
  queryBPICurrency,
})(Basic);
```

到此，我们就基本上完成了一个 `typescript + redux + react` 的应用，_源码后续会放出_。

## 总结

> 这 ts 有什么用，限制多，运行慢，除了带给我一堆警告，还有什么作用？
>
> ts 类型声明这么复杂，还引入了这么多新概念，跟框架兼容性又这么差
>
> 我就是辞职，不写前端了，也特么不用巨硬造的假 java
>
> ......
>
> ts 真香，再也不想用 js 了。

学习 `typescript` 是一段漫长的旅程，学习 ts 语法并不难，难的是框架对 ts 的支持度。以 React 为例，单单写一个 redux 版本的基础应用就踩了很多坑，甚至为了写 ts 不得不抛弃了`immutable.js` -- 一个数据不可变函数式工具，更不用提社区数量繁多的其他三方库了。

ts 不是银弹，ts 无法解决你的代码结构问题，也不能避免语法 Bug，**”彼之蜜糖,吾之毒药“**，当 ts 类型使用不当的时候，强行接入反而会给你造成更大的困扰。

**ts 适合什么场景？**

我个人认为:

1. 中大型项目，需要长期维护的项目，底层库 or 框架

2. 上一条的前提是，项目主要依赖的类库对 ts 支持良好，最好有业界的先行案例

所以用一些冷门框架或者小项目的时候我是不建议使用 ts 的，ts 没问题，框架也没问题，框架+ ts 会有很多问题。
