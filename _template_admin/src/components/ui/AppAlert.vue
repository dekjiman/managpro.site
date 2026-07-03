<script setup lang="ts">
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from '@lucide/vue'
import type { StatusVariant } from '@/types/common'

withDefaults(
  defineProps<{
    variant?: Extract<StatusVariant, 'success' | 'warning' | 'danger' | 'info'>
    title: string
  }>(),
  {
    variant: 'info',
  },
)
</script>

<template>
  <div
    class="rounded-lg border p-4 text-sm"
    :class="{
      'border-info-100 bg-info-50 text-info-700': variant === 'info',
      'border-success-100 bg-success-50 text-success-700': variant === 'success',
      'border-warning-100 bg-warning-50 text-warning-800': variant === 'warning',
      'border-danger-100 bg-danger-50 text-danger-700': variant === 'danger',
    }"
  >
    <div class="flex gap-3">
      <Info v-if="variant === 'info'" class="h-5 w-5" aria-hidden="true" />
      <CheckCircle2 v-else-if="variant === 'success'" class="h-5 w-5" aria-hidden="true" />
      <TriangleAlert v-else-if="variant === 'warning'" class="h-5 w-5" aria-hidden="true" />
      <AlertCircle v-else class="h-5 w-5" aria-hidden="true" />
      <div>
        <p class="font-semibold">{{ title }}</p>
        <p v-if="$slots.default" class="mt-1"><slot /></p>
      </div>
    </div>
  </div>
</template>
