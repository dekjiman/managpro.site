<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppChartCard from '@/components/charts/AppChartCard.vue'
import AppStatCard from '@/components/charts/AppStatCard.vue'
import AppTable from '@/components/tables/AppTable.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import {
  activities,
  categoryLabels,
  categorySeries,
  overviewInsights,
  overviewMetrics,
  recentOrders,
  revenueSeries,
} from '@/data/mock/dashboard.mock'
import type { TableColumn } from '@/types/common'

const route = useRoute()

const orderColumns: TableColumn[] = [
  { key: 'name', label: 'Order' },
  { key: 'owner', label: 'Customer' },
  { key: 'status', label: 'Status', type: 'badge' },
  { key: 'amount', label: 'Amount', type: 'currency' },
  { key: 'updated_at', label: 'Date', type: 'date' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Dashboard Overview"
      description="Business summary with KPI health, revenue movement, recent orders, and operational activity."
      :breadcrumb="route.meta.breadcrumb"
    >
      <template #actions>
        <AppButton variant="secondary">Last 30 days</AppButton>
        <AppButton>Export</AppButton>
      </template>
    </AppPageHeader>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppStatCard
        v-for="metric in overviewMetrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :trend="metric.trend"
      />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
      <AppChartCard title="Revenue Overview" description="Monthly revenue trend from mock business data." type="area" :series="revenueSeries" />
      <AppCard title="Quick Insights" description="Operational signals for the current period.">
        <div class="grid gap-3">
          <div v-for="insight in overviewInsights" :key="insight.label" class="rounded-lg border border-app-borderSoft bg-app-muted p-4">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-medium text-app-textMuted">{{ insight.label }}</p>
              <AppBadge variant="primary">{{ insight.value }}</AppBadge>
            </div>
            <p class="mt-2 text-sm text-app-text">{{ insight.note }}</p>
          </div>
        </div>
      </AppCard>
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)_minmax(18rem,0.8fr)]">
      <AppCard title="Recent Orders" description="Latest transaction activity with status and amount.">
        <AppTable :columns="orderColumns" :rows="recentOrders" />
      </AppCard>
      <AppChartCard title="Sales by Category" description="Revenue share by business category." type="donut" :series="categorySeries" :labels="categoryLabels" />
      <AppCard title="Activity Feed" description="Recent internal actions.">
        <div class="grid gap-3">
          <div v-for="activity in activities" :key="activity" class="rounded-lg border border-app-borderSoft bg-app-surface p-3 text-sm text-app-textMuted">
            {{ activity }}
          </div>
        </div>
      </AppCard>
    </section>
  </div>
</template>
