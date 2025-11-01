<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  sidebarCollapsed: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: []
}>()

const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}
</script>

<template>
  <nav class="navbar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <div class="navbar-left">
      <button class="menu-btn" @click="emit('toggleSidebar')" aria-label="Toggle sidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div class="search-container">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Search or type command..." class="search-input" />
        <kbd class="kbd">⌘K</kbd>
      </div>
    </div>
    
    <div class="navbar-right">
      <span class="welcome-text">Welcome, Joy!</span>
      
      <button class="icon-btn theme-toggle" aria-label="Toggle theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      
      <button class="icon-btn notification-btn" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="notification-badge">4</span>
      </button>
      
      <div class="user-menu">
        <button class="user-btn" @click="toggleUserMenu" aria-label="User menu">
          <img src="https://i.pravatar.cc/150?img=12" alt="User avatar" class="user-avatar" />
          <span class="user-name">Joy </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        <div v-if="showUserMenu" class="user-dropdown">
          <a href="#" class="dropdown-item">Profile</a>
          <a href="#" class="dropdown-item">Settings</a>
          <a href="#" class="dropdown-item">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  top: 0;
  right: 0;
  left: 280px;
  z-index: 100;
  transition: left 0.3s ease;
}

.navbar.sidebar-collapsed {
  left: 80px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 10px 70px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.kbd {
  position: absolute;
  right: 12px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  color: #6b7280;
  font-family: monospace;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-text {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.icon-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.user-menu {
  position: relative;
}

.user-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.user-btn:hover {
  background: #f3f4f6;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  color: #111827;
  font-size: 14px;
  font-weight: 600;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #f3f4f6;
  color: #111827;
}
</style>
