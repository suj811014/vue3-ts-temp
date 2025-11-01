import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Management from '@/views/Management.vue'
import Preview from '@/views/Preview.vue'
import EditContent from '@/components/question/EditContent.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/management'
  },
  {
    path: '/management',
    name: 'Management',
    component: Management,
    meta: {
      title: '問卷管理'
    }
  },
  {
    path: '/questionnaire/edit',
    name: 'EditQuestionnaire',
    component: EditContent,
    meta: {
      title: '編輯問卷'
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
    meta: {
      title: '問卷預覽'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 設定頁面標題
router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - TailAdmin`
  }
  next()
})

export default router
