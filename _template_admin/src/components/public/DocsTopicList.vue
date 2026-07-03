<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <div
      v-for="topic in topics"
      :key="topic"
      class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
    >
      <FileText class="h-4 w-4 flex-shrink-0 text-primary-500" />
      <span class="text-sm font-medium text-gray-700">{{ topic }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from '@lucide/vue'

defineProps<{
  topics: ReadonlyArray<string>
}>()
</script>
