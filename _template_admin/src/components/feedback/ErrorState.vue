<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Unable to load data',
    description: 'This is a sample error state for the template.',
  },
)
</script>

<template>
  <div class="rounded-lg border border-danger-100 bg-danger-50 p-5 text-danger-700">
    <div class="flex items-start gap-3">
      <AlertTriangle class="mt-0.5 h-5 w-5" aria-hidden="true" />
      <div>
        <h3 class="font-semibold">{{ title }}</h3>
        <p class="mt-1 text-sm">{{ description }}</p>
      </div>
    </div>
  </div>
</template>
