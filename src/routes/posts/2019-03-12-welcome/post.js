export default {
  title: `迁移到新版 papaya blog`,
  spoiler: "如何新建文章，并发布到博客上",
  getContent: () => import('./document.mdx'),
}