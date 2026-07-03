<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import { ArrowDown, ArrowUp, ChevronsUpDown, Filter, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { products } from '@/data/mock/products.mock'
import { formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()

interface CategoryEntry {
  id: string
  name: string
  slug: string
  parent: string
  product_count: number
  status: string
  created_at: string
}

const categoryMap = Array.from(new Set(products.map((p) => p.category)))
const categories: CategoryEntry[] = categoryMap.map((name, idx) => ({
  id: `cat-${idx + 1}`,
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  parent: idx === 0 ? '—' : 'Software',
  product_count: products.filter((p) => p.category === name).length,
  status: 'Active',
  created_at: '2026-01-15',
}))

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 10
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingCategory = ref<CategoryEntry | null>(null)

const selectedIds = ref<string[]>([])
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visibleCategories.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleCategories.value.map((item) => String(item.id))
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
const newSlug = ref('')
const newNameError = ref('')
const editNameError = ref('')
const uiStore = useUiStore()

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
]

const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return categories.filter((c) => {
    const matchesQuery = !query || c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || c.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCategories.value.length / pageSize)))
const sortedCategories = computed(() => {
  if (!sortKey.value) return filteredCategories.value
  return [...filteredCategories.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleCategories = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedCategories.value.slice(start, start + pageSize)
})

function openAdd() {
  newName.value = ''
  newSlug.value = ''
  newNameError.value = ''
  showAddModal.value = true
}

function openEdit(cat: CategoryEntry) {
  editingCategory.value = { ...cat }
  editNameError.value = ''
  showEditModal.value = true
}

function addCategory() {
  newNameError.value = newName.value.trim() ? '' : 'Category name is required.'
  if (newNameError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  categories.push({
    id: `cat-${Date.now()}`,
    name: newName.value.trim(),
    slug: newSlug.value.trim() || newName.value.trim().toLowerCase().replace(/\s+/g, '-'),
    parent: '—',
    product_count: 0,
    status: 'Active',
    created_at: '2026-06-14',
  })
  showAddModal.value = false
}

function saveEdit() {
  if (!editingCategory.value) return
  editNameError.value = editingCategory.value.name.trim() ? '' : 'Category name is required.'
  if (editNameError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  const idx = categories.findIndex((c) => c.id === editingCategory.value!.id)
  if (idx !== -1) categories[idx] = { ...editingCategory.value }
  showEditModal.value = false
}

function deleteCategory(cat: CategoryEntry) {
  const idx = categories.findIndex((c) => c.id === cat.id)
  if (idx !== -1) categories.splice(idx, 1)
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Product Categories" description="Organize products by category groups." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openAdd">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Category
        </AppButton>
      </template>
    </AppPageHeader>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="cat-search" v-model="searchQuery" class="pl-9" placeholder="Search categories..." aria-label="Search categories" />
          </div>
          <label class="app-form-group" for="cat-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="cat-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredCategories.length === 0" class="p-4">
        <AppEmptyState title="No categories found" description="Try different search terms or filters.">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleCategories.length"
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
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('slug')">
                  Slug
                  <ArrowUp v-if="sortKey === 'slug' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'slug' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('parent')">
                  Parent
                  <ArrowUp v-if="sortKey === 'parent' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'parent' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('product_count')">
                  Products
                  <ArrowUp v-if="sortKey === 'product_count' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'product_count' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
            <tr v-for="cat in visibleCategories" :key="cat.id" :class="selectedIds.includes(String(cat.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(cat.id))"
                  :aria-label="`Select row ${String(cat.id)}`"
                  @change="toggleRow(String(cat.id))"
                />
              </td>
              <td class="font-medium text-app-text">{{ cat.name }}</td>
              <td><span class="text-sm font-mono text-app-textSecondary">{{ cat.slug }}</span></td>
              <td><span class="text-sm text-app-textSecondary">{{ cat.parent }}</span></td>
              <td><span class="text-sm font-medium text-app-text">{{ cat.product_count }}</span></td>
              <td><AppBadge :variant="getStatusVariant(cat.status)">{{ cat.status }}</AppBadge></td>
              <td><span class="text-sm text-app-textSecondary">{{ formatDate(cat.created_at) }}</span></td>
              <td>
                <div class="flex min-w-[8rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="openEdit(cat)">Edit</button>
                  <button class="text-sm font-medium text-danger-700 hover:text-danger-800" type="button" @click="deleteCategory(cat)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>

    <AppModal :open="showAddModal" title="Add Category" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="addCategory">
        <AppInput id="add-cat-name" v-model="newName" label="Category name" placeholder="Enter category name" required :error="newNameError" />
        <AppInput id="add-cat-slug" v-model="newSlug" label="Slug" placeholder="e.g. software-tools" />
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Category</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>

    <AppModal :open="showEditModal" title="Edit Category" @close="showEditModal = false">
      <form v-if="editingCategory" class="grid gap-4" @submit.prevent="saveEdit">
        <AppInput id="edit-cat-name" v-model="editingCategory.name" label="Category name" required :error="editNameError" />
        <AppInput id="edit-cat-slug" v-model="editingCategory.slug" label="Slug" />
        <label class="app-form-group" for="edit-cat-status">
          <span class="app-label">Status</span>
          <select id="edit-cat-status" v-model="editingCategory.status" class="app-input">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Save Changes</AppButton>
          <AppButton variant="secondary" type="button" @click="showEditModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
