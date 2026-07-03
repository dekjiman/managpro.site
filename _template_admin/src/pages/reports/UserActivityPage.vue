<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Download, Filter } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { userActivityLogs } from '@/data/mock/user-activity.mock'
import { formatDateTime } from '@/utils/format'

const route = useRoute()

const searchQuery = ref('')
const severityFilter = ref('')
const currentPage = ref(1)
const pageSize = 10

const severityOptions = [
  { label: 'All severity', value: '' },
  { label: 'Info', value: 'Info' },
  { label: 'Warning', value: 'Warning' },
  { label: 'Critical', value: 'Critical' },
]

const filteredLogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return userActivityLogs.filter((log) => {
    const matchesQuery = !query || log.user.toLowerCase().includes(query) || log.action.toLowerCase().includes(query) || log.details.toLowerCase().includes(query)
    const matchesSeverity = !severityFilter.value || log.severity === severityFilter.value
    return matchesQuery && matchesSeverity
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / pageSize)))
const visibleLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredLogs.value.slice(start, start + pageSize)
})

const severityVariant = (severity: string) => {
  if (severity === 'Critical') return 'danger'
  if (severity === 'Warning') return 'warning'
  return 'info'
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="User Activity" description="Track user actions and system events across the platform." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <AppCard title="Activity Timeline" description="Recent user and system actions in reverse chronological order.">
      <div class="mb-4 grid items-end gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
        <div>
          <AppInput id="activity-search" v-model="searchQuery" placeholder="Search by user, action, or details..." aria-label="Search activity" />
        </div>
        <AppSelect id="severity-filter" v-model="severityFilter" aria-label="Filter by severity" :options="severityOptions" />
      </div>

      <div v-if="filteredLogs.length === 0" class="py-8">
        <AppEmptyState title="No activity found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; severityFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="space-y-1">
        <div v-for="log in visibleLogs" :key="log.id" class="flex items-start gap-3 rounded-lg border border-transparent p-3 transition hover:border-app-borderSoft hover:bg-app-muted">
          <span
            class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            :class="log.severity === 'Critical' ? 'bg-danger-100 text-danger-700' : log.severity === 'Warning' ? 'bg-warning-100 text-warning-700' : 'bg-primary-100 text-primary-700'"
          >
            {{ log.user.charAt(0) }}
          </span>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm font-medium text-app-text">{{ log.user }}</span>
              <span class="text-sm text-app-textSecondary">{{ log.action }}</span>
              <AppBadge :variant="severityVariant(log.severity)" size="sm">{{ log.severity }}</AppBadge>
            </div>
            <p class="mt-0.5 text-sm text-app-textSecondary">{{ log.details }}</p>
            <div class="mt-1 flex flex-wrap items-center gap-3 text-xs text-app-textMuted">
              <span>{{ log.resource }}</span>
              <span>IP: {{ log.ip_address }}</span>
              <span>{{ formatDateTime(log.timestamp) }}</span>
            </div>
          </div>
        </div>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </AppCard>
  </div>
</template>
