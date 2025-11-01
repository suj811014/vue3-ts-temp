<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps<{
  collapsed: boolean;
}>();

const route = useRoute();
const questionnaireExpanded = ref(true);

const toggleQuestionnaire = () => {
  questionnaireExpanded.value = !questionnaireExpanded.value;
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#6366f1" />
          <path
            d="M10 16L14 20L22 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span v-if="!collapsed" class="logo-text">Questionnaire</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <p v-if="!collapsed" class="section-title">MENU</p>

        <div class="nav-group">
          <button
            class="nav-item nav-group-header"
            :class="{ active: questionnaireExpanded }"
            @click="toggleQuestionnaire"
          >
            <div class="nav-item-content">
              <svg
                class="nav-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span v-if="!collapsed" class="nav-text">Questionnaire</span>
            </div>
            <svg
              v-if="!collapsed"
              class="expand-icon"
              :class="{ expanded: questionnaireExpanded }"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <div v-if="questionnaireExpanded && !collapsed" class="nav-submenu">
            <router-link
              to="/management"
              class="nav-item nav-subitem"
              :class="{ active: isActive('/management') }"
            >
              <span class="nav-text">Management</span>
            </router-link>

            <router-link
              to="/preview"
              class="nav-item nav-subitem"
              :class="{ active: isActive('/preview') }"
            >
              <span class="nav-text">Preview</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: #1c2434;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 200;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-section {
  margin-bottom: 20px;
}

.section-title {
  color: #8a99af;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0 24px;
  margin-bottom: 12px;
}

.nav-group {
  margin-bottom: 8px;
}

.nav-group-header {
  background: transparent;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: #dee4ee;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  margin-bottom: 5px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.active {
  background: #6366f1;
  color: white;
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

.expand-icon {
  transition: transform 0.2s;
  flex-shrink: 0;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.nav-submenu {
  background: rgba(0, 0, 0, 0.2);
}

.nav-subitem {
  width: 88%;
  margin-left: auto;
  font-size: 14px;
}

.nav-subitem:hover {
  background: rgba(255, 255, 255, 0.08);
}

.nav-subitem.active {
  background: #6366f1;
  color: white;
  position: relative;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px 0;
}

.sidebar.collapsed .nav-icon {
  margin: 0;
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
