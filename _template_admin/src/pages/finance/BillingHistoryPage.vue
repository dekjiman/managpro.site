<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { billingRecords } from '@/data/mock/billing.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()

const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 10
const selectedIds = ref<string[]>([])
const openDropdownId = ref<string | null>(null)
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visibleRecords.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleRecords.value.map((item) => String(item.id))
  }
}

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
]

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

const filteredRecords = computed(() => {
  return billingRecords.filter((r) => !statusFilter.value || r.status === statusFilter.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRecords.value.length / pageSize)))
const sortedRecords = computed(() => {
  if (!sortKey.value) return filteredRecords.value
  return [...filteredRecords.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedRecords.value.slice(start, start + pageSize)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function viewRecord(_record: any) {
  // TODO: implement view
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function downloadRecord(_record: any) {
  // TODO: implement download
}

const billingStats = computed(() => [
  { label: 'Total Records', value: billingRecords.length },
  { label: 'Total Billed', value: formatCurrency(billingRecords.reduce((sum, r) => sum + r.amount, 0)) },
  { label: 'Paid', value: billingRecords.filter((r) => r.status === 'Paid').length },
  { label: 'Pending', value: billingRecords.filter((r) => r.status === 'Pending').length },
])
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Billing History" description="Review past invoices and payment history." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Download All
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in billingStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[1fr_10rem]">
          <div />
          <label class="app-form-group" for="billing-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="billing-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredRecords.length === 0" class="p-4">
        <AppEmptyState title="No billing records found" description="Try a different filter.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="statusFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else :class="openDropdownId ? 'overflow-visible' : 'overflow-x-auto'">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col" class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleRecords.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('billing_period')">
                  Period
                  <ArrowUp v-if="sortKey === 'billing_period' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'billing_period' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('plan_name')">
                  Plan
                  <ArrowUp v-if="sortKey === 'plan_name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'plan_name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('amount')">
                  Amount
                  <ArrowUp v-if="sortKey === 'amount' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'amount' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('invoice_number')">
                  Invoice
                  <ArrowUp v-if="sortKey === 'invoice_number' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'invoice_number' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('date')">
                  Date
                  <ArrowUp v-if="sortKey === 'date' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'date' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in visibleRecords" :key="record.id" :class="selectedIds.includes(String(record.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(record.id))"
                  :aria-label="`Select row ${String(record.id)}`"
                  @change="toggleRow(String(record.id))"
                />
              </td>
              <td>
                <span class="font-medium text-app-text">{{ record.billing_period }}</span>
              </td>
              <td>
                <span class="text-sm text-app-text">{{ record.plan_name }}</span>
              </td>
              <td>
                <span class="text-sm font-medium text-app-text">{{ formatCurrency(record.amount) }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ record.invoice_number }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(record.status)">{{ record.status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(record.date) }}</span>
              </td>
              <td class="relative">
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewRecord(record)">View</button>
                  <div class="relative">
                    <button class="rounded p-1 text-app-textMuted hover:bg-app-muted hover:text-app-text" type="button" aria-label="More actions" @click="openDropdownId = openDropdownId === String(record.id) ? null : String(record.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <div v-if="openDropdownId === String(record.id)" class="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-lg border border-app-borderSoft bg-app-card p-1 shadow-lg">
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-app-text hover:bg-app-muted" type="button" @click="openDropdownId = null; downloadRecord(record)">Download</button>
                    </div>
                  </div>
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
