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
  orderStatusLabels,
  orderStatusSeries,
  regionSales,
  salesFunnel,
  salesMetrics,
  salesTrendSeries,
  topCustomers,
  topProducts,
} from '@/data/mock/dashboard.mock'
import type { TableColumn } from '@/types/common'

const route = useRoute()

const productColumns: TableColumn[] = [
  { key: 'name', label: 'Product' },
  { key: 'owner', label: 'Category' },
  { key: 'status', label: 'Status', type: 'badge' },
  { key: 'amount', label: 'Revenue', type: 'currency' },
  { key: 'updated_at', label: 'Updated', type: 'date' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Sales Dashboard"
      description="Sales pipeline, revenue target, top products, customers, and order status sample."
      :breadcrumb="route.meta.breadcrumb"
    >
      <template #actions>
        <AppButton variant="secondary">This quarter</AppButton>
        <AppButton>Export</AppButton>
      </template>
    </AppPageHeader>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppStatCard
        v-for="metric in salesMetrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :trend="metric.trend"
      />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,2fr)]">
      <AppCard title="Revenue Target" description="Quarterly target progress.">
        <div class="flex flex-col gap-5">
          <div>
            <p class="text-sm font-medium text-app-textMuted">Target progress</p>
            <p class="mt-2 text-3xl font-bold text-app-text">78%</p>
            <p class="mt-1 text-sm text-app-textMuted">$286.1k of $365k target closed</p>
          </div>
          <div class="h-3 overflow-hidden rounded-full bg-app-muted">
            <div class="h-full w-[78%] rounded-full bg-primary-600" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border border-app-borderSoft bg-app-muted p-3">
              <p class="text-xs text-app-textMuted">Forecast</p>
              <p class="mt-1 text-lg font-semibold text-app-text">$342k</p>
            </div>
            <div class="rounded-lg border border-app-borderSoft bg-app-muted p-3">
              <p class="text-xs text-app-textMuted">Gap</p>
              <p class="mt-1 text-lg font-semibold text-app-text">$79k</p>
            </div>
          </div>
        </div>
      </AppCard>
      <AppChartCard title="Sales Trend" description="Monthly sales performance from sample data." type="area" :series="salesTrendSeries" />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
      <AppCard title="Sales Funnel" description="Pipeline movement from leads to closed won.">
        <div class="grid gap-4">
          <div v-for="stage in salesFunnel" :key="stage.stage" class="grid gap-2">
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium text-app-text">{{ stage.stage }}</span>
              <span class="text-app-textMuted">{{ stage.count }} - {{ stage.rate }}</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-app-muted">
              <div class="h-full rounded-full bg-success-600" :style="{ width: stage.rate }" />
            </div>
          </div>
        </div>
      </AppCard>
      <AppChartCard title="Order Status" description="Order mix for the current period." type="donut" :series="orderStatusSeries" :labels="orderStatusLabels" />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)_minmax(18rem,0.8fr)]">
      <AppCard title="Top Products" description="Products contributing the most revenue.">
        <AppTable :columns="productColumns" :rows="topProducts" />
      </AppCard>

      <AppCard title="Top Customers" description="Highest value buyers this period.">
        <div class="grid gap-3">
          <div v-for="customer in topCustomers" :key="customer.name" class="rounded-lg border border-app-borderSoft bg-app-muted p-3">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-app-text">{{ customer.name }}</p>
              <AppBadge variant="success">{{ customer.value }}</AppBadge>
            </div>
            <p class="mt-1 text-xs text-app-textMuted">{{ customer.orders }}</p>
          </div>
        </div>
      </AppCard>

      <AppCard title="Regional Sales" description="Revenue contribution by region.">
        <div class="grid gap-3">
          <div v-for="region in regionSales" :key="region.region" class="grid gap-2">
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium text-app-text">{{ region.region }}</span>
              <span class="text-app-textMuted">{{ region.value }}</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-app-muted">
              <div class="h-full rounded-full bg-info-600" :style="{ width: region.share }" />
            </div>
          </div>
        </div>
      </AppCard>
    </section>
  </div>
</template>
