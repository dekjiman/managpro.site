<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Eye, Trash2 } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()

interface TableItem {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const allItems: TableItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer', 'Contributor'][i % 4],
  status: ['active', 'pending', 'inactive'][i % 3],
}))

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 5

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return q ? allItems.filter((i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q)) : allItems
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / pageSize)))
const visibleItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Tables" description="Data table component with search, pagination, and states." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Basic Table</h2>
        <AppCard>
          <div class="border-b border-app-borderSoft p-4">
            <div class="relative max-w-xs">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
              <AppInput id="table-search" v-model="searchQuery" class="pl-9" placeholder="Search users..." aria-label="Search table" />
            </div>
          </div>
          <div v-if="filteredItems.length === 0" class="p-4">
            <AppEmptyState title="No results" description="Try a different search term." />
          </div>
          <div v-else class="overflow-x-auto">
            <table class="app-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in visibleItems" :key="item.id">
                  <td class="font-medium text-app-text">{{ item.name }}</td>
                  <td class="text-sm text-app-textSecondary">{{ item.email }}</td>
                  <td><AppBadge variant="neutral">{{ item.role }}</AppBadge></td>
                  <td><AppBadge :variant="getStatusVariant(item.status)">{{ item.status }}</AppBadge></td>
                  <td class="text-right">
                    <AppButton variant="ghost" size="sm" aria-label="View"><Eye class="h-3.5 w-3.5" /></AppButton>
                    <AppButton variant="ghost" size="sm" aria-label="Delete"><Trash2 class="h-3.5 w-3.5 text-danger-500" /></AppButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
        </AppCard>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Table States</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <AppCard title="Empty State">
            <AppEmptyState title="No data" description="This table is empty." />
          </AppCard>
          <AppCard title="Loading State">
            <div class="space-y-2 p-4">
              <div v-for="i in 4" :key="i" class="h-4 w-full animate-pulse rounded bg-secondary-200" />
            </div>
          </AppCard>
        </div>
      </section>
    </div>
  </div>
</template>
