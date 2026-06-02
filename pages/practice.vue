<script setup lang="ts">
import type { PracticeParams } from '~/composables/usePractice'

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const { num1, num2, currentOperator, userAnswer, isCorrect, showFeedback, feedbackMessage, generateProblem, checkAnswer, getCorrectAnswer } = usePractice()
const gtag = useGtag()

const params = ref<PracticeParams | null>(null)

// SEO
useSeoMeta({
  title: () => `${t('practice.title')} | ${t('site.title')}`,
  description: () => t('site.description'),
  robots: 'noindex', // practice pages don't need indexing
})

onMounted(() => {
  const stored = localStorage.getItem('PRACTICE_PARAMS')
  if (!stored) {
    alert(t('practice.paramError'))
    router.push(localePath('/'))
    return
  }
  params.value = JSON.parse(stored)
  generateProblem(params.value)
})

function onSubmit() {
  const correctMsg = t('practice.correct')
  const wrongMsg = t('practice.wrong', { answer: getCorrectAnswer() })
  const correct = checkAnswer(correctMsg, wrongMsg)

  if (!correct && !showFeedback.value) {
    alert(t('practice.selectAnswer'))
    return
  }

  if (correct) {
    setTimeout(() => {
      if (params.value) generateProblem(params.value)
    }, 1000)
  }

  // GA4 event tracking (non-blocking, fire-and-forget)
  try {
    gtag.event('answer_submitted', {
      event_category: 'practice',
      event_label: correct ? 'correct' : 'wrong',
      operator: currentOperator.value,
    })
  } catch (_) {}
}

function onRadioSelect(val: string) {
  userAnswer.value = val
}

function goBack() {
  router.push(localePath('/'))
}
</script>

<template>
  <div class="practice-page">
    <div class="problem-card">
      <!-- Problem display -->
      <div class="problem-display">
        <span class="num">{{ num1 }}</span>
        <span class="operator">{{ currentOperator === 'compare' ? '?' : currentOperator }}</span>
        <span class="num">{{ num2 }}</span>
        <span class="equals">=</span>
        <span class="question">?</span>
      </div>

      <!-- Comparison mode: radio buttons -->
      <div v-if="currentOperator === 'compare'" class="compare-options">
        <label
          v-for="op in ['>', '<', '=']"
          :key="op"
          class="compare-item"
          :class="{ selected: userAnswer === op }"
        >
          <input
            type="radio"
            name="compare"
            :value="op"
            :checked="userAnswer === op"
            @change="onRadioSelect(op)"
            class="sr-only"
          />
          <span>{{ num1 }} {{ op }} {{ num2 }}</span>
        </label>
      </div>

      <!-- Numeric mode: input -->
      <div v-else class="answer-input-wrap">
        <input
          v-model="userAnswer"
          type="number"
          class="answer-input"
          :placeholder="t('practice.inputAnswer')"
          @keyup.enter="onSubmit"
          autofocus
        />
      </div>

      <!-- Buttons -->
      <div class="btn-group">
        <button class="submit-btn" @click="onSubmit">{{ t('practice.submit') }}</button>
        <button class="back-btn" @click="goBack">{{ t('practice.backHome') }}</button>
      </div>

      <!-- Feedback -->
      <Transition name="fade">
        <div v-if="showFeedback" class="feedback" :class="isCorrect ? 'correct' : 'wrong'">
          {{ feedbackMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.practice-page {
  display: flex;
  justify-content: center;
}

.problem-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.problem-display {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.num {
  color: #1a1a1a;
}

.operator {
  color: #4a90e2;
}

.equals {
  color: #999;
}

.question {
  color: #e74c3c;
}

.compare-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.compare-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: #4a90e2;
    background: #f0f7ff;
  }

  &.selected {
    border-color: #4a90e2;
    background: #e8f2ff;
  }
}

.answer-input-wrap {
  margin-bottom: 24px;
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

  &:focus {
    border-color: #4a90e2;
  }
}

.btn-group {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.submit-btn {
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

.back-btn {
  padding: 12px 20px;
  background: #f0f0f0;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
  }
}

.feedback {
  padding: 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;

  &.correct {
    background: #dff0d8;
    color: #3c763d;
  }

  &.wrong {
    background: #f2dede;
    color: #a94442;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
