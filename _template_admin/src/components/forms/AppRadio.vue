<script setup lang="ts">
defineProps<{
  name: string
  label: string
  value: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="flex items-center gap-2 text-sm text-app-text">
    <input
      class="h-4 w-4 border-app-border text-primary-600 focus:ring-primary-600"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="emit('update:modelValue', value)"
    />
    {{ label }}
  </label>
</template>
