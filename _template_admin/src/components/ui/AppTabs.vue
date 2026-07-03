<script setup lang="ts">
defineProps<{
  tabs: string[]
  active: string
}>()

const emit = defineEmits<{
  change: [tab: string]
}>()
</script>

<template>
  <div class="app-tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="app-tab"
      :class="active === tab && 'app-tab-active'"
      type="button"
      @click="emit('change', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>
