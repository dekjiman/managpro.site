<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { AlertTriangle } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'

const route = useRoute()
const code = computed(() => {
  const parts = route.path.split('/')
  return parts[parts.length - 1] || '404'
})
const title = computed(() => String(route.meta.title))
</script>

<template>
  <AppCard>
    <div class="text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-danger-50 text-danger-600">
        <AlertTriangle class="h-8 w-8" aria-hidden="true" />
      </div>
      <p class="mt-6 text-5xl font-bold text-danger-700">{{ code }}</p>
      <h1 class="mt-3 text-2xl font-bold text-app-text">{{ title }}</h1>
      <p class="mx-auto mt-2 max-w-lg text-app-textMuted">
        This static error page is part of the template pages set and uses the blank layout.
      </p>
      <RouterLink class="mt-6 inline-flex" to="/dashboard">
        <AppButton>Back to Dashboard</AppButton>
      </RouterLink>
    </div>
  </AppCard>
</template>
