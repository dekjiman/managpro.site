<script setup lang="ts">
import { Loader2 } from '@lucide/vue'

  withDefaults(
    defineProps<{
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
      size?: 'sm' | 'md'
      loading?: boolean
      disabled?: boolean
      type?: 'button' | 'submit' | 'reset'
      ariaLabel?: string
    }>(),
    {
      variant: 'primary',
      size: 'md',
      type: 'button',
      ariaLabel: '',
    },
  )
</script>

<template>
  <button
    :type="type"
    class="app-btn"
    :class="[`app-btn-${variant}`, size === 'sm' && 'app-btn-sm']"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" aria-hidden="true" />
    <slot />
  </button>
</template>
