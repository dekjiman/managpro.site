<template>
  <section class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need for modern admin workflows.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Over 65 ready-to-use pages across 10 categories — dashboards, apps, management, finance, content, reports, system, auth, error, and component previews.
        </p>
      </div>
      <div class="mt-12">
        <PageGroupList :groups="pageGroups" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pageGroups } from '@/config/landing.config'
import PageGroupList from './PageGroupList.vue'
</script>
