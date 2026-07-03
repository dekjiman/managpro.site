<template>
  <section class="border-y border-gray-100 bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p class="mb-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
        Built with
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span
          v-for="item in techStackItems"
          :key="item.label"
          class="text-sm font-medium text-gray-500"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { techStackItems } from '@/config/landing.config'
</script>
