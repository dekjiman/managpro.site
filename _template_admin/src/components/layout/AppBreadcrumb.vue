<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

defineProps<{
  items?: string[]
}>()
</script>

<template>
  <nav v-if="items?.length" class="flex items-center gap-1 text-sm text-app-textMuted" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="item">
      <span :class="index === items.length - 1 && 'font-medium text-app-text'">{{ item }}</span>
      <ChevronRight v-if="index < items.length - 1" class="h-4 w-4" aria-hidden="true" />
    </template>
  </nav>
</template>
