<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Filter, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { formatDateTime } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

interface ActivityItem {
  id: number
  user: string
  action: string
  target: string
  type: 'create' | 'update' | 'delete' | 'login' | 'export'
  status: string
  timestamp: string
}

const allActivities: ActivityItem[] = Array.from({ length: 24 }, (_, i) => {
  const types = ['create', 'update', 'delete', 'login', 'export'] as const
  const users = ['John Carter', 'Mika Chen', 'Noah Bennett', 'Sofia Lane', 'Ilya Novak', 'Maya Singh']
  const actions = ['Created', 'Updated', 'Deleted', 'Exported', 'Logged in']
  const targets = ['Invoice #00' + (i + 1), 'User Profile', 'Product SKU-0' + (i + 1), 'Sales Report', 'Customer Record']
  const statuses = ['completed', 'pending', 'failed']
  const hours = i * 3
  return {
    id: i + 1,
    user: users[i % users.length],
    action: actions[i % actions.length],
    target: targets[i % targets.length],
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    timestamp: `2026-06-${String(14 - Math.floor(i / 3)).padStart(2, '0')}T${String(8 + (hours % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`,
  }
})

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const typeFilter = ref('')
const currentPage = ref(1)
const pageSize = 8

const typeOptions = [
  { label: 'All types', value: '' },
  { label: 'Created', value: 'create' },
  { label: 'Updated', value: 'update' },
  { label: 'Deleted', value: 'delete' },
  { label: 'Login', value: 'login' },
  { label: 'Export', value: 'export' },
]

const filteredActivities = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return allActivities.filter((a) => {
    const matchesQuery = !query || a.user.toLowerCase().includes(query) || a.action.toLowerCase().includes(query) || a.target.toLowerCase().includes(query)
    const matchesType = !typeFilter.value || a.type === typeFilter.value
    return matchesQuery && matchesType
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredActivities.value.length / pageSize)))
const visibleActivities = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredActivities.value.slice(start, start + pageSize)
})

const activityStats = computed(() => [
  { label: 'Total Activities', value: allActivities.length },
  { label: 'Created', value: allActivities.filter((a) => a.type === 'create').length },
  { label: 'Updates', value: allActivities.filter((a) => a.type === 'update').length },
  { label: 'Failed', value: allActivities.filter((a) => a.status === 'failed').length },
])

watch([searchQuery, typeFilter], () => { currentPage.value = 1 })
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Activity" description="Track user activity across the platform." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in activityStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <AppCard title="Activity Timeline">
      <div class="border-b border-app-borderSoft px-0 py-3">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="act-search" v-model="searchQuery" class="pl-9" placeholder="Search by user, action, or target..." aria-label="Search activity" />
          </div>
          <label class="app-form-group" for="act-type-filter">
            <span class="sr-only">Type filter</span>
            <select id="act-type-filter" v-model="typeFilter" class="app-input">
              <option v-for="opt in typeOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredActivities.length === 0" class="p-4">
        <AppEmptyState title="No activity found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; typeFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Action</th>
              <th scope="col">Target</th>
              <th scope="col">Status</th>
              <th scope="col">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="act in visibleActivities" :key="act.id">
              <td><span class="font-medium text-app-text">{{ act.user }}</span></td>
              <td><span class="text-sm text-app-text">{{ act.action }}</span></td>
              <td><span class="text-sm text-app-textSecondary">{{ act.target }}</span></td>
              <td><AppBadge :variant="getStatusVariant(act.status)">{{ act.status }}</AppBadge></td>
              <td><span class="text-sm text-app-text">{{ formatDateTime(act.timestamp) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </AppCard>
  </div>
</template>
