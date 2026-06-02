<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('formulas.title')} | ${t('site.title')}`,
  description: () => t('formulas.description'),
  ogTitle: () => `${t('formulas.title')} | ${t('site.title')}`,
  ogDescription: () => t('formulas.description'),
})

interface Formula {
  name: string
  expression: string
  example: string
}

interface FormulaCategory {
  title: string
  icon: string
  formulas: Formula[]
}

const categories = computed<FormulaCategory[]>(() => [
  {
    title: t('formulas.additionSubtraction'),
    icon: '➕',
    formulas: [
      { name: t('formulas.commutative'), expression: 'a + b = b + a', example: '3 + 5 = 5 + 3 = 8' },
      { name: t('formulas.associativeAdd'), expression: '(a + b) + c = a + (b + c)', example: '(2 + 3) + 4 = 2 + (3 + 4) = 9' },
      { name: t('formulas.identityAdd'), expression: 'a + 0 = a', example: '7 + 0 = 7' },
      { name: t('formulas.subtractionDef'), expression: 'a - b = c → b + c = a', example: '8 - 3 = 5 → 3 + 5 = 8' },
      { name: t('formulas.identitySub'), expression: 'a - 0 = a', example: '9 - 0 = 9' },
      { name: t('formulas.selfSub'), expression: 'a - a = 0', example: '6 - 6 = 0' },
    ],
  },
  {
    title: t('formulas.multiplicationDivision'),
    icon: '✖️',
    formulas: [
      { name: t('formulas.commutativeMul'), expression: 'a × b = b × a', example: '3 × 4 = 4 × 3 = 12' },
      { name: t('formulas.associativeMul'), expression: '(a × b) × c = a × (b × c)', example: '(2 × 3) × 4 = 2 × (3 × 4) = 24' },
      { name: t('formulas.distributive'), expression: 'a × (b + c) = a × b + a × c', example: '3 × (4 + 5) = 3 × 4 + 3 × 5 = 27' },
      { name: t('formulas.identityMul'), expression: 'a × 1 = a', example: '8 × 1 = 8' },
      { name: t('formulas.zeroMul'), expression: 'a × 0 = 0', example: '7 × 0 = 0' },
      { name: t('formulas.divisionDef'), expression: 'a ÷ b = c → b × c = a', example: '12 ÷ 3 = 4 → 3 × 4 = 12' },
    ],
  },
  {
    title: t('formulas.comparison'),
    icon: '⚖️',
    formulas: [
      { name: t('formulas.reflexive'), expression: 'a = a', example: '5 = 5' },
      { name: t('formulas.symmetric'), expression: 'a = b → b = a', example: '3 + 4 = 7 → 7 = 3 + 4' },
      { name: t('formulas.transitive'), expression: 'a > b, b > c → a > c', example: '5 > 3, 3 > 1 → 5 > 1' },
      { name: t('formulas.additionInequality'), expression: 'a > b → a + c > b + c', example: '5 > 3 → 5 + 2 > 3 + 2' },
    ],
  },
])
</script>

<template>
  <div class="formulas-page">
    <div class="content-card">
      <h1>{{ t('formulas.title') }}</h1>
      <p class="desc">{{ t('formulas.intro') }}</p>

      <div v-for="(category, ci) in categories" :key="ci" class="category">
        <h2><span class="icon">{{ category.icon }}</span> {{ category.title }}</h2>
        <div class="formula-list">
          <div v-for="(formula, fi) in category.formulas" :key="fi" class="formula-item">
            <div class="formula-name">{{ formula.name }}</div>
            <div class="formula-expression">{{ formula.expression }}</div>
            <div class="formula-example">{{ t('formulas.example') }}: {{ formula.example }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formulas-page {
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

.category {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 18px;
    margin: 0 0 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #4a90e2;
    display: flex;
    align-items: center;
    gap: 8px;

    .icon {
      font-size: 20px;
    }
  }
}

.formula-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.formula-item {
  padding: 14px 16px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 3px solid #4a90e2;

  .formula-name {
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
  }

  .formula-expression {
    font-family: 'Courier New', monospace;
    font-size: 16px;
    color: #4a90e2;
    margin-bottom: 4px;
  }

  .formula-example {
    font-size: 13px;
    color: #888;
  }
}
</style>
