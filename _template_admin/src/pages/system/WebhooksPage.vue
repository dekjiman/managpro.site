<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Filter, Play, Plus, Search } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { webhooks } from '@/data/mock/webhooks.mock'
import { formatDate, formatDateTime } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { Webhook } from '@/types/webhook'

const route = useRoute()
const uiStore = useUiStore()

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 5
const showCreateModal = ref(false)
const selectedIds = ref<string[]>([])
const openDropdownId = ref<string | null>(null)
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visibleWebhooks.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleWebhooks.value.map((item) => String(item.id))
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
const newUrl = ref('')
const newEvents = ref<string[]>(['order.created'])
const newNameError = ref('')
const newUrlError = ref('')

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Failed', value: 'Failed' },
]

const eventOptions = [
  { label: 'Order Created', value: 'order.created' },
  { label: 'Order Paid', value: 'order.paid' },
  { label: 'User Created', value: 'user.created' },
  { label: 'User Updated', value: 'user.updated' },
  { label: 'User Deleted', value: 'user.deleted' },
  { label: 'Payment Succeeded', value: 'payment.succeeded' },
  { label: 'Payment Failed', value: 'payment.failed' },
  { label: 'Invoice Created', value: 'invoice.created' },
  { label: 'Invoice Paid', value: 'invoice.paid' },
  { label: 'Customer Created', value: 'customer.created' },
  { label: 'Subscription Renewed', value: 'subscription.renewed' },
  { label: 'Refund Processed', value: 'refund.processed' },
  { label: 'Product Updated', value: 'product.updated' },
]

const filteredWebhooks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return webhooks.filter((wh) => {
    const matchesQuery = !query || wh.name.toLowerCase().includes(query) || wh.url.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || wh.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const sortedWebhooks = computed(() => {
  if (!sortKey.value) return filteredWebhooks.value
  return [...filteredWebhooks.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredWebhooks.value.length / pageSize)))
const visibleWebhooks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedWebhooks.value.slice(start, start + pageSize)
})

const webhookStats = computed(() => [
  { label: 'Total Webhooks', value: webhooks.length },
  { label: 'Active', value: webhooks.filter((w) => w.status === 'Active').length },
  { label: 'Paused', value: webhooks.filter((w) => w.status === 'Paused').length },
  { label: 'Failed', value: webhooks.filter((w) => w.status === 'Failed').length },
])

watch([searchQuery, statusFilter], () => { currentPage.value = 1 })

function openCreateModal() {
  newName.value = ''
  newUrl.value = ''
  newEvents.value = ['order.created']
  newNameError.value = ''
  newUrlError.value = ''
  showCreateModal.value = true
}

function createWebhook() {
  newNameError.value = newName.value.trim() ? '' : 'Webhook name is required.'
  newUrlError.value = !newUrl.value.trim() ? 'Endpoint URL is required.' : !newUrl.value.trim().startsWith('https://') ? 'URL must start with https://' : ''
  if (newNameError.value || newUrlError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  const wh: Webhook = {
    id: `wh-${Date.now()}`,
    name: newName.value.trim(),
    url: newUrl.value.trim(),
    events: newEvents.value,
    status: 'Active',
    lastTriggeredAt: null,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  webhooks.unshift(wh)
  showCreateModal.value = false
  uiStore.pushToast({ title: `Webhook "${wh.name}" created`, type: 'success' })
}

function testWebhook(wh: Webhook) {
  uiStore.pushToast({ title: `Test event sent to "${wh.name}"`, type: 'info' })
}

function deleteWebhook(wh: Webhook) {
  const idx = webhooks.findIndex((w) => w.id === wh.id)
  if (idx !== -1) webhooks.splice(idx, 1)
  uiStore.pushToast({ title: `Webhook "${wh.name}" deleted`, type: 'warning' })
}
function editWebhook(wh: Webhook) {
  uiStore.pushToast({ title: `Editing "${wh.name}"`, type: 'info' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Webhooks" description="Send real-time events to external endpoints when things happen in your app." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openCreateModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create Webhook
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <AppCard v-for="stat in webhookStats" :key="stat.label">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </AppCard>
    </div>

    <AppCard title="Webhook Directory" description="Search, filter, test, and delete webhook endpoints.">
      <div class="border-b border-app-borderSoft pb-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="wh-search" v-model="searchQuery" class="pl-9" placeholder="Search by name or URL..." aria-label="Search webhooks" />
          </div>
          <label class="app-form-group" for="wh-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="wh-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredWebhooks.length === 0" class="pt-4">
        <AppEmptyState title="No webhooks found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else :class="'mt-4 ' + (openDropdownId ? 'overflow-visible' : 'overflow-x-auto')">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col" class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleWebhooks.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('name')">
                  Name
                  <ArrowUp v-if="sortKey === 'name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('url')">
                  Endpoint URL
                  <ArrowUp v-if="sortKey === 'url' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'url' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('events')">
                  Events
                  <ArrowUp v-if="sortKey === 'events' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'events' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('lastTriggeredAt')">
                  Last Triggered
                  <ArrowUp v-if="sortKey === 'lastTriggeredAt' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'lastTriggeredAt' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('createdAt')">
                  Created
                  <ArrowUp v-if="sortKey === 'createdAt' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'createdAt' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wh in visibleWebhooks" :key="wh.id" :class="selectedIds.includes(String(wh.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(wh.id))"
                  :aria-label="`Select row ${String(wh.id)}`"
                  @change="toggleRow(String(wh.id))"
                />
              </td>
              <td><span class="font-medium text-app-text">{{ wh.name }}</span></td>
              <td>
                <code class="rounded bg-app-muted px-2 py-0.5 text-xs text-app-textMuted font-mono">{{ wh.url }}</code>
              </td>
              <td>
                <div class="flex max-w-[10rem] flex-wrap gap-1">
                  <span v-for="event in wh.events" :key="event" class="rounded bg-app-muted px-2 py-0.5 text-xs text-app-textMuted whitespace-nowrap">{{ event }}</span>
                </div>
              </td>
              <td><AppBadge :variant="getStatusVariant(wh.status)">{{ wh.status }}</AppBadge></td>
              <td><span class="text-sm text-app-text">{{ wh.lastTriggeredAt ? formatDateTime(wh.lastTriggeredAt) : 'Never' }}</span></td>
              <td><span class="text-sm text-app-text">{{ formatDate(wh.createdAt) }}</span></td>
              <td class="relative">
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" aria-label="Test webhook" @click="testWebhook(wh)">
                    <Play class="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />Test
                  </button>
                  <div class="relative">
                    <button class="rounded p-1 text-app-textMuted hover:bg-app-muted hover:text-app-text" type="button" aria-label="More actions" @click="openDropdownId = openDropdownId === String(wh.id) ? null : String(wh.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <div v-if="openDropdownId === String(wh.id)" class="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-lg border border-app-borderSoft bg-app-card p-1 shadow-lg">
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-app-text hover:bg-app-muted" type="button" @click="openDropdownId = null; editWebhook(wh)">Edit</button>
                      <button class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger-700 hover:bg-danger-50" type="button" @click="openDropdownId = null; deleteWebhook(wh)">Delete</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
      </template>
    </AppCard>

    <AppModal :open="showCreateModal" title="Create Webhook" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createWebhook">
        <AppInput id="wh-name" v-model="newName" label="Webhook name" placeholder="e.g. Order Created" required :error="newNameError" />
        <AppInput id="wh-url" v-model="newUrl" label="Endpoint URL" type="url" placeholder="https://api.example.test/webhooks/..." required helper="Must be a valid HTTPS URL." :error="newUrlError" />
        <label class="app-form-group" for="wh-events">
          <span class="app-label">Events</span>
          <div class="grid max-h-48 gap-1 overflow-y-auto rounded-lg border border-app-borderSoft p-2">
            <label v-for="event in eventOptions" :key="event.value" class="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-app-muted">
              <input type="checkbox" :value="event.value" :checked="newEvents.includes(event.value)" class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500" @change="(e: Event) => { const checked = (e.target as HTMLInputElement).checked; if (checked) newEvents.push(event.value); else newEvents = newEvents.filter((ev) => ev !== event.value) }" />
              <span class="text-sm text-app-text">{{ event.label }}</span>
            </label>
          </div>
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Webhook</AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
