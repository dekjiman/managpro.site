<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const variants = ['info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Alerts" description="Alert component for feedback messages." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Variants</h2>
        <div class="grid gap-3">
          <AppAlert v-for="v in variants" :key="v" :variant="v" :title="`${v} alert`">
            This is a {{ v }} alert message providing contextual feedback.
          </AppAlert>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">With Description</h2>
        <div class="grid gap-3">
          <AppAlert variant="info" title="Information">
            <p>Your profile is incomplete. Complete your profile to unlock all features.</p>
          </AppAlert>
          <AppAlert variant="success" title="Success">
            <p>Invoice #INV-004 has been sent successfully. The customer will receive it shortly.</p>
          </AppAlert>
          <AppAlert variant="warning" title="Warning">
            <p>Your subscription will expire in 7 days. Renew now to avoid service interruption.</p>
          </AppAlert>
          <AppAlert variant="danger" title="Error">
            <p>Unable to process payment. Please verify your payment method and try again.</p>
          </AppAlert>
        </div>
      </section>
    </div>
  </div>
</template>
