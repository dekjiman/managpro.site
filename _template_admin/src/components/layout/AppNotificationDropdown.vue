<script setup lang="ts">
import { ref } from 'vue'
import { Bell } from '@lucide/vue'

const open = ref(false)
const notifications = [
  'New invoice payment received',
  'Weekly report export is ready',
  'Security review completed',
]
</script>

<template>
  <div class="relative">
    <button class="app-btn app-btn-ghost app-btn-icon" type="button" aria-label="Open notifications" @click="open = !open">
      <Bell class="h-5 w-5" aria-hidden="true" />
    </button>
    <div v-if="open" class="app-dropdown absolute right-0 z-40 mt-2 w-72 p-2">
      <div class="px-3 py-2 text-sm font-semibold text-app-text">Notifications</div>
      <div v-for="item in notifications" :key="item" class="app-dropdown-item text-sm text-app-textMuted">
        {{ item }}
      </div>
    </div>
  </div>
</template>
