<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, ArrowUp, ChevronsUpDown, Filter, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { pages } from '@/data/mock/pages.mock'
import { formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'
import type { CmsPage } from '@/types/page'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 10

const selectedIds = ref<string[]>([])
function toggleRow(id: string) {
  const next = selectedIds.value.includes(id)
    ? selectedIds.value.filter((rid) => rid !== id)
    : [...selectedIds.value, id]
  selectedIds.value = next
}
function toggleAll() {
  if (selectedIds.value.length === visiblePages.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = visiblePages.value.map((item) => String(item.id))
  }
}

const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')
function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const statusOptions = [
  { label: 'All status', value: '' },
  { label: 'Published', value: 'Published' },
  { label: 'Draft', value: 'Draft' },
  { label: 'Archived', value: 'Archived' },
]

const filteredPages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return pages.filter((p) => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.slug.toLowerCase().includes(query) || p.author.toLowerCase().includes(query)
    const matchesStatus = !statusFilter.value || p.status === statusFilter.value
    return matchesQuery && matchesStatus
  })
})

const sortedPages = computed(() => {
  if (!sortKey.value) return filteredPages.value
  return [...filteredPages.value].sort((a, b) => {
    const left = a[sortKey.value as keyof typeof a]
    const right = b[sortKey.value as keyof typeof b]
    if (typeof left === 'number' && typeof right === 'number') {
      return sortDir.value === 'asc' ? left - right : right - left
    }
    const cmp = String(left ?? '').localeCompare(String(right ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPages.value.length / pageSize)))
const visiblePages = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedPages.value.slice(start, start + pageSize)
})

const pageStats = computed(() => [
  { label: 'Total Pages', value: pages.length },
  { label: 'Published', value: pages.filter((p) => p.status === 'Published').length },
  { label: 'Draft', value: pages.filter((p) => p.status === 'Draft').length },
  { label: 'Authors', value: new Set(pages.map((p) => p.author)).size },
])

watch([searchQuery, statusFilter], () => { currentPage.value = 1 })

function editPage(page: CmsPage) {
  router.push(`/content/pages/editor?page=${page.id}`)
}

function createPage() {
  router.push('/content/pages/editor')
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Pages" description="Manage CMS pages, edit content, and control publishing status." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="createPage">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create Page
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in pageStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="pages-search" v-model="searchQuery" class="pl-9" placeholder="Search by title, slug, or author..." aria-label="Search pages" />
          </div>
          <label class="app-form-group" for="pages-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="pages-status-filter" v-model="statusFilter" class="app-input">
              <option v-for="opt in statusOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="selectedIds.length > 0" class="flex items-center gap-3 border-b border-app-borderSoft bg-primary-50/50 px-4 py-3">
        <span class="text-sm font-medium text-primary-700">{{ selectedIds.length }} selected</span>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-danger-700 hover:bg-danger-50" type="button" @click="selectedIds = []">Delete Selected</button>
        <button class="rounded px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100" type="button" @click="selectedIds = []">Assign</button>
        <button class="ml-auto rounded px-3 py-1.5 text-sm font-medium text-app-textSecondary hover:bg-app-muted" type="button" @click="selectedIds = []">Clear</button>
      </div>

      <div v-if="filteredPages.length === 0" class="p-4">
        <AppEmptyState title="No pages found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; statusFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col" class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.length > 0 && selectedIds.length === visiblePages.length"
                  aria-label="Select all rows"
                  @change="toggleAll"
                />
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('title')">
                  Title
                  <ArrowUp v-if="sortKey === 'title' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'title' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('slug')">
                  Slug
                  <ArrowUp v-if="sortKey === 'slug' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'slug' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('author')">
                  Author
                  <ArrowUp v-if="sortKey === 'author' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'author' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('status')">
                  Status
                  <ArrowUp v-if="sortKey === 'status' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'status' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">
                <button class="inline-flex items-center gap-1 font-semibold text-inherit" type="button" @click="toggleSort('updated_at')">
                  Updated
                  <ArrowUp v-if="sortKey === 'updated_at' && sortDir === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ArrowDown v-else-if="sortKey === 'updated_at' && sortDir === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
                  <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </button>
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="page in visiblePages" :key="page.id" :class="selectedIds.includes(String(page.id)) && 'bg-primary-50'">
              <td class="w-10">
                <input
                  class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
                  type="checkbox"
                  :checked="selectedIds.includes(String(page.id))"
                  :aria-label="`Select row ${String(page.id)}`"
                  @change="toggleRow(String(page.id))"
                />
              </td>
              <td>
                <div class="min-w-[12rem]">
                  <p class="font-medium text-app-text">{{ page.title }}</p>
                  <p class="text-xs text-app-textMuted">{{ page.meta_description.slice(0, 60) }}{{ page.meta_description.length > 60 ? '...' : '' }}</p>
                </div>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">/{{ page.slug }}</span>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ page.author }}</span>
              </td>
              <td>
                <AppBadge :variant="getStatusVariant(page.status)">{{ page.status }}</AppBadge>
              </td>
              <td>
                <span class="text-sm text-app-textSecondary">{{ formatDate(page.updated_at) }}</span>
              </td>
              <td>
                <div class="flex min-w-[6rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="editPage(page)">Edit</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>
  </div>
</template>
