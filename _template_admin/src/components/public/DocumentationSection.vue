<template>
  <section id="docs" class="scroll-mt-20 bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Documentation included.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Follow practical guides for installation, folder structure, routing, menu config, SCSS tokens, design system, mock data, and customization.
        </p>
      </div>
      <div class="mx-auto mt-12 max-w-3xl">
        <DocsTopicList :topics="docsTopics" />
        <div class="mt-8 text-center">
          <a
            href="/docs"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <BookOpen class="h-4 w-4" />
            Read Full Documentation
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpen } from '@lucide/vue'
import { docsTopics } from '@/config/landing.config'
import DocsTopicList from './DocsTopicList.vue'
</script>
