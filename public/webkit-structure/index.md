---
title: "webkit 浏览器架构"
date: "2019-04-26"
cta: "webkit"
spoiler: "你真的了解 chrome 是怎么渲染页面的么？"
---

## Process and Thread.

- thread 是 process 的一部分

![process and threads](./images/process-thread.png)

- 可以开启多个 process，process 之间通过 **IPC（Inter Process Communication）** 交互。

## 浏览器架构

![Chrome processes](./images/browserui.png)

| process 类型 | 内容                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Browser      | 1. chrome 应用。包含 address bar, bookmarks, back and forward buttons. 2. 还处理 Web 浏览器的不可见特权部分，例如网络请求和文件访问。 |
| Renderer     | tab 内容展示                                                                                                                          |
| Plugin       | 浏览器插件，比如 flash                                                                                                                |
| GPU          | 处理其他 process 的 GPU 任务                                                                                                          |

- 每个 Tab/iframe 会运行一个独立的 render process。
  - 独立 render process 可以当某个 Tab 崩溃，其他 Tab 正常工作
  - 独立 render process 保证了每个 iframe 访问的数据必须满足 same origin(同源政策) 。

## 页面跳转

![thread](./images/browserprocesses.png)

从 browser process 开始，包含 UI thread / Network thread / storage thread

### 步骤：

- 输入网址
- 回车确认
  - UI thread 初始化请求， network thread 查询 DNS / 建立 TLS 连接。此时 UI thread 使 tab 转圈圈。
  - 这个过程中 network thread 与 UI thread 会相互通信，比如 301，network 会让 UI thread 重新请求
- 接收请求

  - MIME-TYPE 校验

  - 跨域校验

  - 根据 MIME-TYPE 渲染数据

![HTTP response](./images/response.png)

- 如果请求是 HTML ，则渲染页面

  - UI thread 寻找对应的 renderer process 渲染

- renderer process 执行渲染
- 渲染完成

  - render process 通知 browser process

- 如果有新的 url 输入，页面需要跳转

  - browser process 通知 render process 处理 unloaded 事件

### service worker

> service worker 会对 network 做代理，允许用户选择读取 cache 还是发送请求获取新数据。

**service worker** 是 js 脚本，在 render process 中运行。但是 network thread 存在在 browser process 中，browser process 要如何知晓 render process 中存在 service worker 呢？

注册 service worker 时，会在 Network thread 中留下引用值。[相关链接](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)

## renderer process 处理页面渲染

![Renderer process](./images/renderer.png)

- Main thread 会处理大部分内容，包括 parsing / style 计算 / layout 构建 / paint 操作/ js 执行
- composition 则在单独的 compositor 执行

### parsing

- 解析 DOM。对错误处理友好。
- 可以边解析 DOM，边请求 `<img/>` 等资源
- js 会 block parsing

> `<script>` 标签添加 async / defer。这样不会阻断主流程
> `<link rel="preload">` 添加 preload 标志，告诉浏览器你希望这个资源能尽快下载.

### style 计算

![computed style](./images/computedstyle.png)

### Layout

浏览器会构建一个与 DOM 树类似的树，展示 x, y, width, height 信息。伪类元素也会在这个阶段应用。

![layout](./images/layout.png)

### paint

在这个阶段还需计算组件的 order。Layout 树会被遍历产生一个 Paint Record.

![paint records](./images/paint.png)

- 以 pipeline 的方式进行更新

![image-20190422224904804](./images/pipeline.png)

- js 也在 main thread 中进行，会阻碍渲染

![jage jank by JavaScript](./images/pagejank2.png)

可以将 js 操作颗粒化，可以使用 requestAnimationFrame() / web worker

![request animation frame](./images/raf.png)

### compositing 合成

![Apr-25-2019_23-01-04](./images/compositing.gif)

compositing 则是将 page 分成不同的 layer, 对每个 layer 都进行 raster(光栅化)，然后在 _compositor thread_ 上合成(composition).
页面滚动时因为 layer 都已经 raster 完成，只需要合成。

composition 会根据 Layout tree, 构建一棵 layer tree。不是一个 Element 一个 layer, 具体如下 [Stick to Compositor-Only Properties and Manage Layer Count](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

> compositing 不在 main thread 上完成，不需要等待 style 计算、js 执行.

### CSS 对各个阶段的影响

详情见： https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/

- transform 与 opacity 会在 compositor thread 中处理，不会影响主线程。
- 回流(reflows) 影响了 layout，重绘(repaint) 影响了 paint 过程

如何减少回流与重绘：
[ZXX 回流与重绘](https://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/)

## 参考文献

- [本文英文原文](https://developers.google.com/web/updates/2018/09/inside-browser-part1)
- [eliminate-content-repaints-with-the-new-layers-panel](https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752)
- [high-performance-animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- [Accelerated Rendering in Chrome](https://www.html5rocks.com/zh/tutorials/speed/layers/)
