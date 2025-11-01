<script setup lang="ts">
import { ref } from "vue";
import Navbar from "@/components/common/Navbar.vue";
import Sidebar from "@/components/common/Sidebar.vue";

const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>

<template>
  <div class="app-container">
    <Sidebar :collapsed="sidebarCollapsed" />
    <div
      class="main-wrapper"
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
    >
      <Navbar @toggle-sidebar="toggleSidebar" :sidebar-collapsed="sidebarCollapsed" />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  width: calc(100vw - 100px);
}

.main-wrapper {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.main-wrapper.sidebar-collapsed {
  margin-left: 80px;
}

.main-content {
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: #f9fafb;
}
</style>
