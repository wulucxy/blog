---
title: "redux 最佳实践"
date: "2018-05-17"
cta: "redux"
spoiler: "redux 最佳实践，你想知道的都在这里"
---

**2020-03-09 更新：[typescript + redux 实战 demo](https://wulucxy.github.io/redux-typescript-guide/)**

## 1. 什么时候才需要引入 redux ？

![redux-pipeline](./images/redux-pipeline.png)

redux 的作者写过一篇文章，[你也许不需要 redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)，当你开发一个简单应用的时候，redux 不应该成为你的首选。相反，redux 约定了一套基础规范来约束开发：

- 用对象来描述应用状态 「store」
- 用对象来描述应用中的状态变化 「action」
- 用纯函数来描述处理状态变更的逻辑 [reducer]

那么，应用 redux 能够给我们带来的好处在于：

- 持久化状态数据
- ssr
- 实现 undo、redo 操作
- 应用状态的时间旅行管理
- 多用户协同开发
- 开发工具扩展能力
- 强大的组合能力

redux 提供的是一套全局的状态管理能力，如果你当前组件只需要本地 state 就能维护好应用状态，就没有必要引入 redux。只有当我们面临着以下场景：

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

redux 提供的解决方案就能有效地帮助我们管理数据的复杂性。

## 2. 学习 redux 之前的预备知识？

- react 应用 state 和 props 进行应用管理
- react 中应用 HOC 进行代码抽象和复用
- Context 全局对象
- Smart、 Dumb 组件
- 具体见[官网文档](https://reactjs.org/docs/hello-world.html)

## 3. redux 的基础知识

- [1. Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

- [2. 中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

- [3. react-redux](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

## 4. redux 数据结构

经常遇到的一个问题是：

**什么时候使用 Redux store，什么时候使用 React state？**

![redux_state](./images/redux_state.png)

[redux 官方文档给出的回答](https://redux.js.org/faq/organizing-state#organizing-state-only-redux-state)是：

- 如果明确状态变更只会影响当前组件，类似于按钮状态，输入框状态，内部数据联动展示、弹窗展示等，都建议放到 state 里面进行管理

- 当以下场景回答为“是”时，redux store 就是更好的选择：

  - 应用中的其他部分需要用到这部分数据吗？
  - 是否需要根据这部分原始数据创建衍生数据？
  - 这部分相同的数据是否用于驱动多个组件？
  - 你是否需要能够将数据恢复到某个特定的时间点（比如：在时间旅行调试的时候）？
  - 是否需要缓存数据？（比如：直接使用已经存在的数据，而不是重新请求）

实际上，我们需要一套更通用的方案来指导如何架构 redux store。按照我们的实际开发经验来看，可以将数据分为`ui状态`和`数据逻辑`:

### ui 状态

可以包括`弹窗展示`、`tab切换`，`下拉菜单`等不涉及数据逻辑的状态，通常这些更适合放在`React state`管理。

### 数据逻辑

我们可以通过**数据持久度**和**数据消费程度**来区分数据类型：

#### 数据持久度

- 快速变更型
- 中等持续型
- 长远稳定型

**快速变更型**，这类数据往往代表着短时间内快速变更，比如文本框内容可能随着用户输入持续变化，或者快速拖动变更位置等，这类数据更加适合维护在 state 中。

**中等持续性**，当用户浏览或者使用应用时，在刷新页面之前数据保持相对稳定，比如 ajax 获取数据，编辑 form 表单等，这类数据比较通用，可能被其他组件所应用。这类数据适合通过 redux store 维护，再通过 connect 被组件使用。

**长远稳定型**，指在页面多次刷新或者多次访问期间都保持不变的数据，这类数据通常不会放在 redux 里面维护，一般会放到 localstorage 或者 db 里面。

#### 数据消费程度

数据特性体现在消费层面，即有多少组件需要使用。越多组件消费的数据，就应该放在 redux store 里面维护，反之，当数据只服务于单一组件时，由 React State 维护就更加合理。

**最后，什么情况该使用哪种数据管理方式，是 React 维护 state 还是 Redux 集中管理，这个讨论不会有唯一定论。这需要开发者对于 React，Redux 深入理解，并结合场景需求完成选择。**

## 5. FSA 设计规范

redux 设计非常精简，并没有追求大而全。在具体实践上，官方并没有约定一套通用的标准，在开发社区里面有很多的约定方案，其中最广为接受的方案就是[FSA](https://github.com/redux-utilities/flux-standard-action)，全称是 `flux-standard-action`。

`FSA` 的设计理念在于规范 `action` 的标准写法，让开发者都遵循同一套规范，简单友好可依赖。具体的标准如下：

- `action` 是一个纯对象
- 必须要有 `type` 字段，来表示 action 类型
- 至少要有 `error`，`payload`, `meta` 属性之一
- 若 `action` 报错，`error` 必须为 true
- 不能有`type`, `error`，`payload`, `meta` 之外的其他属性

### type

[必选] `type` 属性必须是字符串类型常量，通过 `type` 可以将 `action` 和 `reducer` 串联起来。

### payload

[可选] payload 代表 action 存放的内容，可以是任意类型的数据。当`error`值为 true 时，此时 payload 应当是一个 Error 对象

### error

[可选] error 当取值为 true 时，此时 action 发生了错误

### meta

[可选] action 的额外信息，典型使用场景就是当 action payload 是一个 promise 时，通过 meta 来传递相应参数。

正式基于相同的 action 架构，`redux-actions`，`redux-promise-middle` 都是基于 `FSA` 架构的 action 处理工具。

## 6. redux store 设计

redux Store 是整个应用的核心，决定了应用如何渲染，渲染的结果是什么。所以设计好 redux store 是重中之重。

在设计 redux store 之前，我们先聊一下应用的架构。说到底，store 设计是需要服务应用架构的，离开项目需求单独讨论 store 是无本之木。

目前信贷中后台页面都是基于 papaya 的单页架构，单页架构又分为两种：

- A：每个页面都是一个独立的模块，页面切换会刷新当前页面，页面之间不需要共享全局状态（流程引擎）
- B：纯粹单页应用，多个模块共同组成一个页面，模块切换不会刷新当前页面，需要共享全局状态（机器学习）

这两类应用所维护的 store 架构就需要分开设计。

**从横向来看**，「A 应用」就适合于按「Page 页面」进行分类，也不需要抽取共享状态用于页面间分享：

```
- page1
  - module1
  - module2
  - module3
- page2
```

「B 应用」更适合于按照「Feature 功能」进行分类，模块之间需要抽象出全局共享状态：

```
- app（全局共享状态）
- routing（路由数据）
- module1
- module2
```

**从纵向来看**，store 设计通用设计可以参考：

- store 设计尽量扁平化，store 里面 state 结构不要超过 3 层，数据之间可以通过 `id` 进行连接
- 多个模块之间需要共享的数据，放到父模块存储

## 7. reducer 设计

redux 官方示范给的 reducer 写法：

```javascript
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
    // return state1
    case TOGGLE_TODO:
    // return state2
    default:
      return state;
  }
}
```

这种写法很好，但是不够精简，我们完全可以代替以 对象 写法：

```javascript
import typeToReducer from "type-to-reducer";

const todosReducer = typeToReducer(
  {
    [ADD_TODO]: (state, action) => state1,
    [TOGGLE_TODO]: (state, action) => state2,
  },
  []
);
```

不仅代码更加精简，语义性也变得更强了，并且还减少了维护成本，一举三得。

## 8. redux actions

基于 `FSA` 架构，我们可以产出两套`action` 方案：

### actionCreator 写法

`actionCreator` 写法接近于原生 action 写法:

```javascript
// 一个标准的actionCreator 同步写法
export const setWorkSpaceRectData = (value) => {
  return {
    type: types.SET_WORKSPACE_RECT_DATA,
    payload: { value },
  };
};
```

```javascript
// 一个标准的actionCreator 异步写法
export const queryAppList = (userName) => {
  return {
    type: types.QUERY_APP_LIST,
    payload: axios.get(`/serving/users/apps`),
    meta: userName,
  };
};
```

### redux-action 写法

社区提供另外一个简化 action 写法的解决方案，[redux-actions](https://github.com/redux-utilities/redux-actions)，基于 redux-actions 对上述 action 做下改造：

```javascript
import { createAction } from "redux-actions";

export const setWorkSpaceRectData = createAction(
  types.SET_WORKSPACE_RECT_DATA,
  (value) => {
    value;
  }
);

export const queryAppList = createAction(
  types.QUERY_APP_LIST,
  (userName) => axios.get(`/serving/users/apps`),
  (userName) => userName
);
```

个人还是偏向原生写法，redux-action 将 action 属性封装以后反而加大了理解难度。

## 9. redux 中间件

![redux-middleware](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016092002.jpg)

redux 的中间件模型类似于 koa 的洋葱模型，对`store.dispatch`方法进行改造，就可以添加功能，具体原理参考[2. 中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)。这里只是推荐一些常用的中间件。

### 9.1 redux-thunk

redux 原生设计只支持同步 Action，redux-thunk 的原理是 action 进行拦截判断，如果 thunk 发现 action 类型是函数，就在 action 回调里面再触发 action，这也是 redux 异步方案的通用解决方案。

```javascript
const getDataAction = function(id) {
  // 1. 这里 生成的action 是一个函数，通过thunk 包装以后，实际触发的action 是 action 2
  return function(dispatch, getState) {
    // 2. 这里才是真正触发的action
    dispatch({
      type: GET_DATA,
      payload: id
    })
  })
}

store.dispatch(getDataAction('a'))
```

### 9.2 redux-promise-middleware

redux-thunk 能够实现异步 action，但是无法实现异步 action 的串联

```javascript
action1() => then((res) => {
  return action2(res)
}
```

并且`redux-thunk`写法非常冗余，需要针对异步 action 手工添加状态信息，`redux-promise-middleware` 则会自动生成
`actionType_${status}`的 type 类型，结合[type-to-reducer](https://github.com/tomatau/type-to-reducer)就能实现很好地代码优化。

### 9.3 redux-logger

redux-logger 能够将 action 打印到控制台，非常方便 debug。

### 9.4 redux-devtools-extension

redux 作者维护的结合浏览器插件的开发神器。

## QA

1 是否允许按需 connect？

> 允许。具体还是从业务层面需求出发，如果当前组件我们认为其更加适合作为一个容器型组件，也就是跟业务数据有很强的关联，这个时候 connect 就是比较好的选择，反之，如果当前组件更偏向于展示型，那么数据来源更合适从父组件获取，而非 connect。

> 关于何时 connect 比较合适，目前无法提供一套通用的解决方案，还是需要从实际业务中去判断，一个原则是 当需要跟业务数据强关联，就合适 connect，反之如果组件更适合作为展示组件，就更适合从父组件上获取数据。

2 目录结构划分，是按照 action，reducer，constant 按功能进行页面区分，还是支持像 [ducks](https://github.com/erikras/ducks-modular-redux) 将所有文件统一管理？

> [ducks](https://github.com/erikras/ducks-modular-redux)写法推崇将 actionCreator，reducer，constant 都写到同一个文件里，优点在于减少页面切换。但 redux 作者并不赞同，因为这种写法会给用户造成 action 和 reducer 是一一对应的错误，并且当 action 需要共享 reducer 时，无法做到抽象。

> **结论**，优先推荐使用 ducks 写法，如果有复杂数据处理场景，建议采用按功能区分的写法。

3 immutable 在哪里 toJS？

> immutable 在 connect 里面 toJS 是一种反模式，并且在展示组件（Dumb）里面是否应用 immutable 对象，[官方并不推荐](https://redux.js.org/recipes/using-immutable.js-with-redux#never-use-immutable-js-in-your-dumb-components)，实际上如果组件之间传递的是 immutable 对象对性能提升有一定的帮助。

> **结论**，toJS 建议按需来转，比如当跟服务端进行数据交互时就应该执行 toJS 操作。另外，展示组件 推荐传递非 immutalble 对象，当需要性能优化时，可以考虑传递 immutable 对象

4 一个 action 是否需要聚合所有操作？

> action 聚合最合适的时候应该交由 view 层控制，每个 action 维护的都是最小单元的数据操作逻辑。通过`redux-promise-middleware` 可以实现 异步 action 串联和聚合效果。

> 另外，即使这种情况下，因为无法保证所有 action 都能返回 promise，所以**不建议移除 redux-thunk**。

5 目前在 papaya 中使用的 FSA、 type-to-reducer、ducks 这种是否为强制规范？

> FSA 是目前 redux 社区推荐的方案，建议使用，type-to-reducer 能够帮助书写更优雅的 reducer，并且是对 redux-promise-middleware 的优化写法，ducks 可以减少文件维护成本。

> **结论**，推荐使用 FSA、type-to-reducer、ducks 等写法。

6 哪种情况数据应该放在 state 中，哪种应该放在 store 中？

> 参考 [redux 数据结构](#4. redux 数据结构)

7 什么情况下使用 action , 什么情况下使用静态方法？

> 如果涉及到后端请求或前端查询数据，即使不用关心 action 操作返回的值，也建议使用 action，因为后续如果需求改动或者数据变更，有更好的可扩展性。静态方法适合于跟数据逻辑无关的 ui 状态。

8 如何组织一个前端业务操作流，例如：执行了发货操作，操作成功，执行查询操作，再执行 xxx 操作。。。

> 在 React 层来调用相应 action：

```javascript
this.mail().then((res) => {
  if (res.value) {
    return this.props.query().then((res2) => {
      // something else
    });
  }
});
```

9 promiseMiddleware 的最佳实践和反模式？

> [官方文档](https://github.com/pburtchaell/redux-promise-middleware/tree/master/docs/guides)
