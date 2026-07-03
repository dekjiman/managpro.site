<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import { ArrowDown, ArrowUp, ChevronsUpDown, Filter, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { customers } from '@/data/mock/customers.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { Customer } from '@/types/customer'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const currentPage = ref(1)
const pageSize = 10
const showAddModal = ref(false)

const selectedIds = ref<string[]>([])
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visibleCustomers.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleCustomers.value.map((item) => String(item.id))
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

const newName = ref('')
const newCompany = ref('')
const newEmail = ref('')
const newType = ref('smb')
const newNameError = ref('')
const uiStore = useUiStore()

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Suspended', value: 'Suspended' },
  { label: 'Inactive', value: 'Inactive' },
]

const typeOptions = [
  { label: 'All types', value: '' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'SMB', value: 'smb' },
  { label: 'Startup', value: 'startup' },
  { label: 'Individual', value: 'individual' },
]

const filteredCustomers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return customers.filter((c) => {
    const matchesQuery = !query || c.name.toLowerCase().includes(query) || c.company.toLowerCase().includes(query) || c.email.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || c.status === statusFilter.value
    const matchesType = !typeFilter.value || c.type === typeFilter.value
    return matchesQuery && matchesStatus && matchesType
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCustomers.value.length / pageSize)))
const sortedCustomers = computed(() => {
  if (!sortKey.value) return filteredCustomers.value
  return [...filteredCustomers.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleCustomers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedCustomers.value.slice(start, start + pageSize)
})

const customerStats = computed(() => [
  { label: 'Total Customers', value: customers.length },
  { label: 'Active', value: customers.filter((c) => c.status === 'Active').length },
  { label: 'Enterprise', value: customers.filter((c) => c.type === 'enterprise').length },
  { label: 'Total Spent', value: formatCurrency(customers.reduce((sum, c) => sum + c.total_spent, 0)) },
])

watch([searchQuery, statusFilter, typeFilter], () => { currentPage.value = 1 })

function viewCustomer(customer: Customer) {
  router.push(`/management/customers/${customer.id}`)
}

function openAddModal() {
  newName.value = ''
  newCompany.value = ''
  newEmail.value = ''
  newType.value = 'smb'
  newNameError.value = ''
  showAddModal.value = true
}

function addCustomer() {
  newNameError.value = newName.value.trim() ? '' : 'Customer name is required.'
  if (newNameError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  customers.unshift({
    id: `cus-${Date.now()}`,
    name: newName.value.trim(),
    company: newCompany.value.trim() || `${newName.value.trim()} LLC`,
    email: newEmail.value.trim() || `contact@${newName.value.trim().toLowerCase().replace(/\s+/g, '')}.test`,
    phone: '',
    type: newType.value as Customer['type'],
    avatar: '',
    status: 'Active',
    total_orders: 0,
    total_spent: 0,
    joined_date: '2026-06-14',
    notes: '',
  })
  showAddModal.value = false
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Customers" description="Manage customer accounts, orders, and activity." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openAddModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Customer
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in customerStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="customer-search" v-model="searchQuery" class="pl-9" placeholder="Search by name, company, or email..." aria-label="Search customers" />
          </div>
          <label class="app-form-group" for="customer-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="customer-status-filter" v-model="statusFilter" class="app-input">
              <option v-for="opt in statusOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="app-form-group" for="customer-type-filter">
            <span class="sr-only">Type filter</span>
            <select id="customer-type-filter" v-model="typeFilter" class="app-input">
              <option v-for="opt in typeOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
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

      <div v-if="filteredCustomers.length === 0" class="p-4">
        <AppEmptyState title="No customers found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''; typeFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleCustomers.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('name')">
                  Customer
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('status')">
                  Status
                  <ArrowUp v-if="sortKey === 'status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('total_orders')">
                  Orders
                  <ArrowUp v-if="sortKey === 'total_orders' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'total_orders' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('total_spent')">
                  Total Spent
                  <ArrowUp v-if="sortKey === 'total_spent' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'total_spent' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('joined_date')">
                  Joined
                  <ArrowUp v-if="sortKey === 'joined_date' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'joined_date' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in visibleCustomers" :key="customer.id" :class="selectedIds.includes(String(customer.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(customer.id))"
                  :aria-label="`Select row ${String(customer.id)}`"
                  @change="toggleRow(String(customer.id))"
                />
              </td>
              <td>
                <div class="flex min-w-[14rem] items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-xs font-semibold text-secondary-700">
                    {{ customer.avatar || customer.name.charAt(0) }}
                  </span>
                  <div>
                    <p class="font-medium text-app-text">{{ customer.name }}</p>
                    <p class="text-xs text-app-textMuted">{{ customer.company }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-sm capitalize text-app-textSecondary">{{ customer.type }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(customer.status)">{{ customer.status }}</AppBadge>
              </td>
              <td>
                <p class="text-sm font-medium text-app-textSecondary">{{ customer.total_orders }}</p>
              </td>
              <td>
                <p class="text-sm font-medium text-app-textSecondary">{{ formatCurrency(customer.total_spent) }}</p>
              </td>
              <td>
                <p class="text-sm text-app-textSecondary">{{ formatDate(customer.joined_date) }}</p>
              </td>
              <td>
                <div class="flex min-w-[6rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewCustomer(customer)">View</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>

    <AppModal :open="showAddModal" title="Add Customer" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="addCustomer">
        <AppInput id="add-customer-name" v-model="newName" label="Customer name" placeholder="Enter customer name" required :error="newNameError" />
        <AppInput id="add-customer-company" v-model="newCompany" label="Company" placeholder="Company name" />
        <AppInput id="add-customer-email" v-model="newEmail" label="Email address" type="email" placeholder="contact@company.test" />
        <label class="app-form-group" for="add-customer-type">
          <span class="app-label">Type</span>
          <select id="add-customer-type" v-model="newType" class="app-input">
            <option value="enterprise">Enterprise</option>
            <option value="smb">SMB</option>
            <option value="startup">Startup</option>
            <option value="individual">Individual</option>
          </select>
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Customer</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
