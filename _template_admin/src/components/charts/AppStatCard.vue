<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight, Minus } from '@lucide/vue'
import AppCard from '@/components/ui/AppCard.vue'

defineProps<{
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'flat'
}>()
</script>

<template>
  <AppCard>
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-app-textMuted">{{ title }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ value }}</p>
      </div>
      <div
        class="rounded-lg p-2"
        :class="trend === 'down' ? 'bg-danger-50 text-danger-600' : trend === 'flat' ? 'bg-secondary-50 text-secondary-600' : 'bg-success-50 text-success-600'"
      >
        <ArrowDownRight v-if="trend === 'down'" class="h-5 w-5" aria-hidden="true" />
        <Minus v-else-if="trend === 'flat'" class="h-5 w-5" aria-hidden="true" />
        <ArrowUpRight v-else class="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
    <p v-if="change" class="mt-3 text-sm text-app-textMuted">{{ change }}</p>
  </AppCard>
</template>
