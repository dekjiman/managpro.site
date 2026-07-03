<script setup lang="ts">
defineProps<{
  open: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 bg-app-overlay">
      <aside class="ml-auto h-full w-full max-w-md bg-app-card p-5 shadow-modal">
        <slot />
      </aside>
    </div>
  </Teleport>
</template>
