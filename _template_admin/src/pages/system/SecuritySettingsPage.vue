<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Shield, Eye, EyeOff } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { activeSessions, loginHistory } from '@/data/mock/settings.mock'
import { formatDateTime } from '@/utils/format'


const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const currentPasswordError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')
const showPasswords = ref(false)
const twoFAEnabled = ref(false)

function updatePassword() {
  currentPasswordError.value = ''
  newPasswordError.value = ''
  confirmPasswordError.value = ''
  let hasError = false

  if (!currentPassword.value.trim()) {
    currentPasswordError.value = 'Current password is required.'
    hasError = true
  }

  if (!newPassword.value.trim()) {
    newPasswordError.value = 'New password is required.'
    hasError = true
  } else if (newPassword.value.length < 6) {
    newPasswordError.value = 'Password must be at least 6 characters.'
    hasError = true
  }

  if (!confirmPassword.value.trim()) {
    confirmPasswordError.value = 'Please confirm your new password.'
    hasError = true
  } else if (newPassword.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match.'
    hasError = true
  }

  if (hasError) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }

  uiStore.pushToast({ title: 'Password updated successfully', type: 'success' })
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

function toggle2FA() {
  twoFAEnabled.value = !twoFAEnabled.value
  uiStore.pushToast({
    title: twoFAEnabled.value ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
    type: 'success',
  })
}

function revokeSession(_sessionId: string) {
  uiStore.pushToast({ title: 'Session revoked successfully', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Security Settings" description="Manage your account security, passwords, and active sessions." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
      <div class="grid gap-4">
        <AppCard title="Change Password" description="Update your account password regularly to keep your account secure.">
          <form class="grid gap-4" @submit.prevent="updatePassword">
            <div class="relative">
              <AppInput id="sec-current-pw" v-model="currentPassword" label="Current password" :type="showPasswords ? 'text' : 'password'" placeholder="Enter current password" required :error="currentPasswordError" />
              <button type="button" class="absolute right-3 top-9 text-app-textMuted hover:text-app-text" :aria-label="showPasswords ? 'Hide passwords' : 'Show passwords'" @click="showPasswords = !showPasswords">
                <Eye v-if="!showPasswords" class="h-4 w-4" aria-hidden="true" />
                <EyeOff v-else class="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <AppInput id="sec-new-pw" v-model="newPassword" label="New password" :type="showPasswords ? 'text' : 'password'" placeholder="Enter new password" required helper="Minimum 8 characters." :error="newPasswordError" />
              <AppInput id="sec-confirm-pw" v-model="confirmPassword" label="Confirm password" :type="showPasswords ? 'text' : 'password'" placeholder="Confirm new password" required :error="confirmPasswordError" />
            </div>
            <div class="flex flex-wrap gap-2">
              <AppButton type="submit">Update Password</AppButton>
            </div>
          </form>
        </AppCard>

        <AppCard title="Active Sessions" description="Devices and browsers currently logged into your account.">
          <div v-if="activeSessions.length === 0" class="text-sm text-app-textMuted">No active sessions.</div>
          <div v-else class="grid gap-3">
            <div v-for="session in activeSessions" :key="session.id" class="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-app-borderSoft bg-app-surface p-3">
              <div>
                <p class="text-sm font-medium text-app-text">
                  {{ session.device }}
                  <span v-if="session.isCurrent" class="ml-2 text-xs text-primary-700">(Current)</span>
                </p>
                <p class="text-xs text-app-textMuted">{{ session.browser }} &middot; {{ session.location }} &middot; {{ session.ipAddress }}</p>
                <p class="text-xs text-app-textMuted">Last active: {{ formatDateTime(session.lastActive) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <AppBadge :variant="session.isCurrent ? 'success' : 'neutral'">{{ session.isCurrent ? 'Active' : 'Idle' }}</AppBadge>
                <AppButton v-if="!session.isCurrent" variant="danger" size="sm" type="button" @click="revokeSession(session.id)">Revoke</AppButton>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Login History" description="Recent login attempts to your account.">
          <div v-if="loginHistory.length === 0" class="text-sm text-app-textMuted">No login history available.</div>
          <div v-else class="overflow-x-auto">
            <table class="app-table">
              <thead>
                <tr>
                  <th scope="col">Location</th>
                  <th scope="col">Device</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in loginHistory" :key="entry.id">
                  <td><span class="text-sm text-app-text">{{ entry.location }}<br /><span class="text-xs text-app-textMuted">{{ entry.ipAddress }}</span></span></td>
                  <td><span class="text-sm text-app-text">{{ entry.device }}</span></td>
                  <td><span class="text-sm text-app-text">{{ entry.browser }}</span></td>
                  <td><span class="text-sm text-app-text">{{ formatDateTime(entry.timestamp) }}</span></td>
                  <td><AppBadge :variant="entry.success ? 'success' : 'danger'">{{ entry.success ? 'Success' : 'Failed' }}</AppBadge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </AppCard>
      </div>

      <div class="grid gap-4">
        <AppCard title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-app-text">Authenticator App</p>
              <p class="text-xs text-app-textMuted">Use an authenticator app to generate one-time codes.</p>
            </div>
            <button
              type="button"
              class="relative inline-flex h-6 w-10 items-center rounded-full transition-colors"
              :class="twoFAEnabled ? 'bg-primary-600' : 'bg-app-border'"
              role="switch"
              :aria-checked="twoFAEnabled"
              @click="toggle2FA"
            >
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="twoFAEnabled ? 'translate-x-5' : 'translate-x-1'" />
            </button>
          </div>
          <AppButton v-if="twoFAEnabled" variant="secondary" size="sm" class="mt-3" type="button">
            <Shield class="mr-1 h-4 w-4" aria-hidden="true" />
            View Recovery Codes
          </AppButton>
        </AppCard>

        <AppCard title="Security Summary" description="Quick overview of your account security status.">
          <div class="grid gap-3">
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
              <span class="text-sm text-app-text">Password age</span>
              <span class="text-sm font-medium text-app-text">45 days</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
              <span class="text-sm text-app-text">Two-factor auth</span>
              <AppBadge :variant="twoFAEnabled ? 'success' : 'warning'">{{ twoFAEnabled ? 'Enabled' : 'Disabled' }}</AppBadge>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
              <span class="text-sm text-app-text">Active sessions</span>
              <span class="text-sm font-medium text-app-text">{{ activeSessions.length }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
              <span class="text-sm text-app-text">Failed logins (7d)</span>
              <span class="text-sm font-medium text-app-text">{{ loginHistory.filter((l) => !l.success).length }}</span>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
