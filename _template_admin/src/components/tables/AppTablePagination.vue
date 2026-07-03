<script setup lang="ts">
import AppPagination from './AppPagination.vue'

defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()
</script>

<template>
  <AppPagination :page="page" :total-pages="totalPages" @change="emit('change', $event)" />
</template>
