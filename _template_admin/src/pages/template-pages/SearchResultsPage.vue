<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { formatDate } from '@/utils/format'

interface SearchResult {
  id: number
  title: string
  description: string
  type: 'Page' | 'User' | 'Invoice' | 'Report' | 'Settings'
  url: string
  updatedAt: string
}

const allResults: SearchResult[] = Array.from({ length: 18 }, (_, i) => {
  const types = ['Page', 'User', 'Invoice', 'Report', 'Settings'] as const
  const titles = [
    'Dashboard Overview', 'User Management', 'Invoice Settings', 'Sales Report',
    'Profile Settings', 'Product Catalog', 'Order History', 'API Configuration',
    'Help Center', 'Media Library', 'Audit Logs', 'Email Templates',
    'Notification Preferences', 'Security Settings', 'Billing History', 'Integrations',
    'Webhook Endpoints', 'FAQ Management',
  ]
  return {
    id: i + 1,
    title: titles[i],
    description: `Sample description for "${titles[i]}" showing how search results appear in the template.`,
    type: types[i % types.length],
    url: '#',
    updatedAt: `2026-06-${String(14 - (i % 12)).padStart(2, '0')}`,
  }
})

const route = useRoute()

const searchQuery = ref('')
const activeTab = ref('all')
const currentPage = ref(1)
const pageSize = 6

const tabs = [
  { key: 'all', label: 'All Results' },
  { key: 'Page', label: 'Pages' },
  { key: 'User', label: 'Users' },
  { key: 'Invoice', label: 'Invoices' },
  { key: 'Report', label: 'Reports' },
  { key: 'Settings', label: 'Settings' },
]

const filteredResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return allResults.filter((r) => {
    const matchesQuery = !query || r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
    const matchesType = activeTab.value === 'all' || r.type === activeTab.value
    return matchesQuery && matchesType
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredResults.value.length / pageSize)))
const visibleResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredResults.value.slice(start, start + pageSize)
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Search Results" :description="`${filteredResults.length} results found`" :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="mx-auto max-w-3xl">
      <div class="relative mb-6">
        <Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
        <AppInput id="search-results-q" v-model="searchQuery" class="h-12 pl-12 text-base" placeholder="Search pages, users, invoices..." aria-label="Search" />
      </div>

      <div class="mb-4 flex flex-wrap gap-1 border-b border-app-borderSoft">
        <button v-for="tab in tabs" :key="tab.key" class="px-4 py-2 text-sm font-medium transition-colors" :class="activeTab === tab.key ? 'border-b-2 border-primary-600 text-primary-700' : 'text-app-textMuted hover:text-app-text'" type="button" @click="activeTab = tab.key; currentPage = 1">
          {{ tab.label }}
        </button>
      </div>

      <AppCard>
        <div v-if="filteredResults.length === 0" class="py-8">
          <AppEmptyState title="No results found" description="Try different keywords or check your spelling.">
            <template #action>
              <AppButton variant="secondary" size="sm" @click="searchQuery = ''; activeTab = 'all'">Clear Search</AppButton>
            </template>
          </AppEmptyState>
        </div>

        <div v-else class="grid gap-1">
          <div v-for="result in visibleResults" :key="result.id" class="rounded-lg p-3 transition hover:bg-app-muted">
            <div class="flex items-start justify-between">
              <div>
                <a :href="result.url" class="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">{{ result.title }}</a>
                <p class="mt-0.5 text-xs text-app-textMuted">{{ result.description }}</p>
              </div>
              <AppBadge variant="neutral">{{ result.type }}</AppBadge>
            </div>
            <p class="mt-1 text-xs text-app-textSubtle">Updated {{ formatDate(result.updatedAt) }}</p>
          </div>
        </div>

        <AppTablePagination v-if="totalPages > 1" :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
      </AppCard>
    </div>
  </div>
</template>
