<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionListStore } from '@/stores/questionListStore'

const router = useRouter()
const store = useQuestionListStore()

const questionnaires = computed(() => store.questionnaires)

const handleCreateNew = () => {
  const newGuid = store.createNewQuestionnaire()
  router.push('/questionnaire/edit')
}

const handleDelete = (guid: string) => {
  if (confirm('確定要刪除此問卷嗎？')) {
    store.deleteQuestionnaire(guid)
  }
}

const handleEdit = (guid: string) => {
  store.setCurrentGuid(guid)
  router.push('/questionnaire/edit')
}
</script>

<template>
  <div class="management-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">問卷管理</h1>
        <p class="page-subtitle">建立和管理健康問卷</p>
      </div>
      <button class="btn-primary" @click="handleCreateNew">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        建立問卷
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #dbeafe; color: #3b82f6;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">總問卷數</p>
          <p class="stat-value">{{ questionnaires.length }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #dcfce7; color: #22c55e;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">進行中</p>
          <p class="stat-value">{{ questionnaires.filter(q => q.status === 'Active').length }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7; color: #f59e0b;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">停用</p>
          <p class="stat-value">{{ questionnaires.filter(q => q.status === 'Inactive').length }}</p>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>問卷標題</th>
            <th>描述</th>
            <th>問題數</th>
            <th>狀態</th>
            <th>建立日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in questionnaires" :key="item.guid">
            <td class="font-semibold">{{ item.title }}</td>
            <td>{{ item.script }}</td>
            <td>{{ item.questions.length }} 題</td>
            <td>
              <span class="status-badge" :class="item.status === 'Active' ? 'status-active' : 'status-inactive'">
                {{ item.status === 'Active' ? '啟用' : '停用' }}
              </span>
            </td>
            <td>{{ item.createDate }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon" title="編輯" @click="handleEdit(item.guid)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="btn-icon" title="預覽">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button class="btn-icon text-red" title="刪除" @click="handleDelete(item.guid)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.management-page {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 8px 0;
  text-align: left;
}

.page-subtitle {
  color: #6b7280;
  margin: 0;
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 4px 0;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin: 0;
}

.table-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f9fafb;
}

.data-table th {
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 16px;
  color: #374151;
  border-top: 1px solid #e5e7eb;
}

.font-semibold {
  font-weight: 600;
  color: #111827;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: #dcfce7;
  color: #16a34a;
}

.status-inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: #f3f4f6;
  color: #111827;
}

.btn-icon.text-red:hover {
  background: #fee2e2;
  color: #dc2626;
}
</style>
