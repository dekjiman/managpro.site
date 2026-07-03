<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { auditLogs } from '@/data/mock/audit-logs.mock'
import { formatDateTime } from '@/utils/format'

const route = useRoute()

const searchQuery = ref('')
const moduleFilter = ref('')
const severityFilter = ref('')
const currentPage = ref(1)
const pageSize = 10

const selectedIds = ref<string[]>([])
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visibleLogs.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleLogs.value.map((item) => String(item.id))
  }
}

const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')
function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const moduleOptions = [
  { label: 'All modules', value: '' },
  { label: 'Auth', value: 'Auth' },
  { label: 'System', value: 'System' },
  { label: 'Content', value: 'Content' },
  { label: 'Users', value: 'Users' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Orders', value: 'Orders' },
  { label: 'CRM', value: 'CRM' },
  { label: 'Reports', value: 'Reports' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Catalog', value: 'Catalog' },
  { label: 'Tasks', value: 'Tasks' },
]

const severityOptions = [
  { label: 'All severity', value: '' },
  { label: 'Info', value: 'Info' },
  { label: 'Warning', value: 'Warning' },
  { label: 'Critical', value: 'Critical' },
]

const filteredLogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return auditLogs.filter((log) => {
    const matchesQuery = !query || log.actor.toLowerCase().includes(query) || log.action.toLowerCase().includes(query) || log.details.toLowerCase().includes(query)
    const matchesModule = !moduleFilter.value || log.module === moduleFilter.value
    const matchesSeverity = !severityFilter.value || log.severity === severityFilter.value
    return matchesQuery && matchesModule && matchesSeverity
  })
})

const sortedLogs = computed(() => {
  if (!sortKey.value) return filteredLogs.value
  return [...filteredLogs.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / pageSize)))
const visibleLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedLogs.value.slice(start, start + pageSize)
})

const logStats = computed(() => [
  { label: 'Total Entries', value: auditLogs.length },
  { label: 'Info', value: auditLogs.filter((l) => l.severity === 'Info').length },
  { label: 'Warning', value: auditLogs.filter((l) => l.severity === 'Warning').length },
  { label: 'Critical', value: auditLogs.filter((l) => l.severity === 'Critical').length },
])

watch([searchQuery, moduleFilter, severityFilter], () => { currentPage.value = 1 })

const severityVariant = (severity: string) => {
  if (severity === 'Critical') return 'danger'
  if (severity === 'Warning') return 'warning'
  return 'info'
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Audit Logs" description="Review system audit trail for compliance and security monitoring." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in logStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="audit-search" v-model="searchQuery" class="pl-9" placeholder="Search by actor, action, or details..." aria-label="Search audit logs" />
          </div>
          <AppSelect id="audit-module-filter" v-model="moduleFilter" label="Module" :options="moduleOptions" />
          <AppSelect id="audit-severity-filter" v-model="severityFilter" label="Severity" :options="severityOptions" />
        </div>
      </div>

      <div v-if="selectedIds.length > 0" class="flex items-center gap-3 border-b border-app-borderSoft bg-primary-50/50 px-4 py-3">
        <span class="text-sm font-medium text-primary-700">{{ selectedIds.length }} selected</span>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-danger-700 hover:bg-danger-50" type="button" @click="selectedIds = []">Delete Selected</button>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100" type="button" @click="selectedIds = []">Assign</button>
        <button class="ml-auto rounded px-3 py-1.5 text-sm font-medium text-app-textSecondary hover:bg-app-muted" type="button" @click="selectedIds = []">Clear</button>
      </div>

      <div v-if="filteredLogs.length === 0" class="p-4">
        <AppEmptyState title="No audit entries found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; moduleFilter = ''; severityFilter = ''">
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
              <th scope="col" class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleLogs.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('actor')">
                  Actor
                  <ArrowUp v-if="sortKey === 'actor' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'actor' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('action')">
                  Action
                  <ArrowUp v-if="sortKey === 'action' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'action' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('resource')">
                  Resource
                  <ArrowUp v-if="sortKey === 'resource' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'resource' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('module')">
                  Module
                  <ArrowUp v-if="sortKey === 'module' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'module' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('severity')">
                  Severity
                  <ArrowUp v-if="sortKey === 'severity' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'severity' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('ip_address')">
                  IP Address
                  <ArrowUp v-if="sortKey === 'ip_address' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'ip_address' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('timestamp')">
                  Timestamp
                  <ArrowUp v-if="sortKey === 'timestamp' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'timestamp' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in visibleLogs" :key="log.id" :class="selectedIds.includes(String(log.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(log.id))"
                  :aria-label="`Select row ${String(log.id)}`"
                  @change="toggleRow(String(log.id))"
                />
              </td>
              <td>
                <span class="font-medium text-app-text">{{ log.actor }}</span>
              </td>
              <td>
                <span class="text-sm capitalize text-app-textSecondary">{{ log.action.replace(/_/g, ' ') }}</span>
              </td>
              <td>
                <div class="min-w-[8rem]">
                  <p class="text-sm text-app-text">{{ log.resource }}</p>
                  <p class="text-xs text-app-textMuted">ID: {{ log.resource_id }}</p>
                </div>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ log.module }}</span>
              </td>
              <td>
                <AppBadge :variant="severityVariant(log.severity)">{{ log.severity }}</AppBadge>
              </td>
              <td>
                <span class="text-sm font-mono text-app-textMuted">{{ log.ip_address }}</span>
              </td>
              <td>
                <span class="text-sm whitespace-nowrap text-app-textSecondary">{{ formatDateTime(log.timestamp) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>
  </div>
</template>
