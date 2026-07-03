<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Wrench } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-warning-50 text-warning-600">
      <Wrench class="h-10 w-10" aria-hidden="true" />
    </div>
    <h1 class="mt-6 text-3xl font-bold text-app-text">Under Maintenance</h1>
    <p class="mx-auto mt-3 max-w-md text-app-textMuted">
      We are performing scheduled maintenance. The system will be back shortly. Thank you for your patience.
    </p>
    <div class="mt-3 text-sm text-app-textSubtle">
      Estimated completion: <span class="font-medium text-app-text">2 hours</span>
    </div>
    <RouterLink class="mt-8 inline-flex" to="/dashboard">
      <AppButton>Back to Dashboard</AppButton>
    </RouterLink>
  </div>
</template>
