import { defineStore } from 'pinia'
import { ref } from 'vue'

export type QuestionType = 'radio' | 'checkbox' | 'text'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  options?: QuestionOption[]
  required: boolean
}

export interface Questionnaire {
  guid: string
  title: string
  script: string
  status: 'Active' | 'Inactive'
  createDate: string
  createHuman: string
  questions: Question[]
}

export const useQuestionListStore = defineStore('questionList', () => {
  // State
  const questionnaires = ref<Questionnaire[]>([
    {
      guid: '550e8400-e29b-41d4-a716-446655440001',
      title: '健康生活習慣問卷',
      script: '評估日常生活習慣對健康的影響',
      status: 'Active',
      createDate: '2025-10-25',
      createHuman: 'Joy',
      questions: []
    },
    {
      guid: '550e8400-e29b-41d4-a716-446655440002',
      title: '運動習慣調查',
      script: '了解個人運動頻率與類型',
      status: 'Active',
      createDate: '2025-10-20',
      createHuman: 'Joy',
      questions: []
    },
    {
      guid: '550e8400-e29b-41d4-a716-446655440003',
      title: '飲食評估問卷',
      script: '收集飲食習慣相關資訊',
      status: 'Inactive',
      createDate: '2025-10-15',
      createHuman: 'Joy',
      questions: []
    }
  ])

  const currentGuid = ref<string>('')

  // Getters
  const getQuestionnaireByGuid = (guid: string) => {
    return questionnaires.value.find(q => q.guid === guid)
  }

  const getCurrentQuestionnaire = () => {
    if (!currentGuid.value) return null
    return getQuestionnaireByGuid(currentGuid.value)
  }

  // Actions
  const createNewQuestionnaire = () => {
    const newGuid = crypto.randomUUID()
    currentGuid.value = newGuid
    
    const newQuestionnaire: Questionnaire = {
      guid: newGuid,
      title: '',
      script: '',
      status: 'Active',
      createDate: new Date().toISOString().split('T')[0] || '',
      createHuman: 'Joy',
      questions: []
    }
    
    questionnaires.value.push(newQuestionnaire)
    return newGuid
  }

  const updateQuestionnaire = (guid: string, data: Partial<Omit<Questionnaire, 'guid'>>) => {
    const questionnaire = getQuestionnaireByGuid(guid)
    if (questionnaire) {
      if (data.title !== undefined) questionnaire.title = data.title
      if (data.script !== undefined) questionnaire.script = data.script
      if (data.status !== undefined) questionnaire.status = data.status
      if (data.createDate !== undefined) questionnaire.createDate = data.createDate
      if (data.createHuman !== undefined) questionnaire.createHuman = data.createHuman
      if (data.questions !== undefined) questionnaire.questions = data.questions
    }
  }

  const deleteQuestionnaire = (guid: string) => {
    const index = questionnaires.value.findIndex(q => q.guid === guid)
    if (index !== -1) {
      questionnaires.value.splice(index, 1)
    }
  }

  const addQuestionToQuestionnaire = (questionnaireGuid: string, question: Question) => {
    const questionnaire = getQuestionnaireByGuid(questionnaireGuid)
    if (questionnaire) {
      questionnaire.questions.push(question)
    }
  }

  const updateQuestion = (questionnaireGuid: string, questionId: string, data: Partial<Question>) => {
    const questionnaire = getQuestionnaireByGuid(questionnaireGuid)
    if (questionnaire) {
      const question = questionnaire.questions.find(q => q.id === questionId)
      if (question) {
        if (data.type !== undefined) question.type = data.type
        if (data.title !== undefined) question.title = data.title
        if (data.options !== undefined) question.options = data.options
        if (data.required !== undefined) question.required = data.required
      }
    }
  }

  const deleteQuestion = (questionnaireGuid: string, questionId: string) => {
    const questionnaire = getQuestionnaireByGuid(questionnaireGuid)
    if (questionnaire) {
      const questionIndex = questionnaire.questions.findIndex(q => q.id === questionId)
      if (questionIndex !== -1) {
        questionnaire.questions.splice(questionIndex, 1)
      }
    }
  }

  const setCurrentGuid = (guid: string) => {
    currentGuid.value = guid
  }

  return {
    // State
    questionnaires,
    currentGuid,
    
    // Getters
    getQuestionnaireByGuid,
    getCurrentQuestionnaire,
    
    // Actions
    createNewQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
    addQuestionToQuestionnaire,
    updateQuestion,
    deleteQuestion,
    setCurrentGuid
  }
})
