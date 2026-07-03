<template>
  <span
    class="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
