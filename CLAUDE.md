# Nest Docs — VitePress 文档站点

## 项目概述

Nest 通关秘籍学习笔记，基于 VitePress 构建的静态文档站点，部署在 Vercel。

## 项目结构

```
nest-docs/
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # VitePress 配置文件（侧边栏、导航）
│   ├── public/
│   │   └── nest-logo.svg      # 站点 Logo（已上传 OSS，本地保留备用）
│   ├── index.md               # 首页（Hero 布局）
│   └── XX-章节名.md           # 50 个章节文档
├── package.json
├── vercel.json                # Vercel 部署配置
└── .gitignore
```

## 图片管理规则

- **所有图片存储在阿里云 OSS**：`https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/`
- **Markdown 中引用图片使用完整 OSS URL**，不使用本地 `/image/` 路径
- 本地 `docs/public/image/` 目录不提交到 Git（已加入 .gitignore）
- 原始图片备份在 `~/Desktop/nest-docs-backup/images/`

### OSS 信息
- Bucket: `vercel-nestjs`
- Region: `oss-cn-beijing`
- 图片路径前缀: `nest-docs/image/`
- 上传脚本: `~/Desktop/nest-docs-backup/scripts/upload-oss.mjs`

## 构建与部署

```bash
# 本地开发
npm run dev         # vitepress dev docs

# 构建
npm run build       # vitepress build docs → docs/.vitepress/dist/

# 部署到 Vercel
npx vercel --prod
```

## 章节爬取

原始内容来源: `https://nest-docs.liushuaiyang.com/`

爬取脚本（本地备份）: `~/Desktop/nest-docs-backup/scripts/scrape.py`

```bash
# 用法示例
python3 scrape.py 8-50           # 爬取章节
python3 update-config.py         # 更新侧边栏配置
```

## 安全规则

- **绝对不要将 AccessKey、密码等凭证提交到 Git**
- **绝对不要在 docs/ 目录下的任何文件中写入凭证**（会被 VitePress 构建到 dist 中并部署到公网）
- 如果凭证意外泄露，立即：
  1. 删除凭证内容
  2. 删除 `docs/.vitepress/dist/` 目录
  3. 在阿里云控制台禁用/轮换 AccessKey
  4. 在 Vercel 重新部署

## .gitignore 规则

以下内容不提交到 Git：
- `node_modules/` — 依赖
- `docs/.vitepress/dist/` — 构建产物
- `docs/.vitepress/cache/` — VitePress 缓存
- `docs/public/image/` — 图片已迁移到 OSS
- `scripts/` — 爬取/上传工具脚本（含凭证，仅保留在本地）
- `.DS_Store` — macOS 系统文件
- `.vercel` — Vercel 本地配置
- `.env` — 环境变量

## 添加新章节流程

1. 用 scrape.py 爬取章节 HTML → 缓存到 `scripts/cache/`
2. 从缓存生成 Markdown → `docs/XX-章节名.md`
3. 图片自动使用 OSS URL（scrape.py 的 `fix_image_urls` 会处理）
4. 运行 `python3 scripts/update-config.py` 更新侧边栏
5. `npm run build` 验证
6. `npx vercel --prod` 部署
