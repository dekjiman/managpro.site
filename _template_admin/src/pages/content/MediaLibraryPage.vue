<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Upload, Filter, FileImage, FileVideo, FileText, FileAudio, File, Download, Trash2 } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { media } from '@/data/mock/media.mock'
import { formatDate } from '@/utils/format'
import type { MediaItem } from '@/types/media'

const route = useRoute()

const searchQuery = ref('')
const typeFilter = ref('')
const selectedMedia = ref<MediaItem | null>(null)
const showUploadModal = ref(false)

const typeOptions = [
  { label: 'All types', value: '' },
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' },
  { label: 'Audio', value: 'audio' },
  { label: 'Document', value: 'application' },
  { label: 'Other', value: 'other' },
]

function getFileType(fileType: string): string {
  if (fileType.startsWith('image')) return 'image'
  if (fileType.startsWith('video')) return 'video'
  if (fileType.startsWith('audio')) return 'audio'
  if (fileType.startsWith('application')) return 'application'
  return 'other'
}

const filteredMedia = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return media.filter((item) => {
    const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.uploaded_by.toLowerCase().includes(query)
    const ft = getFileType(item.file_type)
    const matchesType = !typeFilter.value || ft === typeFilter.value
    return matchesQuery && matchesType
  })
})

const mediaStats = computed(() => [
  { label: 'Total Files', value: media.length },
  { label: 'Images', value: media.filter((m) => getFileType(m.file_type) === 'image').length },
  { label: 'Videos', value: media.filter((m) => getFileType(m.file_type) === 'video').length },
  { label: 'Total Size', value: formatBytes(media.reduce((sum, m) => sum + m.size, 0)) },
])

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

function formatFileSize(size: number): string {
  return formatBytes(size)
}

function typeIcon(fileType: string) {
  const ft = getFileType(fileType)
  if (ft === 'image') return FileImage
  if (ft === 'video') return FileVideo
  if (ft === 'audio') return FileAudio
  if (ft === 'application') return FileText
  return File
}

function openDetail(item: MediaItem) {
  selectedMedia.value = item
}

function openUpload() {
  showUploadModal.value = true
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Media Library" description="Upload, browse, and manage your media files." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton @click="openUpload">
          <Upload class="mr-1 h-4 w-4" aria-hidden="true" />
          Upload Media
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="stat in mediaStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <div class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_10rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="media-search" v-model="searchQuery" class="pl-9" placeholder="Search by file name or uploader..." aria-label="Search media" />
          </div>
          <label class="app-form-group" for="media-type-filter">
            <span class="sr-only">Type filter</span>
            <select id="media-type-filter" v-model="typeFilter" class="app-input">
              <option v-for="opt in typeOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredMedia.length === 0" class="p-4">
        <AppEmptyState title="No media found" description="Try different search terms or filters.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; typeFilter = ''">
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <button
          v-for="item in filteredMedia"
          :key="item.id"
          type="button"
          class="group relative flex flex-col items-center gap-2 rounded-lg border border-app-borderSoft p-4 text-center transition hover:border-primary-300 hover:shadow-sm"
          @click="openDetail(item)"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-lg bg-app-muted text-app-textMuted">
            <component :is="typeIcon(item.file_type)" class="h-10 w-10" :aria-label="item.file_type" />
          </div>
          <p class="w-full truncate text-sm font-medium text-app-text">{{ item.name }}</p>
          <p class="text-xs text-app-textMuted">{{ formatFileSize(item.size) }}</p>
        </button>
      </div>
    </div>

    <AppModal :open="selectedMedia !== null" title="File Details" @close="selectedMedia = null">
      <div v-if="selectedMedia" class="grid gap-4">
        <div class="flex items-center justify-center rounded-lg bg-app-muted p-8">
          <component :is="typeIcon(selectedMedia.file_type)" class="h-16 w-16 text-app-textMuted" :aria-label="selectedMedia.file_type" />
        </div>
        <div class="grid gap-2">
          <div><p class="app-label-text">Name</p><p class="text-sm text-app-text">{{ selectedMedia.name }}</p></div>
          <div><p class="app-label-text">Type</p><p class="text-sm text-app-textSecondary">{{ selectedMedia.file_type }}</p></div>
          <div><p class="app-label-text">Size</p><p class="text-sm text-app-textSecondary">{{ formatFileSize(selectedMedia.size) }}</p></div>
          <div v-if="selectedMedia.dimensions !== 'N/A'"><p class="app-label-text">Dimensions</p><p class="text-sm text-app-textSecondary">{{ selectedMedia.dimensions }}</p></div>
          <div><p class="app-label-text">Uploaded by</p><p class="text-sm text-app-textSecondary">{{ selectedMedia.uploaded_by }}</p></div>
          <div><p class="app-label-text">Date</p><p class="text-sm text-app-textSecondary">{{ formatDate(selectedMedia.created_at) }}</p></div>
          <div><p class="app-label-text">Alt Text</p><p class="text-sm text-app-textSecondary">{{ selectedMedia.alt_text }}</p></div>
        </div>
        <div class="flex flex-wrap gap-2">
          <AppButton variant="secondary" size="sm">
            <Download class="mr-1 h-4 w-4" aria-hidden="true" />
            Download
          </AppButton>
          <AppButton variant="danger" size="sm">
            <Trash2 class="mr-1 h-4 w-4" aria-hidden="true" />
            Delete
          </AppButton>
        </div>
      </div>
    </AppModal>

    <AppModal :open="showUploadModal" title="Upload Media" @close="showUploadModal = false">
      <div class="grid gap-4">
        <div class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-app-borderSoft p-12 text-center">
          <Upload class="mb-2 h-8 w-8 text-app-textMuted" aria-hidden="true" />
          <p class="text-sm text-app-textSecondary">Drag & drop files here or click to browse</p>
          <p class="mt-1 text-xs text-app-textMuted">Max file size: 100 MB</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <AppButton>Upload</AppButton>
          <AppButton variant="secondary" type="button" @click="showUploadModal = false">Cancel</AppButton>
        </div>
      </div>
    </AppModal>
  </div>
</template>
