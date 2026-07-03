<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Plus, Save, Trash2, LoaderCircle, ChevronRight } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const variants = ['primary', 'secondary', 'danger', 'ghost'] as const
const sizes = ['sm', 'md'] as const
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Buttons" description="Button component variants, sizes, and states." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Variants</h2>
        <div class="flex flex-wrap gap-3">
          <AppButton v-for="v in variants" :key="v" :variant="v">{{ v }}</AppButton>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Sizes</h2>
        <div class="flex flex-wrap items-end gap-3">
          <AppButton v-for="s in sizes" :key="s" :size="s" variant="primary">Size {{ s.toUpperCase() }}</AppButton>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">With Icons</h2>
        <div class="flex flex-wrap gap-3">
          <AppButton variant="primary"><Plus class="mr-1 h-4 w-4" /> Create</AppButton>
          <AppButton variant="secondary"><Save class="mr-1 h-4 w-4" /> Save</AppButton>
          <AppButton variant="danger"><Trash2 class="mr-1 h-4 w-4" /> Delete</AppButton>
          <AppButton variant="ghost"><ChevronRight class="mr-1 h-4 w-4" /> More</AppButton>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Loading & Disabled</h2>
        <div class="flex flex-wrap gap-3">
          <AppButton variant="primary" :loading="true" disabled>Saving</AppButton>
          <AppButton variant="secondary" disabled>Disabled</AppButton>
          <AppButton variant="danger" :loading="true" disabled>Deleting</AppButton>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Icon Only</h2>
        <div class="flex flex-wrap gap-3">
          <AppButton variant="ghost" size="sm" aria-label="Add item"><Plus class="h-4 w-4" /></AppButton>
          <AppButton variant="ghost" size="sm" aria-label="Delete item"><Trash2 class="h-4 w-4" /></AppButton>
          <AppButton variant="ghost" size="sm" aria-label="Loading" :loading="true"><LoaderCircle class="h-4 w-4" /></AppButton>
        </div>
      </section>
    </div>
  </div>
</template>
