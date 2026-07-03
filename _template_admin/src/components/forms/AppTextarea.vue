<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  modelValue: string
  placeholder?: string
  helper?: string
  error?: string
  required?: boolean
  disabled?: boolean
  rows?: number
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
    <textarea
      :id="id"
      class="app-textarea"
      :class="error && 'border-danger-500'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows || 4"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : helper ? `${id}-helper` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <span v-if="helper && !error" :id="`${id}-helper`" class="app-helper-text">{{ helper }}</span>
    <span v-if="error" :id="`${id}-error`" class="app-error-text">{{ error }}</span>
  </label>
</template>
