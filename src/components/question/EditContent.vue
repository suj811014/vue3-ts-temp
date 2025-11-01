<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionListStore, type Question, type QuestionOption } from '@/stores/questionListStore'

const router = useRouter()
const store = useQuestionListStore()

const title = ref('')
const script = ref('')
const status = ref<'Active' | 'Inactive'>('Active')

const currentQuestionnaire = computed(() => store.getCurrentQuestionnaire())

onMounted(() => {
  if (currentQuestionnaire.value) {
    title.value = currentQuestionnaire.value.title
    script.value = currentQuestionnaire.value.script
    status.value = currentQuestionnaire.value.status
  }
})

// 問題管理
const showQuestionModal = ref(false)
const editingQuestionId = ref<string | null>(null)
const questionType = ref<'radio' | 'checkbox' | 'text'>('radio')
const questionTitle = ref('')
const questionRequired = ref(true)
const questionOptions = ref<QuestionOption[]>([
  { id: crypto.randomUUID(), text: '' }
])

const openAddQuestionModal = () => {
  resetQuestionForm()
  showQuestionModal.value = true
}

const resetQuestionForm = () => {
  editingQuestionId.value = null
  questionType.value = 'radio'
  questionTitle.value = ''
  questionRequired.value = true
  questionOptions.value = [{ id: crypto.randomUUID(), text: '' }]
}

const addOption = () => {
  questionOptions.value.push({ id: crypto.randomUUID(), text: '' })
}

const removeOption = (id: string) => {
  if (questionOptions.value.length > 1) {
    questionOptions.value = questionOptions.value.filter(opt => opt.id !== id)
  }
}

const saveQuestion = () => {
  if (!currentQuestionnaire.value || !questionTitle.value.trim()) {
    alert('請填寫問題標題')
    return
  }

  const newQuestion: Question = {
    id: crypto.randomUUID(),
    type: questionType.value,
    title: questionTitle.value,
    required: questionRequired.value,
    options: ['radio', 'checkbox'].includes(questionType.value) 
      ? questionOptions.value.filter(opt => opt.text.trim()) 
      : undefined
  }

  store.addQuestionToQuestionnaire(currentQuestionnaire.value.guid, newQuestion)
  showQuestionModal.value = false
  resetQuestionForm()
}

const deleteQuestion = (questionId: string) => {
  if (confirm('確定要刪除此問題嗎？')) {
    if (currentQuestionnaire.value) {
      store.deleteQuestion(currentQuestionnaire.value.guid, questionId)
    }
  }
}

const saveQuestionnaire = () => {
  if (!title.value.trim()) {
    alert('請填寫問卷標題')
    return
  }

  if (currentQuestionnaire.value) {
    store.updateQuestionnaire(currentQuestionnaire.value.guid, {
      title: title.value,
      script: script.value,
      status: status.value
    })
    alert('問卷已儲存')
    router.push('/management')
  }
}

const cancel = () => {
  if (confirm('確定要取消嗎？未儲存的資料將會遺失。')) {
    router.push('/management')
  }
}
</script>

<template>
  <div class="add-new-page">
    <div class="page-header">
      <h1 class="page-title">新增健康問卷</h1>
      <div class="header-actions">
        <button class="btn-secondary" @click="cancel">取消</button>
        <button class="btn-primary" @click="saveQuestionnaire">儲存問卷</button>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 基本資訊 -->
      <div class="card">
        <h2 class="card-title">基本資訊</h2>
        
        <div class="form-group">
          <label class="form-label">問卷標題 <span class="required">*</span></label>
          <input 
            v-model="title" 
            type="text" 
            class="form-input" 
            placeholder="請輸入問卷標題"
          />
        </div>

        <div class="form-group">
          <label class="form-label">問卷描述</label>
          <textarea 
            v-model="script" 
            class="form-textarea" 
            rows="3" 
            placeholder="請輸入問卷描述"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">狀態</label>
          <select v-model="status" class="form-select">
            <option value="Active">啟用</option>
            <option value="Inactive">停用</option>
          </select>
        </div>
      </div>

      <!-- 問題列表 -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">問題列表</h2>
          <button class="btn-add" @click="openAddQuestionModal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            新增問題
          </button>
        </div>

        <div v-if="currentQuestionnaire?.questions.length === 0" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="9"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <p>尚未新增任何問題</p>
          <button class="btn-primary" @click="openAddQuestionModal">新增第一個問題</button>
        </div>

        <div v-else class="questions-list">
          <div 
            v-for="(question, index) in currentQuestionnaire?.questions" 
            :key="question.id" 
            class="question-item"
          >
            <div class="question-header">
              <div class="question-info">
                <span class="question-number">{{ index + 1 }}</span>
                <span class="question-type-badge" :class="`type-${question.type}`">
                  {{ question.type === 'radio' ? '單選' : question.type === 'checkbox' ? '多選' : '問答' }}
                </span>
                <h3 class="question-title">{{ question.title }}</h3>
                <span v-if="question.required" class="required-badge">必填</span>
              </div>
              <button class="btn-delete" @click="deleteQuestion(question.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            
            <div v-if="question.options" class="question-options">
              <div v-for="option in question.options" :key="option.id" class="option-item">
                <span class="option-bullet">•</span>
                {{ option.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增問題 Modal -->
    <div v-if="showQuestionModal" class="modal-overlay" @click="showQuestionModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">新增問題</h3>
          <button class="modal-close" @click="showQuestionModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">問題類型</label>
            <select v-model="questionType" class="form-select">
              <option value="radio">單選題</option>
              <option value="checkbox">多選題</option>
              <option value="text">問答題</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">問題標題 <span class="required">*</span></label>
            <input 
              v-model="questionTitle" 
              type="text" 
              class="form-input" 
              placeholder="請輸入問題標題"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="questionRequired" type="checkbox" />
              必填項目
            </label>
          </div>

          <div v-if="questionType === 'radio' || questionType === 'checkbox'" class="form-group">
            <label class="form-label">選項</label>
            <div class="options-editor">
              <div v-for="(option, index) in questionOptions" :key="option.id" class="option-editor">
                <span class="option-index">{{ index + 1 }}.</span>
                <input 
                  v-model="option.text" 
                  type="text" 
                  class="form-input" 
                  placeholder="請輸入選項內容"
                />
                <button 
                  v-if="questionOptions.length > 1"
                  class="btn-remove" 
                  @click="removeOption(option.id)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <button class="btn-add-option" @click="addOption">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                新增選項
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="showQuestionModal = false">取消</button>
          <button class="btn-primary" @click="saveQuestion">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-new-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #4f46e5;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.btn-add {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-add:hover {
  background: #4f46e5;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-state svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin-bottom: 20px;
  font-size: 16px;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-item {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.2s;
}

.question-item:hover {
  border-color: #6366f1;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.question-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.question-number {
  background: #f3f4f6;
  color: #6b7280;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.question-type-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.type-radio {
  background: #dbeafe;
  color: #3b82f6;
}

.type-checkbox {
  background: #dcfce7;
  color: #22c55e;
}

.type-text {
  background: #fef3c7;
  color: #f59e0b;
}

.question-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
}

.required-badge {
  background: #fee2e2;
  color: #ef4444;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.btn-delete {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.question-options {
  padding-left: 40px;
}

.option-item {
  padding: 8px 0;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-bullet {
  color: #6b7280;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 24px;
  text-align: left;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6366f1;
}

.options-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-editor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-index {
  color: #6b7280;
  font-weight: 600;
  min-width: 24px;
}

.btn-remove {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: #fee2e2;
  color: #ef4444;
}

.btn-add-option {
  background: none;
  border: 1px dashed #d1d5db;
  color: #6b7280;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-add-option:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: #f5f3ff;
}
</style>
