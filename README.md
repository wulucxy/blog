# Papaya Blog

1. 很多技术问题需要碰撞，讨论。希望能够留档到我们的官网 Blog 中。作为我们学习、成长和沉淀的地方。
2. 作为挖财内部最大的前端团队，希望能够打造自己的品牌，对外输出。

# 访问链接：

http://pages.wacai.info/client/papaya-blog

## How to?

**1. 新建文章：** 在 `src/routes/posts`下按照 `yyyy-mm-dd-your-page-title`创建文件夹，将 markdown 添加到 `document.mdx` 中，再新建 `post.js` 添加文章信息：

```jsx
title: `文章标题`,
tags: ['文章标签1', '文章标签2'],
spoiler: "文章简略说明",
getContent: () => import('./document.mdx'),
```

**2. 编辑文章：** 比如要修改当前文章，找到`src/routes/posts/2019-03-12-welcome/document.mdx`，修改后保存，页面会自动热更新。

**3. 修改页面主题：** 编辑 `src/siteMetadata.js` metadata 属性。

**4. 编辑团队信息：** 编辑 `src/components/Bio.js` 组件即可.

**5. 编辑全局样式：** 在 `src/index.module.css` 修改 css 即可.

**6. 代码高亮：** 在对应的代码处添加花括号 {} 及对应行数，如 `jsx{1-4,6}`：

**7. 发布文章：** 文章编辑完毕，直接 git push 即可，注意需要在 master 分支上操作。


## happy bloging!