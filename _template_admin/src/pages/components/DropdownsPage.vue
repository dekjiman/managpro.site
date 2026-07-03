<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { MoreHorizontal, Edit, Trash2, Share2, Eye, Download } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const openDropdown = ref<string | null>(null)

interface DropdownItem {
  key: string
  label: string
  icon?: object
  variant?: string
}

const items: DropdownItem[] = [
  { key: 'view', label: 'View', icon: Eye },
  { key: 'edit', label: 'Edit', icon: Edit },
  { key: 'share', label: 'Share', icon: Share2 },
  { key: 'download', label: 'Download', icon: Download },
  { key: 'delete', label: 'Delete', icon: Trash2, variant: 'danger' },
]

function toggle(id: string) {
  openDropdown.value = openDropdown.value === id ? null : id
}

function handleAction(_label: string) {
  openDropdown.value = null
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Dropdowns" description="Dropdown menu component examples." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-6 sm:grid-cols-3">
      <AppCard title="Basic Dropdown">
        <div class="relative">
          <AppButton variant="secondary" size="sm" @click="toggle('basic')">
            Actions <MoreHorizontal class="ml-1 h-4 w-4" />
          </AppButton>
          <div v-if="openDropdown === 'basic'" class="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-app-borderSoft bg-app-card py-1 shadow-lg">
            <button v-for="item in items" :key="item.key" class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-app-muted" :class="item.variant === 'danger' ? 'text-danger-600' : 'text-app-text'" type="button" @click="handleAction(item.label)">
              <component :is="item.icon" class="h-4 w-4" aria-hidden="true" />
              {{ item.label }}
            </button>
          </div>
        </div>
      </AppCard>
      <AppCard title="Right-Aligned">
        <div class="relative flex justify-end">
          <AppButton variant="ghost" size="sm" aria-label="More options" @click="toggle('right')">
            <MoreHorizontal class="h-4 w-4" />
          </AppButton>
          <div v-if="openDropdown === 'right'" class="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-app-borderSoft bg-app-card py-1 shadow-lg">
            <button v-for="item in items.slice(0, 3)" :key="item.key" class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-app-text transition-colors hover:bg-app-muted" type="button" @click="handleAction(item.label)">
              <component :is="item.icon" class="h-4 w-4" aria-hidden="true" />
              {{ item.label }}
            </button>
          </div>
        </div>
      </AppCard>
      <AppCard title="With Divider">
        <div class="relative">
          <AppButton variant="secondary" size="sm" @click="toggle('divider')">More</AppButton>
          <div v-if="openDropdown === 'divider'" class="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-app-borderSoft bg-app-card py-1 shadow-lg">
            <button class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-app-text transition-colors hover:bg-app-muted" type="button" @click="handleAction('Edit')"><Edit class="h-4 w-4" /> Edit</button>
            <button class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-app-text transition-colors hover:bg-app-muted" type="button" @click="handleAction('View')"><Eye class="h-4 w-4" /> View</button>
            <hr class="my-1 border-app-borderSoft" />
            <button class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-danger-600 transition-colors hover:bg-app-muted" type="button" @click="handleAction('Delete')"><Trash2 class="h-4 w-4" /> Delete</button>
          </div>
        </div>
      </AppCard>
      <p v-if="openDropdown" class="col-span-full text-xs text-app-textMuted">Click toggle to close. Dropdown: {{ openDropdown }}</p>
    </div>
  </div>
</template>
