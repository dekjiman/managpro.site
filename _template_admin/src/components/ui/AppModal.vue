<script setup lang="ts">
import { X } from '@lucide/vue'

defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="app-modal-overlay flex items-start justify-center p-4 sm:items-center" role="dialog" aria-modal="true">
      <div class="app-modal-panel w-full max-w-lg max-h-[85vh] overflow-y-auto sm:max-w-lg mx-2 sm:mx-0">
        <div class="flex items-center justify-between border-b border-app-borderSoft px-5 py-4">
          <h2 class="app-section-title">{{ title }}</h2>
          <button class="app-btn app-btn-ghost app-btn-icon" type="button" aria-label="Close modal" @click="emit('close')">
            <X class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
