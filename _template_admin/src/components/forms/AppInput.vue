<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  modelValue: string | number
  type?: string
  placeholder?: string
  helper?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <label class="app-form-group" :for="id">
    <span v-if="label" class="app-label">
      {{ label }} <span v-if="required" class="text-danger-600">*</span>
    </span>
    <input
      :id="id"
      class="app-input"
      :class="error && 'border-danger-500'"
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : helper ? `${id}-helper` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="helper && !error" :id="`${id}-helper`" class="app-helper-text">{{ helper }}</span>
    <span v-if="error" :id="`${id}-error`" class="app-error-text">{{ error }}</span>
  </label>
</template>
