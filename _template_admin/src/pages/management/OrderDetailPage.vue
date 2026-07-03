<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Download, Printer } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { orders } from '@/data/mock/orders.mock'
import { formatCurrency, formatDate, formatDateTime } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()

const order = computed(() => orders.find((o) => o.id === route.params.id) || null)

const subtotal = computed(() => {
  if (!order.value) return 0
  return order.value.items.reduce((sum, item) => sum + item.total, 0)
})

const taxEstimate = computed(() => Math.round(subtotal.value * 0.1))
const totalWithTax = computed(() => subtotal.value + taxEstimate.value)
</script>

<template>
  <div class="app-page">
    <AppPageHeader :title="order ? `Order ${order.order_number}` : 'Order Detail'" description="View complete order information and timeline." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/management/orders')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Orders
        </AppButton>
      </template>
    </AppPageHeader>

    <div v-if="!order" class="flex items-center justify-center py-20">
      <p class="app-textMuted">Order not found.</p>
    </div>

    <template v-else>
      <AppCard title="Order Summary" description="Order identity, status, and key dates.">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p class="app-label-text">Order Number</p>
            <p class="mt-1 text-sm font-bold text-app-text">{{ order.order_number }}</p>
          </div>
          <div>
            <p class="app-label-text">Date</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ formatDateTime(order.created_at) }}</p>
          </div>
          <div>
            <p class="app-label-text">Order Status</p>
            <div class="mt-1">
              <AppBadge :variant="getStatusVariant(order.order_status)">{{ order.order_status }}</AppBadge>
            </div>
          </div>
          <div>
            <p class="app-label-text">Payment Status</p>
            <div class="mt-1">
              <AppBadge :variant="getStatusVariant(order.payment_status)">{{ order.payment_status }}</AppBadge>
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppButton variant="secondary" size="sm">
            <Printer class="mr-1 h-4 w-4" aria-hidden="true" />
            Print Invoice
          </AppButton>
          <AppButton variant="secondary" size="sm">
            <Download class="mr-1 h-4 w-4" aria-hidden="true" />
            Download
          </AppButton>
        </div>
      </AppCard>

      <div class="grid gap-4 xl:grid-cols-2">
        <AppCard title="Customer Information" description="Contact details for this order.">
          <div class="grid gap-3">
            <div>
              <p class="app-label-text">Name</p>
              <p class="mt-1 text-sm font-medium text-app-text">{{ order.customer_name }}</p>
            </div>
            <div>
              <p class="app-label-text">Email</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ order.customer_email }}</p>
            </div>
            <div>
              <p class="app-label-text">Phone</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ order.customer_phone }}</p>
            </div>
          </div>
        </AppCard>

        <AppCard title="Shipping Information" description="Delivery address and method.">
          <div class="grid gap-3">
            <div>
              <p class="app-label-text">Address</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ order.shipping_address }}</p>
            </div>
            <div>
              <p class="app-label-text">Method</p>
              <p class="mt-1 text-sm font-medium text-app-text">{{ order.shipping_method }}</p>
            </div>
          </div>
        </AppCard>
      </div>

      <AppCard title="Ordered Items" description="Products included in this order.">
        <div class="overflow-x-auto">
          <table class="app-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td class="font-medium text-app-text">{{ item.product_name }}</td>
                <td class="text-sm text-app-textSecondary">{{ item.quantity }}</td>
                <td class="text-sm text-app-textSecondary">{{ formatCurrency(item.unit_price) }}</td>
                <td class="text-sm font-medium text-app-text">{{ formatCurrency(item.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppCard>

      <AppCard title="Payment Summary" description="Cost breakdown and totals.">
        <div class="grid gap-3 sm:w-72 sm:ml-auto">
          <div class="flex items-center justify-between">
            <span class="text-sm text-app-textSecondary">Subtotal</span>
            <span class="text-sm text-app-text">{{ formatCurrency(subtotal) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-app-textSecondary">Tax (10%)</span>
            <span class="text-sm text-app-text">{{ formatCurrency(taxEstimate) }}</span>
          </div>
          <div class="flex items-center justify-between border-t border-app-borderSoft pt-2">
            <span class="text-sm font-semibold text-app-text">Total</span>
            <span class="text-lg font-bold text-app-text">{{ formatCurrency(totalWithTax) }}</span>
          </div>
        </div>
      </AppCard>

      <AppCard title="Order Timeline" description="Status updates and events for this order.">
        <div class="space-y-1">
          <div v-for="(event, idx) in order.timeline" :key="idx" class="flex items-start gap-3 rounded-lg p-2 hover:bg-app-muted">
            <div
              class="mt-1 h-2.5 w-2.5 rounded-full"
              :class="{
                'bg-primary-400': event.status === 'Pending' || event.status === 'Processing',
                'bg-info-400': event.status === 'Shipped' || event.status === 'Delivered',
                'bg-success-500': event.status === 'Completed',
                'bg-danger-500': event.status === 'Cancelled' || event.status === 'Refunded',
              }"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-app-text">{{ event.status }}</p>
              <p class="text-xs text-app-textMuted">{{ event.note }}</p>
            </div>
            <span class="text-xs text-app-textMuted">{{ formatDate(event.date) }}</span>
          </div>
        </div>
      </AppCard>

      <AppCard v-if="order.notes" title="Notes" description="Additional order notes.">
        <p class="text-sm leading-6 text-app-textSecondary">{{ order.notes }}</p>
      </AppCard>
    </template>
  </div>
</template>
