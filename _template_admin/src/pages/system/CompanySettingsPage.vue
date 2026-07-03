<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { companySettings } from '@/data/mock/settings.mock'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const name = ref(companySettings.name)
const email = ref(companySettings.email)
const phone = ref(companySettings.phone)
const address = ref(companySettings.address)
const website = ref(companySettings.website)
const taxId = ref(companySettings.taxId)
const nameError = ref('')
const emailError = ref('')

function saveCompany() {
  nameError.value = name.value.trim() ? '' : 'Company name is required.'
  emailError.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Enter a valid company email.'
  if (nameError.value || emailError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  uiStore.pushToast({ title: 'Company settings saved successfully', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Company Settings" description="Manage your organization details and branding." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]" @submit.prevent="saveCompany">
      <div class="grid gap-4">
        <AppCard title="Company Information" description="Official business details.">
          <div class="grid gap-4 sm:grid-cols-2">
            <AppInput id="comp-name" v-model="name" label="Company name" placeholder="Enter company name" :error="nameError" required />
            <AppInput id="comp-email" v-model="email" label="Company email" type="email" placeholder="contact@company.com" :error="emailError" required />
            <AppInput id="comp-phone" v-model="phone" label="Company phone" placeholder="+1 (555) 000-0000" />
            <AppInput id="comp-website" v-model="website" label="Website" type="url" placeholder="https://company.com" />
          </div>
          <AppTextarea id="comp-address" v-model="address" label="Address" placeholder="Street, city, postal code..." />
        </AppCard>

        <AppCard title="Tax & Legal" description="Tax identification and legal information.">
          <AppInput id="comp-tax-id" v-model="taxId" label="Tax ID / VAT Number" placeholder="TAX-XX-XXXXXXX" helper="Used on invoices and official documents." />
        </AppCard>

        <div class="flex flex-wrap gap-2 rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <AppButton type="submit">Save Company</AppButton>
          <AppButton variant="secondary" type="button" @click="router.back()">Cancel</AppButton>
        </div>
      </div>

      <div class="grid content-start gap-4">
        <AppCard title="Branding" description="Logo and company preview.">
          <div class="flex items-center gap-4 rounded-lg border border-app-borderSoft bg-app-muted p-4">
            <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-lg font-bold text-primary-700">
              {{ name.charAt(0).toUpperCase() || 'A' }}
            </span>
            <div class="grid gap-1">
              <p class="text-sm font-semibold text-app-text">{{ name || 'Company name' }}</p>
              <p class="text-xs text-app-textMuted">{{ website || 'No website set' }}</p>
              <AppButton variant="secondary" size="sm" type="button">Upload Logo</AppButton>
            </div>
          </div>
        </AppCard>

        <AppCard title="Company Summary" description="Used across invoices and account pages.">
          <div class="grid gap-2 text-sm">
            <p class="text-app-textMuted">{{ email || 'No email set' }}</p>
            <p class="text-app-textMuted">{{ phone || 'No phone set' }}</p>
            <p class="text-app-textMuted">{{ address || 'No address set' }}</p>
          </div>
        </AppCard>
      </div>
    </form>
  </div>
</template>
