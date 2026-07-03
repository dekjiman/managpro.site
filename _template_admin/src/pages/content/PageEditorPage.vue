<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Bold, Eye, Heading1, Heading2, Italic, Link, List, ListOrdered, Quote, Save } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { pages } from '@/data/mock/pages.mock'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const pageId = route.query.page as string || ''
const existing = computed(() => pages.find((p) => p.id === pageId) || null)

const title = ref(existing.value?.title || '')
const slug = ref(existing.value?.slug || '')
const metaDescription = ref(existing.value?.meta_description || '')
const status = ref(existing.value?.status || 'Draft')
const content = ref(existing.value?.content_preview || '')
const editorSurface = ref<HTMLElement | null>(null)

const titleError = ref('')
const slugError = ref('')
const metaDescriptionError = ref('')

function validate(): boolean {
  let valid = true
  if (!title.value.trim()) { titleError.value = 'Title is required'; valid = false } else { titleError.value = '' }
  if (!slug.value.trim()) { slugError.value = 'Slug is required'; valid = false } else { slugError.value = '' }
  if (!metaDescription.value.trim()) { metaDescriptionError.value = 'Meta description is required'; valid = false } else { metaDescriptionError.value = '' }
  return valid
}

const statusOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Published', value: 'Published' },
  { label: 'Archived', value: 'Archived' },
]

function savePage() {
  if (!validate()) {
    uiStore.pushToast({ title: 'Please fix the highlighted errors', type: 'danger' })
    return
  }
  uiStore.pushToast({ title: pageId ? 'Page updated successfully (sample)' : 'Page created successfully (sample)', type: 'success' })
  router.push('/content/pages')
}

function previewPage() {
  uiStore.pushToast({ title: 'Preview opened (sample)', type: 'info' })
}

function syncEditorContent() {
  content.value = editorSurface.value?.innerHTML || ''
}

function runEditorCommand(command: string, value?: string) {
  editorSurface.value?.focus()
  document.execCommand(command, false, value)
  syncEditorContent()
}

function insertQuote() {
  runEditorCommand('insertHTML', '<blockquote class="border-l-4 border-primary-200 pl-4 text-app-textSecondary">Add a highlighted quote or callout here.</blockquote>')
}

function insertLink() {
  runEditorCommand('createLink', 'https://example.com')
}

onMounted(async () => {
  await nextTick()
  if (editorSurface.value && content.value) {
    editorSurface.value.innerHTML = content.value
  }
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader :title="pageId ? `Edit: ${title || 'Untitled'}` : 'Create Page'" description="Write and manage page content, SEO metadata, and publishing options." :breadcrumb="['Content', 'Pages', pageId ? 'Edit' : 'Create']">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/content/pages')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Pages
        </AppButton>
      </template>
    </AppPageHeader>

    <form class="grid gap-4" @submit.prevent="savePage">
      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div class="grid gap-4">
          <AppCard title="Page Content" description="Title, slug, and body content.">
            <div class="grid gap-4">
              <AppInput id="editor-title" v-model="title" :error="titleError" label="Page title" placeholder="Enter page title" required />
              <AppInput id="editor-slug" v-model="slug" :error="slugError" label="URL slug" placeholder="page-slug">
                <template #helper>Relative URL path, e.g. "about-us"</template>
              </AppInput>
              <div class="app-form-group">
                <span class="app-label">Content</span>
                <div class="rounded-card border border-app-borderSoft bg-app-card">
                  <div class="flex flex-wrap gap-1 border-b border-app-borderSoft bg-app-muted p-2">
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Heading 1" @click="runEditorCommand('formatBlock', '<h1>')">
                      <Heading1 class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Heading 2" @click="runEditorCommand('formatBlock', '<h2>')">
                      <Heading2 class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Bold" @click="runEditorCommand('bold')">
                      <Bold class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Italic" @click="runEditorCommand('italic')">
                      <Italic class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Bulleted list" @click="runEditorCommand('insertUnorderedList')">
                      <List class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Numbered list" @click="runEditorCommand('insertOrderedList')">
                      <ListOrdered class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Insert quote" @click="insertQuote">
                      <Quote class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button class="app-btn app-btn-ghost app-btn-sm" type="button" aria-label="Insert link" @click="insertLink">
                      <Link class="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div
                    id="editor-content"
                    ref="editorSurface"
                    class="min-h-[18rem] rounded-b-card bg-app-card p-4 text-sm leading-6 text-app-textSecondary outline-none focus:shadow-focusPrimary"
                    contenteditable="true"
                    role="textbox"
                    aria-multiline="true"
                    aria-label="Page content rich editor"
                    data-placeholder="Write your page content here..."
                    @input="syncEditorContent"
                    @blur="syncEditorContent"
                  />
                </div>
                <p class="app-helper-text">Rich text sample editor with heading, emphasis, list, quote, and link actions.</p>
              </div>
            </div>
          </AppCard>

          <AppCard title="SEO Metadata" description="Search engine optimization fields.">
            <div class="grid gap-4">
              <AppInput id="editor-meta-desc" v-model="metaDescription" :error="metaDescriptionError" label="Meta description" placeholder="Brief description for search results" />
            </div>
          </AppCard>
        </div>

        <div class="grid gap-4">
          <AppCard title="Publishing" description="Status and visibility.">
            <div class="grid gap-4">
              <AppSelect id="editor-status" v-model="status" label="Status" :options="statusOptions" />
              <div>
                <p class="app-label-text mb-2">Current Status</p>
                <AppBadge :variant="getStatusVariant(status)">{{ status }}</AppBadge>
              </div>
            </div>
          </AppCard>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <AppButton type="submit">
          <Save class="mr-1 h-4 w-4" aria-hidden="true" />
          {{ pageId ? 'Update Page' : 'Create Page' }}
        </AppButton>
        <AppButton variant="secondary" type="button" @click="previewPage">
          <Eye class="mr-1 h-4 w-4" aria-hidden="true" />
          Preview
        </AppButton>
        <AppButton variant="secondary" type="button" @click="router.push('/content/pages')">Cancel</AppButton>
      </div>
    </form>
  </div>
</template>
