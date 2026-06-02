# Math Practice H5

## 项目简介

极简算数练习 — 儿童数学练习 Web 应用，支持 5 种语言，SEO 优化，集成 Google Analytics / Search Console / AdSense。

- 域名: `math.lichuanyang.top`
- 框架: Nuxt 4 + Vue 3 + TypeScript
- 渲染: SSG 静态生成（`nuxt generate`）

## 技术栈

| 模块 | 用途 |
|---|---|
| `@nuxtjs/i18n` | 多语言 (zh/en/ja/ko/es)，前缀路由 `/zh/` `/en/` |
| `@nuxtjs/seo` | useSeoMeta、OG tags、titleTemplate |
| `@nuxtjs/robots` | robots.txt 自动生成 |
| `@nuxtjs/sitemap` | sitemap.xml 自动生成（按语言分 sitemap） |
| `nuxt-gtag` | Google Analytics 4 注入 |
| `nuxt-og-image` | OG 图片生成（当前禁用，使用静态 og-image.png） |

## 目录结构

```
├── app.vue                 # 根组件
├── nuxt.config.ts          # 全局配置（模块、i18n、SEO、GA）
├── pages/
│   ├── index.vue           # 练习配置页
│   └── practice.vue        # 答题页
├── components/
│   ├── AppHeader.vue       # 公共头部（Logo + 语言切换）
│   ├── AppFooter.vue       # 公共底部
│   └── LanguageSwitcher.vue
├── composables/
│   └── usePractice.ts      # 题目生成 + 答题逻辑
├── layouts/
│   └── default.vue         # 默认布局
├── i18n/                   # 翻译文件 (zh/en/ja/ko/es.json)
├── assets/css/main.scss    # 全局样式
└── public/
    ├── logo.png            # 网站图标
    └── robots.txt          # 被 @nuxtjs/robots 接管
```

## 常用命令

```bash
npm run dev          # 开发服务器 (http://localhost:3000)
npm run build        # 生产构建
npm run generate     # 静态站点生成 → .output/public/
npm run preview      # 预览生产构建
```

## 多语言

- 策略: `prefix` — 所有路由带语言前缀 `/zh/` `/en/`
- 默认语言: `zh`
- 翻译文件: `i18n/{code}.json`
- 切换语言: `<NuxtLink :to="switchLocalePath('en')">` 或 `useSwitchLocalePath()`
- 翻译文本: `const { t } = useI18n()` → `t('home.title')`

## SEO 配置

每个页面通过 `useSeoMeta()` 设置独立的 title/description/OG：

```ts
useSeoMeta({
  title: () => t('site.title'),
  description: () => t('site.description'),
  ogTitle: () => t('site.title'),
  ogDescription: () => t('site.description'),
  ogImage: 'https://math.lichuanyang.top/og-image.png',
})
```

- hreflang 标签由 `@nuxtjs/i18n` 自动生成（需 `strictSeo: true`）
- JSON-LD 结构化数据在页面 `<script type="application/ld+json">` 中
- canonical URL 由 `@nuxtjs/seo` 自动生成

## 待办（部署前）

1. `nuxt.config.ts` 第 46 行: 替换 GA4 Measurement ID `G-XXXXXXXXXX`
2. `nuxt.config.ts` 第 81 行: 取消注释 AdSense 脚本，替换 `ca-pub-XXXXXXXXXXXXXXXX`
3. `public/og-image.png`: 放入 1200x630 的 OG 分享图
4. Google Search Console: 部署后添加站点，提交 sitemap

## 注意事项

- `ogImage.enabled: false` — 禁用动态 OG 图片生成，使用静态图片
- `experimental.strictSeo: true` — 启用 hreflang 标签生成
- 答题页 (`practice.vue`) 设置了 `robots: 'noindex'`，不被搜索引擎索引
- 练习参数通过 `localStorage` 在页面间传递
