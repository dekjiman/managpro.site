<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { invoices } from '@/data/mock/invoices.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { Invoice } from '@/types/invoice'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
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
  if (selectedIds.value.length === visibleInvoices.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleInvoices.value.map((item) => String(item.id))
  }
}

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Overdue', value: 'Overdue' },
  { label: 'Cancelled', value: 'Cancelled' },
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

const filteredInvoices = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return invoices.filter((inv) => {
    const matchesQuery = !query || inv.invoice_number.toLowerCase().includes(query) || inv.client_name.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || inv.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredInvoices.value.length / pageSize)))
const sortedInvoices = computed(() => {
  if (!sortKey.value) return filteredInvoices.value
  return [...filteredInvoices.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleInvoices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedInvoices.value.slice(start, start + pageSize)
})

const invoiceStats = computed(() => [
  { label: 'Total Invoices', value: invoices.length },
  { label: 'Paid', value: invoices.filter((i) => i.status === 'Paid').length },
  { label: 'Pending / Unpaid', value: invoices.filter((i) => i.status === 'Pending' || i.status === 'Unpaid' || i.status === 'Overdue').length },
  { label: 'Total Amount', value: formatCurrency(invoices.reduce((sum, i) => sum + i.amount, 0)) },
])

watch([searchQuery, statusFilter], () => { currentPage.value = 1 })

function viewInvoice(invoice: Invoice) {
  router.push(`/finance/invoices/${invoice.id}`)
}

function createInvoice() {
  router.push('/finance/invoices/create')
}
function editInvoice(invoice: Invoice) {
  router.push(`/finance/invoices/${invoice.id}/edit`)
}
function deleteInvoice(_invoice: Invoice) {
  // TODO: implement delete
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Invoices" description="Manage invoices, track payments, and send reminders." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="createInvoice">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create Invoice
        </AppButton>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in invoiceStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="invoice-search" v-model="searchQuery" class="pl-9" placeholder="Search by invoice number or client..." aria-label="Search invoices" />
          </div>
          <label class="app-form-group" for="invoice-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="invoice-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredInvoices.length === 0" class="p-4">
        <AppEmptyState title="No invoices found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleInvoices.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('client_name')">
                  Client
                  <ArrowUp v-if="sortKey === 'client_name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'client_name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('status')">
                  Status
                  <ArrowUp v-if="sortKey === 'status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('issue_date')">
                  Issue Date
                  <ArrowUp v-if="sortKey === 'issue_date' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'issue_date' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('due_date')">
                  Due Date
                  <ArrowUp v-if="sortKey === 'due_date' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'due_date' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in visibleInvoices" :key="inv.id" :class="selectedIds.includes(String(inv.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(inv.id))"
                  :aria-label="`Select row ${String(inv.id)}`"
                  @change="toggleRow(String(inv.id))"
                />
              </td>
              <td>
                <span class="font-medium text-app-text">{{ inv.invoice_number }}</span>
              </td>
              <td>
                <div class="min-w-[10rem]">
                  <p class="text-sm font-medium text-app-text">{{ inv.client_name }}</p>
                  <p class="text-xs text-app-textMuted">{{ inv.client_email }}</p>
                </div>
              </td>
              <td>
                <span class="text-sm font-medium text-app-text">{{ formatCurrency(inv.amount) }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(inv.status)">{{ inv.status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(inv.issue_date) }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(inv.due_date) }}</span>
              </td>
              <td class="relative">
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewInvoice(inv)">View</button>
                  <div class="relative">
                    <button class="rounded p-1 text-app-textMuted hover:bg-app-muted hover:text-app-text" type="button" aria-label="More actions" @click="openDropdownId = openDropdownId === String(inv.id) ? null : String(inv.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <div v-if="openDropdownId === String(inv.id)" class="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-lg border border-app-borderSoft bg-app-card p-1 shadow-lg">
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-app-text hover:bg-app-muted" type="button" @click="openDropdownId = null; editInvoice(inv)">Edit</button>
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger-700 hover:bg-danger-50" type="button" @click="openDropdownId = null; deleteInvoice(inv)">Delete</button>
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
