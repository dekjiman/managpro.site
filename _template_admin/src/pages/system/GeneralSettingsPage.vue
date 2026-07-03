<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { generalSettings } from '@/data/mock/settings.mock'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const appName = ref(generalSettings.appName)
const defaultLanguage = ref(generalSettings.defaultLanguage)
const timezone = ref(generalSettings.timezone)
const dateFormat = ref(generalSettings.dateFormat)
const currency = ref(generalSettings.currency)
const appNameError = ref('')

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Indonesian', value: 'id' },
]

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'America/New York', value: 'America/New_York' },
  { label: 'America/Chicago', value: 'America/Chicago' },
  { label: 'America/Denver', value: 'America/Denver' },
  { label: 'America/Los Angeles', value: 'America/Los_Angeles' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Europe/Berlin', value: 'Europe/Berlin' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
  { label: 'Asia/Jakarta', value: 'Asia/Jakarta' },
  { label: 'Australia/Sydney', value: 'Australia/Sydney' },
]

const dateFormatOptions = [
  { label: 'DD MMM YYYY (14 Jun 2026)', value: 'DD MMM YYYY' },
  { label: 'MM/DD/YYYY (06/14/2026)', value: 'MM/DD/YYYY' },
  { label: 'DD/MM/YYYY (14/06/2026)', value: 'DD/MM/YYYY' },
  { label: 'YYYY-MM-DD (2026-06-14)', value: 'YYYY-MM-DD' },
]

const currencyOptions = [
  { label: 'USD ($)', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'IDR (Rp)', value: 'IDR' },
]

function saveSettings() {
  appNameError.value = appName.value.trim() ? '' : 'Application name is required.'
  if (appNameError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted field', type: 'danger' })
    return
  }
  uiStore.pushToast({ title: 'General settings saved successfully', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="General Settings" description="Configure your application name, localization, and regional preferences." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]" @submit.prevent="saveSettings">
      <div class="grid gap-4">
        <AppCard title="Application" description="Basic application information.">
          <div class="grid gap-4">
            <AppInput id="gen-app-name" v-model="appName" label="Application name" placeholder="Enter app name" helper="This name appears in the browser tab and email templates." :error="appNameError" required />
            <div class="flex flex-wrap items-center gap-4 rounded-lg border border-app-borderSoft bg-app-muted p-4">
              <span class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-50 text-lg font-bold text-primary-700">
                {{ appName.charAt(0).toUpperCase() || 'A' }}
              </span>
              <div class="grid gap-1">
                <AppButton variant="secondary" size="sm" type="button">Upload Logo</AppButton>
                <p class="text-xs text-app-textMuted">PNG or SVG. Recommended square logo.</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Localization" description="Language, timezone, and date format settings.">
          <div class="grid gap-4 sm:grid-cols-2">
            <AppSelect id="gen-lang" v-model="defaultLanguage" label="Default language" :options="languageOptions" />
            <AppSelect id="gen-tz" v-model="timezone" label="Default timezone" :options="timezoneOptions" />
            <AppSelect id="gen-date-fmt" v-model="dateFormat" label="Date format" :options="dateFormatOptions" />
            <AppSelect id="gen-currency" v-model="currency" label="Default currency" :options="currencyOptions" />
          </div>
        </AppCard>

        <div class="flex flex-wrap gap-2 rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <AppButton type="submit">Save Settings</AppButton>
          <AppButton variant="secondary" type="button" @click="router.back()">Cancel</AppButton>
        </div>
      </div>

      <div class="grid content-start gap-4">
        <AppCard title="Settings Preview" description="Current regional configuration.">
          <div class="grid gap-3">
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-textMuted">Application</span>
              <span class="text-sm font-medium text-app-text">{{ appName || 'Untitled app' }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-textMuted">Language</span>
              <span class="text-sm font-medium text-app-text">{{ defaultLanguage.toUpperCase() }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-textMuted">Currency</span>
              <span class="text-sm font-medium text-app-text">{{ currency }}</span>
            </div>
          </div>
        </AppCard>

        <AppCard title="Implementation Note" description="This template keeps settings local and mock-based.">
          <p class="text-sm text-app-textMuted">
            Replace these refs with API-backed data when connecting this template to a backend.
          </p>
        </AppCard>
      </div>
    </form>
  </div>
</template>
