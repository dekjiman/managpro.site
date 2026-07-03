<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Upload } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Empty States" description="Empty state component variations." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-6 sm:grid-cols-2">
      <AppCard>
        <AppEmptyState title="No data yet" description="Your inbox is empty. New items will appear here.">
          <template #action>
            <AppButton variant="secondary" size="sm">Create Sample</AppButton>
          </template>
        </AppEmptyState>
      </AppCard>
      <AppCard>
        <AppEmptyState title="No results found" description="Try adjusting your search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm">Reset Filters</AppButton>
          </template>
        </AppEmptyState>
      </AppCard>
      <AppCard>
        <AppEmptyState title="No notifications" description="You are all caught up." />
      </AppCard>
      <AppCard>
        <AppEmptyState title="No files" description="Upload your first file to get started.">
          <template #action>
            <AppButton variant="secondary" size="sm"><Upload class="mr-1 h-4 w-4" />Upload File</AppButton>
          </template>
        </AppEmptyState>
      </AppCard>
    </div>
  </div>
</template>
