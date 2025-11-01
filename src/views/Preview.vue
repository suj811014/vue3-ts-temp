<script setup lang="ts">
import { ref } from 'vue'

interface Question {
  id: number
  type: 'text' | 'radio' | 'checkbox' | 'scale'
  question: string
  options?: string[]
  required: boolean
}

const questionnaireTitle = ref('健康生活習慣問卷')
const questionnaireDescription = ref('評估日常生活習慣對健康的影響')

const questions = ref<Question[]>([
  {
    id: 1,
    type: 'radio',
    question: '您每週運動的頻率是？',
    options: ['從不運動', '每週1-2次', '每週3-4次', '每週5次以上'],
    required: true
  },
  {
    id: 2,
    type: 'radio',
    question: '您每天的睡眠時間大約是？',
    options: ['少於5小時', '5-6小時', '7-8小時', '超過8小時'],
    required: true
  },
  {
    id: 3,
    type: 'checkbox',
    question: '您平時會進行哪些健康活動？（可複選）',
    options: ['規律運動', '健康飲食', '定期體檢', '壓力管理', '充足睡眠'],
    required: false
  },
  {
    id: 4,
    type: 'scale',
    question: '請評估您對自己整體健康狀況的滿意度',
    required: true
  },
  {
    id: 5,
    type: 'text',
    question: '您有什麼想要改善的健康習慣嗎？',
    required: false
  }
])

const answers = ref<Record<number, any>>({})

const handleAnswer = (questionId: number, value: any) => {
  answers.value[questionId] = value
}

const handleCheckbox = (questionId: number, option: string) => {
  if (!answers.value[questionId]) {
    answers.value[questionId] = []
  }
  const index = answers.value[questionId].indexOf(option)
  if (index > -1) {
    answers.value[questionId].splice(index, 1)
  } else {
    answers.value[questionId].push(option)
  }
}

const isChecked = (questionId: number, option: string) => {
  return answers.value[questionId]?.includes(option) || false
}

const submitPreview = () => {
  console.log('Preview answers:', answers.value)
  alert('這是預覽模式，實際問卷會提交資料到後端')
}
</script>

<template>
  <div class="preview-page">
    <div class="preview-container">
      <div class="preview-header">
        <div class="badge">預覽模式</div>
        <h1 class="questionnaire-title">{{ questionnaireTitle }}</h1>
        <p class="questionnaire-description">{{ questionnaireDescription }}</p>
      </div>

      <form class="questionnaire-form" @submit.prevent="submitPreview">
        <div v-for="question in questions" :key="question.id" class="question-card">
          <div class="question-header">
            <h3 class="question-text">
              {{ question.id }}. {{ question.question }}
              <span v-if="question.required" class="required-mark">*</span>
            </h3>
          </div>

          <!-- Radio type -->
          <div v-if="question.type === 'radio'" class="options-list">
            <label 
              v-for="(option, index) in question.options" 
              :key="index" 
              class="option-item"
            >
              <input 
                type="radio" 
                :name="`question-${question.id}`"
                :value="option"
                @change="handleAnswer(question.id, option)"
                class="radio-input"
              />
              <span class="option-label">{{ option }}</span>
            </label>
          </div>

          <!-- Checkbox type -->
          <div v-if="question.type === 'checkbox'" class="options-list">
            <label 
              v-for="(option, index) in question.options" 
              :key="index" 
              class="option-item"
            >
              <input 
                type="checkbox" 
                :checked="isChecked(question.id, option)"
                @change="handleCheckbox(question.id, option)"
                class="checkbox-input"
              />
              <span class="option-label">{{ option }}</span>
            </label>
          </div>

          <!-- Scale type -->
          <div v-if="question.type === 'scale'" class="scale-container">
            <div class="scale-labels">
              <span>非常不滿意</span>
              <span>非常滿意</span>
            </div>
            <div class="scale-options">
              <label 
                v-for="num in 10" 
                :key="num" 
                class="scale-item"
              >
                <input 
                  type="radio" 
                  :name="`question-${question.id}`"
                  :value="num"
                  @change="handleAnswer(question.id, num)"
                  class="scale-input"
                />
                <span class="scale-number">{{ num }}</span>
              </label>
            </div>
          </div>

          <!-- Text type -->
          <div v-if="question.type === 'text'">
            <textarea 
              class="text-input"
              rows="4"
              placeholder="請輸入您的回答..."
              v-model="answers[question.id]"
            ></textarea>
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-submit">
            提交問卷
          </button>
          <p class="footer-note">* 表示必填項目</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.preview-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.preview-container {
  max-width: 800px;
  margin: 0 auto;
}

.preview-header {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.badge {
  display: inline-block;
  background: #6366f1;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
}

.questionnaire-title {
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 12px 0;
}

.questionnaire-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.questionnaire-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.question-header {
  margin-bottom: 20px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.5;
}

.required-mark {
  color: #ef4444;
  margin-left: 4px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.option-item:hover {
  border-color: #6366f1;
  background: #f5f3ff;
}

.radio-input,
.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #6366f1;
}

.option-label {
  font-size: 15px;
  color: #374151;
  user-select: none;
}

.scale-container {
  margin-top: 8px;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6b7280;
}

.scale-options {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.scale-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.scale-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #6366f1;
}

.scale-number {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  user-select: none;
}

.text-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-footer {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.btn-submit {
  background: #6366f1;
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
}

.btn-submit:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.4);
}

.footer-note {
  margin-top: 16px;
  font-size: 13px;
  color: #6b7280;
}
</style>
