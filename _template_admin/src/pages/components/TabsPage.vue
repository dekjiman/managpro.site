<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Settings, User, Bell } from '@lucide/vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const activeBasicTab = ref('details')
const activeIconTab = ref('profile')

const basicTabs = [
  { key: 'details', label: 'Details' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'billing', label: 'Billing' },
]

const iconTabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'notifications', label: 'Notifications', icon: Bell },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Tabs" description="Tab component patterns." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Basic Tabs</h2>
        <div class="rounded-lg border border-app-borderSoft">
          <div class="flex border-b border-app-borderSoft">
            <button v-for="tab in basicTabs" :key="tab.key" class="px-4 py-2.5 text-sm font-medium transition-colors" :class="activeBasicTab === tab.key ? 'border-b-2 border-primary-600 text-primary-700' : 'text-app-textMuted hover:text-app-text'" type="button" @click="activeBasicTab = tab.key">
              {{ tab.label }}
            </button>
          </div>
          <div class="p-4">
            <p class="text-sm text-app-textSecondary">Content for <strong>{{ activeBasicTab }}</strong> tab.</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Tabs with Icons</h2>
        <div class="rounded-lg border border-app-borderSoft">
          <div class="flex border-b border-app-borderSoft">
            <button v-for="tab in iconTabs" :key="tab.key" class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors" :class="activeIconTab === tab.key ? 'border-b-2 border-primary-600 text-primary-700' : 'text-app-textMuted hover:text-app-text'" type="button" @click="activeIconTab = tab.key">
              <component :is="tab.icon" class="h-4 w-4" aria-hidden="true" />
              {{ tab.label }}
            </button>
          </div>
          <div class="p-4">
            <p class="text-sm text-app-textSecondary">Content for <strong>{{ activeIconTab }}</strong> tab.</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Pills Style</h2>
        <div class="flex flex-wrap gap-2">
          <button v-for="tab in basicTabs" :key="tab.key" class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors" :class="activeBasicTab === tab.key ? 'bg-primary-100 text-primary-700' : 'bg-app-muted text-app-textMuted hover:bg-secondary-200'" type="button" @click="activeBasicTab = tab.key">
            {{ tab.label }}
          </button>
        </div>
        <div class="mt-3 text-sm text-app-textSecondary">Selected: {{ activeBasicTab }}</div>
      </section>
    </div>
  </div>
</template>
