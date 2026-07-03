<template>
  <section id="features" class="scroll-mt-20 bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to start a modern admin panel.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          From dashboard layouts to data tables, forms, charts, auth pages, and reusable components — Nata Admin gives you a clean foundation for your next project.
        </p>
      </div>
      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="feature in featureItems"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { featureItems } from '@/config/landing.config'
import FeatureCard from './FeatureCard.vue'
</script>
