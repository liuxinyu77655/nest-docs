import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nest 通关秘籍',
  description: 'Nest 通关秘籍学习笔记',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
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
          { text: '3. Nest 基础概念扫盲', link: '/03-Nest基础概念扫盲' },
          { text: '4. 快速掌握 Nest CLI', link: '/04-快速掌握Nest CLI' },
          { text: '5. 5 种 HTTP 数据传输方式', link: '/05-5种HTTP数据传输方式' },
          { text: '6. IoC 解决了什么痛点问题？', link: '/06-IoC解决了什么痛点问题' },
          { text: '7. 如何调试 Nest 项目？', link: '/07-如何调试Nest项目' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LsyWeb' },
    ],
  },
})
