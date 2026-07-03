<template>
  <a
    :href="href"
    class="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
  >
    <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100">
      <component :is="iconComponent" class="h-5 w-5" />
    </div>
    <h3 class="text-base font-semibold text-gray-900 group-hover:text-primary-600">{{ title }}</h3>
    <p class="mt-1 text-sm text-gray-500">{{ count }}</p>
    <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ description }}</p>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as Icons from '@lucide/vue'

const props = defineProps<{
  icon: string
  title: string
  count: string
  description: string
  href: string
}>()

const iconComponent = computed(() => {
  return (Icons as Record<string, unknown>)[props.icon] as unknown
})
</script>
