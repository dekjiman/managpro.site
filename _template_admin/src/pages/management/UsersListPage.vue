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
import { users } from '@/data/mock/users.mock'
import { formatDate } from '@/utils/format'
import { getInitials, getStatusVariant } from '@/utils/status'
import type { User } from '@/types/user'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
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
  if (selectedIds.value.length === visibleUsers.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleUsers.value.map((item) => String(item.id))
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
const newEmail = ref('')
const newRole = ref('Editor')
const newStatus = ref('Active')
const newNameError = ref('')
const uiStore = useUiStore()

const roleOptions = [
  { label: 'All roles', value: '' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Editor', value: 'Editor' },
  { label: 'Viewer', value: 'Viewer' },
  { label: 'Support', value: 'Support' },
]

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Suspended', value: 'Suspended' },
  { label: 'Inactive', value: 'Inactive' },
]

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return users.filter((user) => {
    const matchesQuery = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    return matchesQuery && matchesRole && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize)))
const sortedUsers = computed(() => {
  if (!sortKey.value) return filteredUsers.value
  return [...filteredUsers.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedUsers.value.slice(start, start + pageSize)
})

const userStats = computed(() => [
  { label: 'Total Users', value: users.length },
  { label: 'Active', value: users.filter((u) => u.status === 'Active').length },
  { label: 'Pending', value: users.filter((u) => u.status === 'Pending').length },
  { label: 'Suspended', value: users.filter((u) => u.status === 'Suspended').length },
])

watch([searchQuery, roleFilter, statusFilter], () => { currentPage.value = 1 })

function viewUser(user: User) {
  router.push(`/management/users/${user.id}`)
}

function openAddModal() {
  newName.value = ''
  newEmail.value = ''
  newRole.value = 'Editor'
  newStatus.value = 'Active'
  newNameError.value = ''
  showAddModal.value = true
}

function addUser() {
  newNameError.value = newName.value.trim() ? '' : 'Full name is required.'
  if (newNameError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  users.unshift({
    id: `usr-${Date.now()}`,
    name: newName.value.trim(),
    email: newEmail.value.trim() || `${newName.value.trim().toLowerCase().replace(/\s+/g, '.')}@example.test`,
    avatar: getInitials(newName.value.trim()),
    role: newRole.value,
    department: '',
    location: '',
    phone: '',
    status: newStatus.value,
    joined_date: '2026-06-14',
    last_active: '2026-06-14',
  })
  showAddModal.value = false
}

function confirmDelete(user: User) {
  const idx = users.findIndex((u) => u.id === user.id)
  if (idx !== -1) users.splice(idx, 1)
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Users" description="Manage system users, roles, and account access." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openAddModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add User
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in userStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_12rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="user-search" v-model="searchQuery" class="pl-9" placeholder="Search by name or email..." aria-label="Search users" />
          </div>
          <label class="app-form-group" for="user-role-filter">
            <span class="sr-only">Role filter</span>
            <select id="user-role-filter" v-model="roleFilter" class="app-input">
              <option v-for="opt in roleOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="app-form-group" for="user-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="user-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredUsers.length === 0" class="p-4">
        <AppEmptyState title="No users found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; roleFilter = ''; statusFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleUsers.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('name')">
                  User
                  <ArrowUp v-if="sortKey === 'name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('role')">
                  Role
                  <ArrowUp v-if="sortKey === 'role' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'role' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('department')">
                  Department
                  <ArrowUp v-if="sortKey === 'department' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'department' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('location')">
                  Location
                  <ArrowUp v-if="sortKey === 'location' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'location' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('last_active')">
                  Last Active
                  <ArrowUp v-if="sortKey === 'last_active' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'last_active' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in visibleUsers" :key="user.id" :class="selectedIds.includes(String(user.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(user.id))"
                  :aria-label="`Select row ${String(user.id)}`"
                  @change="toggleRow(String(user.id))"
                />
              </td>
              <td>
                <div class="flex min-w-[14rem] items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                    {{ getInitials(user.name) }}
                  </span>
                  <div>
                    <p class="font-medium text-app-text">{{ user.name }}</p>
                    <p class="text-xs text-app-textMuted">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <div class="min-w-[7rem]">
                  <p class="text-sm text-app-textSecondary">{{ user.role }}</p>
                </div>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(user.status)">{{ user.status }}</AppBadge>
              </td>
              <td>
                <p class="text-sm text-app-textSecondary">{{ user.department || '—' }}</p>
              </td>
              <td>
                <p class="text-sm text-app-textSecondary">{{ user.location || '—' }}</p>
              </td>
              <td>
                <p class="text-sm text-app-textSecondary">{{ formatDate(user.last_active) }}</p>
              </td>
              <td>
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewUser(user)">View</button>
                  <button class="text-sm font-medium text-warning-700 hover:text-warning-800" type="button" @click="confirmDelete(user)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>

    <AppModal :open="showAddModal" title="Add User" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="addUser">
        <AppInput id="add-user-name" v-model="newName" label="Full name" placeholder="Enter full name" required :error="newNameError" />
        <AppInput id="add-user-email" v-model="newEmail" label="Email address" type="email" placeholder="user@example.test" />
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="app-form-group" for="add-user-role">
            <span class="app-label">Role</span>
            <select id="add-user-role" v-model="newRole" class="app-input">
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="Support">Support</option>
            </select>
          </label>
          <label class="app-form-group" for="add-user-status">
            <span class="app-label">Status</span>
            <select id="add-user-status" v-model="newStatus" class="app-input">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create User</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
