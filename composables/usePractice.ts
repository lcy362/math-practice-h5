import { ref } from 'vue'

export interface PracticeParams {
  min: number
  max: number
  operators: string[]
}

export function usePractice() {
  const num1 = ref(0)
  const num2 = ref(0)
  const currentOperator = ref('+')
  const userAnswer = ref<string | number>('')
  const isCorrect = ref(false)
  const showFeedback = ref(false)
  const feedbackMessage = ref('')

  function generateProblem(params: PracticeParams) {
    userAnswer.value = ''
    showFeedback.value = false

    const { min, max, operators } = params
    currentOperator.value = operators[Math.floor(Math.random() * operators.length)]

    num1.value = Math.floor(Math.random() * (max - min + 1)) + min

    if (currentOperator.value === '-') {
      num2.value = Math.floor(Math.random() * (num1.value - min + 1)) + min
    } else if (currentOperator.value === '÷') {
      do {
        num2.value = Math.floor(Math.random() * (max - min + 1)) + 1
      } while (num1.value % num2.value !== 0)
    } else {
      num2.value = Math.floor(Math.random() * (max - min + 1)) + min
    }
  }

  function getCorrectAnswer(): string | number {
    switch (currentOperator.value) {
      case '+': return num1.value + num2.value
      case '-': return num1.value - num2.value
      case '×': return num1.value * num2.value
      case '÷': return num1.value / num2.value
      case 'compare':
        if (num1.value > num2.value) return '>'
        if (num1.value < num2.value) return '<'
        return '='
      default: return 0
    }
  }

  function checkAnswer(correctMsg: string, wrongMsg: string): boolean {
    if (userAnswer.value === '' || userAnswer.value === null || userAnswer.value === undefined) return false

    const correctAnswer = getCorrectAnswer()

    if (currentOperator.value === 'compare') {
      isCorrect.value = userAnswer.value === correctAnswer
    } else {
      isCorrect.value = parseFloat(String(userAnswer.value)) === correctAnswer
    }

    feedbackMessage.value = isCorrect.value ? correctMsg : wrongMsg
    showFeedback.value = true
    return isCorrect.value
  }

  return {
    num1,
    num2,
    currentOperator,
    userAnswer,
    isCorrect,
    showFeedback,
    feedbackMessage,
    generateProblem,
    checkAnswer,
    getCorrectAnswer,
  }
}
