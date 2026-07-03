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
  analyticsMetrics,
  analyticsVisitorSeries,
  campaignPerformance,
  deviceBreakdown,
  topPages,
  trafficSourceLabels,
  trafficSourceSeries,
  visitorLocations,
} from '@/data/mock/dashboard.mock'
import type { TableColumn } from '@/types/common'

const route = useRoute()

const topPageColumns: TableColumn[] = [
  { key: 'name', label: 'Page' },
  { key: 'owner', label: 'Section' },
  { key: 'status', label: 'Status', type: 'badge' },
  { key: 'amount', label: 'Views' },
  { key: 'updated_at', label: 'Updated', type: 'date' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Analytics Dashboard"
      description="Traffic, audience, campaign, and engagement overview for digital channels."
      :breadcrumb="route.meta.breadcrumb"
    >
      <template #actions>
        <AppButton variant="secondary">Traffic source</AppButton>
        <AppButton>Export</AppButton>
      </template>
    </AppPageHeader>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppStatCard
        v-for="metric in analyticsMetrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :trend="metric.trend"
      />
    </section>

    <section class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
      <AppChartCard title="Visitor Trend" description="Visitors and sessions across the last twelve months." type="line" :series="analyticsVisitorSeries" />
      <AppChartCard title="Channel Breakdown" description="Traffic source distribution." type="donut" :series="trafficSourceSeries" :labels="trafficSourceLabels" />
    </section>

    <section class="grid gap-4 xl:grid-cols-3">
      <AppCard title="Device Breakdown" description="Session share by device type.">
        <div class="grid gap-4">
          <div v-for="device in deviceBreakdown" :key="device.device" class="grid gap-2">
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium text-app-text">{{ device.device }}</span>
              <span class="text-app-textMuted">{{ device.sessions }}</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-app-muted">
              <div class="h-full rounded-full bg-primary-600" :style="{ width: device.share }" />
            </div>
            <p class="text-xs font-medium text-success-600">{{ device.trend }} growth</p>
          </div>
        </div>
      </AppCard>

      <AppCard title="Visitor Locations" description="Top markets by visitor count.">
        <div class="grid gap-3">
          <div v-for="location in visitorLocations" :key="location.location" class="flex items-center justify-between gap-4 rounded-lg border border-app-borderSoft bg-app-muted p-3">
            <div>
              <p class="text-sm font-medium text-app-text">{{ location.location }}</p>
              <p class="text-xs text-app-textMuted">{{ location.share }} of traffic</p>
            </div>
            <AppBadge variant="info">{{ location.visitors }}</AppBadge>
          </div>
        </div>
      </AppCard>

      <AppCard title="Campaign Performance" description="Sample conversion signals by campaign.">
        <div class="grid gap-3">
          <div v-for="campaign in campaignPerformance" :key="campaign.name" class="rounded-lg border border-app-borderSoft bg-app-surface p-3">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-semibold text-app-text">{{ campaign.name }}</p>
              <AppBadge variant="success">{{ campaign.conversion }}</AppBadge>
            </div>
            <p class="mt-1 text-xs text-app-textMuted">{{ campaign.channel }} - {{ campaign.spend }} spend</p>
          </div>
        </div>
      </AppCard>
    </section>

    <AppCard title="Top Pages" description="Highest traffic pages from the current sample period.">
      <AppTable :columns="topPageColumns" :rows="topPages" />
    </AppCard>
  </div>
</template>
