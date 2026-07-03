<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter, Search } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { payments } from '@/data/mock/payments.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const uiStore = useUiStore()

const searchQuery = ref('')
const methodFilter = ref('')
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
  if (selectedIds.value.length === visiblePayments.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visiblePayments.value.map((item) => String(item.id))
  }
}

const methodOptions = [
  { label: 'All methods', value: '' },
  { label: 'Bank Transfer', value: 'Bank Transfer' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'PayPal', value: 'PayPal' },
]

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Refunded', value: 'Refunded' },
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

const filteredPayments = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return payments.filter((p) => {
    const matchesQuery = !query || p.transaction_id.toLowerCase().includes(query) || p.customer_name.toLowerCase().includes(query)
    const matchesMethod = !methodFilter.value || p.payment_method === methodFilter.value
    const matchesStatus = !statusFilter.value || p.status === statusFilter.value
    return matchesQuery && matchesMethod && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPayments.value.length / pageSize)))
const sortedPayments = computed(() => {
  if (!sortKey.value) return filteredPayments.value
  return [...filteredPayments.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visiblePayments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedPayments.value.slice(start, start + pageSize)
})

const paymentStats = computed(() => [
  { label: 'Total Payments', value: payments.length },
  { label: 'Total Volume', value: formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0)) },
  { label: 'Completed', value: payments.filter((p) => p.status === 'Completed').length },
  { label: 'Failed', value: payments.filter((p) => p.status === 'Failed').length },
])

watch([searchQuery, methodFilter, statusFilter], () => { currentPage.value = 1 })

function reviewFailed() {
  statusFilter.value = 'Failed'
  uiStore.pushToast({ title: 'Filtered to failed payments', type: 'info' })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function viewPayment(_p: any) {
  // TODO: implement view
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function viewDetails(_p: any) {
  // TODO: implement view
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Payments" description="Monitor payment transactions and review failed payments." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="reviewFailed">
          <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
          Review Failed
        </AppButton>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in paymentStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="payment-search" v-model="searchQuery" class="pl-9" placeholder="Search by transaction or customer..." aria-label="Search payments" />
          </div>
          <label class="app-form-group" for="payment-method-filter">
            <span class="sr-only">Method filter</span>
            <select id="payment-method-filter" v-model="methodFilter" class="app-input">
              <option v-for="opt in methodOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="app-form-group" for="payment-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="payment-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredPayments.length === 0" class="p-4">
        <AppEmptyState title="No payments found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; methodFilter = ''; statusFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visiblePayments.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('transaction_id')">
                  Transaction
                  <ArrowUp v-if="sortKey === 'transaction_id' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'transaction_id' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('customer_name')">
                  Customer
                  <ArrowUp v-if="sortKey === 'customer_name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'customer_name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('payment_method')">
                  Method
                  <ArrowUp v-if="sortKey === 'payment_method' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'payment_method' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
            <tr v-for="p in visiblePayments" :key="p.id" :class="selectedIds.includes(String(p.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(p.id))"
                  :aria-label="`Select row ${String(p.id)}`"
                  @change="toggleRow(String(p.id))"
                />
              </td>
              <td>
                <span class="font-medium text-app-text">{{ p.transaction_id }}</span>
              </td>
              <td>
                <span class="text-sm text-app-text">{{ p.customer_name }}</span>
              </td>
              <td>
                <span class="text-sm font-medium text-app-text">{{ formatCurrency(p.amount) }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ p.payment_method }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(p.status)">{{ p.status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(p.date) }}</span>
              </td>
              <td class="relative">
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewPayment(p)">View</button>
                  <div class="relative">
                    <button class="rounded p-1 text-app-textMuted hover:bg-app-muted hover:text-app-text" type="button" aria-label="More actions" @click="openDropdownId = openDropdownId === String(p.id) ? null : String(p.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <div v-if="openDropdownId === String(p.id)" class="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-lg border border-app-borderSoft bg-app-card p-1 shadow-lg">
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-app-text hover:bg-app-muted" type="button" @click="openDropdownId = null; viewDetails(p)">View Details</button>
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
