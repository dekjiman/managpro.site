<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pb-16 pt-20 sm:pb-24 sm:pt-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Build clean Vue admin dashboards faster.
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
          Nata Admin is a modern Vue 3 + Tailwind + SCSS admin template with ready-to-use pages, components, charts, forms, tables, and a clean design system.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/dashboard"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <Eye class="h-4 w-4" />
            View Live Preview
          </a>
          <a
            href="/docs"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <BookOpen class="h-4 w-4" />
            Read Documentation
          </a>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
          <TechBadge v-for="badge in techStackItems" :key="badge.label" :label="badge.label" />
        </div>
      </div>
      <div class="mt-12 sm:mt-16">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div class="flex items-center gap-1.5 border-b border-gray-200 px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-red-400" />
            <span class="h-3 w-3 rounded-full bg-yellow-400" />
            <span class="h-3 w-3 rounded-full bg-green-400" />
            <span class="ml-2 text-xs font-medium text-gray-400">nata-admin.local</span>
          </div>
          <ImageCompareSlider
            left-image="/src/assets/images/dashboard-light.png"
            right-image="/src/assets/images/dashboard-dark.png"
            left-label="Light Mode"
            right-label="Dark Mode"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Eye, BookOpen } from '@lucide/vue'
import { techStackItems } from '@/config/landing.config'
import TechBadge from './TechBadge.vue'
import ImageCompareSlider from './ImageCompareSlider.vue'
</script>
