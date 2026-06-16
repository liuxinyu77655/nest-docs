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
          [
          {
          "text": "1. 开篇词",
          "link": "/01-开篇词"
          },
          {
          "text": "2. 给你 5 个学习 Nest 的理由，你会心动么",
          "link": "/02-给你5个学习Nest的理由"
          },
          {
          "text": "3. Nest 基础概念扫盲",
          "link": "/03-Nest基础概念扫盲"
          },
          {
          "text": "4. 快速掌握 Nest CLI",
          "link": "/04-快速掌握Nest CLI"
          },
          {
          "text": "5. 5 种 HTTP 数据传输方式",
          "link": "/05-5种HTTP数据传输方式"
          },
          {
          "text": "6. IoC 解决了什么痛点问题？",
          "link": "/06-IoC解决了什么痛点问题"
          },
          {
          "text": "7. 如何调试 Nest 项目",
          "link": "/07-如何调试 Nest 项目"
          },
          {
          "text": "8. 使用多种 Provider，灵活注入对象",
          "link": "/08-使用多种 Provider，灵活注入对象"
          },
          {
          "text": "9. 全局模块和生命周期",
          "link": "/09-全局模块和生命周期"
          },
          {
          "text": "10. AOP 架构有什么好处？",
          "link": "/10-AOP 架构有什么好处？"
          },
          {
          "text": "11. 一网打尽 Nest 全部装饰器",
          "link": "/11-一网打尽 Nest 全部装饰器"
          },
          {
          "text": "12. Nest 如何自定义装饰器",
          "link": "/12-Nest 如何自定义装饰器"
          },
          {
          "text": "13. Metadata 和 Reflector",
          "link": "/13-Metadata 和 Reflector"
          },
          {
          "text": "14. ExecutionContext：切换不同上下文",
          "link": "/14-ExecutionContext：切换不同上下文"
          },
          {
          "text": "15. Module 和 Provider 的循环依赖怎么处理？",
          "link": "/15-Module 和 Provider 的循环依赖怎么处理？"
          },
          {
          "text": "16. 如何创建动态模块",
          "link": "/16-如何创建动态模块"
          },
          {
          "text": "17. Nest 和 Express 的关系，如何切到 fastify",
          "link": "/17-Nest 和 Express 的关系，如何切到 fastify"
          },
          {
          "text": "18. Nest 的 Middleware",
          "link": "/18-Nest 的 Middleware"
          },
          {
          "text": "19. RxJS 和 Interceptor",
          "link": "/19-RxJS 和 Interceptor"
          },
          {
          "text": "20. 内置 Pipe 和自定义 Pipe",
          "link": "/20-内置 Pipe 和自定义 Pipe"
          },
          {
          "text": "21. 如何使用 ValidationPipe 验证 post 请求参数",
          "link": "/21-如何使用 ValidationPipe 验证 post 请求参数"
          },
          {
          "text": "22. 如何自定义 Exception Filter",
          "link": "/22-如何自定义 Exception Filter"
          },
          {
          "text": "23. 图解串一串 Nest 核心概念",
          "link": "/23-图解串一串 Nest 核心概念"
          },
          {
          "text": "24. 接口如何实现多版本共存",
          "link": "/24-接口如何实现多版本共存"
          },
          {
          "text": "25. Express 如何使用 multer 实现文件上传",
          "link": "/25-Express 如何使用 multer 实现文件上传"
          },
          {
          "text": "26. Nest 如何使用 multer 实现文件上传",
          "link": "/26-Nest 如何使用 multer 实现文件上传"
          },
          {
          "text": "27. 图书管理系统：需求分析和原型图",
          "link": "/27-图书管理系统：需求分析和原型图"
          },
          {
          "text": "28. 图书管理系统：用户模块后端开发",
          "link": "/28-图书管理系统：用户模块后端开发"
          },
          {
          "text": "29. 图书管理系统：图书模块后端开发",
          "link": "/29-图书管理系统：图书模块后端开发"
          },
          {
          "text": "30. 图书管理系统：用户模块前端开发",
          "link": "/30-图书管理系统：用户模块前端开发"
          },
          {
          "text": "31. 图书管理系统：图书模块前端开发--图书搜索",
          "link": "/31-图书管理系统：图书模块前端开发--图书搜索"
          },
          {
          "text": "32. 图书管理系统：图书模块前端开发--图书增删改",
          "link": "/32-图书管理系统：图书模块前端开发--图书增删改"
          },
          {
          "text": "33. 图书管理系统：项目总结",
          "link": "/33-图书管理系统：项目总结"
          },
          {
          "text": "34. 大文件分片上传",
          "link": "/34-大文件分片上传"
          },
          {
          "text": "35. 最完美的 OSS 上传方案",
          "link": "/35-最完美的 OSS 上传方案"
          },
          {
          "text": "36. Nest 里如何打印日志？",
          "link": "/36-Nest 里如何打印日志？"
          },
          {
          "text": "37. 为什么 Node 里要用 Winston 打印日志？",
          "link": "/37-为什么 Node 里要用 Winston 打印日志？"
          },
          {
          "text": "38. Nest 集成日志框架 Winston",
          "link": "/38-Nest 集成日志框架 Winston"
          },
          {
          "text": "39. 通过 Desktop 学 Docker 也太简单了",
          "link": "/39-通过 Desktop 学 Docker 也太简单了"
          },
          {
          "text": "40. 你的第一个 Dockerfile",
          "link": "/40-你的第一个 Dockerfile"
          },
          {
          "text": "41. Nest 项目如何编写 Dockerfile",
          "link": "/41-Nest 项目如何编写 Dockerfile"
          },
          {
          "text": "42. 提升 Dockerfile 水平的 5 个技巧",
          "link": "/42-提升 Dockerfile 水平的 5 个技巧"
          },
          {
          "text": "43. Docker 是怎么实现的？",
          "link": "/43-Docker 是怎么实现的？"
          },
          {
          "text": "44. 为什么 Node 应用要用 PM2 来跑？",
          "link": "/44-为什么 Node 应用要用 PM2 来跑？"
          },
          {
          "text": "45. 快速入门 MySQL",
          "link": "/45-快速入门 MySQL"
          },
          {
          "text": "46. SQL 查询语句的所有语法和函数",
          "link": "/46-SQL 查询语句的所有语法和函数"
          },
          {
          "text": "47. 一对一、join 查询、级联方式",
          "link": "/47-一对一、join 查询、级联方式"
          },
          {
          "text": "48. 一对多、多对多关系的表设计",
          "link": "/48-一对多、多对多关系的表设计"
          },
          {
          "text": "49. 子查询和 EXISTS",
          "link": "/49-子查询和 EXISTS"
          },
          {
          "text": "50. SQL 综合练习",
          "link": "/50-SQL 综合练习"
          }
          ]
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LsyWeb' },
    ],
  },
})
