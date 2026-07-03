<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <div
      v-for="group in groups"
      :key="group.title"
      class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
    >
      <CheckCircle class="h-5 w-5 flex-shrink-0 text-primary-500" />
      <div>
        <span class="text-sm font-medium text-gray-900">{{ group.title }}</span>
        <span class="ml-2 text-xs text-gray-500">{{ group.pages }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle } from '@lucide/vue'

defineProps<{
  groups: ReadonlyArray<{ title: string; pages: string }>
}>()
</script>
