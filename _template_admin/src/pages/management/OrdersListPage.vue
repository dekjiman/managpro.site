<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Filter, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { orders } from '@/data/mock/orders.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { Order } from '@/types/order'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const statusFilter = ref('')
const paymentFilter = ref('')
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
  if (selectedIds.value.length === visibleOrders.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleOrders.value.map((item) => String(item.id))
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

const orderStatusOptions = [
  { label: 'All status', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Shipped', value: 'Shipped' },
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Refunded', value: 'Refunded' },
]

const paymentOptions = [
  { label: 'All payments', value: '' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Partially Paid', value: 'Partially Paid' },
  { label: 'Refunded', value: 'Refunded' },
]

const filteredOrders = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return orders.filter((o) => {
    const matchesQuery = !query || o.order_number.toLowerCase().includes(query) || o.customer_name.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || o.order_status === statusFilter.value
    const matchesPayment = !paymentFilter.value || o.payment_status === paymentFilter.value
    return matchesQuery && matchesStatus && matchesPayment
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredOrders.value.length / pageSize)))
const sortedOrders = computed(() => {
  if (!sortKey.value) return filteredOrders.value
  return [...filteredOrders.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedOrders.value.slice(start, start + pageSize)
})

const orderStats = computed(() => [
  { label: 'Total Orders', value: orders.length },
  { label: 'Pending', value: orders.filter((o) => o.order_status === 'Pending' || o.order_status === 'Processing').length },
  { label: 'Completed', value: orders.filter((o) => o.order_status === 'Completed').length },
  { label: 'Revenue', value: formatCurrency(orders.reduce((sum, o) => sum + o.amount, 0)) },
])

watch([searchQuery, statusFilter, paymentFilter], () => { currentPage.value = 1 })

function viewOrder(order: Order) {
  router.push(`/management/orders/${order.id}`)
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Orders" description="Manage customer orders, shipments, and statuses." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary">
          <Download class="mr-1 h-4 w-4" aria-hidden="true" />
          Export
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in orderStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="order-search" v-model="searchQuery" class="pl-9" placeholder="Search by order number or customer..." aria-label="Search orders" />
          </div>
          <label class="app-form-group" for="order-status-filter">
            <span class="sr-only">Order status filter</span>
            <select id="order-status-filter" v-model="statusFilter" class="app-input">
              <option v-for="opt in orderStatusOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="app-form-group" for="order-payment-filter">
            <span class="sr-only">Payment status filter</span>
            <select id="order-payment-filter" v-model="paymentFilter" class="app-input">
              <option v-for="opt in paymentOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
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

      <div v-if="filteredOrders.length === 0" class="p-4">
        <AppEmptyState title="No orders found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''; paymentFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleOrders.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('order_number')">
                  Order
                  <ArrowUp v-if="sortKey === 'order_number' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'order_number' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('order_status')">
                  Order Status
                  <ArrowUp v-if="sortKey === 'order_status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'order_status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('payment_status')">
                  Payment
                  <ArrowUp v-if="sortKey === 'payment_status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'payment_status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
            <tr v-for="order in visibleOrders" :key="order.id" :class="selectedIds.includes(String(order.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(order.id))"
                  :aria-label="`Select row ${String(order.id)}`"
                  @change="toggleRow(String(order.id))"
                />
              </td>
              <td>
                <span class="font-medium text-app-text">{{ order.order_number }}</span>
              </td>
              <td>
                <div class="min-w-[10rem]">
                  <p class="text-sm font-medium text-app-text">{{ order.customer_name }}</p>
                  <p class="text-xs text-app-textMuted">{{ order.customer_email }}</p>
                </div>
              </td>
              <td>
                <span class="text-sm font-medium text-app-text">{{ formatCurrency(order.amount) }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(order.order_status)">{{ order.order_status }}</AppBadge>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(order.payment_status)">{{ order.payment_status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(order.date) }}</span>
              </td>
              <td>
                <div class="flex min-w-[6rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewOrder(order)">View</button>
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
