<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'

const route = useRoute()
const uiStore = useUiStore()
const email = ref('admin@example.test')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const title = computed(() => String(route.meta.title))
const helper = computed(() => {
  if (route.path.includes('register')) return 'Create a sample account for the admin template.'
  if (route.path.includes('forgot')) return 'Enter an email address to preview reset feedback.'
  if (route.path.includes('reset')) return 'Set a new password sample with validation-ready fields.'
  if (route.path.includes('verify')) return 'Verify the sample email address.'
  if (route.path.includes('two-factor')) return 'Enter a sample one-time code.'
  if (route.path.includes('lock')) return 'Unlock the sample workspace session.'
  return 'Sign in to preview the admin dashboard UI.'
})

function validateForm() {
  emailError.value = ''
  passwordError.value = ''
  let hasError = false

  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
    hasError = true
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    hasError = true
  }

  if (!route.path.includes('forgot') && !route.path.includes('verify')) {
    if (!password.value.trim()) {
      passwordError.value = 'Password is required.'
      hasError = true
    } else if (password.value.length < 6) {
      passwordError.value = 'Password must be at least 6 characters.'
      hasError = true
    }
  }

  if (hasError) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }

  uiStore.pushToast({ title: 'Form submitted successfully (sample)', type: 'success' })
}
</script>

<template>
  <AppCard :title="title" :description="helper">
    <form class="grid gap-4" @submit.prevent="validateForm">
      <AppInput v-if="route.path.includes('register')" id="name" model-value="Ariana Hart" label="Full Name" required />
      <AppInput v-if="!route.path.includes('two-factor')" id="email" v-model="email" label="Email" type="email" required :error="emailError" />
      <AppInput v-if="!route.path.includes('forgot') && !route.path.includes('verify')" id="password" v-model="password" label="Password" type="password" required helper="Minimum 8 characters for the sample state." :error="passwordError" />
      <AppInput v-if="route.path.includes('two-factor')" id="otp" model-value="" label="Verification Code" placeholder="000000" required />
      <div class="rounded-lg border border-info-100 bg-info-50 p-3 text-sm text-info-700">
        Forms are UI-only samples and do not connect to a backend.
      </div>
      <AppButton type="submit" loading>{{ route.path.includes('register') ? 'Create Account' : 'Continue' }}</AppButton>
      <div class="grid grid-cols-2 gap-2">
        <AppButton type="button" variant="secondary">
          <Icon icon="simple-icons:google" class="h-4 w-4" aria-hidden="true" />
          Google
        </AppButton>
        <AppButton type="button" variant="secondary">
          <Icon icon="simple-icons:github" class="h-4 w-4" aria-hidden="true" />
          GitHub
        </AppButton>
      </div>
      <RouterLink class="text-sm font-medium text-primary-700 hover:text-primary-800" to="/dashboard">
        Back to dashboard
      </RouterLink>
    </form>
  </AppCard>
</template>
