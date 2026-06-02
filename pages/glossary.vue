<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('glossary.title')} | ${t('site.title')}`,
  description: () => t('glossary.description'),
  ogTitle: () => `${t('glossary.title')} | ${t('site.title')}`,
  ogDescription: () => t('glossary.description'),
})

interface GlossaryItem {
  term: string
  definition: string
}

const glossaryItems = computed<GlossaryItem[]>(() => [
  { term: t('glossary.terms.addend.term'), definition: t('glossary.terms.addend.definition') },
  { term: t('glossary.terms.difference.term'), definition: t('glossary.terms.difference.definition') },
  { term: t('glossary.terms.dividend.term'), definition: t('glossary.terms.dividend.definition') },
  { term: t('glossary.terms.divisor.term'), definition: t('glossary.terms.divisor.definition') },
  { term: t('glossary.terms.equal.term'), definition: t('glossary.terms.equal.definition') },
  { term: t('glossary.terms.equation.term'), definition: t('glossary.terms.equation.definition') },
  { term: t('glossary.terms.factor.term'), definition: t('glossary.terms.factor.definition') },
  { term: t('glossary.terms.greaterThan.term'), definition: t('glossary.terms.greaterThan.definition') },
  { term: t('glossary.terms.lessThan.term'), definition: t('glossary.terms.lessThan.definition') },
  { term: t('glossary.terms.minuend.term'), definition: t('glossary.terms.minuend.definition') },
  { term: t('glossary.terms.multiplicand.term'), definition: t('glossary.terms.multiplicand.definition') },
  { term: t('glossary.terms.multiplier.term'), definition: t('glossary.terms.multiplier.definition') },
  { term: t('glossary.terms.numberLine.term'), definition: t('glossary.terms.numberLine.definition') },
  { term: t('glossary.terms.product.term'), definition: t('glossary.terms.product.definition') },
  { term: t('glossary.terms.quotient.term'), definition: t('glossary.terms.quotient.definition') },
  { term: t('glossary.terms.remainder.term'), definition: t('glossary.terms.remainder.definition') },
  { term: t('glossary.terms.subtrahend.term'), definition: t('glossary.terms.subtrahend.definition') },
  { term: t('glossary.terms.sum.term'), definition: t('glossary.terms.sum.definition') },
])

const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value) return glossaryItems.value
  const q = searchQuery.value.toLowerCase()
  return glossaryItems.value.filter(
    item => item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="glossary-page">
    <div class="content-card">
      <h1>{{ t('glossary.title') }}</h1>
      <p class="desc">{{ t('glossary.intro') }}</p>

      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          :placeholder="t('glossary.searchPlaceholder')"
        />
      </div>

      <div class="glossary-list">
        <div v-for="(item, i) in filteredItems" :key="i" class="glossary-item">
          <div class="term">{{ item.term }}</div>
          <div class="definition">{{ item.definition }}</div>
        </div>
        <div v-if="filteredItems.length === 0" class="no-results">
          {{ t('glossary.noResults') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.glossary-page {
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
    margin: 0 0 24px;
  }
}

.search-box {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
  }
}

.glossary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.glossary-item {
  padding: 14px 16px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 3px solid #4a90e2;

  .term {
    font-weight: 600;
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
  }

  .definition {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
}

.no-results {
  text-align: center;
  color: #999;
  padding: 32px 0;
}
</style>
