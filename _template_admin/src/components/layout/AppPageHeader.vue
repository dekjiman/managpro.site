<script setup lang="ts">
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'

defineProps<{
  title: string
  description?: string
  breadcrumb?: string[]
}>()
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <AppBreadcrumb :items="breadcrumb" />
      <h1 class="app-page-title mt-2">{{ title }}</h1>
      <p v-if="description" class="mt-1 max-w-3xl text-sm text-app-textMuted">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
