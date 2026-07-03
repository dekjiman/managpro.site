<script setup lang="ts">
import { Loader2 } from '@lucide/vue'
</script>

<template>
  <div class="flex items-center justify-center rounded-lg border border-app-borderSoft bg-app-card p-8 text-app-textMuted">
    <Loader2 class="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
    Loading sample data
  </div>
</template>
