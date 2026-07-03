<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Archive, ChevronLeft, FileText, Plus, Search, Star } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { notes, noteTags } from '@/data/mock/notes.mock'
import { formatDate } from '@/utils/format'
import type { NoteItem } from '@/types/note'

type NotesView = 'active' | 'favorites' | 'archived'

const route = useRoute()

const searchQuery = ref('')
const tagFilter = ref('')
const activeView = ref<NotesView>('active')
const selectedNoteId = ref(notes[0]?.id || null)
const showCreateModal = ref(false)
const showMobileDetail = ref(false)
const newNoteTitle = ref('')
const newNoteContent = ref('')
const newNoteTag = ref('Planning')

const viewTabs: { label: string; value: NotesView }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Favorites', value: 'favorites' },
  { label: 'Archived', value: 'archived' },
]

const filteredNotes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return notes.filter((note) => {
    const matchesQuery =
      !query ||
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesTag = !tagFilter.value || note.tags.includes(tagFilter.value)
    const matchesView =
      (activeView.value === 'active' && !note.is_archived) ||
      (activeView.value === 'favorites' && note.is_favorite && !note.is_archived) ||
      (activeView.value === 'archived' && note.is_archived)

    return matchesQuery && matchesTag && matchesView
  })
})

const selectedNote = computed(() => {
  if (!selectedNoteId.value) return null
  return notes.find((note) => note.id === selectedNoteId.value) || null
})

const noteStats = computed(() => [
  { label: 'Active Notes', value: notes.filter((note) => !note.is_archived).length },
  { label: 'Favorites', value: notes.filter((note) => note.is_favorite && !note.is_archived).length },
  { label: 'Archived', value: notes.filter((note) => note.is_archived).length },
])

function selectNote(note: NoteItem) {
  selectedNoteId.value = note.id
  showMobileDetail.value = true
}

function closeDetail() {
  selectedNoteId.value = null
  showMobileDetail.value = false
}

function toggleFavorite(note: NoteItem) {
  note.is_favorite = !note.is_favorite
}

function toggleArchive(note: NoteItem) {
  note.is_archived = !note.is_archived
  if (activeView.value === 'archived') {
    selectedNoteId.value = filteredNotes.value[0]?.id || null
  }
}

function openCreateModal() {
  newNoteTitle.value = ''
  newNoteContent.value = ''
  newNoteTag.value = 'Planning'
  showCreateModal.value = true
}

function createNote() {
  if (!newNoteTitle.value.trim()) return
  const content = newNoteContent.value.trim() || 'New note created from the Notes app sample.'

  const note: NoteItem = {
    id: `note-${Date.now()}`,
    title: newNoteTitle.value.trim(),
    content,
    content_preview: content.length > 86 ? `${content.slice(0, 86)}...` : content,
    tags: [newNoteTag.value],
    is_favorite: false,
    is_archived: false,
    created_at: '2026-06-14',
    updated_at: '2026-06-14',
  }

  notes.unshift(note)
  activeView.value = 'active'
  selectedNoteId.value = note.id
  showCreateModal.value = false
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Notes"
      description="Capture short notes, filter by tag, and review active, favorite, or archived ideas."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton @click="openCreateModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Create Note
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="stat in noteStats" :key="stat.label" class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid gap-0 overflow-hidden rounded-card border border-app-borderSoft bg-app-card shadow-card lg:grid-cols-[22rem_minmax(0,1fr)]">
      <aside class="border-r border-app-borderSoft bg-app-muted" :class="[showMobileDetail ? 'hidden' : 'block', 'lg:block']">
        <div class="space-y-3 border-b border-app-borderSoft p-3">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="notes-search" v-model="searchQuery" class="pl-9" placeholder="Search notes..." aria-label="Search notes" />
          </div>
          <label class="app-form-group" for="notes-tag-filter">
            <span class="sr-only">Tag filter</span>
            <select id="notes-tag-filter" v-model="tagFilter" class="app-input">
              <option value="">All tags</option>
              <option v-for="tag in noteTags" :key="tag" :value="tag">{{ tag }}</option>
            </select>
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in viewTabs"
              :key="tab.value"
              class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              :class="activeView === tab.value ? 'bg-primary-50 text-primary-700' : 'text-app-textSecondary hover:bg-app-card hover:text-app-text'"
              type="button"
              @click="activeView = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div v-if="filteredNotes.length === 0" class="p-4">
          <AppEmptyState title="No notes found" description="Try another keyword, tag, or note view.">
            <template #action>
              <AppButton variant="secondary" size="sm" @click="searchQuery = ''; tagFilter = ''; activeView = 'active'">
                Reset Filters
              </AppButton>
            </template>
          </AppEmptyState>
        </div>

        <div v-else class="max-h-[38rem] divide-y divide-app-borderSoft overflow-y-auto">
          <button
            v-for="note in filteredNotes"
            :key="note.id"
            class="w-full px-4 py-3 text-left transition-colors hover:bg-app-card"
            :class="{ 'bg-primary-50/50': selectedNoteId === note.id }"
            type="button"
            @click="selectNote(note)"
          >
            <div class="mb-2 flex items-start gap-2">
              <h2 class="min-w-0 flex-1 truncate text-sm font-semibold text-app-text">{{ note.title }}</h2>
              <Star v-if="note.is_favorite" class="h-4 w-4 shrink-0 fill-warning-500 text-warning-500" aria-hidden="true" />
            </div>
            <p class="line-clamp-2 text-sm text-app-textSecondary">{{ note.content_preview }}</p>
            <div class="mt-3 flex flex-wrap items-center gap-1.5">
              <span
                v-for="tag in note.tags"
                :key="tag"
                class="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-700"
              >
                {{ tag }}
              </span>
              <span class="ml-auto text-xs text-app-textMuted">{{ formatDate(note.updated_at) }}</span>
            </div>
          </button>
        </div>
      </aside>

      <section v-if="selectedNote" class="min-h-[34rem] p-5" :class="[!showMobileDetail ? 'hidden' : 'block', 'lg:block']">
        <button class="mb-4 flex items-center gap-1.5 text-sm text-app-textMuted hover:text-app-text lg:hidden" type="button" @click="closeDetail">
          <ChevronLeft class="h-4 w-4" aria-hidden="true" />
          Back to list
        </button>
        <div class="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="mb-2 flex flex-wrap gap-1.5">
              <AppBadge v-if="selectedNote.is_favorite" variant="warning">Favorite</AppBadge>
              <AppBadge v-if="selectedNote.is_archived" variant="neutral">Archived</AppBadge>
            </div>
            <h2 class="app-page-title">{{ selectedNote.title }}</h2>
            <p class="mt-1 text-sm text-app-textMuted">Updated {{ formatDate(selectedNote.updated_at) }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <AppButton variant="secondary" size="sm" @click="toggleFavorite(selectedNote)">
              <Star class="mr-1 h-4 w-4" aria-hidden="true" />
              {{ selectedNote.is_favorite ? 'Unfavorite' : 'Favorite' }}
            </AppButton>
            <AppButton variant="secondary" size="sm" @click="toggleArchive(selectedNote)">
              <Archive class="mr-1 h-4 w-4" aria-hidden="true" />
              {{ selectedNote.is_archived ? 'Restore' : 'Archive' }}
            </AppButton>
          </div>
        </div>

        <div class="mb-5 flex flex-wrap gap-1.5">
          <span
            v-for="tag in selectedNote.tags"
            :key="tag"
            class="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
          >
            {{ tag }}
          </span>
        </div>

        <label class="app-form-group" for="note-editor">
          <span class="app-label">Note editor</span>
          <textarea id="note-editor" v-model="selectedNote.content" class="app-textarea min-h-[18rem]" />
          <span class="app-helper-text">Sample editor only. Changes stay in local mock data.</span>
        </label>
      </section>

      <section v-else class="flex min-h-[34rem] items-center justify-center p-6" :class="[!showMobileDetail ? 'hidden' : 'block', 'lg:block']">
        <AppEmptyState title="Select a note" description="Choose a note from the list or create a new one.">
          <template #action>
            <AppButton size="sm" @click="openCreateModal">
              <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
              Create Note
            </AppButton>
          </template>
        </AppEmptyState>
      </section>
    </div>

    <AppModal :open="showCreateModal" title="Create Note" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createNote">
        <AppInput id="new-note-title" v-model="newNoteTitle" label="Title" placeholder="Enter note title" required />
        <label class="app-form-group" for="new-note-tag">
          <span class="app-label">Tag</span>
          <select id="new-note-tag" v-model="newNoteTag" class="app-input">
            <option v-for="tag in noteTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </label>
        <label class="app-form-group" for="new-note-content">
          <span class="app-label">Content</span>
          <textarea id="new-note-content" v-model="newNoteContent" class="app-textarea min-h-[10rem]" placeholder="Write a short note..." />
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">
            <FileText class="mr-1 h-4 w-4" aria-hidden="true" />
            Save Note
          </AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
