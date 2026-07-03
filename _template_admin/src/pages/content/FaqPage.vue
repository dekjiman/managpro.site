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
import { faqItems } from '@/data/mock/faq.mock'
import { formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()

const searchQuery = ref('')
const categoryFilter = ref('')
const expandedId = ref<string | null>(null)
const showAddModal = ref(false)
const newFaqQuestion = ref('')
const newFaqAnswer = ref('')

const categories = computed(() => [...new Set(faqItems.map((f) => f.category))])

const categoryOptions = computed(() => [
  { label: 'All categories', value: '' },
  ...categories.value.map((cat) => ({ label: cat, value: cat })),
])

const filteredFaq = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return faqItems.filter((f) => {
    const matchesQuery = !query || f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
    const matchesCategory = !categoryFilter.value || f.category === categoryFilter.value
    return matchesQuery && matchesCategory
  })
})

const faqStats = computed(() => [
  { label: 'Total FAQs', value: faqItems.length },
  { label: 'Categories', value: categories.value.length },
  { label: 'Published', value: faqItems.filter((f) => f.status === 'Published').length },
  { label: 'Draft', value: faqItems.filter((f) => f.status === 'Draft').length },
])

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="FAQ" description="Manage frequently asked questions organized by category." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="showAddModal = true">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add FAQ
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in faqStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="faq-search" v-model="searchQuery" class="pl-9" placeholder="Search questions and answers..." aria-label="Search FAQ" />
          </div>
          <label class="app-form-group" for="faq-category-filter">
            <span class="sr-only">Category filter</span>
            <select id="faq-category-filter" v-model="categoryFilter" class="app-input">
              <option v-for="opt in categoryOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredFaq.length === 0" class="p-4">
        <AppEmptyState title="No FAQ items found" description="Try different search terms or filters.">
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
          v-for="item in filteredFaq"
          :key="item.id"
          type="button"
          class="flex w-full items-start gap-3 p-4 text-left transition hover:bg-app-muted"
          @click="toggleExpand(item.id)"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="font-medium text-app-text">{{ item.question }}</p>
              <AppBadge :variant="getStatusVariant(item.status)">{{ item.status }}</AppBadge>
            </div>
            <div class="mt-1 flex items-center gap-3 text-xs text-app-textMuted">
              <span>{{ item.category }}</span>
              <span>{{ formatDate(item.created_at) }}</span>
            </div>
            <div v-if="expandedId === item.id" class="mt-3 rounded-lg bg-app-muted p-3">
              <p class="text-sm leading-6 text-app-textSecondary">{{ item.answer }}</p>
            </div>
          </div>
          <ChevronDown
            class="mt-1 h-4 w-4 shrink-0 text-app-textMuted transition"
            :class="expandedId === item.id ? 'rotate-180' : ''"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>

    <AppModal :open="showAddModal" title="Add FAQ" @close="showAddModal = false">
      <form class="grid gap-4" @submit.prevent="showAddModal = false">
        <AppInput id="add-faq-question" v-model="newFaqQuestion" label="Question" placeholder="Enter the question" required />
        <label class="app-form-group" for="add-faq-answer">
          <span class="app-label">Answer</span>
          <textarea id="add-faq-answer" v-model="newFaqAnswer" class="app-textarea min-h-[6rem]" placeholder="Enter the answer" />
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create FAQ</AppButton>
          <AppButton variant="secondary" type="button" @click="showAddModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
