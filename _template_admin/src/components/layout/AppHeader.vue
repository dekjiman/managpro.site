<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Moon, Search, Sun } from '@lucide/vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/app/stores/app.store'
import AppNotificationDropdown from '@/components/layout/AppNotificationDropdown.vue'
import AppSearchOverlay from '@/components/ui/AppSearchOverlay.vue'
import AppUserDropdown from '@/components/layout/AppUserDropdown.vue'

const route = useRoute()
const appStore = useAppStore()
const searchOverlayOpen = ref(false)

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOverlayOpen.value = true
  }
}

onMounted(() => document.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => document.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-app-borderSoft bg-app-header/95 backdrop-blur">
    <div class="flex h-16 items-center justify-between gap-3 px-4 lg:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <button class="app-btn app-btn-ghost app-btn-icon lg:hidden" type="button" aria-label="Open sidebar" @click="appStore.setMobileSidebarOpen(true)">
          <Menu class="h-5 w-5" aria-hidden="true" />
        </button>
        <button class="app-btn app-btn-ghost app-btn-icon hidden lg:inline-flex" type="button" aria-label="Collapse sidebar" @click="appStore.toggleSidebar()">
          <Menu class="h-5 w-5" aria-hidden="true" />
        </button>
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-app-text">{{ route.meta.title }}</p>
          <p class="hidden text-xs text-app-textMuted sm:block">Reusable admin dashboard template</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 rounded-lg p-2 text-app-textMuted hover:bg-app-muted hover:text-app-text lg:hidden" type="button" aria-label="Search" @click="searchOverlayOpen = true">
          <Search class="h-5 w-5" aria-hidden="true" />
        </button>
        <button class="hidden items-center gap-2 rounded-lg p-2 text-app-textMuted hover:bg-app-muted hover:text-app-text md:flex" type="button" aria-label="Search" @click="searchOverlayOpen = true">
          <Search class="h-5 w-5" aria-hidden="true" />
        </button>
        <button class="app-btn app-btn-ghost app-btn-icon" type="button" :aria-label="appStore.currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" @click="appStore.toggleTheme()">
          <Sun v-if="appStore.currentTheme === 'dark'" class="h-5 w-5" aria-hidden="true" />
          <Moon v-else class="h-5 w-5" aria-hidden="true" />
        </button>
        <AppNotificationDropdown />
        <AppUserDropdown />
      </div>
    </div>
    <AppSearchOverlay :open="searchOverlayOpen" @close="searchOverlayOpen = false" />
  </header>
</template>

