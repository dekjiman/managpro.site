<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const themeMode = ref('light')
const primaryColor = ref('blue')
const sidebarMode = ref('expanded')
const layoutDensity = ref('comfortable')
const borderRadius = ref('medium')

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
]

const colorOptions = [
  { label: 'Blue (Default)', value: 'blue' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Green', value: 'green' },
  { label: 'Red', value: 'red' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
]

const sidebarOptions = [
  { label: 'Expanded', value: 'expanded' },
  { label: 'Collapsed', value: 'collapsed' },
  { label: 'Hover Expand', value: 'hover-expand' },
]

const densityOptions = [
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Compact', value: 'compact' },
  { label: 'Spacious', value: 'spacious' },
]

const radiusOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
]

function saveAppearance() {
  uiStore.pushToast({ title: 'Appearance settings saved successfully', type: 'success' })
}

const previewColors = [
  { name: 'Primary', class: 'bg-primary-600' },
  { name: 'Success', class: 'bg-success-600' },
  { name: 'Warning', class: 'bg-warning-600' },
  { name: 'Danger', class: 'bg-danger-600' },
  { name: 'Info', class: 'bg-info-600' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Appearance" description="Customize the look and feel of your admin interface." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]" @submit.prevent="saveAppearance">
      <div class="grid gap-4">
        <AppCard title="Theme" description="Choose your preferred color scheme.">
          <AppSelect id="app-theme" v-model="themeMode" label="Theme mode" :options="themeOptions" />
        </AppCard>

        <AppCard title="Primary Color" description="Select the primary accent color for the interface.">
          <AppSelect id="app-color" v-model="primaryColor" label="Primary color" :options="colorOptions" />
          <div class="mt-3 flex flex-wrap gap-2">
            <span v-for="c in previewColors" :key="c.name" class="flex h-8 w-8 items-center justify-center rounded-full" :class="c.class">
              <span class="text-[8px] font-bold text-white">{{ c.name.charAt(0) }}</span>
            </span>
          </div>
        </AppCard>

        <AppCard title="Sidebar" description="Configure the sidebar navigation behavior.">
          <AppSelect id="app-sidebar" v-model="sidebarMode" label="Sidebar mode" :options="sidebarOptions" />
        </AppCard>

        <AppCard title="Layout Density" description="Control the spacing and density of page elements.">
          <AppSelect id="app-density" v-model="layoutDensity" label="Layout density" :options="densityOptions" />
          <AppSelect id="app-radius" v-model="borderRadius" label="Border radius" :options="radiusOptions" class="mt-3" />
        </AppCard>
      </div>

      <div class="grid gap-4">
        <AppCard title="Preview" description="See how your changes will look.">
          <div class="rounded-card border border-app-borderSoft bg-app-surface p-4 shadow-card">
            <div class="mb-3 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">A</span>
              <div>
                <p class="text-sm font-medium text-app-text">Acme Admin</p>
                <p class="text-xs text-app-textMuted">Dashboard preview</p>
              </div>
            </div>
            <div class="grid gap-2">
              <div class="h-2 w-full rounded bg-app-borderSoft" />
              <div class="h-2 w-3/4 rounded bg-app-borderSoft" />
              <div class="h-2 w-1/2 rounded bg-app-borderSoft" />
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2">
              <div class="rounded-md bg-primary-600 px-3 py-2 text-center text-xs font-medium text-white">Primary</div>
              <div class="rounded-md border border-app-border px-3 py-2 text-center text-xs font-medium text-app-text">Secondary</div>
              <div class="rounded-md bg-success-600 px-3 py-2 text-center text-xs font-medium text-white">Success</div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <AppBadge variant="success">Active</AppBadge>
              <AppBadge variant="warning">Pending</AppBadge>
              <AppBadge variant="danger">Failed</AppBadge>
              <AppBadge variant="info">Info</AppBadge>
            </div>
          </div>
        </AppCard>

        <AppCard title="Appearance Summary" description="Current configuration.">
          <div class="grid gap-2">
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-xs text-app-textMuted">Theme</span>
              <span class="text-xs font-medium text-app-text capitalize">{{ themeMode }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-xs text-app-textMuted">Color</span>
              <span class="text-xs font-medium text-app-text capitalize">{{ primaryColor }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-xs text-app-textMuted">Sidebar</span>
              <span class="text-xs font-medium text-app-text capitalize">{{ sidebarMode }}</span>
            </div>
            <div class="flex items-center justify-between rounded-lg border border-app-borderSoft px-3 py-2">
              <span class="text-xs text-app-textMuted">Density</span>
              <span class="text-xs font-medium text-app-text capitalize">{{ layoutDensity }}</span>
            </div>
          </div>
        </AppCard>

        <div class="flex flex-wrap gap-2 rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
          <AppButton type="submit">Save Appearance</AppButton>
          <AppButton variant="secondary" type="button" @click="router.back()">Cancel</AppButton>
        </div>
      </div>
    </form>
  </div>
</template>
