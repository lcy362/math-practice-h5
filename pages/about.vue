<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('about.title')} | ${t('site.title')}`,
  description: () => t('about.intro'),
})
</script>

<template>
  <div class="content-page">
    <h1 class="page-title">{{ t('about.title') }}</h1>

    <section class="card">
      <p class="intro">{{ t('about.intro') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('about.features') }}</h2>
      <ul class="feature-list">
        <li>{{ t('about.feature1') }}</li>
        <li>{{ t('about.feature2') }}</li>
        <li>{{ t('about.feature3') }}</li>
        <li>{{ t('about.feature4') }}</li>
        <li>{{ t('about.feature5') }}</li>
      </ul>
    </section>

    <section class="card">
      <h2>{{ t('about.author') }}</h2>
      <p>{{ t('about.authorDesc') }}</p>
      <a href="https://lichuanyang.top/" target="_blank" rel="noopener" class="author-link">
        {{ t('about.authorSite') }} →
      </a>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.content-page {
  max-width: 680px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 12px;
    color: #333;
  }
}

.intro {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
}

.feature-list {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #555;
  }
}

.author-link {
  display: inline-block;
  margin-top: 8px;
  color: #4a90e2;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
