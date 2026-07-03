<template>
  <div
    class="relative flex flex-col rounded-xl border bg-white p-8 shadow-sm"
    :class="featured ? 'border-primary-300 ring-1 ring-primary-200' : 'border-gray-200'"
  >
    <div v-if="featured" class="absolute -top-3 left-1/2 -translate-x-1/2">
      <span class="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
        Most Popular
      </span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900">{{ name }}</h3>
    <p class="mt-2 text-sm text-gray-600">{{ description }}</p>
    <p class="mt-6">
      <span class="text-4xl font-bold text-gray-900">{{ price }}</span>
      <span v-if="price !== 'Free'" class="ml-1 text-sm font-medium text-gray-500">/one-time</span>
    </p>
    <ul class="mt-8 flex-1 space-y-3">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-start gap-2 text-sm text-gray-700"
      >
        <Check class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
        {{ feature }}
      </li>
    </ul>
    <a
      :href="href"
      class="mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors"
      :class="featured
        ? 'bg-primary-600 text-white hover:bg-primary-700'
        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
    >
      {{ cta }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'

defineProps<{
  name: string
  description: string
  price: string
  features: ReadonlyArray<string>
  cta: string
  href: string
  featured: boolean
}>()
</script>
