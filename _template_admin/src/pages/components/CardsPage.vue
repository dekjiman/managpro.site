<script setup lang="ts">
import { useRoute } from 'vue-router'
import { MoreHorizontal, Edit } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const sampleCards = [
  { title: 'Revenue', value: '$48,250', change: '+12.5%', footer: 'vs last month' },
  { title: 'Orders', value: '1,842', change: '+8.3%', footer: 'vs last month' },
  { title: 'Customers', value: '5,621', change: '-2.1%', footer: 'vs last month' },
  { title: 'Pending', value: '96', change: 'Needs review', footer: 'Requires action' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Cards" description="Card component with various content patterns." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Stat Cards</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="card in sampleCards" :key="card.title" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
            <p class="app-label-text">{{ card.title }}</p>
            <p class="mt-2 text-2xl font-bold text-app-text">{{ card.value }}</p>
            <p class="mt-1 text-sm" :class="card.change.startsWith('+') ? 'text-success-600' : card.change.startsWith('-') ? 'text-danger-600' : 'text-app-textMuted'">{{ card.change }}</p>
            <p class="mt-0.5 text-xs text-app-textSubtle">{{ card.footer }}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Content Card</h2>
        <AppCard title="Sample Content Card" subtitle="With subtitle and actions">
          <template #actions>
            <div class="flex gap-1">
              <AppButton variant="ghost" size="sm" aria-label="Edit"><Edit class="h-3.5 w-3.5" /></AppButton>
              <AppButton variant="ghost" size="sm" aria-label="More"><MoreHorizontal class="h-3.5 w-3.5" /></AppButton>
            </div>
          </template>
          <div class="p-4">
            <p class="text-sm text-app-textSecondary">This is the main card body area. Cards can contain any content — text, tables, forms, charts, or custom components.</p>
          </div>
        </AppCard>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Bordered & Shadow</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-card border border-app-borderSoft bg-app-card p-4">
            <p class="text-sm font-medium text-app-text">Default</p>
            <p class="mt-1 text-xs text-app-textMuted">Border only</p>
          </div>
          <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
            <p class="text-sm font-medium text-app-text">Shadow</p>
            <p class="mt-1 text-xs text-app-textMuted">With shadow</p>
          </div>
          <div class="rounded-card bg-primary-600 p-4 text-white">
            <p class="text-sm font-medium">Highlight</p>
            <p class="mt-1 text-xs opacity-80">Solid background</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
