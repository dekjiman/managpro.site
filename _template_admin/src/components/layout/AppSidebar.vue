<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { X } from '@lucide/vue'
import { adminMenu } from '@/config/menu.config'
import { useAppStore } from '@/app/stores/app.store'
import AppSidebarItem from '@/components/layout/AppSidebarItem.vue'

const appStore = useAppStore()
const sidebarHovered = ref(false)
const isVisuallyCollapsed = computed(() => appStore.sidebarCollapsed && !sidebarHovered.value)
const sidebarZ = computed(() => (appStore.sidebarCollapsed && sidebarHovered.value ? 'z-50' : 'z-40'))

watch(() => appStore.sidebarCollapsed, () => {
  sidebarHovered.value = false
})

function lockBodyScroll(lock: boolean) {
  document.body.style.overflow = lock ? 'hidden' : ''
}

watch(() => appStore.mobileSidebarOpen, (open) => {
  lockBodyScroll(open)
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && appStore.mobileSidebarOpen) {
    appStore.setMobileSidebarOpen(false)
  }
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null
function onResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 1024 && appStore.mobileSidebarOpen) {
      appStore.setMobileSidebarOpen(false)
    }
  }, 150)
}

function onSidebarMouseenter() {
  if (appStore.sidebarCollapsed) {
    sidebarHovered.value = true
  }
}

function onSidebarMouseleave() {
  sidebarHovered.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  lockBodyScroll(false)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  if (resizeTimer) clearTimeout(resizeTimer)
})
</script>

<template>
  <aside
    class="app-sidebar fixed inset-y-0 left-0 hidden overflow-y-auto transition-all duration-200 lg:block"
    :class="[isVisuallyCollapsed ? 'app-sidebar-collapsed w-20' : 'w-[17rem]', sidebarZ]"
    @mouseenter="onSidebarMouseenter"
    @mouseleave="onSidebarMouseleave"
  >
    <div class="flex h-16 items-center border-b border-app-borderSoft px-4">
      <RouterLink to="/dashboard" class="flex items-center gap-3" :class="isVisuallyCollapsed && 'justify-center'">
        <img src="/favicon.svg" alt="" class="h-9 w-9 shrink-0 rounded-lg" aria-hidden="true" />
        <span v-if="!isVisuallyCollapsed" class="font-semibold text-app-text">{{ appStore.appName }}</span>
      </RouterLink>
    </div>
    <nav class="grid gap-5 p-3">
      <section v-for="group in adminMenu" :key="group.label" class="grid gap-2">
        <p v-if="!isVisuallyCollapsed" class="px-3 text-xs font-semibold uppercase tracking-wide text-app-textSubtle">{{ group.label }}</p>
        <AppSidebarItem v-for="item in group.items" :key="item.label" :item="item" :collapsed="isVisuallyCollapsed" />
      </section>
    </nav>
  </aside>

  <div v-if="appStore.mobileSidebarOpen" class="fixed inset-0 z-50 lg:hidden">
    <button class="absolute inset-0 bg-app-overlay" type="button" aria-label="Close sidebar" @click="appStore.setMobileSidebarOpen(false)" />
    <aside class="app-sidebar relative h-full w-72 overflow-y-auto">
      <div class="flex h-16 items-center justify-between border-b border-app-borderSoft px-4">
        <RouterLink to="/dashboard" class="flex items-center gap-3" @click="appStore.setMobileSidebarOpen(false)">
          <img src="/favicon.svg" alt="" class="h-9 w-9 shrink-0 rounded-lg" aria-hidden="true" />
          <span class="font-semibold text-app-text">{{ appStore.appName }}</span>
        </RouterLink>
        <button class="app-btn app-btn-ghost app-btn-icon" type="button" aria-label="Close sidebar" @click="appStore.setMobileSidebarOpen(false)">
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <nav class="grid gap-5 p-3" @click="appStore.setMobileSidebarOpen(false)">
        <section v-for="group in adminMenu" :key="group.label" class="grid gap-2">
          <p class="px-3 text-xs font-semibold uppercase tracking-wide text-app-textSubtle">{{ group.label }}</p>
          <AppSidebarItem v-for="item in group.items" :key="item.label" :item="item" />
        </section>
      </nav>
    </aside>
  </div>
</template>
