<script setup lang="ts">
import { getInitials } from '@/utils/status'

const props = defineProps<{
  name: string
}>()
</script>

<template>
  <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-sm font-semibold text-primary-700">
    {{ getInitials(props.name) }}
  </span>
</template>
