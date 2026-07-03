<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppCard from '@/components/ui/AppCard.vue'
import type { ApexOptions } from 'apexcharts'

const VueApexCharts = defineAsyncComponent(async () => {
  await Promise.all([
    import('apexcharts/line'),
    import('apexcharts/bar'),
    import('apexcharts/pie'),
    import('apexcharts/radialBar'),
    import('apexcharts/features/legend'),
  ])
  const { default: ApexChartCore } = await import('vue3-apexcharts/core')
  return ApexChartCore
})

withDefaults(
    defineProps<{
      title: string
      description?: string
      type?: 'line' | 'area' | 'bar' | 'donut' | 'radialBar'
      labels?: string[]
      series: number[] | { name: string; data: number[] }[]
    }>(),
    {
      description: '',
      type: 'area',
      labels: () => [],
    },
  )

const chartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  colors: ['var(--chart-primary)', 'var(--chart-green)', 'var(--chart-yellow)', 'var(--chart-purple)'],
  dataLabels: { enabled: false },
  grid: { borderColor: 'var(--chart-grid)' },
  labels: [],
  stroke: { curve: 'smooth', width: 3 },
  xaxis: { labels: { style: { colors: 'var(--chart-axis)' } } },
  yaxis: { labels: { style: { colors: 'var(--chart-axis)' } } },
  legend: { labels: { colors: 'var(--text-muted)' } },
}
</script>

<template>
  <AppCard :title="title" :description="description">
    <VueApexCharts
      height="280"
      :type="type"
      :options="{ ...chartOptions, labels }"
      :series="series"
    />
  </AppCard>
</template>
