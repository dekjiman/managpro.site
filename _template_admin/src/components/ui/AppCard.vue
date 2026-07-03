<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="app-card">
    <div v-if="title || description || $slots.actions" class="app-card-header">
      <div>
        <h2 v-if="title" class="app-card-title">{{ title }}</h2>
        <p v-if="description" class="mt-1 text-sm text-app-textMuted">{{ description }}</p>
      </div>
      <slot name="actions" />
    </div>
    <div class="app-card-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="app-card-footer">
      <slot name="footer" />
    </div>
  </section>
</template>
