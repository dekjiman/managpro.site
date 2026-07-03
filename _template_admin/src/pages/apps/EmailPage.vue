<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Archive,
  ChevronLeft,
  FileText,
  Inbox,
  Menu,
  Paperclip,
  Send,
  Star,
  Trash2,
} from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { emailMessages, emailFolders, emailLabels } from '@/data/mock/emails.mock'
import type { EmailFolder } from '@/types/email'

const route = useRoute()

const currentFolder = ref<EmailFolder>('inbox')
const searchQuery = ref('')
const selectedEmailId = ref<string | null>(null)
const showCompose = ref(false)
const composeTo = ref('')
const composeSubject = ref('')
const composeBody = ref('')
const showFolderSidebar = ref(false)

function openCompose() {
  composeTo.value = ''
  composeSubject.value = ''
  composeBody.value = ''
  showCompose.value = true
}

const filteredEmails = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return emailMessages.filter((email) => {
    if (email.folder !== currentFolder.value && currentFolder.value !== 'starred') return false
    if (currentFolder.value === 'starred' && !email.is_starred) return false
    if (query && !email.subject.toLowerCase().includes(query) && !email.sender_name.toLowerCase().includes(query)) return false
    return true
  })
})

const selectedEmail = computed(() => {
  if (!selectedEmailId.value) return null
  return emailMessages.find((email) => email.id === selectedEmailId.value) || null
})

function selectEmail(id: string) {
  selectedEmailId.value = id
}

function closeDetail() {
  selectedEmailId.value = null
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' })
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const folderIconMap: Record<string, typeof Inbox> = {
  inbox: Inbox,
  sent: Send,
  draft: FileText,
  starred: Star,
  archive: Archive,
  trash: Trash2,
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Email" description="Manage your inbox, compose messages, and organize conversations." :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="grid gap-0 overflow-hidden rounded-card border border-app-borderSoft bg-app-card shadow-card md:grid-cols-[16rem_minmax(0,1fr)]">
      <!-- Sidebar -->
      <aside class="border-r border-app-borderSoft bg-app-muted" :class="[showFolderSidebar ? 'block' : 'hidden', 'md:block']">
        <div class="p-3">
          <AppButton class="w-full" @click="openCompose">
            Compose
          </AppButton>
        </div>

        <nav class="px-2 pb-2">
          <p class="app-label-text mb-1 px-3 py-1">Folders</p>
          <button
            v-for="folder in emailFolders"
            :key="folder.key"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
            :class="currentFolder === folder.key ? 'bg-primary-50 font-medium text-primary-700' : 'text-app-textSecondary hover:bg-secondary-50 hover:text-app-text'"
            @click="currentFolder = folder.key; selectedEmailId = null; showFolderSidebar = false"
          >
            <component :is="folderIconMap[folder.key] || Inbox" class="h-4 w-4 shrink-0" aria-hidden="true" />
            <span class="flex-1">{{ folder.label }}</span>
            <span v-if="folder.count > 0" class="text-xs text-app-textMuted">{{ folder.count }}</span>
          </button>
        </nav>

        <div class="border-t border-app-borderSoft px-2 pt-2 pb-2">
          <p class="app-label-text mb-1 px-3 py-1">Labels</p>
          <div class="flex flex-wrap gap-1 px-3 pb-2">
            <span
              v-for="label in emailLabels"
              :key="label.key"
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="{
                'bg-primary-50 text-primary-700': label.key === 'work',
                'bg-info-50 text-info-700': label.key === 'support',
                'bg-warning-50 text-warning-800': label.key === 'billing',
                'bg-danger-50 text-danger-700': label.key === 'client',
                'bg-secondary-100 text-secondary-700': label.key === 'personal',
              }"
            >
              {{ label.label }}
            </span>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex min-h-0 flex-col">
        <!-- Detail Panel -->
        <template v-if="selectedEmail">
          <div class="border-b border-app-borderSoft p-4">
            <button class="flex items-center gap-1.5 text-sm text-app-textMuted hover:text-app-text md:hidden" type="button" @click="closeDetail">
              <ChevronLeft class="h-4 w-4" aria-hidden="true" />
              Back to list
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <div class="mb-4">
              <h2 class="app-section-title mb-1">{{ selectedEmail.subject }}</h2>
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
                  {{ selectedEmail.sender_name.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-medium text-app-text">{{ selectedEmail.sender_name }}</p>
                  <p class="text-xs text-app-textMuted">{{ selectedEmail.sender_email }}</p>
                </div>
                <span class="ml-auto text-xs text-app-textMuted">{{ formatDate(selectedEmail.date) }}</span>
              </div>
            </div>
            <div class="mb-4 flex flex-wrap gap-1.5">
              <span
                v-for="label in selectedEmail.labels"
                :key="label"
                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="{
                  'bg-primary-50 text-primary-700': label === 'work',
                  'bg-info-50 text-info-700': label === 'support',
                  'bg-warning-50 text-warning-800': label === 'billing',
                  'bg-danger-50 text-danger-700': label === 'client',
                  'bg-secondary-100 text-secondary-700': label === 'personal',
                }"
              >
                {{ label }}
              </span>
            </div>
            <div v-if="selectedEmail.has_attachment" class="mb-4 flex items-center gap-2 rounded-lg border border-app-borderSoft bg-app-muted px-3 py-2 text-sm text-app-textSecondary">
              <Paperclip class="h-4 w-4" aria-hidden="true" />
              <span>Has attachment</span>
            </div>
            <p class="text-sm leading-relaxed text-app-textSecondary">{{ selectedEmail.body }}</p>
          </div>
        </template>

        <!-- List Panel -->
        <template v-else>
          <div class="border-b border-app-borderSoft p-3">
            <div class="flex items-center gap-2">
              <button class="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-app-textSecondary hover:bg-app-muted hover:text-app-text md:hidden" type="button" @click="showFolderSidebar = !showFolderSidebar">
                <Menu class="h-4 w-4" aria-hidden="true" />
                {{ showFolderSidebar ? 'Close' : 'Folders' }}
              </button>
              <AppInput id="email-search" v-model="searchQuery" placeholder="Search emails..." aria-label="Search emails" class="flex-1" />
            </div>
          </div>

          <div v-if="filteredEmails.length === 0" class="flex flex-1 items-center justify-center p-6">
            <AppEmptyState title="No emails found" description="Try a different folder or search term." />
          </div>

          <div v-else class="flex-1 divide-y divide-app-borderSoft overflow-y-auto">
            <button
              v-for="email in filteredEmails"
              :key="email.id"
              class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-app-muted"
              :class="{ 'bg-primary-50/30': !email.is_read }"
              type="button"
              @click="selectEmail(email.id)"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-xs font-semibold text-secondary-700">
                {{ email.sender_name.charAt(0) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <span class="truncate text-sm font-medium" :class="email.is_read ? 'text-app-textSecondary' : 'text-app-text'">
                    {{ email.sender_name }}
                  </span>
                  <Star v-if="email.is_starred" class="h-3 w-3 shrink-0 fill-warning-500 text-warning-500" aria-hidden="true" />
                  <span class="ml-auto shrink-0 whitespace-nowrap text-xs text-app-textMuted">{{ formatDate(email.date) }}</span>
                </div>
                <p class="truncate text-sm" :class="email.is_read ? 'text-app-textSecondary' : 'font-medium text-app-text'">
                  {{ email.subject }}
                </p>
                <p class="truncate text-xs text-app-textMuted">{{ email.preview }}</p>
                <div class="mt-1 flex items-center gap-2">
                  <Paperclip v-if="email.has_attachment" class="h-3 w-3 text-app-textMuted" aria-hidden="true" />
                  <div class="flex gap-1">
                    <span
                      v-for="label in email.labels"
                      :key="label"
                      class="inline-block h-2 w-2 rounded-full"
                      :class="{
                        'bg-primary-500': label === 'work',
                        'bg-info-500': label === 'support',
                        'bg-warning-500': label === 'billing',
                        'bg-danger-500': label === 'client',
                        'bg-secondary-500': label === 'personal',
                      }"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- Compose Modal -->
    <AppModal :open="showCompose" title="New Message" @close="showCompose = false">
      <form class="grid gap-4" @submit.prevent="showCompose = false">
        <AppInput id="compose-to" v-model="composeTo" label="To" placeholder="recipient@example.test" required />
        <AppInput id="compose-subject" v-model="composeSubject" label="Subject" placeholder="Enter subject" />
        <label class="app-form-group" for="compose-body">
          <span class="app-label">Message</span>
          <textarea id="compose-body" v-model="composeBody" class="app-textarea min-h-[10rem]" placeholder="Write your message..." />
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Send Message</AppButton>
          <AppButton variant="secondary" type="button" @click="showCompose = false">Discard</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
