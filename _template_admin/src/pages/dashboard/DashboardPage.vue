<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppChartCard from '@/components/charts/AppChartCard.vue'
import AppStatCard from '@/components/charts/AppStatCard.vue'
import AppTable from '@/components/tables/AppTable.vue'
import { activities, categoryLabels, categorySeries, dashboardMetrics, recentOrders, revenueSeries } from '@/data/mock/dashboard.mock'
import type { TableColumn } from '@/types/common'

const props = defineProps<{
  variant: 'overview' | 'analytics' | 'sales'
}>()

const route = useRoute()
const title = computed(() => String(route.meta.title))
const description = computed(() => {
  if (props.variant === 'analytics') return 'Traffic, audience, and campaign performance sample dashboard.'
  if (props.variant === 'sales') return 'Sales performance, revenue progress, and customer acquisition overview.'
  return 'Business summary with metrics, revenue chart, recent orders, and activity samples.'
})

const columns: TableColumn[] = [
  { key: 'name', label: 'Order' },
  { key: 'owner', label: 'Customer' },
  { key: 'status', label: 'Status', type: 'badge' },
  { key: 'amount', label: 'Amount', type: 'currency' },
  { key: 'updated_at', label: 'Date', type: 'date' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader :title="title" :description="description" :breadcrumb="route.meta.breadcrumb">
      <template #actions>
        <AppButton variant="secondary">Last 30 days</AppButton>
        <AppButton>Export</AppButton>
      </template>
    </AppPageHeader>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppStatCard
        v-for="metric in dashboardMetrics[variant]"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :trend="metric.trend"
      />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
      <AppChartCard title="Revenue Overview" description="Monthly trend generated from mock data." type="area" :series="revenueSeries" />
      <AppChartCard title="Sales by Category" description="Category share sample." type="donut" :series="categorySeries" :labels="categoryLabels" />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
      <AppCard title="Recent Orders" description="Table sample with status badges and currency formatting.">
        <AppTable :columns="columns" :rows="recentOrders" />
      </AppCard>
      <AppCard title="Recent Activity" description="Activity list sample.">
        <div class="grid gap-3">
          <div v-for="activity in activities" :key="activity" class="rounded-lg border border-app-borderSoft bg-app-muted p-3 text-sm text-app-textMuted">
            {{ activity }}
          </div>
        </div>
      </AppCard>
    </section>
  </div>
</template>
