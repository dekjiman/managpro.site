<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Copy, Filter, Plus, Trash2 } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTable from '@/components/tables/AppTable.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { apiKeys } from '@/data/mock/api-keys.mock'
import { formatDateTime } from '@/utils/format'
import type { ApiKey } from '@/types/api-key'
import type { TableColumn } from '@/types/common'

const route = useRoute()
const uiStore = useUiStore()

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 5
const showCreateModal = ref(false)
const selectedKeys = ref<string[]>([])
const showLoadingState = ref(false)
const showErrorState = ref(false)

const newKeyName = ref('')
const newKeyNameError = ref('')
const newKeyPermissions = ref<string[]>(['read'])

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Revoked', value: 'Revoked' },
  { label: 'Expired', value: 'Expired' },
]

const permissionOptions = [
  { label: 'Read', value: 'read' },
  { label: 'Write', value: 'write' },
  { label: 'Admin', value: 'admin' },
  { label: 'Deploy', value: 'deploy' },
]

const keyColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'maskedKey', label: 'Key' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'status', label: 'Status', type: 'badge', sortable: true },
  { key: 'createdAt', label: 'Created', type: 'date', sortable: true },
  { key: 'lastUsedAt', label: 'Last Used' },
]

const filteredKeys = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return apiKeys.filter((key) => {
    const matchesQuery = !query || key.name.toLowerCase().includes(query) || key.maskedKey.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || key.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredKeys.value.length / pageSize)))
const visibleKeys = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredKeys.value.slice(start, start + pageSize)
})
const tableRows = computed(() => visibleKeys.value.map((key) => ({
  id: key.id,
  name: key.name,
  maskedKey: key.maskedKey,
  permissions: key.permissions.join(', '),
  status: key.status,
  createdAt: key.createdAt,
  lastUsedAt: key.lastUsedAt ? formatDateTime(key.lastUsedAt) : 'Never',
})))

const keyStats = computed(() => [
  { label: 'Total Keys', value: apiKeys.length },
  { label: 'Active', value: apiKeys.filter((k) => k.status === 'Active').length },
  { label: 'Revoked', value: apiKeys.filter((k) => k.status === 'Revoked').length },
  { label: 'Expired', value: apiKeys.filter((k) => k.status === 'Expired').length },
])

watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
  selectedKeys.value = []
})

function openCreateModal() {
  newKeyName.value = ''
  newKeyNameError.value = ''
  newKeyPermissions.value = ['read']
  showCreateModal.value = true
}

function createKey() {
  newKeyNameError.value = newKeyName.value.trim() ? '' : 'Key name is required.'
  if (newKeyNameError.value) {
    uiStore.pushToast({ title: 'Please enter a key name', type: 'danger' })
    return
  }
  const newKey: ApiKey = {
    id: `ak-${Date.now()}`,
    name: newKeyName.value.trim(),
    maskedKey: `sk_live_masked_${Math.random().toString(36).slice(2, 6)}`,
    status: 'Active',
    createdAt: new Date().toISOString().slice(0, 10),
    lastUsedAt: null,
    permissions: newKeyPermissions.value,
  }
  apiKeys.unshift(newKey)
  showCreateModal.value = false
  uiStore.pushToast({ title: `API key "${newKey.name}" created`, type: 'success' })
}

function revokeKey(key: ApiKey) {
  key.status = 'Revoked'
  uiStore.pushToast({ title: `API key "${key.name}" revoked`, type: 'warning' })
}

function revokeSelected() {
  apiKeys.forEach((key) => {
    if (selectedKeys.value.includes(key.id) && key.status === 'Active') key.status = 'Revoked'
  })
  uiStore.pushToast({ title: `${selectedKeys.value.length} selected API key(s) revoked`, type: 'warning' })
  selectedKeys.value = []
}

function findKey(rowId: string) {
  return apiKeys.find((key) => key.id === rowId)
}

function copyKey(maskedKey: string) {
  navigator.clipboard?.writeText(maskedKey)
  uiStore.pushToast({ title: 'API key copied to clipboard', type: 'info' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="API Keys" description="Manage API keys for integrations and programmatic access." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openCreateModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create API Key
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <AppCard v-for="stat in keyStats" :key="stat.label">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </AppCard>
    </div>

    <AppCard title="Key Directory" description="Search, sort, select, and manage API keys from one table.">
      <div class="grid gap-3 border-b border-app-borderSoft pb-4 lg:grid-cols-[minmax(0,1fr)_12rem_auto_auto]">
        <AppInput id="api-key-search" v-model="searchQuery" placeholder="Search by key name..." aria-label="Search API keys" />
        <label class="app-form-group" for="api-key-status-filter">
          <span class="sr-only">Status filter</span>
          <select id="api-key-status-filter" v-model="statusFilter" class="app-input">
            <option v-for="opt in statusOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
          </select>
        </label>
        <AppButton variant="secondary" size="sm" type="button" @click="showLoadingState = !showLoadingState">
          {{ showLoadingState ? 'Hide Loading' : 'Show Loading' }}
        </AppButton>
        <AppButton variant="secondary" size="sm" type="button" @click="showErrorState = !showErrorState">
          {{ showErrorState ? 'Hide Error' : 'Show Error' }}
        </AppButton>
      </div>

      <div v-if="selectedKeys.length" class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-app-borderSoft bg-app-muted p-3">
        <p class="text-sm font-medium text-app-text">{{ selectedKeys.length }} API key(s) selected</p>
        <AppButton variant="danger" size="sm" type="button" @click="revokeSelected">Revoke Selected</AppButton>
      </div>

      <div v-if="filteredKeys.length === 0 && !showLoadingState && !showErrorState" class="mt-4">
        <AppEmptyState title="No API keys found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="mt-4">
        <AppTable
          v-model:selected-rows="selectedKeys"
          :columns="keyColumns"
          :rows="tableRows"
          :loading="showLoadingState"
          :error="showErrorState ? 'Sample API key request failed. Clear the error state to continue.' : ''"
          selectable
        >
          <template #actions="{ row }">
            <details class="relative">
              <summary class="cursor-pointer list-none text-sm font-medium text-primary-700 hover:text-primary-800">Actions</summary>
              <div class="absolute right-0 z-10 mt-2 grid min-w-36 gap-1 rounded-lg border border-app-borderSoft bg-app-card p-2 shadow-card">
                <button class="rounded px-2 py-1.5 text-left text-sm text-app-text hover:bg-app-muted" type="button" @click="copyKey(String(row.maskedKey))">
                  <Copy class="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />Copy
                </button>
                <button
                  v-if="findKey(String(row.id))?.status === 'Active'"
                  class="rounded px-2 py-1.5 text-left text-sm text-danger-700 hover:bg-danger-50"
                  type="button"
                  @click="findKey(String(row.id)) && revokeKey(findKey(String(row.id)) as ApiKey)"
                >
                  <Trash2 class="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />Revoke
                </button>
              </div>
            </details>
          </template>
        </AppTable>
      </div>

      <template #footer>
        <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
      </template>
    </AppCard>

    <AppModal :open="showCreateModal" title="Create API Key" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createKey">
        <AppInput id="api-key-name" v-model="newKeyName" label="Key name" placeholder="e.g. Production API" :error="newKeyNameError" required />
        <label class="app-form-group" for="api-key-perms">
          <span class="app-label">Permissions</span>
          <div class="grid gap-2">
            <label v-for="perm in permissionOptions" :key="perm.value" class="flex cursor-pointer items-center gap-2 rounded-lg border border-app-borderSoft px-3 py-2 hover:bg-app-muted">
              <input type="checkbox" :value="perm.value" :checked="newKeyPermissions.includes(perm.value)" class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500" @change="(e: Event) => { const checked = (e.target as HTMLInputElement).checked; if (checked) newKeyPermissions.push(perm.value); else newKeyPermissions = newKeyPermissions.filter((p) => p !== perm.value) }" />
              <span class="text-sm text-app-text">{{ perm.label }}</span>
            </label>
          </div>
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Key</AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
