<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const minValue = ref(1)
const maxValue = ref(10)
const selectedOperators = ref(['+', '-'])

const operatorOptions = computed(() => [
  { value: '+', label: t('home.addition') },
  { value: '-', label: t('home.subtraction') },
  { value: '×', label: t('home.multiplication') },
  { value: '÷', label: t('home.division') },
  { value: 'compare', label: t('home.comparison') },
])

const errorMsg = ref('')

// SEO
useSeoMeta({
  title: () => t('site.title'),
  description: () => t('site.description'),
  keywords: () => t('site.keywords'),
  ogTitle: () => t('site.title'),
  ogDescription: () => t('site.description'),
  ogImage: 'https://math.lichuanyang.top/og-image.png',
  ogType: 'website',
})

// JSON-LD structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t('site.title'),
        description: t('site.description'),
        url: 'https://math.lichuanyang.top',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
  ],
})

function toggleOperator(op: string) {
  const idx = selectedOperators.value.indexOf(op)
  if (idx >= 0) {
    selectedOperators.value.splice(idx, 1)
  } else {
    selectedOperators.value.push(op)
  }
}

function startPractice() {
  errorMsg.value = ''

  if (minValue.value >= maxValue.value) {
    errorMsg.value = t('home.errorMaxGtMin')
    return
  }
  if (selectedOperators.value.length === 0) {
    errorMsg.value = t('home.errorSelectOperator')
    return
  }

  // Store params and navigate
  const params = {
    min: minValue.value,
    max: maxValue.value,
    operators: [...selectedOperators.value],
  }
  localStorage.setItem('PRACTICE_PARAMS', JSON.stringify(params))
  router.push(localePath('/practice'))
}
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <h2 class="section-title">{{ t('home.title') }}</h2>
      <p class="subtitle">{{ t('home.subtitle') }}</p>
    </section>

    <section class="config-card">
      <div class="field">
        <label class="field-label">{{ t('home.numberRange') }}</label>
        <div class="range-inputs">
          <input
            v-model.number="minValue"
            type="number"
            class="num-input"
            :placeholder="t('home.minValue')"
            min="0"
          />
          <span class="range-sep">{{ t('home.to') }}</span>
          <input
            v-model.number="maxValue"
            type="number"
            class="num-input"
            :placeholder="t('home.maxValue')"
            min="1"
          />
        </div>
      </div>

      <div class="field">
        <label class="field-label">{{ t('home.selectOperators') }}</label>
        <div class="operator-grid">
          <label
            v-for="op in operatorOptions"
            :key="op.value"
            class="operator-item"
            :class="{ selected: selectedOperators.includes(op.value) }"
          >
            <input
              type="checkbox"
              :value="op.value"
              :checked="selectedOperators.includes(op.value)"
              @change="toggleOperator(op.value)"
              class="sr-only"
            />
            <span class="op-symbol">{{ op.value === 'compare' ? '?⇔?' : op.value }}</span>
            <span class="op-label">{{ op.label }}</span>
          </label>
        </div>
      </div>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button class="start-btn" @click="startPractice">
        {{ t('home.startPractice') }}
      </button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.subtitle {
  color: #666;
  font-size: 15px;
  margin: 0;
}

.config-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.field {
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 10px;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.num-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
  }
}

.range-sep {
  color: #999;
  font-size: 14px;
}

.operator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.operator-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 8px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    border-color: #4a90e2;
    background: #f0f7ff;
  }

  &.selected {
    border-color: #4a90e2;
    background: #e8f2ff;
  }
}

.op-symbol {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.op-label {
  font-size: 12px;
  color: #888;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.error-msg {
  color: #e74c3c;
  font-size: 14px;
  margin: -12px 0 16px;
  text-align: center;
}

.start-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
