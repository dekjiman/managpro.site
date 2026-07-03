<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const variants = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const
const statusExamples = [
  { label: 'Active', variant: 'success' as const },
  { label: 'Pending', variant: 'warning' as const },
  { label: 'Draft', variant: 'neutral' as const },
  { label: 'Failed', variant: 'danger' as const },
  { label: 'Completed', variant: 'success' as const },
  { label: 'Inactive', variant: 'neutral' as const },
  { label: 'Processing', variant: 'info' as const },
  { label: 'New', variant: 'primary' as const },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Badges" description="Badge component variants for status, labels, and tags." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Variants</h2>
        <div class="flex flex-wrap gap-3">
          <AppBadge v-for="v in variants" :key="v" :variant="v">{{ v }}</AppBadge>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Status Examples</h2>
        <div class="flex flex-wrap gap-3">
          <AppBadge v-for="ex in statusExamples" :key="ex.label" :variant="ex.variant">{{ ex.label }}</AppBadge>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">In Context</h2>
        <div class="overflow-x-auto rounded-lg border border-app-borderSoft">
          <table class="app-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Status</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-sm text-app-text">Invoice 001</td>
                <td><AppBadge variant="success">Paid</AppBadge></td>
                <td><AppBadge variant="primary">Admin</AppBadge></td>
              </tr>
              <tr>
                <td class="text-sm text-app-text">Invoice 002</td>
                <td><AppBadge variant="warning">Pending</AppBadge></td>
                <td><AppBadge variant="neutral">User</AppBadge></td>
              </tr>
              <tr>
                <td class="text-sm text-app-text">Invoice 003</td>
                <td><AppBadge variant="danger">Overdue</AppBadge></td>
                <td><AppBadge variant="info">Editor</AppBadge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
