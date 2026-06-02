# Math Practice | 极简算数练习

免费在线儿童数学练习工具，支持加减乘除和比较大小，适合小学生随时随地练习心算。

**[math.lichuanyang.top](https://math.lichuanyang.top)**

## 功能特性

- 5 种运算模式：加法、减法、乘法、除法、比较大小
- 自定义数字范围（最小值 / 最大值）
- 答题即时反馈，正确后自动跳转下一题
- 支持 5 种语言：中文、English、日本語、한국어、Español
- SEO 优化：meta 标签、Open Graph、hreflang、JSON-LD 结构化数据、sitemap
- Google Analytics 4 数据追踪
- Google AdSense 广告位（待审核）
- 响应式设计，适配移动端和桌面端

## 技术栈

| 模块 | 用途 |
|---|---|
| [Nuxt 4](https://nuxt.com) | Vue 3 全栈框架 |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org) | 多语言支持 |
| [@nuxtjs/seo](https://nuxtseo.com) | SEO 元标签管理 |
| [@nuxtjs/robots](https://nuxt.com/modules/robots) | robots.txt 生成 |
| [@nuxtjs/sitemap](https://nuxt.com/modules/sitemap) | sitemap.xml 生成 |
| [nuxt-gtag](https://nuxt.com/modules/gtag) | Google Analytics 4 |

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 静态站点生成
npm run generate

# 预览生产构建
npm run preview
```

## 部署

项目使用 `nuxt generate` 构建为纯静态站点，可直接部署到 Vercel、Cloudflare Pages 等平台。

### Vercel 一键部署

1. Fork 或直接导入此仓库到 [Vercel](https://vercel.com)
2. 点击 Deploy，无需修改任何配置
3. 在项目设置中绑定自定义域名

### 手动构建

```bash
npm run generate
# 产物在 .output/public 目录
```

## 配置项

在 `nuxt.config.ts` 中替换以下占位符：

| 配置 | 位置 | 说明 |
|---|---|---|
| `G-XXXXXXXXXX` | gtag.id | [Google Analytics 4](https://analytics.google.com) Measurement ID |
| `ca-pub-XXXX` | app.head.script | [Google AdSense](https://www.google.com/adsense) 客户端 ID（取消注释） |

## 项目结构

```
├── pages/
│   ├── index.vue           # 练习配置页
│   └── practice.vue        # 答题页
├── components/
│   ├── AppHeader.vue       # 公共头部
│   ├── AppFooter.vue       # 公共底部
│   └── LanguageSwitcher.vue
├── composables/
│   └── usePractice.ts      # 题目生成与答题逻辑
├── i18n/                   # 翻译文件
│   ├── zh.json
│   ├── en.json
│   ├── ja.json
│   ├── ko.json
│   └── es.json
├── layouts/default.vue     # 默认布局
├── assets/css/main.scss    # 全局样式
├── public/                 # 静态资源
└── nuxt.config.ts          # 项目配置
```

## License

MIT
