<script setup lang="ts">
import { computed, ref } from 'vue'
import { LogOut, Settings, User } from '@lucide/vue'
import { useAuthStore } from '@/app/stores/auth.store'
import { getInitials } from '@/utils/status'

const authStore = useAuthStore()
const open = ref(false)
const initials = computed(() => getInitials(authStore.currentUser.name))
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary-50"
      aria-label="Open user menu"
      @click="open = !open"
    >
      <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-sm font-semibold text-primary-700">
        {{ initials }}
      </span>
      <span class="hidden text-left md:block">
        <span class="block text-sm font-medium text-app-text">{{ authStore.currentUser.name }}</span>
        <span class="block text-xs text-app-textMuted">{{ authStore.currentUser.role }}</span>
      </span>
    </button>
    <div v-if="open" class="app-dropdown absolute right-0 z-40 mt-2 w-56 p-2">
      <button class="app-dropdown-item text-sm" type="button">
        <User class="h-4 w-4" aria-hidden="true" /> Profile
      </button>
      <button class="app-dropdown-item text-sm" type="button">
        <Settings class="h-4 w-4" aria-hidden="true" /> Settings
      </button>
      <button class="app-dropdown-item app-dropdown-item-danger text-sm" type="button">
        <LogOut class="h-4 w-4" aria-hidden="true" /> Sign out
      </button>
    </div>
  </div>
</template>
