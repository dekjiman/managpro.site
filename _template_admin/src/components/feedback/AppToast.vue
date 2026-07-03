<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/app/stores/ui.store'

const uiStore = useUiStore()
const { toastQueue } = storeToRefs(uiStore)
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 grid gap-2">
    <button
      v-for="toast in toastQueue"
      :key="toast.id"
      type="button"
      class="app-toast px-4 py-3 text-left text-sm"
      @click="uiStore.removeToast(toast.id)"
    >
      {{ toast.title }}
    </button>
  </div>
</template>
