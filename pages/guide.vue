<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('guide.title')} | ${t('site.title')}`,
  description: () => t('guide.description'),
  ogTitle: () => `${t('guide.title')} | ${t('site.title')}`,
  ogDescription: () => t('guide.description'),
})

interface GuideSection {
  title: string
  icon: string
  items: string[]
}

const sections = computed<GuideSection[]>(() => [
  {
    title: t('guide.creatingEnvironment.title'),
    icon: '🏠',
    items: [
      t('guide.creatingEnvironment.item1'),
      t('guide.creatingEnvironment.item2'),
      t('guide.creatingEnvironment.item3'),
    ],
  },
  {
    title: t('guide.effectivePractice.title'),
    icon: '📝',
    items: [
      t('guide.effectivePractice.item1'),
      t('guide.effectivePractice.item2'),
      t('guide.effectivePractice.item3'),
      t('guide.effectivePractice.item4'),
    ],
  },
  {
    title: t('guide.handlingMistakes.title'),
    icon: '💡',
    items: [
      t('guide.handlingMistakes.item1'),
      t('guide.handlingMistakes.item2'),
      t('guide.handlingMistakes.item3'),
    ],
  },
  {
    title: t('guide.motivation.title'),
    icon: '⭐',
    items: [
      t('guide.motivation.item1'),
      t('guide.motivation.item2'),
      t('guide.motivation.item3'),
    ],
  },
  {
    title: t('guide.ageAppropriate.title'),
    icon: '📊',
    items: [
      t('guide.ageAppropriate.item1'),
      t('guide.ageAppropriate.item2'),
      t('guide.ageAppropriate.item3'),
    ],
  },
  {
    title: t('guide.dailyLife.title'),
    icon: '🛒',
    items: [
      t('guide.dailyLife.item1'),
      t('guide.dailyLife.item2'),
      t('guide.dailyLife.item3'),
    ],
  },
])
</script>

<template>
  <div class="guide-page">
    <div class="content-card">
      <h1>{{ t('guide.title') }}</h1>
      <p class="desc">{{ t('guide.intro') }}</p>

      <div v-for="(section, i) in sections" :key="i" class="guide-section">
        <h2><span class="icon">{{ section.icon }}</span> {{ section.title }}</h2>
        <ul>
          <li v-for="(item, j) in section.items" :key="j">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.guide-page {
  display: flex;
  justify-content: center;
}

.content-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 640px;

  h1 {
    font-size: 24px;
    margin: 0 0 8px;
    text-align: center;
  }

  .desc {
    color: #666;
    text-align: center;
    margin: 0 0 32px;
  }
}

.guide-section {
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 18px;
    margin: 0 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid #4a90e2;
    display: flex;
    align-items: center;
    gap: 8px;

    .icon {
      font-size: 20px;
    }
  }

  ul {
    margin: 0;
    padding-left: 24px;
    list-style: disc;
  }

  li {
    font-size: 15px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
