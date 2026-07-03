<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Trash2 } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const router = useRouter()
const uiStore = useUiStore()

const clientName = ref('')
const clientEmail = ref('')
const clientCompany = ref('')
const clientAddress = ref('')
const issueDate = ref('')
const dueDate = ref('')
const notes = ref('')
const clientNameError = ref('')
const clientEmailError = ref('')
const issueDateError = ref('')
const dueDateError = ref('')

interface LineItem {
  id: number
  description: string
  quantity: number
  unit_price: number
}
const lineItems = ref<LineItem[]>([
  { id: 1, description: '', quantity: 1, unit_price: 0 },
])

let itemIdCounter = 1

function addLineItem() {
  itemIdCounter++
  lineItems.value.push({ id: itemIdCounter, description: '', quantity: 1, unit_price: 0 })
}

function removeLineItem(id: number) {
  if (lineItems.value.length <= 1) return
  lineItems.value = lineItems.value.filter((item) => item.id !== id)
}

function submitInvoice() {
  clientNameError.value = ''
  clientEmailError.value = ''
  issueDateError.value = ''
  dueDateError.value = ''
  let hasError = false

  if (!clientName.value.trim()) {
    clientNameError.value = 'Client name is required.'
    hasError = true
  }

  if (clientEmail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value)) {
    clientEmailError.value = 'Please enter a valid email address.'
    hasError = true
  }

  if (!issueDate.value) {
    issueDateError.value = 'Issue date is required.'
    hasError = true
  }

  if (!dueDate.value) {
    dueDateError.value = 'Due date is required.'
    hasError = true
  }

  if (hasError) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }

  uiStore.pushToast({ title: 'Invoice created successfully (sample)', type: 'success' })
  router.push('/finance/invoices')
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Create Invoice" description="Create a new invoice for a client." :breadcrumb="['Finance', 'Invoices', 'Create']">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/finance/invoices')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Invoices
        </AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4" @submit.prevent="submitInvoice">
      <AppCard title="Client Information" description="Who is this invoice for?">
        <div class="grid gap-4 sm:grid-cols-2">
          <AppInput id="create-inv-name" v-model="clientName" label="Client name" placeholder="Enter client name" required :error="clientNameError" />
          <AppInput id="create-inv-email" v-model="clientEmail" label="Client email" type="email" placeholder="client@example.test" :error="clientEmailError" />
          <AppInput id="create-inv-company" v-model="clientCompany" label="Company" placeholder="Company name" />
          <AppInput id="create-inv-address" v-model="clientAddress" label="Address" placeholder="Billing address" />
        </div>
      </AppCard>

      <AppCard title="Invoice Dates" description="Issue and due dates.">
        <div class="grid gap-4 sm:grid-cols-2">
          <AppInput id="create-inv-issue" v-model="issueDate" label="Issue date" type="date" :error="issueDateError" />
          <AppInput id="create-inv-due" v-model="dueDate" label="Due date" type="date" :error="dueDateError" />
        </div>
      </AppCard>

      <AppCard title="Line Items" description="Products or services to bill.">
        <div class="overflow-x-auto">
          <table class="app-table">
            <thead>
              <tr>
                <th scope="col" class="w-full">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total</th>
                <th scope="col" class="w-10"><span class="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in lineItems" :key="item.id">
                <td>
                  <AppInput :id="'item-desc-' + item.id" v-model="item.description" placeholder="Item description" aria-label="Item description" />
                </td>
                <td>
                  <AppInput :id="'item-qty-' + item.id" v-model.number="item.quantity" type="number" min="1" class="w-20" aria-label="Quantity" />
                </td>
                <td>
                  <AppInput :id="'item-price-' + item.id" v-model.number="item.unit_price" type="number" min="0" step="0.01" class="w-28" aria-label="Unit price" />
                </td>
                <td class="text-sm font-medium text-app-text">
                  {{ item.quantity * item.unit_price }}
                </td>
                <td>
                  <button type="button" class="text-app-textMuted hover:text-danger-600" aria-label="Remove item" @click="removeLineItem(item.id)">
                    <Trash2 class="h-4 w-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3">
          <AppButton variant="secondary" size="sm" type="button" @click="addLineItem">
            + Add Item
          </AppButton>
        </div>
      </AppCard>

      <AppCard title="Notes" description="Optional notes or terms.">
        <AppTextarea id="create-inv-notes" v-model="notes" placeholder="Payment terms, thank you note, etc." :rows="3" />
      </AppCard>

      <div class="flex flex-wrap gap-2">
        <AppButton type="submit">Create Invoice</AppButton>
        <AppButton variant="secondary" type="button" @click="router.push('/finance/invoices')">Cancel</AppButton>
      </div>
    </form>
  </div>
</template>
