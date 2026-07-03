<script setup lang="ts">
import type { StatusVariant } from '@/types/common'

withDefaults(
  defineProps<{
    variant?: StatusVariant
  }>(),
  {
    variant: 'neutral',
  },
)
</script>

<template>
  <span class="app-badge" :class="`app-badge-${variant}`">
    <slot />
  </span>
</template>
