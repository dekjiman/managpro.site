<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import LineChart from '@/components/charts/LineChart.vue'
import AreaChart from '@/components/charts/AreaChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import RadialChart from '@/components/charts/RadialChart.vue'

const route = useRoute()

const chartTitle = 'Monthly Overview'

const monthlyRevenue = {
  title: chartTitle,
  series: [{ name: 'Revenue', data: [30, 45, 38, 52, 48, 62, 55, 68, 72, 80, 65, 90] }],
}

const areaData = {
  title: chartTitle,
  series: [{ name: 'Page Views', data: [1200, 1900, 1600, 2100, 1800, 2400, 2200, 2800, 2500, 3000, 2700, 3200] }],
}

const barData = {
  title: chartTitle,
  series: [{ name: 'Orders', data: [15, 22, 18, 28, 24, 32, 28, 35, 30, 38, 26, 42] }],
}

const donutData = {
  title: chartTitle,
  labels: ['Products', 'Services', 'Digital', 'Other'] as string[],
  series: [42, 28, 18, 12],
}

const radialData = {
  title: 'Completion',
  series: [76],
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Charts" description="ApexCharts component wrappers." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <h3 class="mb-3 text-base font-semibold text-app-text">Line Chart</h3>
        <LineChart v-bind="monthlyRevenue" />
      </div>
      <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <h3 class="mb-3 text-base font-semibold text-app-text">Area Chart</h3>
        <AreaChart v-bind="areaData" />
      </div>
      <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <h3 class="mb-3 text-base font-semibold text-app-text">Bar Chart</h3>
        <BarChart v-bind="barData" />
      </div>
      <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <h3 class="mb-3 text-base font-semibold text-app-text">Donut Chart</h3>
        <DonutChart v-bind="donutData" />
      </div>
      <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <h3 class="mb-3 text-base font-semibold text-app-text">Radial Chart</h3>
        <RadialChart v-bind="radialData" />
      </div>
    </div>
  </div>
</template>
