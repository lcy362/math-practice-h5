<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('daily.title')} | ${t('site.title')}`,
  description: () => t('daily.description'),
  ogTitle: () => `${t('daily.title')} | ${t('site.title')}`,
  ogDescription: () => t('daily.description'),
})

function getDateSeed(): number {
  const now = new Date()
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface DailyProblem {
  num1: number
  num2: number
  operator: string
  answer: number
  hint: string
}

const today = new Date()
const dateStr = computed(() => {
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
})

const problem = computed<DailyProblem>(() => {
  const rand = seededRandom(getDateSeed())
  const operators = ['+', '-', '×', '÷']
  const op = operators[Math.floor(rand() * 4)]

  let num1: number, num2: number, answer: number, hint: string

  switch (op) {
    case '+':
      num1 = Math.floor(rand() * 50) + 10
      num2 = Math.floor(rand() * 50) + 10
      answer = num1 + num2
      hint = t('daily.hintAdd')
      break
    case '-':
      num1 = Math.floor(rand() * 50) + 30
      num2 = Math.floor(rand() * (num1 - 10)) + 10
      answer = num1 - num2
      hint = t('daily.hintSub')
      break
    case '×':
      num1 = Math.floor(rand() * 12) + 2
      num2 = Math.floor(rand() * 12) + 2
      answer = num1 * num2
      hint = t('daily.hintMul')
      break
    case '÷':
      num2 = Math.floor(rand() * 12) + 2
      answer = Math.floor(rand() * 12) + 2
      num1 = num2 * answer
      hint = t('daily.hintDiv')
      break
    default:
      num1 = 1; num2 = 1; answer = 2; hint = ''
  }

  return { num1, num2, operator: op, answer, hint }
})

const userAnswer = ref<string | number>('')
const submitted = ref(false)
const isCorrect = ref(false)
const showHint = ref(false)

function onSubmit() {
  if (userAnswer.value === '' || userAnswer.value === null) return
  submitted.value = true
  isCorrect.value = parseFloat(String(userAnswer.value)) === problem.value.answer
}

function onReset() {
  userAnswer.value = ''
  submitted.value = false
  isCorrect.value = false
  showHint.value = false
}
</script>

<template>
  <div class="daily-page">
    <div class="content-card">
      <h1>{{ t('daily.title') }}</h1>
      <p class="date">{{ dateStr }}</p>

      <div class="problem-display">
        <span class="num">{{ problem.num1 }}</span>
        <span class="operator">{{ problem.operator }}</span>
        <span class="num">{{ problem.num2 }}</span>
        <span class="equals">=</span>
        <span class="question">?</span>
      </div>

      <div v-if="!submitted" class="answer-section">
        <input
          v-model="userAnswer"
          type="number"
          class="answer-input"
          :placeholder="t('practice.inputAnswer')"
          @keyup.enter="onSubmit"
          autofocus
        />
        <div class="btn-group">
          <button class="submit-btn" @click="onSubmit">{{ t('practice.submit') }}</button>
          <button class="hint-btn" @click="showHint = !showHint">{{ t('daily.showHint') }}</button>
        </div>
      </div>

      <div v-else class="result-section">
        <div class="feedback" :class="isCorrect ? 'correct' : 'wrong'">
          {{ isCorrect ? t('practice.correct') : t('practice.wrong', { answer: problem.answer }) }}
        </div>
        <button class="retry-btn" @click="onReset">{{ t('daily.tryAgain') }}</button>
      </div>

      <Transition name="fade">
        <div v-if="showHint && !submitted" class="hint-box">
          <p>{{ problem.hint }}</p>
        </div>
      </Transition>

      <div class="nav-links">
        <NuxtLink :to="localePath('/')">{{ t('practice.backHome') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-page {
  display: flex;
  justify-content: center;
}

.content-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 420px;
  text-align: center;

  h1 {
    font-size: 24px;
    margin: 0 0 4px;
  }

  .date {
    color: #999;
    font-size: 14px;
    margin: 0 0 28px;
  }
}

.problem-display {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  .num { color: #1a1a1a; }
  .operator { color: #4a90e2; }
  .equals { color: #999; }
  .question { color: #e74c3c; }
}

.answer-input {
  width: 100%;
  padding: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 22px;
  text-align: center;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
  margin-bottom: 16px;

  &:focus { border-color: #4a90e2; }
}

.btn-group {
  display: flex;
  gap: 12px;
}

.submit-btn, .retry-btn {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.35);
  }
}

.hint-btn {
  padding: 12px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: #e0e0e0; }
}

.result-section {
  .feedback {
    padding: 16px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;

    &.correct { background: #dff0d8; color: #3c763d; }
    &.wrong { background: #f2dede; color: #a94442; }
  }
}

.hint-box {
  margin-top: 16px;
  padding: 14px;
  background: #fff8e1;
  border-radius: 10px;
  border-left: 3px solid #ffb300;
  text-align: left;

  p { margin: 0; color: #666; font-size: 14px; }
}

.nav-links {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-size: 14px;

    &:hover { text-decoration: underline; }
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
