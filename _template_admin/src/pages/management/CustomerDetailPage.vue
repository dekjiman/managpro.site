<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Building2, Mail, Phone } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { customers } from '@/data/mock/customers.mock'
import { orders } from '@/data/mock/orders.mock'
import { invoices } from '@/data/mock/invoices.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()

const customer = computed(() => customers.find((c) => c.id === route.params.id) || null)

const customerOrders = computed(() => orders.filter((o) => o.customer_name === customer.value?.name))
const customerInvoices = computed(() => invoices.filter((i) => i.client_name === customer.value?.name))

const customerActivity = computed(() => {
  const items: { action: string; date: string }[] = []
  if (customer.value) {
    items.push({ action: 'Customer account created', date: customer.value.joined_date })
    for (const order of customerOrders.value.slice(0, 3)) {
      items.push({ action: `Order ${order.order_number} — ${order.order_status}`, date: order.date })
    }
  }
  return items
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Customer Detail" description="View customer profile, orders, invoices, and activity." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/management/customers')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Customers
        </AppButton>
      </template>
    </AppPageHeader>

    <div v-if="!customer" class="flex items-center justify-center py-20">
      <p class="text-app-textMuted">Customer not found.</p>
    </div>

    <template v-else>
      <AppCard title="Customer Profile" description="Summary and contact information.">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 text-2xl font-bold text-secondary-700">
            {{ customer.avatar || customer.name.charAt(0) }}
          </div>
          <div class="grid flex-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="app-label-text">Company</p>
              <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-app-text">
                <Building2 class="h-3.5 w-3.5" aria-hidden="true" />
                {{ customer.company }}
              </p>
            </div>
            <div>
              <p class="app-label-text">Status</p>
              <div class="mt-1">
                <AppBadge :variant="getStatusVariant(customer.status)">{{ customer.status }}</AppBadge>
              </div>
            </div>
            <div>
              <p class="app-label-text">Email</p>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-app-textSecondary">
                <Mail class="h-3.5 w-3.5" aria-hidden="true" />
                {{ customer.email }}
              </p>
            </div>
            <div>
              <p class="app-label-text">Phone</p>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-app-textSecondary">
                <Phone class="h-3.5 w-3.5" aria-hidden="true" />
                {{ customer.phone || '—' }}
              </p>
            </div>
            <div>
              <p class="app-label-text">Type</p>
              <p class="mt-1 text-sm capitalize text-app-textSecondary">{{ customer.type }}</p>
            </div>
            <div>
              <p class="app-label-text">Member Since</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(customer.joined_date) }}</p>
            </div>
          </div>
        </div>
      </AppCard>

      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Total Orders</p>
          <p class="mt-2 text-2xl font-bold text-app-text">{{ customer.total_orders }}</p>
        </div>
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Total Spent</p>
          <p class="mt-2 text-2xl font-bold text-app-text">{{ formatCurrency(customer.total_spent) }}</p>
        </div>
        <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <p class="app-label-text">Open Orders</p>
          <p class="mt-2 text-2xl font-bold text-app-text">{{ customerOrders.filter((o) => o.order_status !== 'Completed' && o.order_status !== 'Cancelled').length }}</p>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <AppCard title="Order History" description="Recent orders from this customer.">
          <div v-if="customerOrders.length === 0" class="py-4 text-center text-sm text-app-textMuted">No orders yet.</div>
          <div v-else class="overflow-x-auto">
            <table class="app-table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in customerOrders.slice(0, 5)" :key="order.id">
                  <td class="text-sm font-medium text-app-text">{{ order.order_number }}</td>
                  <td class="text-sm text-app-textSecondary">{{ formatCurrency(order.amount) }}</td>
                  <td><AppBadge :variant="getStatusVariant(order.order_status)">{{ order.order_status }}</AppBadge></td>
                  <td class="text-sm text-app-textSecondary">{{ formatDate(order.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AppCard>

        <AppCard title="Invoice History" description="Invoices associated with this customer.">
          <div v-if="customerInvoices.length === 0" class="py-4 text-center text-sm text-app-textMuted">No invoices yet.</div>
          <div v-else class="overflow-x-auto">
            <table class="app-table">
              <thead>
                <tr>
                  <th scope="col">Invoice</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Due</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inv in customerInvoices.slice(0, 5)" :key="inv.id">
                  <td class="text-sm font-medium text-app-text">{{ inv.invoice_number }}</td>
                  <td class="text-sm text-app-textSecondary">{{ formatCurrency(inv.amount) }}</td>
                  <td><AppBadge :variant="getStatusVariant(inv.status)">{{ inv.status }}</AppBadge></td>
                  <td class="text-sm text-app-textSecondary">{{ formatDate(inv.due_date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AppCard>
      </div>

      <AppCard title="Activity Timeline" description="Recent activity for this customer.">
        <div v-if="customerActivity.length === 0" class="py-4 text-center text-sm text-app-textMuted">No activity recorded.</div>
        <div v-else class="space-y-1">
          <div v-for="(activity, idx) in customerActivity" :key="idx" class="flex items-start gap-3 rounded-lg p-2 hover:bg-app-muted">
            <div class="mt-1 h-2 w-2 rounded-full bg-secondary-400" />
            <div class="flex-1">
              <p class="text-sm font-medium text-app-text">{{ activity.action }}</p>
              <p class="text-xs text-app-textMuted">{{ formatDate(activity.date) }}</p>
            </div>
          </div>
        </div>
      </AppCard>
    </template>
  </div>
</template>
