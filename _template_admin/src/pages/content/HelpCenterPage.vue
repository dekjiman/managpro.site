<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, Filter, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { helpArticles } from '@/data/mock/help-center.mock'
import { formatDate } from '@/utils/format'

const route = useRoute()

const searchQuery = ref('')
const categoryFilter = ref('')
const showAddModal = ref(false)
const newArticleTitle = ref('')
const newArticleSummary = ref('')
const newArticleContent = ref('')
const articleDetail = ref<string | null>(null)

const categories = computed(() => [...new Set(helpArticles.map((a) => a.category))])

const categoryOptions = computed(() => [
  { label: 'All categories', value: '' },
  ...categories.value.map((cat) => ({ label: cat, value: cat })),
])

const filteredArticles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return helpArticles.filter((a) => {
    const matchesQuery = !query || a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query)
    const matchesCategory = !categoryFilter.value || a.category === categoryFilter.value
    return matchesQuery && matchesCategory
  })
})

const selectedArticle = computed(() => helpArticles.find((a) => a.id === articleDetail.value) || null)

const articleStats = computed(() => [
  { label: 'Total Articles', value: helpArticles.length },
  { label: 'Categories', value: categories.value.length },
  { label: 'Authors', value: new Set(helpArticles.map((a) => a.author)).size },
])
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Help Center" description="Create and manage help articles and documentation." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="showAddModal = true">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Article
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in articleStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
        <div class="border-b border-app-borderSoft p-4">
          <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
            <div class="relative">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
              <AppInput id="help-search" v-model="searchQuery" class="pl-9" placeholder="Search articles..." aria-label="Search help articles" />
            </div>
            <label class="app-form-group" for="help-category-filter">
              <span class="sr-only">Category filter</span>
              <select id="help-category-filter" v-model="categoryFilter" class="app-input">
                <option v-for="opt in categoryOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
          </div>
        </div>

        <div v-if="filteredArticles.length === 0" class="p-4">
          <AppEmptyState title="No articles found" description="Try different search terms or filters.">
            <template #action>
              <AppButton variant="secondary" size="sm" @click="searchQuery = ''; categoryFilter = ''">
                <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
                Reset Filters
              </AppButton>
            </template>
          </AppEmptyState>
        </div>

        <div v-else class="divide-y divide-app-borderSoft">
          <button
            v-for="article in filteredArticles"
            :key="article.id"
            type="button"
            class="flex w-full items-start gap-3 p-4 text-left transition hover:bg-app-muted"
            @click="articleDetail = article.id"
          >
            <div class="flex-1">
              <p class="font-medium text-app-text">{{ article.title }}</p>
              <p class="mt-1 text-sm text-app-textSecondary">{{ article.summary }}</p>
              <div class="mt-2 flex items-center gap-3 text-xs text-app-textMuted">
                <span>{{ article.category }}</span>
                <span>{{ article.author }}</span>
                <span>{{ formatDate(article.created_at) }}</span>
              </div>
            </div>
            <ChevronDown class="mt-1 h-4 w-4 shrink-0 -rotate-90 text-app-textMuted" aria-hidden="true" />
          </button>
        </div>
      </section>

      <div v-if="selectedArticle" class="rounded-card border border-app-borderSoft bg-app-card p-6 shadow-card">
        <div class="mb-4">
          <AppBadge>{{ selectedArticle.category }}</AppBadge>
        </div>
        <h3 class="app-section-title">{{ selectedArticle.title }}</h3>
        <p class="mt-2 text-sm leading-7 text-app-textSecondary">{{ selectedArticle.content }}</p>
        <div class="mt-4 flex items-center gap-3 border-t border-app-borderSoft pt-4 text-xs text-app-textMuted">
          <span>By {{ selectedArticle.author }}</span>
          <span>{{ formatDate(selectedArticle.created_at) }}</span>
        </div>
      </div>

      <div v-else class="flex items-center justify-center rounded-card border border-app-borderSoft bg-app-card p-8 shadow-card">
        <p class="text-sm text-app-textMuted">Select an article to read</p>
      </div>
    </div>

    <AppModal :open="showAddModal" title="Add Article" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="showAddModal = false">
        <AppInput id="add-article-title" v-model="newArticleTitle" label="Title" placeholder="Article title" required />
        <AppInput id="add-article-summary" v-model="newArticleSummary" label="Summary" placeholder="Brief summary" />
        <label class="app-form-group" for="add-article-content">
          <span class="app-label">Content</span>
          <textarea id="add-article-content" v-model="newArticleContent" class="app-textarea min-h-[8rem]" placeholder="Write the article content..." />
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Article</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
