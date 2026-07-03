<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Check } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { pricingPlans } from '@/data/mock/pricing-plans.mock'
import { formatCurrency } from '@/utils/format'

const route = useRoute()
const uiStore = useUiStore()

function selectPlan(name: string) {
  uiStore.pushToast({ title: `Selected ${name} plan (sample)`, type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Pricing Plans" description="View and compare available subscription plans." :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="plan in pricingPlans"
        :key="plan.id"
        class="relative flex flex-col rounded-card border bg-app-card p-6 shadow-card"
        :class="plan.is_popular ? 'border-primary-400 ring-1 ring-primary-400' : 'border-app-borderSoft'"
      >
        <div v-if="plan.is_popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <AppBadge variant="info">Most Popular</AppBadge>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold text-app-text">{{ plan.name }}</h3>
          <p class="mt-1 text-sm text-app-textSecondary">{{ plan.description }}</p>
        </div>

        <div class="mb-4">
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-bold text-app-text">{{ plan.monthly_price === 0 ? 'Free' : formatCurrency(plan.monthly_price) }}</span>
            <span v-if="plan.monthly_price > 0" class="text-sm text-app-textMuted">/month</span>
          </div>
          <p v-if="plan.yearly_price > 0" class="mt-1 text-xs text-app-textMuted">
            {{ formatCurrency(plan.yearly_price) }}/year
          </p>
        </div>

        <ul class="mb-6 flex-1 space-y-3">
          <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
            <Check class="mt-0.5 h-4 w-4 shrink-0 text-success-500" aria-hidden="true" />
            <span class="text-sm text-app-textSecondary">{{ feature }}</span>
          </li>
        </ul>

        <AppButton
          :variant="plan.is_popular ? 'primary' : 'secondary'"
          :class="plan.monthly_price === 0 ? 'opacity-60 cursor-not-allowed' : ''"
          :disabled="plan.monthly_price === 0"
          @click="selectPlan(plan.name)"
        >
          {{ plan.monthly_price === 0 ? 'Current Plan' : 'Choose Plan' }}
        </AppButton>
      </div>
    </div>
  </div>
</template>
