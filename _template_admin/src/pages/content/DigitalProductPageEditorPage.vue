<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Bold, Eye, Heading1, Heading2, Italic, Link, List, ListOrdered, Quote, Save } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { products } from '@/data/mock/products.mock'
import { formatCurrency } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const route = useRoute()
const uiStore = useUiStore()

const digitalProducts = products.filter((product) => ['Software', 'Digital Assets'].includes(product.category))
const selectedProductId = ref(digitalProducts[0]?.id || products[0]?.id || '')

const selectedProduct = computed(() => products.find((product) => product.id === selectedProductId.value) || digitalProducts[0] || products[0])
const productOptions = computed(() =>
  digitalProducts.map((product) => ({
    label: `${product.name} - ${product.category}`,
    value: product.id,
  })),
)

const heroTitle = ref('Launch-ready digital product landing page')
const heroSubtitle = ref('Position the product with a clear promise, proof points, and conversion-ready sections for buyers.')
const ctaLabel = ref('Start free trial')
const ctaUrl = ref('/checkout/digital-product')
const pricingCopy = ref('Simple monthly pricing with team-ready features and secure digital delivery.')
const seoTitle = ref('Digital Product Landing Page')
const slug = ref('digital-product-landing')
const metaDescription = ref('Landing page content for promoting and selling a digital product.')
const status = ref('Draft')
const featureHighlights = ref([
  'Instant access after purchase',
  'Workflow-ready templates and assets',
  'Secure updates for every license',
])
const faqNotes = ref('Use this block for launch questions, licensing details, refund notes, or support expectations.')
const salesCopy = ref('<p><strong>Write a focused product story.</strong> Explain who it is for, the problem it solves, and why the buyer should act now.</p>')
const editorSurface = ref<HTMLElement | null>(null)

const heroTitleError = ref('')
const ctaLabelError = ref('')
const slugError = ref('')
const seoTitleError = ref('')

function validate(): boolean {
  let valid = true
  if (!heroTitle.value.trim()) { heroTitleError.value = 'Hero title is required'; valid = false } else { heroTitleError.value = '' }
  if (!ctaLabel.value.trim()) { ctaLabelError.value = 'CTA label is required'; valid = false } else { ctaLabelError.value = '' }
  if (!slug.value.trim()) { slugError.value = 'Slug is required'; valid = false } else { slugError.value = '' }
  if (!seoTitle.value.trim()) { seoTitleError.value = 'SEO title is required'; valid = false } else { seoTitleError.value = '' }
  return valid
}

const statusOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Published', value: 'Published' },
  { label: 'Archived', value: 'Archived' },
]

const previewStats = computed(() => [
  { label: 'Product', value: selectedProduct.value?.name || 'No product' },
  { label: 'Category', value: selectedProduct.value?.category || 'Unknown' },
  { label: 'Price', value: formatCurrency(selectedProduct.value?.price || 0) },
])

function syncEditorContent() {
  salesCopy.value = editorSurface.value?.innerHTML || ''
}

function runEditorCommand(command: string, value?: string) {
  editorSurface.value?.focus()
  document.execCommand(command, false, value)
  syncEditorContent()
}

function insertQuote() {
  runEditorCommand('insertHTML', '<blockquote class="border-l-4 border-primary-200 pl-4 text-app-textSecondary">Add launch proof, buyer quote, or guarantee text here.</blockquote>')
}

function insertLink() {
  runEditorCommand('createLink', ctaUrl.value || '/checkout/digital-product')
}

function saveDraft() {
  if (!validate()) {
    uiStore.pushToast({ title: 'Please fix the highlighted errors', type: 'danger' })
    return
  }
  syncEditorContent()
  uiStore.pushToast({ title: 'Digital product page draft saved (sample)', type: 'success' })
}

function previewPage() {
  syncEditorContent()
  uiStore.pushToast({ title: 'Digital product landing preview opened (sample)', type: 'info' })
}

onMounted(async () => {
  await nextTick()
  if (editorSurface.value) {
    editorSurface.value.innerHTML = salesCopy.value
  }
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Digital Product Editor"
      description="Build landing-page content for a digital product using mock catalog data."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton variant="secondary" @click="previewPage">
          <Eye class="mr-1 h-4 w-4" aria-hidden="true" />
          Preview
        </AppButton>
        <AppButton @click="saveDraft">
          <Save class="mr-1 h-4 w-4" aria-hidden="true" />
          Save Draft
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="grid gap-4">
        <AppCard title="Product Source" description="Select a mock digital product to power the landing preview.">
          <div class="grid gap-4 md:grid-cols-2">
            <AppSelect id="digital-product-source" v-model="selectedProductId" label="Digital product" :options="productOptions" />
            <AppSelect id="digital-product-status" v-model="status" label="Publishing status" :options="statusOptions" />
          </div>
        </AppCard>

        <AppCard title="Hero & Conversion" description="Primary landing page copy and CTA settings.">
          <div class="grid gap-4">
            <AppInput id="digital-hero-title" v-model="heroTitle" :error="heroTitleError" label="Hero title" placeholder="Enter hero title" required />
            <AppTextarea id="digital-hero-subtitle" v-model="heroSubtitle" label="Hero subtitle" placeholder="Short value proposition" />
            <div class="grid gap-4 md:grid-cols-2">
              <AppInput id="digital-cta-label" v-model="ctaLabel" :error="ctaLabelError" label="CTA label" placeholder="Start free trial" />
              <AppInput id="digital-cta-url" v-model="ctaUrl" label="CTA URL" placeholder="/checkout/digital-product" />
            </div>
            <AppTextarea id="digital-pricing-copy" v-model="pricingCopy" label="Pricing copy" placeholder="Explain offer, license, or pricing model" />
          </div>
        </AppCard>

        <AppCard title="Feature Highlights" description="Short benefit bullets shown near the hero or pricing block.">
          <div class="grid gap-3">
            <AppInput
              v-for="(_, index) in featureHighlights"
              :id="`digital-feature-${index}`"
              :key="index"
              v-model="featureHighlights[index]"
              :label="`Feature ${index + 1}`"
              placeholder="Enter product benefit"
            />
          </div>
        </AppCard>

        <AppCard title="Long-form Sales Copy" description="Rich text sample editor for product story and launch notes.">
          <div class="app-form-group">
            <span class="app-label">Sales copy</span>
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
                id="digital-sales-copy"
                ref="editorSurface"
                class="min-h-[16rem] rounded-b-card bg-app-card p-4 text-sm leading-6 text-app-textSecondary outline-none focus:shadow-focusPrimary"
                contenteditable="true"
                role="textbox"
                aria-multiline="true"
                aria-label="Digital product sales copy rich editor"
                @input="syncEditorContent"
                @blur="syncEditorContent"
              />
            </div>
          </div>
        </AppCard>

        <AppCard title="SEO & FAQ Notes" description="Search metadata and support-oriented page details.">
          <div class="grid gap-4">
            <div class="grid gap-4 md:grid-cols-2">
              <AppInput id="digital-seo-title" v-model="seoTitle" :error="seoTitleError" label="SEO title" placeholder="Search result title" />
              <AppInput id="digital-slug" v-model="slug" :error="slugError" label="Slug" placeholder="digital-product-landing" />
            </div>
            <AppTextarea id="digital-meta-description" v-model="metaDescription" label="Meta description" placeholder="Short search result description" />
            <AppTextarea id="digital-faq-notes" v-model="faqNotes" label="FAQ / support notes" placeholder="Add launch FAQ, license notes, and support details" />
          </div>
        </AppCard>
      </div>

      <aside class="grid gap-4 content-start">
        <AppCard title="Landing Preview" description="A compact sample preview from the current form values.">
          <div class="grid gap-4">
            <div class="rounded-card border border-app-borderSoft bg-app-muted p-4">
              <div class="flex items-center justify-between gap-3">
                <span class="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-50 text-xl" aria-hidden="true">{{ selectedProduct?.image }}</span>
                <AppBadge :variant="getStatusVariant(status)">{{ status }}</AppBadge>
              </div>
              <h2 class="mt-4 text-xl font-bold text-app-text">{{ heroTitle }}</h2>
              <p class="mt-2 text-sm leading-6 text-app-textSecondary">{{ heroSubtitle }}</p>
              <div class="mt-4 flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-primary-600 px-3 py-1.5 text-sm font-medium text-white">{{ ctaLabel }}</span>
                <span class="text-sm font-semibold text-app-text">{{ formatCurrency(selectedProduct?.price || 0) }}</span>
              </div>
            </div>

            <div class="grid gap-3">
              <div v-for="stat in previewStats" :key="stat.label" class="rounded-card border border-app-borderSoft p-3">
                <p class="app-label-text">{{ stat.label }}</p>
                <p class="mt-1 text-sm font-medium text-app-text">{{ stat.value }}</p>
              </div>
            </div>

            <div>
              <p class="app-label-text mb-2">Feature highlights</p>
              <ul class="grid gap-2">
                <li v-for="feature in featureHighlights" :key="feature" class="rounded-card border border-app-borderSoft bg-app-card p-3 text-sm text-app-textSecondary">
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="rounded-card border border-app-borderSoft p-3">
              <p class="app-label-text">SEO Preview</p>
              <p class="mt-2 text-sm font-semibold text-primary-700">{{ seoTitle }}</p>
              <p class="mt-1 text-xs text-app-textMuted">/{{ slug }}</p>
              <p class="mt-2 text-sm text-app-textSecondary">{{ metaDescription }}</p>
            </div>
          </div>
        </AppCard>
      </aside>
    </div>
  </div>
</template>
