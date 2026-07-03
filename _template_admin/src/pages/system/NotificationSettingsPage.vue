<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppSwitch from '@/components/forms/AppSwitch.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { notificationPreferences } from '@/data/mock/settings.mock'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const preferences = ref(notificationPreferences.map((p) => ({ ...p })))
const enabledCount = computed(() => preferences.value.filter((p) => p.enabled).length)
const disabledCount = computed(() => preferences.value.length - enabledCount.value)

function savePreferences() {
  uiStore.pushToast({ title: 'Notification preferences saved', type: 'success' })
}

function resetPreferences() {
  preferences.value = notificationPreferences.map((p) => ({ ...p }))
  uiStore.pushToast({ title: 'Preferences reset to defaults', type: 'info' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Notification Settings" description="Choose which notifications you receive and how they are delivered." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]" @submit.prevent="savePreferences">
      <div class="grid gap-4">
        <AppCard title="Notification Preferences" description="Control your email, push, and in-app notification settings.">
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="pref in preferences" :key="pref.id" class="rounded-lg border border-app-borderSoft bg-app-muted p-3">
              <AppSwitch v-model="pref.enabled" :label="pref.label" />
            </div>
            <p v-if="preferences.length === 0" class="text-sm text-app-textMuted">No notification preferences available.</p>
          </div>
        </AppCard>

        <div class="flex flex-wrap gap-2 rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <AppButton type="submit">Save Preferences</AppButton>
          <AppButton variant="secondary" type="button" @click="resetPreferences">Reset to Default</AppButton>
        </div>
      </div>

      <div class="grid content-start gap-4">
        <AppCard title="Preference Summary" description="Current enabled channels.">
          <div class="grid gap-3">
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-textMuted">Enabled</span>
              <span class="text-sm font-semibold text-app-text">{{ enabledCount }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-sm text-app-textMuted">Disabled</span>
              <span class="text-sm font-semibold text-app-text">{{ disabledCount }}</span>
            </div>
          </div>
        </AppCard>

        <AppCard title="Delivery Note" description="These settings are sample-only.">
          <p class="text-sm text-app-textMuted">
            Connect these preferences to notification APIs when moving beyond the template layer.
          </p>
        </AppCard>
      </div>
    </form>
  </div>
</template>
