<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FileQuestion, Inbox, SearchX, Ban } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'

const states = [
  {
    icon: Inbox,
    title: 'No data yet',
    description: 'Your inbox is empty. New items will appear here once available.',
    action: 'Create Sample',
  },
  {
    icon: SearchX,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters to find what you are looking for.',
    action: 'Reset Filters',
  },
  {
    icon: Ban,
    title: 'No notifications',
    description: 'You are all caught up. There are no new notifications at this time.',
    action: 'Refresh',
  },
  {
    icon: FileQuestion,
    title: 'No files uploaded',
    description: 'Upload your first file to get started. Supported formats include images, documents, and more.',
    action: 'Upload File',
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
      <Inbox class="h-8 w-8" aria-hidden="true" />
    </div>
    <h1 class="mt-6 text-3xl font-bold text-app-text">Empty State Examples</h1>
    <p class="mx-auto mt-3 max-w-lg text-app-textMuted">
      This page demonstrates various empty state components used throughout the template to provide clear feedback when no data is available.
    </p>

    <div class="mt-10 grid w-full max-w-4xl gap-6 sm:grid-cols-2">
      <div v-for="(state, index) in states" :key="index" class="rounded-card border border-app-borderSoft bg-app-card p-6 shadow-card">
        <AppEmptyState :title="state.title" :description="state.description">
          <template #action>
            <AppButton variant="secondary" size="sm">{{ state.action }}</AppButton>
          </template>
        </AppEmptyState>
      </div>
    </div>

    <div class="mt-10">
      <RouterLink class="inline-flex" to="/dashboard">
        <AppButton>Back to Dashboard</AppButton>
      </RouterLink>
    </div>
  </div>
</template>
