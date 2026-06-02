<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('privacy.title')} | ${t('site.title')}`,
  description: () => t('privacy.intro'),
})
</script>

<template>
  <div class="content-page">
    <h1 class="page-title">{{ t('privacy.title') }}</h1>
    <p class="last-updated">{{ t('privacy.lastUpdated') }}</p>

    <section class="card">
      <p>{{ t('privacy.intro') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.collectTitle') }}</h2>
      <p>{{ t('privacy.collectDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.cookiesTitle') }}</h2>
      <p>{{ t('privacy.cookiesDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.analyticsTitle') }}</h2>
      <p>{{ t('privacy.analyticsDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.adsTitle') }}</h2>
      <p>{{ t('privacy.adsDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.linksTitle') }}</h2>
      <p>{{ t('privacy.linksDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.changesTitle') }}</h2>
      <p>{{ t('privacy.changesDesc') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('privacy.contactTitle') }}</h2>
      <p>{{ t('privacy.contactDesc') }}</p>
      <a href="https://lichuanyang.top/" target="_blank" rel="noopener" class="contact-link">
        lichuanyang.top →
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
  margin-bottom: 4px;
  color: #1a1a1a;
}

.last-updated {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  h2 {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    line-height: 1.7;
    color: #555;
    margin: 0;
  }
}

.contact-link {
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
