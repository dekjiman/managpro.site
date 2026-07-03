<template>
  <section class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tabler-inspired color system.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Every UI component uses a consistent semantic color palette — primary, success, info, warning, and danger — with full Tailwind token mapping for easy customization.
        </p>
      </div>
      <div class="mt-12">
        <ColorSwatchGrid />
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in designSystemItems"
          :key="item.label"
          class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
        >
          <h4 class="text-sm font-semibold text-gray-900">{{ item.label }}</h4>
          <p class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { designSystemItems } from '@/config/landing.config'
import ColorSwatchGrid from './ColorSwatchGrid.vue'
</script>
