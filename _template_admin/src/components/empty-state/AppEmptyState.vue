<script setup lang="ts">
import { Inbox } from '@lucide/vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'No data found',
    description: 'Try adjusting your search or filters.',
  },
)
</script>

<template>
  <div class="rounded-lg border border-dashed border-app-border bg-app-muted p-8 text-center">
    <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
      <Inbox class="h-6 w-6" aria-hidden="true" />
    </div>
    <h3 class="app-card-title">{{ title }}</h3>
    <p class="mt-1 text-sm text-app-textMuted">{{ description }}</p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
