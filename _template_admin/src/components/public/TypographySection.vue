<template>
  <section class="bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Clean typography with Inter.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          A consistent Inter-based type scale — from page titles to badges — ensures readability and visual hierarchy across every page.
        </p>
      </div>
      <div class="mx-auto mt-12 max-w-3xl">
        <TypographySample />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TypographySample from './TypographySample.vue'
</script>
