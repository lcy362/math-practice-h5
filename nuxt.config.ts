export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
  ],

  // SEO defaults
  site: {
    url: 'https://math.lichuanyang.top',
    name: 'Math Practice',
    defaultLocale: 'zh',
    trailingSlash: false,
  },

  // i18n
  i18n: {
    baseUrl: 'https://math.lichuanyang.top',
    locales: [
      { code: 'zh', name: '中文', language: 'zh-CN', file: 'zh.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'ja', name: '日本語', language: 'ja-JP', file: 'ja.json' },
      { code: 'ko', name: '한국어', language: 'ko-KR', file: 'ko.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix',
    langDir: '.',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'no prefix',
    },
    experimental: {
      strictSeo: true,
    },
  },

  // Google Analytics 4
  gtag: {
    id: 'G-0KRFETF1TT',
  },

  // Robots
  robots: {
    allow: '/',
  },

  // Sitemap - single file, no index
  sitemap: {
    autoLastmod: true,
    sitemaps: false,
  },

  // OG Image - disabled (we use static og-image.png)
  ogImage: {
    enabled: false,
  },

  // App head
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      templateParams: {
        separator: '|',
      },
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#4a90e2' },
        { name: 'google-site-verification', content: 'AUXjM9SH3SycuX49Qv1r0UQfa5AwvIE-4q27LUEf5aU' },
      ],
      script: [
        { async: true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7310841175510611', crossorigin: 'anonymous' },
      ],
    },
  },

  // Global CSS
  css: ['~/assets/css/main.scss'],
})
