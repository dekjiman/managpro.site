<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  modelValue: string
  options: { label: string; value: string }[]
  helper?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="app-form-group" :for="id">
    <span v-if="label" class="app-label">{{ label }}</span>
    <span v-if="label" class="app-label">
      {{ label }} <span v-if="required" class="text-danger-600">*</span>
    </span>
    <select
      :id="id"
      class="app-select"
      :class="error && 'border-danger-500'"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : helper ? `${id}-helper` : undefined"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="helper && !error" :id="`${id}-helper`" class="app-helper-text">{{ helper }}</span>
    <span v-if="error" :id="`${id}-error`" class="app-error-text">{{ error }}</span>
  </label>
</template>
