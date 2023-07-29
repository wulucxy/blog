(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{51:function(e,t,r){"use strict";r.r(t),r.d(t,"readingTime",function(){return n}),r.d(t,"default",function(){return i}),r.d(t,"tableOfContents",function(){return s}),r.d(t,"frontMatter",function(){return o});var a=r(13),b=(r(0),r(19)),l=["components"],n={text:"5 min read",minutes:4.35,time:261e3,words:870},c={},p="wrapper";function i(e){var t=e.components,r=Object(a.a)(e,l);return Object(b.b)(p,Object.assign({},c,r,{components:t,mdxType:"MDXLayout"}),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},"\u6765\u81ea\u7f51\u53cb @cukunbu \u539f\u521b")),Object(b.b)("h2",{id:"process-and-thread"},"Process and Thread."),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"thread \u662f process \u7684\u4e00\u90e8\u5206")),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/process-thread.png",alt:"process and threads"})),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u53ef\u4ee5\u5f00\u542f\u591a\u4e2a process\uff0cprocess \u4e4b\u95f4\u901a\u8fc7  ",Object(b.b)("strong",{parentName:"li"},"IPC\uff08Inter Process Communication\uff09"),"  \u4ea4\u4e92\u3002")),Object(b.b)("h2",{id:"\u6d4f\u89c8\u5668\u67b6\u6784"},"\u6d4f\u89c8\u5668\u67b6\u6784"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/browserui.png",alt:"Chrome processes"})),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"process \u7c7b\u578b"),Object(b.b)("th",{parentName:"tr",align:null},"\u5185\u5bb9"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"Browser"),Object(b.b)("td",{parentName:"tr",align:null},"1. chrome \u5e94\u7528\u3002\u5305\u542b address bar, bookmarks, back and forward buttons. 2. \u8fd8\u5904\u7406Web\u6d4f\u89c8\u5668\u7684\u4e0d\u53ef\u89c1\u7279\u6743\u90e8\u5206\uff0c\u4f8b\u5982\u7f51\u7edc\u8bf7\u6c42\u548c\u6587\u4ef6\u8bbf\u95ee\u3002")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"Renderer"),Object(b.b)("td",{parentName:"tr",align:null},"tab \u5185\u5bb9\u5c55\u793a")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"Plugin"),Object(b.b)("td",{parentName:"tr",align:null},"\u6d4f\u89c8\u5668\u63d2\u4ef6\uff0c\u6bd4\u5982 flash")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"GPU"),Object(b.b)("td",{parentName:"tr",align:null},"\u5904\u7406\u5176\u4ed6 process \u7684 GPU \u4efb\u52a1")))),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u6bcf\u4e2a Tab/iframe \u4f1a\u8fd0\u884c\u4e00\u4e2a\u72ec\u7acb\u7684 render process\u3002",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u72ec\u7acb render process \u53ef\u4ee5\u5f53\u67d0\u4e2a Tab \u5d29\u6e83\uff0c\u5176\u4ed6 Tab \u6b63\u5e38\u5de5\u4f5c"),Object(b.b)("li",{parentName:"ul"},"\u72ec\u7acb render process \u4fdd\u8bc1\u4e86\u6bcf\u4e2a iframe \u8bbf\u95ee\u7684\u6570\u636e\u5fc5\u987b\u6ee1\u8db3 same origin(\u540c\u6e90\u653f\u7b56) \u3002")))),Object(b.b)("h2",{id:"\u9875\u9762\u8df3\u8f6c"},"\u9875\u9762\u8df3\u8f6c"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/browserprocesses.png",alt:"thread"})),Object(b.b)("p",null,"\u4ece browser process \u5f00\u59cb\uff0c\u5305\u542b UI thread / Network thread / storage thread"),Object(b.b)("h3",{id:"\u6b65\u9aa4"},"\u6b65\u9aa4\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u8f93\u5165\u7f51\u5740")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u56de\u8f66\u786e\u8ba4"),Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"UI thread \u521d\u59cb\u5316\u8bf7\u6c42\uff0c network thread \u67e5\u8be2 DNS / \u5efa\u7acb TLS \u8fde\u63a5\u3002\u6b64\u65f6 UI thread \u4f7f tab \u8f6c\u5708\u5708\u3002"),Object(b.b)("li",{parentName:"ul"},"\u8fd9\u4e2a\u8fc7\u7a0b\u4e2d network thread \u4e0e UI thread \u4f1a\u76f8\u4e92\u901a\u4fe1\uff0c\u6bd4\u5982301\uff0cnetwork \u4f1a\u8ba9 UI thread \u91cd\u65b0\u8bf7\u6c42"))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u63a5\u6536\u8bf7\u6c42"),Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"MIME-TYPE \u6821\u9a8c")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u8de8\u57df\u6821\u9a8c")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u6839\u636e MIME-TYPE \u6e32\u67d3\u6570\u636e"))))),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/response.png",alt:"HTTP response"})),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u5982\u679c\u8bf7\u6c42\u662f HTML \uff0c\u5219\u6e32\u67d3\u9875\u9762"),Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"UI thread \u5bfb\u627e\u5bf9\u5e94\u7684 renderer process \u6e32\u67d3"))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"renderer process \u6267\u884c\u6e32\u67d3")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u6e32\u67d3\u5b8c\u6210"),Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"render process \u901a\u77e5 browser process "))),Object(b.b)("li",{parentName:"ul"},Object(b.b)("p",{parentName:"li"},"\u5982\u679c\u6709\u65b0\u7684 url \u8f93\u5165\uff0c\u9875\u9762\u9700\u8981\u8df3\u8f6c"),Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"browser process \u901a\u77e5 render process \u5904\u7406 unloaded \u4e8b\u4ef6")))),Object(b.b)("h3",{id:"service-worker"},"service worker"),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},"service worker \u4f1a\u5bf9 network \u505a\u4ee3\u7406\uff0c\u5141\u8bb8\u7528\u6237\u9009\u62e9\u8bfb\u53d6 cache \u8fd8\u662f\u53d1\u9001\u8bf7\u6c42\u83b7\u53d6\u65b0\u6570\u636e\u3002")),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"service worker")," \u662f js \u811a\u672c\uff0c\u5728 render process \u4e2d\u8fd0\u884c\u3002\u4f46\u662f network thread \u5b58\u5728\u5728 browser process \u4e2d\uff0cbrowser process \u8981\u5982\u4f55\u77e5\u6653 render process \u4e2d\u5b58\u5728 service worker \u5462\uff1f"),Object(b.b)("p",null,"\u6ce8\u518c service worker \u65f6\uff0c\u4f1a\u5728 Network thread \u4e2d\u7559\u4e0b\u5f15\u7528\u503c\u3002",Object(b.b)("a",{parentName:"p",href:"https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle"},"\u76f8\u5173\u94fe\u63a5")),Object(b.b)("h2",{id:"renderer-process-\u5904\u7406\u9875\u9762\u6e32\u67d3"},"renderer process \u5904\u7406\u9875\u9762\u6e32\u67d3"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/renderer.png",alt:"Renderer process"})),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"Main thread \u4f1a\u5904\u7406\u5927\u90e8\u5206\u5185\u5bb9\uff0c\u5305\u62ec parsing / style \u8ba1\u7b97 / layout \u6784\u5efa / paint \u64cd\u4f5c/ js \u6267\u884c"),Object(b.b)("li",{parentName:"ul"},"composition \u5219\u5728\u5355\u72ec\u7684 compositor \u6267\u884c")),Object(b.b)("h3",{id:"parsing"},"parsing"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u89e3\u6790 DOM\u3002\u5bf9\u9519\u8bef\u5904\u7406\u53cb\u597d\u3002"),Object(b.b)("li",{parentName:"ul"},"\u53ef\u4ee5\u8fb9\u89e3\u6790 DOM\uff0c\u8fb9\u8bf7\u6c42 ",Object(b.b)("inlineCode",{parentName:"li"},"<img/>")," \u7b49\u8d44\u6e90"),Object(b.b)("li",{parentName:"ul"},"js \u4f1a block parsing")),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},Object(b.b)("inlineCode",{parentName:"p"},"<script>")," \u6807\u7b7e\u6dfb\u52a0 async / defer\u3002\u8fd9\u6837\u4e0d\u4f1a\u963b\u65ad\u4e3b\u6d41\u7a0b\n",Object(b.b)("inlineCode",{parentName:"p"},'<link rel="preload">')," \u6dfb\u52a0 preload \u6807\u5fd7\uff0c\u544a\u8bc9\u6d4f\u89c8\u5668\u4f60\u5e0c\u671b\u8fd9\u4e2a\u8d44\u6e90\u80fd\u5c3d\u5feb\u4e0b\u8f7d.")),Object(b.b)("h3",{id:"style-\u8ba1\u7b97"},"style \u8ba1\u7b97"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/computedstyle.png",alt:"computed style"})),Object(b.b)("h3",{id:"layout"},"Layout"),Object(b.b)("p",null,"\u6d4f\u89c8\u5668\u4f1a\u6784\u5efa\u4e00\u4e2a\u4e0e DOM \u6811\u7c7b\u4f3c\u7684\u6811\uff0c\u5c55\u793a x, y, width, height \u4fe1\u606f\u3002\u4f2a\u7c7b\u5143\u7d20\u4e5f\u4f1a\u5728\u8fd9\u4e2a\u9636\u6bb5\u5e94\u7528\u3002"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/layout.png",alt:"layout"})),Object(b.b)("h3",{id:"paint"},"paint"),Object(b.b)("p",null,"\u5728\u8fd9\u4e2a\u9636\u6bb5\u8fd8\u9700\u8ba1\u7b97\u7ec4\u4ef6\u7684 order\u3002Layout \u6811\u4f1a\u88ab\u904d\u5386\u4ea7\u751f\u4e00\u4e2a Paint Record."),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/paint.png",alt:"paint records"})),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u4ee5 pipeline \u7684\u65b9\u5f0f\u8fdb\u884c\u66f4\u65b0")),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/pipeline.png",alt:"image-20190422224904804"})),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"js \u4e5f\u5728 main thread \u4e2d\u8fdb\u884c\uff0c\u4f1a\u963b\u788d\u6e32\u67d3")),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/pagejank2.png",alt:"jage jank by JavaScript"})),Object(b.b)("p",null,"\u53ef\u4ee5\u5c06 js \u64cd\u4f5c\u9897\u7c92\u5316\uff0c\u53ef\u4ee5\u4f7f\u7528 requestAnimationFrame() / web worker"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/raf.png",alt:"request animation frame"})),Object(b.b)("h3",{id:"compositing-\u5408\u6210"},"compositing \u5408\u6210"),Object(b.b)("p",null,Object(b.b)("img",{parentName:"p",src:"https://github.com/wulucxy/blog/raw/master/src/routes/posts/2019-04-26-webkit-structure/image/compositing.gif",alt:"Apr-25-2019_23-01-04"})),Object(b.b)("p",null,"compositing \u5219\u662f\u5c06 page \u5206\u6210\u4e0d\u540c\u7684 layer, \u5bf9\u6bcf\u4e2a layer \u90fd\u8fdb\u884c raster(\u5149\u6805\u5316)\uff0c\u7136\u540e\u5728  ",Object(b.b)("em",{parentName:"p"},"compositor thread")," \u4e0a\u5408\u6210(composition).\n\u9875\u9762\u6eda\u52a8\u65f6\u56e0\u4e3a layer \u90fd\u5df2\u7ecf raster \u5b8c\u6210\uff0c\u53ea\u9700\u8981\u5408\u6210\u3002"),Object(b.b)("p",null,"composition \u4f1a\u6839\u636e Layout tree, \u6784\u5efa\u4e00\u68f5 layer tree\u3002\u4e0d\u662f\u4e00\u4e2aElement \u4e00\u4e2alayer, \u5177\u4f53\u5982\u4e0b ",Object(b.b)("a",{parentName:"p",href:"https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count"},"Stick to Compositor-Only Properties and Manage Layer Count")),Object(b.b)("blockquote",null,Object(b.b)("p",{parentName:"blockquote"},"compositing \u4e0d\u5728 main thread \u4e0a\u5b8c\u6210\uff0c\u4e0d\u9700\u8981\u7b49\u5f85  style \u8ba1\u7b97\u3001js \u6267\u884c.")),Object(b.b)("h3",{id:"css-\u5bf9\u5404\u4e2a\u9636\u6bb5\u7684\u5f71\u54cd"},"CSS \u5bf9\u5404\u4e2a\u9636\u6bb5\u7684\u5f71\u54cd"),Object(b.b)("p",null,"\u8be6\u60c5\u89c1\uff1a ",Object(b.b)("a",{parentName:"p",href:"https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/"},"https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"transform \u4e0e opacity \u4f1a\u5728compositor thread \u4e2d\u5904\u7406\uff0c\u4e0d\u4f1a\u5f71\u54cd\u4e3b\u7ebf\u7a0b\u3002"),Object(b.b)("li",{parentName:"ul"},"\u56de\u6d41(reflows) \u5f71\u54cd\u4e86 layout\uff0c\u91cd\u7ed8(repaint) \u5f71\u54cd\u4e86 paint \u8fc7\u7a0b")),Object(b.b)("p",null,"\u5982\u4f55\u51cf\u5c11\u56de\u6d41\u4e0e\u91cd\u7ed8\uff1a\n",Object(b.b)("a",{parentName:"p",href:"https://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/"},"ZXX \u56de\u6d41\u4e0e\u91cd\u7ed8")),Object(b.b)("h2",{id:"\u53c2\u8003\u6587\u732e"},"\u53c2\u8003\u6587\u732e"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"https://developers.google.com/web/updates/2018/09/inside-browser-part1"},"\u672c\u6587\u82f1\u6587\u539f\u6587")," "),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752"},"eliminate-content-repaints-with-the-new-layers-panel")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/"},"high-performance-animations")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"https://www.html5rocks.com/zh/tutorials/speed/layers/"},"Accelerated Rendering in Chrome"))))}i.isMDXComponent=!0;var s=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return[{id:"process-and-thread",level:2,title:"Process and Thread.",children:[]},{id:"\u6d4f\u89c8\u5668\u67b6\u6784",level:2,title:"\u6d4f\u89c8\u5668\u67b6\u6784",children:[]},{id:"\u9875\u9762\u8df3\u8f6c",level:2,title:"\u9875\u9762\u8df3\u8f6c",children:[{id:"\u6b65\u9aa4",level:3,title:"\u6b65\u9aa4\uff1a",children:[]},{id:"service-worker",level:3,title:"service worker",children:[]}]},{id:"renderer-process-\u5904\u7406\u9875\u9762\u6e32\u67d3",level:2,title:"renderer process \u5904\u7406\u9875\u9762\u6e32\u67d3",children:[{id:"parsing",level:3,title:"parsing",children:[]},{id:"style-\u8ba1\u7b97",level:3,title:"style \u8ba1\u7b97",children:[]},{id:"layout",level:3,title:"Layout",children:[]},{id:"paint",level:3,title:"paint",children:[]},{id:"compositing-\u5408\u6210",level:3,title:"compositing \u5408\u6210",children:[]},{id:"css-\u5bf9\u5404\u4e2a\u9636\u6bb5\u7684\u5f71\u54cd",level:3,title:"CSS \u5bf9\u5404\u4e2a\u9636\u6bb5\u7684\u5f71\u54cd",children:[]}]},{id:"\u53c2\u8003\u6587\u732e",level:2,title:"\u53c2\u8003\u6587\u732e",children:[]}]},o={}}}]);
//# sourceMappingURL=19.b9e850ea.chunk.js.map