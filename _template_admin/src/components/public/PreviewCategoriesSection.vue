<template>
  <section id="preview" class="scroll-mt-20 bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Explore ready-made pages by category.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Preview dashboards, apps, management pages, finance screens, auth flows, and component examples.
        </p>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PreviewCategoryCard
          v-for="category in previewCategories"
          :key="category.title"
          :icon="category.icon"
          :title="category.title"
          :description="category.description"
          :count="category.count"
          :href="category.href"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { previewCategories } from '@/config/landing.config'
import PreviewCategoryCard from './PreviewCategoryCard.vue'
</script>
