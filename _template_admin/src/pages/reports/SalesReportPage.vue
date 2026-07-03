<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Download } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppStatCard from '@/components/charts/AppStatCard.vue'
import BarChart from '@/components/charts/BarChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import { salesReports } from '@/data/mock/sales.mock'
import { formatCurrency, formatNumber } from '@/utils/format'

const route = useRoute()

const selectedPeriod = ref('sales-jun-2026')

const periodOptions = salesReports.map((r) => ({ label: r.period, value: r.id }))
const report = computed(() => salesReports.find((r) => r.id === selectedPeriod.value) || salesReports[0])

const revenueChart = computed(() => ({
  title: `Daily Revenue - ${report.value.period}`,
  series: [{ name: 'Revenue', data: report.value.daily_metrics.map((d) => d.revenue) }],
}))

const ordersChart = computed(() => ({
  title: `Daily Orders - ${report.value.period}`,
  series: [{ name: 'Orders', data: report.value.daily_metrics.map((d) => d.orders) }],
}))

const categoryChart = computed(() => ({
  title: 'Revenue by Category',
  labels: report.value.revenue_by_category.map((c) => c.category),
  series: report.value.revenue_by_category.map((c) => c.revenue),
}))


</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Sales Report" description="View revenue, orders, and sales performance metrics." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="mb-4">
      <AppSelect id="period-select" v-model="selectedPeriod" label="Report period" :options="periodOptions" class="max-w-xs" />
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <AppStatCard title="Total Revenue" :value="formatCurrency(report.total_revenue)" change="+10.2% vs last month" trend="up" />
      <AppStatCard title="Total Orders" :value="formatNumber(report.total_orders)" change="+7.8% vs last month" trend="up" />
      <AppStatCard title="Customers" :value="formatNumber(report.total_customers)" change="+8.8% vs last month" trend="up" />
      <AppStatCard title="Conversion Rate" :value="`${report.conversion_rate}%`" change="+0.3 pp" trend="up" />
      <AppStatCard title="Avg Order Value" :value="formatCurrency(report.average_order_value)" change="+1.8% vs last month" trend="up" />
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <BarChart :title="revenueChart.title" :series="revenueChart.series" />
      <BarChart :title="ordersChart.title" :series="ordersChart.series" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
      <AppCard title="Top Products" description="Best-selling products by revenue.">
        <div class="overflow-x-auto">
          <table class="app-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Revenue</th>
                <th scope="col">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in report.top_products" :key="p.name">
                <td class="font-medium text-app-text">{{ p.name }}</td>
                <td class="text-sm font-medium text-app-text">{{ formatCurrency(p.revenue) }}</td>
                <td class="text-sm text-app-textSecondary">{{ formatNumber(p.units) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppCard>
      <DonutChart :title="categoryChart.title" :labels="categoryChart.labels" :series="categoryChart.series" />
    </div>
  </div>
</template>
