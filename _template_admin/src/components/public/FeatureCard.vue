<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
      <component :is="iconComponent" class="h-5 w-5" />
    </div>
    <h3 class="text-base font-semibold text-gray-900">{{ title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as Icons from '@lucide/vue'

const props = defineProps<{
  icon: string
  title: string
  description: string
}>()

const iconComponent = computed(() => {
  return (Icons as Record<string, unknown>)[props.icon] as unknown
})
</script>
