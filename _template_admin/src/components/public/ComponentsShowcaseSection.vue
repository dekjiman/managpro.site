<template>
  <section id="components" class="scroll-mt-20 bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Reusable components for real admin workflows.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Every UI element is built as a reusable component with typed props, slots, states, and accessibility support.
        </p>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentPreviewTile
          v-for="item in componentShowcaseItems"
          :key="item.title"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { componentShowcaseItems } from '@/config/landing.config'
import ComponentPreviewTile from './ComponentPreviewTile.vue'
</script>
