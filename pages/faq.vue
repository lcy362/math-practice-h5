<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('faq.title')} | ${t('site.title')}`,
  description: () => t('site.description'),
})

const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const
</script>

<template>
  <div class="content-page">
    <h1 class="page-title">{{ t('faq.title') }}</h1>

    <div v-for="q in questions" :key="q" class="faq-item">
      <h2 class="faq-q">{{ t(`faq.${q}`) }}</h2>
      <p class="faq-a">{{ t(`faq.${q.replace('q', 'a')}`) }}</p>
    </div>
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

.faq-item {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.faq-q {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 10px;
  color: #333;
}

.faq-a {
  font-size: 15px;
  line-height: 1.7;
  color: #555;
  margin: 0;
}
</style>
