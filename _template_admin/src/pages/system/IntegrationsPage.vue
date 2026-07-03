<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Search } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { integrations } from '@/data/mock/integrations.mock'
import { getStatusVariant } from '@/utils/status'
import { formatDateTime } from '@/utils/format'
import type { Integration } from '@/types/integration'

const route = useRoute()
const uiStore = useUiStore()

const searchQuery = ref('')
const categoryFilter = ref('')

const categories = computed(() => {
  const cats = [...new Set(integrations.map((i) => i.category))]
  return cats
})

const filteredIntegrations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return integrations.filter((i) => {
    const matchesQuery = !query || i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)
    const matchesCategory = !categoryFilter.value || i.category === categoryFilter.value
    return matchesQuery && matchesCategory
  })
})

const integrationStats = computed(() => [
  { label: 'Total Integrations', value: integrations.length },
  { label: 'Connected', value: integrations.filter((i) => i.status === 'Connected').length },
  { label: 'Disconnected', value: integrations.filter((i) => i.status === 'Disconnected').length },
  { label: 'Error', value: integrations.filter((i) => i.status === 'Error').length },
])

function toggleConnection(integration: Integration) {
  if (integration.status === 'Connected') {
    integration.status = 'Disconnected'
    uiStore.pushToast({ title: `Disconnected from ${integration.name}`, type: 'info' })
  } else {
    integration.status = 'Connected'
    integration.lastSync = new Date().toISOString()
    uiStore.pushToast({ title: `Connected to ${integration.name}`, type: 'success' })
  }
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Integrations" description="Connect your application with external services and tools." :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="grid gap-4 md:grid-cols-4">
      <AppCard v-for="stat in integrationStats" :key="stat.label">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </AppCard>
    </div>

    <AppCard title="Integration Directory" description="Search and connect external services from one consistent grid.">
      <div class="border-b border-app-borderSoft pb-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="int-search" v-model="searchQuery" class="pl-9" placeholder="Search integrations..." aria-label="Search integrations" />
          </div>
          <label class="app-form-group" for="int-category-filter">
            <span class="sr-only">Category filter</span>
            <select id="int-category-filter" v-model="categoryFilter" class="app-input">
              <option value="">All categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredIntegrations.length === 0" class="pt-4">
        <AppEmptyState title="No integrations found" description="Try different search terms or categories.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; categoryFilter = ''">Reset Filters</AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div v-for="integration in filteredIntegrations" :key="integration.id" class="rounded-lg border border-app-borderSoft bg-app-surface p-4 shadow-sm transition hover:shadow-card">
          <div class="mb-3 flex items-start justify-between">
            <Icon :icon="integration.logo" class="h-10 w-10 text-app-text" aria-hidden="true" />
            <AppBadge :variant="getStatusVariant(integration.status)">{{ integration.status }}</AppBadge>
          </div>
          <h3 class="app-card-title">{{ integration.name }}</h3>
          <p class="mt-1 text-sm text-app-textMuted">{{ integration.description }}</p>
          <div v-if="integration.lastSync" class="mt-2 text-xs text-app-textSubtle">Last sync: {{ formatDateTime(integration.lastSync) }}</div>
          <div class="mt-4 flex flex-wrap gap-2">
            <AppButton v-if="integration.status === 'Connected'" variant="secondary" size="sm" type="button" @click="toggleConnection(integration)">Disconnect</AppButton>
            <AppButton v-else size="sm" type="button" @click="toggleConnection(integration)">Connect</AppButton>
            <AppButton v-if="integration.status === 'Connected'" variant="ghost" size="sm" type="button">Manage</AppButton>
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>
