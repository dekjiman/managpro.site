<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Component } from 'vue'
import {
  Archive,
  FileArchive,
  FileImage,
  FileText,
  Folder,
  HardDrive,
  Image,
  Presentation,
  Search,
  Share2,
  Star,
  Table2,
  Upload,
} from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { fileFolders, files } from '@/data/mock/files.mock'
import { formatDate, formatNumber } from '@/utils/format'
import type { FileManagerItem, FileType } from '@/types/file-manager'
import type { StatusVariant } from '@/types/common'

type FileView = 'all' | 'recent' | 'shared' | 'favorites'

const route = useRoute()

const searchQuery = ref('')
const typeFilter = ref<FileType | ''>('')
const activeView = ref<FileView>('all')
const selectedFileId = ref<string | null>(null)
const showUploadModal = ref(false)
const uploadName = ref('')
const uploadFolder = ref('Product Assets')
const uploadType = ref<FileType>('document')

const storageLimit = 8000000000

const viewTabs: { label: string; value: FileView }[] = [
  { label: 'All Files', value: 'all' },
  { label: 'Recent', value: 'recent' },
  { label: 'Shared', value: 'shared' },
  { label: 'Favorites', value: 'favorites' },
]

const typeOptions: { label: string; value: FileType | '' }[] = [
  { label: 'All types', value: '' },
  { label: 'Documents', value: 'document' },
  { label: 'Spreadsheets', value: 'spreadsheet' },
  { label: 'Presentations', value: 'presentation' },
  { label: 'Images', value: 'image' },
  { label: 'PDF', value: 'pdf' },
  { label: 'Archives', value: 'archive' },
]

const usedStorage = computed(() => files.reduce((total, file) => total + file.size, 0))
const storagePercent = computed(() => Math.min(100, Math.round((usedStorage.value / storageLimit) * 100)))

const selectedFile = computed(() => {
  if (!selectedFileId.value) return null
  return files.find((file) => file.id === selectedFileId.value) || null
})

const filteredFiles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const recentCutoff = new Date('2026-06-09T00:00:00')

  return files.filter((file) => {
    const matchesQuery =
      !query ||
      file.name.toLowerCase().includes(query) ||
      file.owner.toLowerCase().includes(query) ||
      file.folder.toLowerCase().includes(query)

    const matchesType = !typeFilter.value || file.type === typeFilter.value
    const matchesView =
      activeView.value === 'all' ||
      (activeView.value === 'recent' && new Date(`${file.modified_at}T00:00:00`) >= recentCutoff) ||
      (activeView.value === 'shared' && file.is_shared) ||
      (activeView.value === 'favorites' && file.is_favorite)

    return matchesQuery && matchesType && matchesView
  })
})

const recentFiles = computed(() => [...files].sort((a, b) => b.modified_at.localeCompare(a.modified_at)).slice(0, 5))
const sharedCount = computed(() => files.filter((file) => file.is_shared).length)
const favoriteCount = computed(() => files.filter((file) => file.is_favorite).length)

function formatBytes(value: number) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} GB`
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} MB`
  if (value >= 1000) return `${(value / 1000).toFixed(1)} KB`
  return `${formatNumber(value)} B`
}

function typeLabel(type: FileType) {
  switch (type) {
    case 'document':
      return 'Document'
    case 'spreadsheet':
      return 'Spreadsheet'
    case 'presentation':
      return 'Presentation'
    case 'image':
      return 'Image'
    case 'pdf':
      return 'PDF'
    case 'archive':
      return 'Archive'
  }
}

function typeIcon(type: FileType): Component {
  switch (type) {
    case 'document':
      return FileText
    case 'spreadsheet':
      return Table2
    case 'presentation':
      return Presentation
    case 'image':
      return FileImage
    case 'pdf':
      return FileText
    case 'archive':
      return FileArchive
  }
}

function typeTone(type: FileType) {
  switch (type) {
    case 'document':
      return 'bg-primary-50 text-primary-700'
    case 'spreadsheet':
      return 'bg-success-50 text-success-700'
    case 'presentation':
      return 'bg-warning-50 text-warning-800'
    case 'image':
      return 'bg-info-50 text-info-700'
    case 'pdf':
      return 'bg-danger-50 text-danger-700'
    case 'archive':
      return 'bg-secondary-100 text-secondary-700'
  }
}

function typeVariant(type: FileType): StatusVariant {
  switch (type) {
    case 'spreadsheet':
      return 'success'
    case 'presentation':
      return 'warning'
    case 'image':
      return 'info'
    case 'pdf':
      return 'danger'
    default:
      return 'neutral'
  }
}

function openUploadModal() {
  uploadName.value = ''
  uploadFolder.value = 'Product Assets'
  uploadType.value = 'document'
  showUploadModal.value = true
}

function uploadFile() {
  if (!uploadName.value.trim()) return

  files.unshift({
    id: `file-${Date.now()}`,
    name: uploadName.value.trim(),
    type: uploadType.value,
    size: 1800000,
    owner: 'Mika Chen',
    folder: uploadFolder.value,
    modified_at: '2026-06-14',
    is_shared: false,
    is_favorite: false,
  })

  showUploadModal.value = false
}

function toggleFavorite(file: FileManagerItem) {
  file.is_favorite = !file.is_favorite
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="File Manager"
      description="Browse folders, review storage usage, and manage recent, shared, and favorite files."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton @click="openUploadModal">
          <Upload class="mr-1 h-4 w-4" aria-hidden="true" />
          Upload File
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="app-label-text">Storage Usage</p>
            <p class="mt-2 text-2xl font-bold text-app-text">{{ formatBytes(usedStorage) }}</p>
            <p class="mt-1 text-sm text-app-textMuted">of {{ formatBytes(storageLimit) }} used</p>
          </div>
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <HardDrive class="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <div class="mt-4 h-2 overflow-hidden rounded-full bg-secondary-100">
          <div class="h-full rounded-full bg-primary-600" :style="{ width: `${storagePercent}%` }" />
        </div>
        <div class="mt-4 grid gap-3 sm:grid-cols-3">
          <div class="rounded-lg bg-app-muted p-3">
            <p class="app-label-text">Files</p>
            <p class="mt-1 text-lg font-bold text-app-text">{{ files.length }}</p>
          </div>
          <div class="rounded-lg bg-app-muted p-3">
            <p class="app-label-text">Shared</p>
            <p class="mt-1 text-lg font-bold text-app-text">{{ sharedCount }}</p>
          </div>
          <div class="rounded-lg bg-app-muted p-3">
            <p class="app-label-text">Favorites</p>
            <p class="mt-1 text-lg font-bold text-app-text">{{ favoriteCount }}</p>
          </div>
        </div>
      </section>

      <section class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <div class="mb-3 flex items-center justify-between">
          <div>
            <h2 class="app-card-title">Recent Files</h2>
            <p class="mt-1 text-sm text-app-textMuted">Latest updated items</p>
          </div>
          <Archive class="h-5 w-5 text-app-textMuted" aria-hidden="true" />
        </div>
        <div class="space-y-2">
          <button
            v-for="file in recentFiles"
            :key="file.id"
            class="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-app-muted"
            type="button"
            @click="selectedFileId = file.id"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg" :class="typeTone(file.type)">
              <component :is="typeIcon(file.type)" class="h-4 w-4" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-medium text-app-text">{{ file.name }}</span>
              <span class="block text-xs text-app-textMuted">{{ formatDate(file.modified_at) }}</span>
            </span>
          </button>
        </div>
      </section>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 class="app-card-title">Folders</h2>
          <p class="mt-1 text-sm text-app-textMuted">Organized sample folders</p>
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <button
          v-for="folder in fileFolders"
          :key="folder.id"
          class="rounded-lg border border-app-borderSoft bg-app-muted p-4 text-left transition-colors hover:border-primary-200 hover:bg-primary-50/30"
          type="button"
          @click="searchQuery = folder.name"
        >
          <div class="flex items-start justify-between gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <Folder class="h-5 w-5" aria-hidden="true" />
            </span>
            <span class="text-xs text-app-textMuted">{{ folder.file_count }} files</span>
          </div>
          <h3 class="mt-4 text-sm font-semibold text-app-text">{{ folder.name }}</h3>
          <p class="mt-1 text-xs text-app-textMuted">{{ formatBytes(folder.size) }} · {{ folder.owner }}</p>
        </button>
      </div>
    </section>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            v-for="tab in viewTabs"
            :key="tab.value"
            class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
            :class="activeView === tab.value ? 'bg-primary-50 text-primary-700' : 'text-app-textSecondary hover:bg-app-muted hover:text-app-text'"
            type="button"
            @click="activeView = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="grid gap-3 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="file-search" v-model="searchQuery" class="pl-9" placeholder="Search files, folders, or owners..." aria-label="Search files" />
          </div>
          <label class="app-form-group" for="file-type-filter">
            <span class="sr-only">File type filter</span>
            <select id="file-type-filter" v-model="typeFilter" class="app-input">
              <option v-for="option in typeOptions" :key="option.label" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredFiles.length === 0" class="p-4">
        <AppEmptyState title="No files found" description="Try another search, folder, or file type filter.">
          <template #action>
            <AppButton variant="secondary" size="sm" @click="searchQuery = ''; typeFilter = ''; activeView = 'all'">
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col">File</th>
              <th scope="col">Folder</th>
              <th scope="col">Owner</th>
              <th scope="col">Size</th>
              <th scope="col">Modified</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in filteredFiles" :key="file.id">
              <td>
                <div class="flex min-w-[18rem] items-center gap-3">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" :class="typeTone(file.type)">
                    <component :is="typeIcon(file.type)" class="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <p class="truncate font-medium text-app-text">{{ file.name }}</p>
                    <div class="mt-1 flex flex-wrap gap-1.5">
                      <AppBadge :variant="typeVariant(file.type)">{{ typeLabel(file.type) }}</AppBadge>
                      <AppBadge v-if="file.is_shared" variant="info">Shared</AppBadge>
                      <AppBadge v-if="file.is_favorite" variant="warning">Favorite</AppBadge>
                    </div>
                  </div>
                </div>
              </td>
              <td>{{ file.folder }}</td>
              <td>{{ file.owner }}</td>
              <td>{{ formatBytes(file.size) }}</td>
              <td>{{ formatDate(file.modified_at) }}</td>
              <td>
                <div class="flex min-w-[9rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="selectedFileId = file.id">
                    View
                  </button>
                  <button class="text-sm font-medium text-warning-700 hover:text-warning-800" type="button" @click="toggleFavorite(file)">
                    {{ file.is_favorite ? 'Unfavorite' : 'Favorite' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <AppModal :open="Boolean(selectedFile)" title="File Detail" @close="selectedFileId = null">
      <div v-if="selectedFile" class="grid gap-4">
        <div class="flex items-start gap-3">
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" :class="typeTone(selectedFile.type)">
            <component :is="typeIcon(selectedFile.type)" class="h-6 w-6" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 class="app-section-title break-words">{{ selectedFile.name }}</h2>
            <p class="mt-1 text-sm text-app-textMuted">{{ selectedFile.folder }}</p>
          </div>
        </div>

        <div class="grid gap-3 rounded-lg bg-app-muted p-3 sm:grid-cols-2">
          <div>
            <p class="app-label-text">Type</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ typeLabel(selectedFile.type) }}</p>
          </div>
          <div>
            <p class="app-label-text">Size</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ formatBytes(selectedFile.size) }}</p>
          </div>
          <div>
            <p class="app-label-text">Owner</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ selectedFile.owner }}</p>
          </div>
          <div>
            <p class="app-label-text">Modified</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(selectedFile.modified_at) }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <AppBadge v-if="selectedFile.is_shared" variant="info">
            <Share2 class="mr-1 h-3 w-3" aria-hidden="true" />
            Shared
          </AppBadge>
          <AppBadge v-if="selectedFile.is_favorite" variant="warning">
            <Star class="mr-1 h-3 w-3" aria-hidden="true" />
            Favorite
          </AppBadge>
        </div>

        <div class="flex flex-wrap gap-2">
          <AppButton size="sm" @click="toggleFavorite(selectedFile)">
            <Star class="mr-1 h-4 w-4" aria-hidden="true" />
            {{ selectedFile.is_favorite ? 'Remove Favorite' : 'Add Favorite' }}
          </AppButton>
          <AppButton variant="secondary" size="sm" @click="selectedFileId = null">Close</AppButton>
        </div>
      </div>
    </AppModal>

    <AppModal :open="showUploadModal" title="Upload File" @close="showUploadModal = false">
      <form class="grid gap-4" @submit.prevent="uploadFile">
        <div class="rounded-lg border border-dashed border-app-border bg-app-muted p-6 text-center">
          <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Image class="h-6 w-6" aria-hidden="true" />
          </div>
          <p class="text-sm font-medium text-app-text">Sample upload placeholder</p>
          <p class="mt-1 text-xs text-app-textMuted">No real file upload is performed.</p>
        </div>
        <AppInput id="upload-name" v-model="uploadName" label="File name" placeholder="Example proposal.pdf" required />
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="app-form-group" for="upload-folder">
            <span class="app-label">Folder</span>
            <select id="upload-folder" v-model="uploadFolder" class="app-input">
              <option v-for="folder in fileFolders" :key="folder.id" :value="folder.name">
                {{ folder.name }}
              </option>
            </select>
          </label>
          <label class="app-form-group" for="upload-type">
            <span class="app-label">Type</span>
            <select id="upload-type" v-model="uploadType" class="app-input">
              <option value="document">Document</option>
              <option value="spreadsheet">Spreadsheet</option>
              <option value="presentation">Presentation</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
              <option value="archive">Archive</option>
            </select>
          </label>
        </div>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Upload Sample</AppButton>
          <AppButton variant="secondary" type="button" @click="showUploadModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
