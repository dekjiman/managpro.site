<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'

defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-3 border-t border-app-borderSoft px-4 py-3 text-sm text-app-textMuted">
    <span>Page {{ page }} of {{ totalPages }}</span>
    <div class="flex items-center gap-2">
      <AppButton variant="secondary" size="sm" :disabled="page <= 1" @click="emit('change', page - 1)">Previous</AppButton>
      <AppButton variant="secondary" size="sm" :disabled="page >= totalPages" @click="emit('change', page + 1)">Next</AppButton>
    </div>
  </div>
</template>
