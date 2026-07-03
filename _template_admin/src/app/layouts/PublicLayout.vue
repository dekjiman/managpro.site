<template>
  <div class="public-layout flex min-h-screen flex-col bg-white">
    <PublicHeader />
    <main class="flex-1">
      <slot />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import PublicHeader from '@/components/public/PublicHeader.vue'
import PublicFooter from '@/components/public/PublicFooter.vue'
</script>
