<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/app/stores/app.store'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const appStore = useAppStore()
const contentOffset = computed(() => (appStore.sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-[17rem]'))
</script>

<template>
  <div class="admin-shell bg-app-page">
    <AppSidebar />
    <div class="admin-main transition-all duration-200" :class="contentOffset">
      <AppHeader />
      <main class="app-content-container">
        <slot />
      </main>
    </div>
  </div>
</template>
