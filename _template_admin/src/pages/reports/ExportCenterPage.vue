<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter, Plus, RotateCw, Search } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { exportJobs } from '@/data/mock/export-center.mock'
import { formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const uiStore = useUiStore()

const searchQuery = ref('')
const statusFilter = ref('')
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
  if (selectedIds.value.length === visibleJobs.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleJobs.value.map((item) => String(item.id))
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

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Failed', value: 'Failed' },
]

const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return exportJobs.filter((job) => {
    const matchesQuery = !query || job.name.toLowerCase().includes(query) || job.created_by.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || job.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const sortedJobs = computed(() => {
  if (!sortKey.value) return filteredJobs.value
  return [...filteredJobs.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / pageSize)))
const visibleJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedJobs.value.slice(start, start + pageSize)
})

const exportStats = computed(() => [
  { label: 'Total Exports', value: exportJobs.length },
  { label: 'Completed', value: exportJobs.filter((j) => j.status === 'Completed').length },
  { label: 'Failed', value: exportJobs.filter((j) => j.status === 'Failed').length },
  { label: 'Pending / Processing', value: exportJobs.filter((j) => j.status === 'Pending' || j.status === 'Processing').length },
])

watch([searchQuery, statusFilter], () => { currentPage.value = 1 })

function newExport() {
  uiStore.pushToast({ title: 'New export job created (sample)', type: 'success' })
}

function retryExport(id: string) {
  uiStore.pushToast({ title: `Retrying export ${id} (sample)`, type: 'info' })
}

function downloadExport(id: string) {
  uiStore.pushToast({ title: `Downloading export ${id} (sample)`, type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Export Center" description="Create and manage data exports for reports and logs." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="newExport">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          New Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in exportStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="export-search" v-model="searchQuery" class="pl-9" placeholder="Search by name or creator..." aria-label="Search exports" />
          </div>
          <label class="app-form-group" for="export-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="export-status-filter" v-model="statusFilter" class="app-input">
              <option v-for="opt in statusOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="selectedIds.length > 0" class="flex items-center gap-3 border-b border-app-borderSoft bg-primary-50/50 px-4 py-3">
        <span class="text-sm font-medium text-primary-700">{{ selectedIds.length }} selected</span>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-danger-700 hover:bg-danger-50" type="button" @click="selectedIds = []">Delete Selected</button>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100" type="button" @click="selectedIds = []">Assign</button>
        <button class="ml-auto rounded px-3 py-1.5 text-sm font-medium text-app-textSecondary hover:bg-app-muted" type="button" @click="selectedIds = []">Clear</button>
      </div>

      <div v-if="filteredJobs.length === 0" class="p-4">
        <AppEmptyState title="No exports found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleJobs.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('name')">
                  Export
                  <ArrowUp v-if="sortKey === 'name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('type')">
                  Type
                  <ArrowUp v-if="sortKey === 'type' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'type' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('format')">
                  Format
                  <ArrowUp v-if="sortKey === 'format' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'format' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('status')">
                  Status
                  <ArrowUp v-if="sortKey === 'status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('record_count')">
                  Records
                  <ArrowUp v-if="sortKey === 'record_count' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'record_count' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('size')">
                  Size
                  <ArrowUp v-if="sortKey === 'size' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'size' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('created_at')">
                  Created
                  <ArrowUp v-if="sortKey === 'created_at' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'created_at' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in visibleJobs" :key="job.id" :class="selectedIds.includes(String(job.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(job.id))"
                  :aria-label="`Select row ${String(job.id)}`"
                  @change="toggleRow(String(job.id))"
                />
              </td>
              <td>
                <div class="min-w-[10rem]">
                  <p class="font-medium text-app-text">{{ job.name }}</p>
                  <p class="text-xs text-app-textMuted">{{ job.created_by }}</p>
                </div>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ job.type }}</span>
              </td>
              <td>
                <span class="text-sm font-medium uppercase text-app-textSecondary">{{ job.format }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(job.status)">{{ job.status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ job.record_count || '—' }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ job.size || '—' }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(job.created_at) }}</span>
              </td>
              <td>
                <div class="flex min-w-[6rem] items-center gap-2">
                  <button v-if="job.status === 'Completed'" class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="downloadExport(job.id)">
                    <Download class="h-4 w-4" aria-hidden="true" />
                    <span class="sr-only">Download</span>
                  </button>
                  <button v-if="job.status === 'Failed'" class="text-sm font-medium text-warning-700 hover:text-warning-800" type="button" @click="retryExport(job.id)">
                    <RotateCw class="h-4 w-4" aria-hidden="true" />
                    <span class="sr-only">Retry</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>
  </div>
</template>
