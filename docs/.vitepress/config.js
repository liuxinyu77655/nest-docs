import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nest 通关秘籍',
  description: 'Nest 通关秘籍学习笔记',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],
    sidebar: [
      {
        text: '课程目录',
        items: [
          { text: '1. 开篇词', link: '/01-开篇词' },
          { text: '2. 给你 5 个学习 Nest 的理由', link: '/02-给你5个学习Nest的理由' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LsyWeb' },
    ],
  },
})
