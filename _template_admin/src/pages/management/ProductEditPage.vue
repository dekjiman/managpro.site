<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Eye, PackageCheck, Save } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { products } from '@/data/mock/products.mock'
import { formatCurrency } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const product = computed(() => products.find((p) => p.id === route.params.id) || null)
const categories = Array.from(new Set(products.map((p) => p.category)))

const name = ref(product.value?.name || '')
const sku = ref(product.value?.sku || '')
const image = ref(product.value?.image || '')
const category = ref(product.value?.category || categories[0] || 'Software')
const description = ref(product.value?.description || '')
const price = ref(String(product.value?.price ?? 0))
const stock = ref(String(product.value?.stock ?? 0))
const lowStockThreshold = ref(String(product.value?.low_stock_threshold ?? 10))
const status = ref(product.value?.status || 'Active')
const errorMessage = ref('')

const categoryOptions = categories.map((item) => ({ label: item, value: item }))
const statusOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Low Stock', value: 'Low Stock' },
  { label: 'Out of Stock', value: 'Out of Stock' },
  { label: 'Archived', value: 'Archived' },
]

const inventoryPreview = computed(() => {
  const stockValue = Number(stock.value) || 0
  const thresholdValue = Number(lowStockThreshold.value) || 0

  if (stockValue <= 0) return 'Out of Stock'
  if (stockValue <= thresholdValue) return 'Low Stock'
  return status.value
})

const pricePreview = computed(() => formatCurrency(Number(price.value) || 0))

function backToDetail() {
  if (product.value) {
    router.push(`/management/products/${product.value.id}`)
    return
  }

  router.push('/management/products')
}

function saveProduct() {
  errorMessage.value = ''

  if (!product.value) return
  if (!name.value.trim()) {
    errorMessage.value = 'Product name is required.'
    return
  }
  if (!sku.value.trim()) {
    errorMessage.value = 'SKU is required.'
    return
  }

  Object.assign(product.value, {
    name: name.value.trim(),
    sku: sku.value.trim(),
    image: image.value.trim() || product.value.image,
    category: category.value,
    description: description.value.trim(),
    price: Number(price.value) || 0,
    stock: Number(stock.value) || 0,
    low_stock_threshold: Number(lowStockThreshold.value) || 0,
    status: inventoryPreview.value,
  })

  uiStore.pushToast({ title: 'Product updated successfully (sample)', type: 'success' })
  router.push(`/management/products/${product.value.id}`)
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      :title="product ? `Edit: ${product.name}` : 'Edit Product'"
      description="Update catalog details, pricing, inventory, and publishing status."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton variant="secondary" @click="backToDetail">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          {{ product ? 'Back to Detail' : 'Back to Products' }}
        </AppButton>
      </template>
    </AppPageHeader>

    <AppEmptyState v-if="!product" title="Product not found" description="The selected product could not be loaded from the mock catalog.">
      <template #action>
        <AppButton variant="secondary" @click="router.push('/management/products')">Back to Products</AppButton>
      </template>
    </AppEmptyState>

    <form v-else class="grid gap-4" @submit.prevent="saveProduct">
      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div class="grid gap-4">
          <AppCard title="Product Information" description="Core product identity and catalog description.">
            <div class="grid gap-4">
              <div v-if="errorMessage" class="rounded-card border border-danger-200 bg-danger-50 p-3 text-sm text-danger-700">
                {{ errorMessage }}
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <AppInput id="edit-product-name" v-model="name" label="Product name" placeholder="Enter product name" required />
                <AppInput id="edit-product-sku" v-model="sku" label="SKU" placeholder="e.g. PRD-001" required />
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <AppInput id="edit-product-image" v-model="image" label="Product icon" placeholder="Icon or short visual marker" />
                <AppSelect id="edit-product-category" v-model="category" label="Category" :options="categoryOptions" />
              </div>
              <AppTextarea id="edit-product-description" v-model="description" label="Description" placeholder="Describe the product value and key use case" />
            </div>
          </AppCard>

          <AppCard title="Pricing & Inventory" description="Sample stock controls and pricing fields.">
            <div class="grid gap-4 sm:grid-cols-3">
              <AppInput id="edit-product-price" v-model="price" label="Price" type="number" required />
              <AppInput id="edit-product-stock" v-model="stock" label="Stock" type="number" required />
              <AppInput id="edit-product-threshold" v-model="lowStockThreshold" label="Low stock threshold" type="number" />
            </div>
          </AppCard>
        </div>

        <div class="grid gap-4 content-start">
          <AppCard title="Publishing" description="Catalog availability and save action.">
            <div class="grid gap-4">
              <AppSelect id="edit-product-status" v-model="status" label="Status" :options="statusOptions" />
              <div class="rounded-card border border-app-borderSoft bg-app-muted p-3">
                <p class="app-label-text">Inventory Preview</p>
                <div class="mt-2 flex items-center gap-2">
                  <AppBadge :variant="getStatusVariant(inventoryPreview)">{{ inventoryPreview }}</AppBadge>
                  <span class="text-sm text-app-textMuted">{{ stock }} units</span>
                </div>
              </div>
              <div class="rounded-card border border-app-borderSoft bg-app-card p-3">
                <p class="app-label-text">Price Preview</p>
                <p class="mt-2 text-2xl font-bold text-app-text">{{ pricePreview }}</p>
              </div>
            </div>
          </AppCard>

          <AppCard title="Quick Actions" description="Navigation and sample actions.">
            <div class="grid gap-2">
              <AppButton type="submit">
                <Save class="mr-1 h-4 w-4" aria-hidden="true" />
                Save Changes
              </AppButton>
              <AppButton variant="secondary" type="button" @click="router.push(`/management/products/${product.id}`)">
                <Eye class="mr-1 h-4 w-4" aria-hidden="true" />
                Preview Detail
              </AppButton>
              <AppButton variant="secondary" type="button" @click="status = inventoryPreview">
                <PackageCheck class="mr-1 h-4 w-4" aria-hidden="true" />
                Sync Stock Status
              </AppButton>
            </div>
          </AppCard>
        </div>
      </div>
    </form>
  </div>
</template>
