<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label :for="id" class="flex items-center gap-2 text-sm text-app-text">
    <input
      :id="id"
      class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-600"
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    {{ label }}
  </label>
</template>
