<script setup lang="ts">
defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <button
    type="button"
    class="flex w-full items-center justify-between rounded-lg border border-app-borderSoft p-3 text-left"
    :aria-pressed="modelValue"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span class="text-sm font-medium text-app-text">{{ label }}</span>
    <span class="relative h-6 w-11 rounded-full transition" :class="modelValue ? 'bg-primary-600' : 'bg-secondary-300'">
      <span class="absolute top-1 h-4 w-4 rounded-full bg-white transition" :class="modelValue ? 'left-6' : 'left-1'" />
    </span>
  </button>
</template>
