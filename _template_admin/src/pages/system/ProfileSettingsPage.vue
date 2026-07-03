<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { profileSettings } from '@/data/mock/settings.mock'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const name = ref(profileSettings.name)
const email = ref(profileSettings.email)
const phone = ref(profileSettings.phone)
const jobTitle = ref(profileSettings.jobTitle)
const bio = ref(profileSettings.bio)
const nameError = ref('')
const emailError = ref('')

function saveProfile() {
  nameError.value = name.value.trim() ? '' : 'Full name is required.'
  emailError.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Enter a valid email address.'
  if (nameError.value || emailError.value) {
    uiStore.pushToast({ title: 'Please fix the highlighted fields', type: 'danger' })
    return
  }
  uiStore.pushToast({ title: 'Profile updated successfully', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Profile Settings" description="Update your personal information and profile details." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]" @submit.prevent="saveProfile">
      <div class="grid gap-4">
        <AppCard title="Personal Information" description="Your name, email, and contact details.">
          <div class="grid gap-4 sm:grid-cols-2">
            <AppInput id="prof-name" v-model="name" label="Full name" placeholder="Enter your full name" :error="nameError" required />
            <AppInput id="prof-email" v-model="email" label="Email address" type="email" placeholder="your@email.com" :error="emailError" required />
            <AppInput id="prof-phone" v-model="phone" label="Phone number" placeholder="+1 (555) 000-0000" helper="Used for notification alerts." />
            <AppInput id="prof-job-title" v-model="jobTitle" label="Job title" placeholder="e.g. Senior Developer" />
          </div>
          <AppTextarea id="prof-bio" v-model="bio" label="Bio" placeholder="Tell us a little about yourself..." />
        </AppCard>

        <div class="flex flex-wrap gap-2 rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <AppButton type="submit">Save Profile</AppButton>
          <AppButton variant="secondary" type="button" @click="router.back()">Cancel</AppButton>
        </div>
      </div>

      <div class="grid content-start gap-4">
        <AppCard title="Avatar" description="Your profile picture or initial badge.">
          <div class="flex items-center gap-4">
            <span class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-xl font-bold text-primary-700">
              {{ profileSettings.avatar }}
            </span>
            <div class="grid gap-2">
              <AppButton variant="secondary" size="sm" type="button">Upload New Avatar</AppButton>
              <p class="text-xs text-app-textMuted">PNG or JPG. Max 2MB.</p>
            </div>
          </div>
        </AppCard>

        <AppCard title="Profile Preview" description="How your profile appears in admin surfaces.">
          <div class="rounded-lg border border-app-borderSoft bg-app-muted p-4">
            <p class="text-base font-semibold text-app-text">{{ name || 'Full name' }}</p>
            <p class="text-sm text-app-textMuted">{{ jobTitle || 'No job title set' }}</p>
            <p class="mt-3 text-sm text-app-textMuted">{{ email || 'No email set' }}</p>
          </div>
        </AppCard>
      </div>
    </form>
  </div>
</template>
