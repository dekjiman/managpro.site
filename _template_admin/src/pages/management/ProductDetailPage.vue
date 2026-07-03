<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Edit, Star } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { products } from '@/data/mock/products.mock'
import { formatCurrency, formatDate, formatNumber } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()

const product = computed(() => products.find((p) => p.id === route.params.id) || null)

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter((p) => p.category === product.value!.category && p.id !== product.value!.id).slice(0, 4)
})

const salesMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const salesData = product.value ? [12, 19, 15, 22, 28, product.value.sales_count % 30 + 5] : [0, 0, 0, 0, 0, 0]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Product Detail" description="View product information, pricing, and performance." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton v-if="product" @click="router.push(`/management/products/${product.id}/edit`)">
          <Edit class="mr-1 h-4 w-4" aria-hidden="true" />
          Edit Product
        </AppButton>
        <AppButton variant="secondary" @click="router.push('/management/products')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Products
        </AppButton>
      </template>
    </AppPageHeader>

    <div v-if="!product" class="flex items-center justify-center py-20">
      <p class="app-textMuted">Product not found.</p>
    </div>

    <template v-else>
      <AppCard title="Product Summary" description="Basic product identity and categorization.">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div class="flex h-24 w-24 items-center justify-center rounded-xl bg-secondary-50 text-4xl">
            {{ product.image }}
          </div>
          <div class="grid flex-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="app-label-text">Product Name</p>
              <p class="mt-1 text-sm font-medium text-app-text">{{ product.name }}</p>
            </div>
            <div>
              <p class="app-label-text">SKU</p>
              <p class="mt-1 text-sm font-mono text-app-textSecondary">{{ product.sku }}</p>
            </div>
            <div>
              <p class="app-label-text">Category</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ product.category }}</p>
            </div>
            <div>
              <p class="app-label-text">Status</p>
              <div class="mt-1">
                <AppBadge :variant="getStatusVariant(product.status)">{{ product.status }}</AppBadge>
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      <div class="grid gap-4 sm:grid-cols-4">
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Price</p>
          <p class="mt-2 text-2xl font-bold text-app-text">{{ formatCurrency(product.price) }}</p>
        </div>
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Stock</p>
          <p class="mt-2 text-2xl font-bold" :class="product.stock === 0 ? 'text-danger-700' : 'text-app-text'">{{ formatNumber(product.stock) }}</p>
        </div>
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Sales</p>
          <p class="mt-2 text-2xl font-bold text-app-text">{{ formatNumber(product.sales_count) }}</p>
        </div>
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Rating</p>
          <p class="mt-2 flex items-center gap-1.5 text-2xl font-bold text-app-text">
            {{ product.rating }}
            <Star class="h-5 w-5 fill-warning-500 text-warning-500" aria-hidden="true" />
          </p>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <AppCard title="Description" description="Product details and information.">
          <p class="text-sm leading-6 text-app-textSecondary">{{ product.description || 'No description available.' }}</p>
          <p class="mt-3 text-xs text-app-textMuted">Created on {{ formatDate(product.created_at) }}</p>
        </AppCard>

        <AppCard title="Sales Performance" description="Monthly sales trend (sample).">
          <div class="flex items-end gap-2" style="height: 120px;">
            <div v-for="(value, idx) in salesData" :key="idx" class="flex flex-1 flex-col items-center gap-1">
              <span class="text-xs text-app-textMuted">{{ value }}</span>
              <div
                class="w-full rounded-t-md bg-primary-500 transition-all"
                :style="{ height: `${Math.max(8, value * 4)}px` }"
              />
              <span class="text-xs text-app-textMuted">{{ salesMonths[idx] }}</span>
            </div>
          </div>
        </AppCard>
      </div>

      <AppCard title="Related Products" description="Other products in the same category.">
        <div v-if="relatedProducts.length === 0" class="py-4 text-center text-sm text-app-textMuted">No related products.</div>
        <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="related in relatedProducts" :key="related.id" class="rounded-lg border border-app-borderSoft p-3">
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50 text-lg" aria-hidden="true">{{ related.image }}</span>
              <div class="min-w-0">
                <p class="truncate text-sm font-medium text-app-text">{{ related.name }}</p>
                <p class="text-xs text-app-textMuted">{{ formatCurrency(related.price) }}</p>
              </div>
            </div>
            <div class="mt-2 flex items-center justify-between">
              <AppBadge :variant="getStatusVariant(related.status)" size="sm">{{ related.status }}</AppBadge>
              <span class="text-xs text-app-textMuted">{{ related.stock }} in stock</span>
            </div>
          </div>
        </div>
      </AppCard>
    </template>
  </div>
</template>
