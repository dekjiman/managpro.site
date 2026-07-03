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
import { products } from '@/data/mock/products.mock'
import { formatCurrency } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const categoryFilter = ref('')
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
  if (selectedIds.value.length === visibleProducts.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visibleProducts.value.map((item) => String(item.id))
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
const newSku = ref('')
const newCategory = ref('Software')
const newPriceStr = ref('')
const newStockStr = ref('')
const newNameError = ref('')
const newPriceError = ref('')
const uiStore = useUiStore()

const categories = Array.from(new Set(products.map((p) => p.category)))
const categoryOptions = [{ label: 'All categories', value: '' }, ...categories.map((c) => ({ label: c, value: c }))]

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Active', value: 'Active' },
  { label: 'Low Stock', value: 'Low Stock' },
  { label: 'Out of Stock', value: 'Out of Stock' },
]

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return products.filter((p) => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)
    const matchesCategory = !categoryFilter.value || p.category === categoryFilter.value
    const matchesStatus = !statusFilter.value || p.status === statusFilter.value
    return matchesQuery && matchesCategory && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))
const sortedProducts = computed(() => {
  if (!sortKey.value) return filteredProducts.value
  return [...filteredProducts.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const visibleProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedProducts.value.slice(start, start + pageSize)
})

const productStats = computed(() => [
  { label: 'Total Products', value: products.length },
  { label: 'In Stock', value: products.filter((p) => p.status === 'Active').length },
  { label: 'Low Stock', value: products.filter((p) => p.status === 'Low Stock').length },
  { label: 'Out of Stock', value: products.filter((p) => p.status === 'Out of Stock').length },
])

watch([searchQuery, categoryFilter, statusFilter], () => { currentPage.value = 1 })

function viewProduct(product: Product) {
  router.push(`/management/products/${product.id}`)
}

function editProduct(product: Product) {
  router.push(`/management/products/${product.id}/edit`)
}

function openAddModal() {
  newName.value = ''
  newSku.value = ''
  newCategory.value = 'Software'
  newPriceStr.value = ''
  newStockStr.value = ''
  newNameError.value = ''
  newPriceError.value = ''
  showAddModal.value = true
}

function addProduct() {
  newNameError.value = newName.value.trim() ? '' : 'Product name is required.'
  newPriceError.value = newPriceStr.value && Number(newPriceStr.value) > 0 ? '' : 'Price must be greater than 0.'
  if (newNameError.value || newPriceError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  products.unshift({
    id: `prd-${Date.now()}`,
    name: newName.value.trim(),
    sku: newSku.value.trim() || `SKU-${Date.now()}`,
    image: '📦',
    category: newCategory.value,
    description: '',
    price: Number(newPriceStr.value) || 0,
    stock: Number(newStockStr.value) || 0,
    low_stock_threshold: 10,
    status: Number(newStockStr.value) > 0 ? 'Active' : 'Out of Stock',
    sales_count: 0,
    rating: 0,
    created_at: '2026-06-14',
  })
  showAddModal.value = false
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Products" description="Manage product catalog, inventory, and pricing." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openAddModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Product
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in productStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="product-search" v-model="searchQuery" class="pl-9" placeholder="Search by name or SKU..." aria-label="Search products" />
          </div>
          <label class="app-form-group" for="product-category-filter">
            <span class="sr-only">Category filter</span>
            <select id="product-category-filter" v-model="categoryFilter" class="app-input">
              <option v-for="opt in categoryOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
          <label class="app-form-group" for="product-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="product-status-filter" v-model="statusFilter" class="app-input">
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

      <div v-if="filteredProducts.length === 0" class="p-4">
        <AppEmptyState title="No products found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; categoryFilter = ''; statusFilter = ''">
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
                  :checked="selectedIds.length > 0 && selectedIds.length === visibleProducts.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('name')">
                  Product
                  <ArrowUp v-if="sortKey === 'name' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'name' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('sku')">
                  SKU
                  <ArrowUp v-if="sortKey === 'sku' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'sku' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('category')">
                  Category
                  <ArrowUp v-if="sortKey === 'category' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'category' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('price')">
                  Price
                  <ArrowUp v-if="sortKey === 'price' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'price' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('stock')">
                  Stock
                  <ArrowUp v-if="sortKey === 'stock' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'stock' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in visibleProducts" :key="product.id" :class="selectedIds.includes(String(product.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(product.id))"
                  :aria-label="`Select row ${String(product.id)}`"
                  @change="toggleRow(String(product.id))"
                />
              </td>
              <td>
                <div class="flex min-w-[14rem] items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 text-lg" aria-hidden="true">{{ product.image }}</span>
                  <div>
                    <p class="font-medium text-app-text">{{ product.name }}</p>
                    <p class="text-xs text-app-textMuted line-clamp-1">{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td><span class="text-sm font-mono text-app-textSecondary">{{ product.sku }}</span></td>
              <td><span class="text-sm text-app-textSecondary">{{ product.category }}</span></td>
              <td><span class="text-sm font-medium text-app-text">{{ formatCurrency(product.price) }}</span></td>
              <td>
                <span class="text-sm" :class="product.stock === 0 ? 'text-danger-700 font-medium' : 'text-app-textSecondary'">{{ product.stock }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(product.status)">{{ product.status }}</AppBadge>
              </td>
              <td>
                <div class="flex min-w-[6rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="viewProduct(product)">View</button>
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="editProduct(product)">Edit</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>

    <AppModal :open="showAddModal" title="Add Product" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="addProduct">
        <AppInput id="add-product-name" v-model="newName" label="Product name" placeholder="Enter product name" required :error="newNameError" />
        <AppInput id="add-product-sku" v-model="newSku" label="SKU" placeholder="e.g. PRD-001" />
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="app-form-group" for="add-product-category">
            <span class="app-label">Category</span>
            <select id="add-product-category" v-model="newCategory" class="app-input">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </label>
          <AppInput id="add-product-price" v-model="newPriceStr" label="Price" type="number" min="0" placeholder="0" :error="newPriceError" />
        </div>
        <AppInput id="add-product-stock" v-model="newStockStr" label="Stock" type="number" min="0" placeholder="0" />
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Product</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
