<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Download, Printer } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { invoices } from '@/data/mock/invoices.mock'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()

const invoice = computed(() => invoices.find((inv) => inv.id === route.params.id) || null)
</script>

<template>
  <div class="app-page">
    <AppPageHeader :title="invoice ? `Invoice ${invoice.invoice_number}` : 'Invoice Detail'" description="View full invoice details, line items, and actions." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/finance/invoices')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Invoices
        </AppButton>
      </template>
    </AppPageHeader>

    <div v-if="!invoice" class="flex items-center justify-center py-20">
      <p class="app-textMuted">Invoice not found.</p>
    </div>

    <template v-else>
      <AppCard title="Invoice Summary" description="Invoice identity, status, and key dates.">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p class="app-label-text">Invoice Number</p>
            <p class="mt-1 text-sm font-bold text-app-text">{{ invoice.invoice_number }}</p>
          </div>
          <div>
            <p class="app-label-text">Issue Date</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(invoice.issue_date) }}</p>
          </div>
          <div>
            <p class="app-label-text">Due Date</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(invoice.due_date) }}</p>
          </div>
          <div>
            <p class="app-label-text">Status</p>
            <div class="mt-1">
              <AppBadge :variant="getStatusVariant(invoice.status)">{{ invoice.status }}</AppBadge>
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppButton variant="secondary" size="sm">
            <Printer class="mr-1 h-4 w-4" aria-hidden="true" />
            Print
          </AppButton>
          <AppButton variant="secondary" size="sm">
            <Download class="mr-1 h-4 w-4" aria-hidden="true" />
            Download PDF
          </AppButton>
        </div>
      </AppCard>

      <div class="grid gap-4 xl:grid-cols-2">
        <AppCard title="From" description="Your company information.">
          <div class="grid gap-3">
            <div>
              <p class="app-label-text">Company</p>
              <p class="mt-1 text-sm font-semibold text-app-text">{{ invoice.company_name }}</p>
            </div>
            <div>
              <p class="app-label-text">Address</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.company_address }}</p>
            </div>
            <div>
              <p class="app-label-text">Email</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.company_email }}</p>
            </div>
            <div>
              <p class="app-label-text">Phone</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.company_phone }}</p>
            </div>
          </div>
        </AppCard>

        <AppCard title="To" description="Client billing information.">
          <div class="grid gap-3">
            <div>
              <p class="app-label-text">Client</p>
              <p class="mt-1 text-sm font-semibold text-app-text">{{ invoice.client_name }}</p>
            </div>
            <div>
              <p class="app-label-text">Company</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.client_company }}</p>
            </div>
            <div>
              <p class="app-label-text">Email</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.client_email }}</p>
            </div>
            <div>
              <p class="app-label-text">Address</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ invoice.client_address }}</p>
            </div>
          </div>
        </AppCard>
      </div>

      <AppCard title="Invoice Items" description="Line items included in this invoice.">
        <div class="overflow-x-auto">
          <table class="app-table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in invoice.items" :key="item.id">
                <td class="font-medium text-app-text">{{ item.description }}</td>
                <td class="text-sm text-app-textSecondary">{{ item.quantity }}</td>
                <td class="text-sm text-app-textSecondary">{{ formatCurrency(item.unit_price) }}</td>
                <td class="text-sm font-medium text-app-text">{{ formatCurrency(item.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppCard>

      <AppCard title="Payment Summary" description="Financial breakdown and totals.">
        <div class="grid gap-3 sm:w-72 sm:ml-auto">
          <div class="flex items-center justify-between">
            <span class="text-sm text-app-textSecondary">Subtotal</span>
            <span class="text-sm text-app-text">{{ formatCurrency(invoice.subtotal) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-app-textSecondary">Tax ({{ invoice.tax_rate }}%)</span>
            <span class="text-sm text-app-text">{{ formatCurrency(invoice.tax_amount) }}</span>
          </div>
          <div v-if="invoice.discount > 0" class="flex items-center justify-between">
            <span class="text-sm text-app-textSecondary">Discount</span>
            <span class="text-sm text-danger-600">-{{ formatCurrency(invoice.discount) }}</span>
          </div>
          <div class="flex items-center justify-between border-t border-app-borderSoft pt-2">
            <span class="text-sm font-semibold text-app-text">Total</span>
            <span class="text-lg font-bold text-app-text">{{ formatCurrency(invoice.amount) }}</span>
          </div>
        </div>
      </AppCard>

      <AppCard v-if="invoice.notes" title="Notes" description="Additional invoice notes.">
        <p class="text-sm leading-6 text-app-textSecondary">{{ invoice.notes }}</p>
      </AppCard>
    </template>
  </div>
</template>
