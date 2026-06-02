<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('tips.title')} | ${t('site.title')}`,
  description: () => t('tips.intro'),
})

const tipKeys = [
  { title: 'tips.tip1Title', desc: 'tips.tip1Desc', icon: '1️⃣' },
  { title: 'tips.tip2Title', desc: 'tips.tip2Desc', icon: '2️⃣' },
  { title: 'tips.tip3Title', desc: 'tips.tip3Desc', icon: '3️⃣' },
  { title: 'tips.tip4Title', desc: 'tips.tip4Desc', icon: '4️⃣' },
  { title: 'tips.tip5Title', desc: 'tips.tip5Desc', icon: '5️⃣' },
  { title: 'tips.tip6Title', desc: 'tips.tip6Desc', icon: '6️⃣' },
]
</script>

<template>
  <div class="content-page">
    <h1 class="page-title">{{ t('tips.title') }}</h1>

    <section class="card">
      <p class="intro">{{ t('tips.intro') }}</p>
    </section>

    <div v-for="tip in tipKeys" :key="tip.title" class="tip-card">
      <span class="tip-icon">{{ tip.icon }}</span>
      <div class="tip-body">
        <h2>{{ t(tip.title) }}</h2>
        <p>{{ t(tip.desc) }}</p>
      </div>
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

.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.intro {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
}

.tip-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.tip-icon {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-body {
  h2 {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 6px;
    color: #333;
  }

  p {
    font-size: 15px;
    line-height: 1.7;
    color: #555;
    margin: 0;
  }
}
</style>
