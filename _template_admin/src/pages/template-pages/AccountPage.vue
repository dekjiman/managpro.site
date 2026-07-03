<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const username = ref('johncarter')
const displayName = ref('John Carter')
const email = ref('john@example.test')
const language = ref('en')
const timezone = ref('America/Los_Angeles')
const twoFA = ref(false)
const displayNameError = ref('')
const emailError = ref('')
const usernameError = ref('')

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
]

const timezoneOptions = [
  { label: '(UTC-8) Pacific Time', value: 'America/Los_Angeles' },
  { label: '(UTC-5) Eastern Time', value: 'America/New_York' },
  { label: '(UTC+0) UTC', value: 'UTC' },
  { label: '(UTC+1) Central Europe', value: 'Europe/Berlin' },
  { label: '(UTC+8) Singapore', value: 'Asia/Singapore' },
  { label: '(UTC+9) Tokyo', value: 'Asia/Tokyo' },
]

function saveAccount() {
  displayNameError.value = ''
  emailError.value = ''
  usernameError.value = ''
  let hasError = false

  if (!displayName.value.trim()) {
    displayNameError.value = 'Display name is required.'
    hasError = true
  }

  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
    hasError = true
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    hasError = true
  }

  if (!username.value.trim()) {
    usernameError.value = 'Username is required.'
    hasError = true
  }

  if (hasError) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }

  uiStore.pushToast({ title: 'Account settings saved', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Account" description="Manage your account preferences and settings." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="max-w-2xl flex flex-col gap-4" @submit.prevent="saveAccount">
      <AppCard title="Account Information" description="Your account identity and login details.">
        <div class="grid gap-4 sm:grid-cols-2">
          <AppInput id="acct-username" v-model="username" label="Username" placeholder="Choose a username" required :error="usernameError" />
          <AppInput id="acct-display-name" v-model="displayName" label="Display name" placeholder="Your display name" required :error="displayNameError" />
          <AppInput id="acct-email" v-model="email" label="Email address" type="email" placeholder="your@email.com" required :error="emailError" helper="Used for login and notifications." />
        </div>
      </AppCard>

      <AppCard title="Preferences" description="Language and regional settings.">
        <div class="grid gap-4 sm:grid-cols-2">
          <AppSelect id="acct-lang" v-model="language" label="Language" :options="languageOptions" />
          <AppSelect id="acct-tz" v-model="timezone" label="Timezone" :options="timezoneOptions" />
        </div>
      </AppCard>

      <AppCard title="Security" description="Account security options.">
        <div class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
          <div>
            <p class="text-sm font-medium text-app-text">Two-Factor Authentication</p>
            <p class="text-xs text-app-textMuted">Add an extra layer of security to your account.</p>
          </div>
          <button
            type="button"
            class="relative inline-flex h-6 w-10 items-center rounded-full transition-colors"
            :class="twoFA ? 'bg-primary-600' : 'bg-app-border'"
            role="switch"
            :aria-checked="twoFA"
            @click="twoFA = !twoFA"
          >
            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="twoFA ? 'translate-x-5' : 'translate-x-1'" />
          </button>
        </div>
      </AppCard>

      <div class="flex flex-wrap gap-2">
        <AppButton type="submit">Save Account</AppButton>
        <AppButton variant="secondary" type="button" @click="router.back()">Cancel</AppButton>
      </div>
    </form>
  </div>
</template>
