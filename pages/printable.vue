<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('printable.title')} | ${t('site.title')}`,
  description: () => t('printable.description'),
  ogTitle: () => `${t('printable.title')} | ${t('site.title')}`,
  ogDescription: () => t('printable.description'),
})

const min = ref(1)
const max = ref(20)
const operators = ref<string[]>(['+', '-'])
const problemCount = ref(30)
const columns = ref(3)

const operatorOptions = ['+', '-', '×', '÷']

interface Problem {
  num1: number
  num2: number
  operator: string
}

const problems = ref<Problem[]>([])
const showPreview = ref(false)

function toggleOperator(op: string) {
  const idx = operators.value.indexOf(op)
  if (idx > -1) {
    operators.value.splice(idx, 1)
  } else {
    operators.value.push(op)
  }
}

function generateProblems() {
  const result: Problem[] = []
  for (let i = 0; i < problemCount.value; i++) {
    const op = operators.value[Math.floor(Math.random() * operators.value.length)]
    let num1: number, num2: number

    switch (op) {
      case '-':
        num1 = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
        num2 = Math.floor(Math.random() * (num1 - min.value + 1)) + min.value
        break
      case '÷':
        num2 = Math.floor(Math.random() * (max.value - min.value + 1)) + 1
        const quotient = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
        num1 = num2 * quotient
        break
      default:
        num1 = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
        num2 = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value
    }

    result.push({ num1, num2, operator: op })
  }
  problems.value = result
  showPreview.value = true
}

function onPrint() {
  window.print()
}
</script>

<template>
  <div class="printable-page">
    <div class="content-card no-print">
      <h1>{{ t('printable.title') }}</h1>
      <p class="desc">{{ t('printable.intro') }}</p>

      <div class="config-section">
        <div class="config-row">
          <label>{{ t('home.numberRange') }}</label>
          <div class="range-inputs">
            <input v-model.number="min" type="number" min="1" max="999" />
            <span>{{ t('home.to') }}</span>
            <input v-model.number="max" type="number" min="1" max="999" />
          </div>
        </div>

        <div class="config-row">
          <label>{{ t('home.selectOperators') }}</label>
          <div class="operator-btns">
            <button
              v-for="op in operatorOptions"
              :key="op"
              :class="{ active: operators.includes(op) }"
              @click="toggleOperator(op)"
            >
              {{ op }}
            </button>
          </div>
        </div>

        <div class="config-row">
          <label>{{ t('printable.problemCount') }}</label>
          <select v-model.number="problemCount">
            <option :value="20">20</option>
            <option :value="30">30</option>
            <option :value="40">40</option>
            <option :value="50">50</option>
          </select>
        </div>

        <div class="config-row">
          <label>{{ t('printable.columns') }}</label>
          <select v-model.number="columns">
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
        </div>

        <button class="generate-btn" @click="generateProblems" :disabled="operators.length === 0">
          {{ t('printable.generate') }}
        </button>
      </div>
    </div>

    <div v-if="showPreview" class="print-area">
      <div class="print-header">
        <h2>{{ t('printable.worksheetTitle') }}</h2>
        <div class="print-info">
          <span>{{ t('printable.name') }}: ____________</span>
          <span>{{ t('printable.date') }}: ____________</span>
          <span>{{ t('printable.score') }}: ______ / {{ problemCount }}</span>
        </div>
        <button class="print-btn no-print" @click="onPrint">{{ t('printable.print') }}</button>
      </div>

      <div class="problems-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
        <div v-for="(p, i) in problems" :key="i" class="problem-item">
          <span class="idx">{{ i + 1 }}.</span>
          <span class="expr">{{ p.num1 }} {{ p.operator }} {{ p.num2 }} = </span>
          <span class="answer-space"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.printable-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
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

.config-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-row {
  display: flex;
  align-items: center;
  gap: 12px;

  label {
    min-width: 80px;
    font-weight: 500;
    font-size: 14px;
    color: #555;
  }

  select, input[type="number"] {
    padding: 8px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus { border-color: #4a90e2; }
  }

  input[type="number"] {
    width: 80px;
  }
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 8px;

  span { color: #999; }
}

.operator-btns {
  display: flex;
  gap: 8px;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      border-color: #4a90e2;
      background: #e8f2ff;
      color: #4a90e2;
    }

    &:hover:not(.active) {
      border-color: #ccc;
    }
  }
}

.generate-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.35);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.print-area {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 800px;
}

.print-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #333;

  h2 {
    font-size: 20px;
    margin: 0 0 12px;
    text-align: center;
  }
}

.print-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

.print-btn {
  display: block;
  margin: 16px auto 0;
  padding: 10px 24px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover { background: #357abd; }
}

.problems-grid {
  display: grid;
  gap: 16px 24px;
}

.problem-item {
  display: flex;
  align-items: baseline;
  font-size: 16px;
  padding: 4px 0;

  .idx {
    color: #999;
    margin-right: 4px;
    min-width: 24px;
  }

  .expr {
    white-space: nowrap;
  }

  .answer-space {
    display: inline-block;
    min-width: 40px;
    border-bottom: 1px solid #333;
  }
}

@media print {
  .no-print { display: none !important; }

  .printable-page {
    background: white;
  }

  .print-area {
    box-shadow: none;
    padding: 0;
    max-width: 100%;
  }

  .print-header {
    border-bottom-color: #000;
  }

  .problem-item .answer-space {
    border-bottom-color: #000;
  }
}
</style>
