<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h3 class="text-base font-semibold text-gray-900">{{ title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
