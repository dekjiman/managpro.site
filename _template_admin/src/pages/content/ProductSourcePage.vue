<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AlertCircle, CheckCircle2, FileArchive, FileText, Image, RefreshCcw, Save, Upload } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { products } from '@/data/mock/products.mock'
import { formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

type SourceFileType = 'Package' | 'Cover' | 'Documentation' | 'Changelog'
type SourceFileStatus = 'Active' | 'Processing' | 'Draft' | 'Archived'

interface SourceFile {
  id: string
  productId: string
  filename: string
  type: SourceFileType
  size: string
  version: string
  status: SourceFileStatus
  uploadedAt: string
}

const route = useRoute()
const uiStore = useUiStore()

const digitalProducts = products.filter((product) => ['Software', 'Digital Assets'].includes(product.category))
const selectedProductId = ref(digitalProducts[0]?.id || products[0]?.id || '')
const packageFileName = ref('')
const coverFileName = ref('')
const docsFileName = ref('')
const changelogFileName = ref('')
const uploadError = ref('')

const version = ref('1.2.0')
const releaseNote = ref('Initial digital delivery package with documentation and launch assets.')
const compatibility = ref('Vue 3, Vite 8, modern browsers')
const updateAvailability = ref('Public updates')
const licenseType = ref('Single workspace license')
const downloadLimit = ref('10')
const accessDuration = ref('12 months')
const deliveryStatus = ref('Draft')

const sourceFiles = ref<SourceFile[]>([
  {
    id: 'src-001',
    productId: 'prd-001',
    filename: 'cloudsync-pro-v1.2.0.zip',
    type: 'Package',
    size: '248 MB',
    version: '1.2.0',
    status: 'Active',
    uploadedAt: '2026-06-12',
  },
  {
    id: 'src-002',
    productId: 'prd-001',
    filename: 'cloudsync-pro-preview.png',
    type: 'Cover',
    size: '1.8 MB',
    version: '1.2.0',
    status: 'Active',
    uploadedAt: '2026-06-12',
  },
  {
    id: 'src-003',
    productId: 'prd-012',
    filename: 'pixelperfect-design-kit-v4.zip',
    type: 'Package',
    size: '512 MB',
    version: '4.0.0',
    status: 'Active',
    uploadedAt: '2026-06-10',
  },
  {
    id: 'src-004',
    productId: 'prd-012',
    filename: 'pixelperfect-license-guide.pdf',
    type: 'Documentation',
    size: '920 KB',
    version: '4.0.0',
    status: 'Draft',
    uploadedAt: '2026-06-10',
  },
])

const productOptions = computed(() =>
  digitalProducts.map((product) => ({
    label: `${product.name} - ${product.category}`,
    value: product.id,
  })),
)

const selectedProduct = computed(() => products.find((product) => product.id === selectedProductId.value) || digitalProducts[0] || products[0])
const selectedSourceFiles = computed(() => sourceFiles.value.filter((file) => file.productId === selectedProductId.value))

const fileTypeOptions = [
  { label: 'Package', value: 'Package' },
  { label: 'Cover / preview image', value: 'Cover' },
  { label: 'Documentation', value: 'Documentation' },
  { label: 'Changelog', value: 'Changelog' },
]

const updateOptions = [
  { label: 'Public updates', value: 'Public updates' },
  { label: 'Manual approval', value: 'Manual approval' },
  { label: 'Private beta', value: 'Private beta' },
]

const licenseOptions = [
  { label: 'Single workspace license', value: 'Single workspace license' },
  { label: 'Team license', value: 'Team license' },
  { label: 'Extended commercial license', value: 'Extended commercial license' },
]

const deliveryOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Active', value: 'Active' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Archived', value: 'Archived' },
]

const uploadType = ref<SourceFileType>(fileTypeOptions[0].value as SourceFileType)

const readinessItems = computed(() => [
  { label: 'Source package', ready: selectedSourceFiles.value.some((file) => file.type === 'Package') },
  { label: 'Cover or preview image', ready: selectedSourceFiles.value.some((file) => file.type === 'Cover') || Boolean(coverFileName.value) },
  { label: 'Documentation', ready: selectedSourceFiles.value.some((file) => file.type === 'Documentation') || Boolean(docsFileName.value) },
  { label: 'License settings', ready: Boolean(licenseType.value && downloadLimit.value && accessDuration.value) },
  { label: 'Landing page linked', ready: selectedProduct.value?.category === 'Software' || selectedProduct.value?.category === 'Digital Assets' },
  { label: 'Delivery status configured', ready: deliveryStatus.value === 'Active' },
])

const readinessCount = computed(() => readinessItems.value.filter((item) => item.ready).length)

function formatBytes(size: number) {
  if (!size) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = size
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

function handleFileChange(event: Event, target: 'package' | 'cover' | 'docs' | 'changelog') {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const value = file.name
  if (target === 'package') packageFileName.value = value
  if (target === 'cover') coverFileName.value = value
  if (target === 'docs') docsFileName.value = value
  if (target === 'changelog') changelogFileName.value = value
}

function uploadProductSource() {
  uploadError.value = ''

  if (!selectedProductId.value) {
    uploadError.value = 'Select a digital product before uploading source files.'
    return
  }

  if (!packageFileName.value.trim()) {
    uploadError.value = 'Product package file is required for upload.'
    return
  }

  sourceFiles.value.unshift({
    id: `src-${Date.now()}`,
    productId: selectedProductId.value,
    filename: packageFileName.value.trim(),
    type: uploadType.value,
    size: 'Ready',
    version: version.value.trim() || '1.0.0',
    status: 'Processing',
    uploadedAt: '2026-06-14',
  })

  if (coverFileName.value.trim()) {
    sourceFiles.value.unshift({
      id: `src-cover-${Date.now()}`,
      productId: selectedProductId.value,
      filename: coverFileName.value.trim(),
      type: 'Cover',
      size: 'Ready',
      version: version.value.trim() || '1.0.0',
      status: 'Draft',
      uploadedAt: '2026-06-14',
    })
  }

  if (docsFileName.value.trim()) {
    sourceFiles.value.unshift({
      id: `src-doc-${Date.now()}`,
      productId: selectedProductId.value,
      filename: docsFileName.value.trim(),
      type: 'Documentation',
      size: 'Ready',
      version: version.value.trim() || '1.0.0',
      status: 'Draft',
      uploadedAt: '2026-06-14',
    })
  }

  packageFileName.value = ''
  coverFileName.value = ''
  docsFileName.value = ''
  changelogFileName.value = ''
  uiStore.pushToast({ title: 'Product source uploaded (sample)', type: 'success' })
}

function saveChanges() {
  uploadError.value = ''
  uiStore.pushToast({ title: 'Product source settings saved (sample)', type: 'success' })
}

function archiveFile(file: SourceFile) {
  file.status = 'Archived'
  uiStore.pushToast({ title: 'Source file archived (sample)', type: 'info' })
}

function removeFile(fileId: string) {
  sourceFiles.value = sourceFiles.value.filter((file) => file.id !== fileId)
  uiStore.pushToast({ title: 'Source file removed (sample)', type: 'success' })
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Product Source"
      description="Upload and manage source files, versions, licenses, and delivery readiness for digital products."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton variant="secondary" @click="uploadProductSource">
          <Upload class="mr-1 h-4 w-4" aria-hidden="true" />
          Upload Product
        </AppButton>
        <AppButton @click="saveChanges">
          <Save class="mr-1 h-4 w-4" aria-hidden="true" />
          Save Changes
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="grid gap-4">
        <AppCard title="Product Upload" description="Select a digital product and stage upload assets for delivery.">
          <div class="grid gap-4">
            <div v-if="uploadError" class="flex gap-2 rounded-card border border-danger-200 bg-danger-50 p-3 text-sm text-danger-700">
              <AlertCircle class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{{ uploadError }}</span>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <AppSelect id="source-product" v-model="selectedProductId" label="Digital product" :options="productOptions" />
              <AppSelect id="source-upload-type" v-model="uploadType" label="Primary upload type" :options="fileTypeOptions" />
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <label class="app-form-group" for="source-package-file">
                <span class="app-label">Product package <span class="text-danger-600">*</span></span>
                <input id="source-package-file" class="app-input" type="file" @change="handleFileChange($event, 'package')" />
                <span class="app-helper-text">{{ packageFileName || 'Upload .zip, .fig, .sketch, .pdf, or source package sample.' }}</span>
              </label>
              <label class="app-form-group" for="source-cover-file">
                <span class="app-label">Cover / preview image</span>
                <input id="source-cover-file" class="app-input" type="file" @change="handleFileChange($event, 'cover')" />
                <span class="app-helper-text">{{ coverFileName || 'Optional preview image for the product listing.' }}</span>
              </label>
              <label class="app-form-group" for="source-docs-file">
                <span class="app-label">Documentation</span>
                <input id="source-docs-file" class="app-input" type="file" @change="handleFileChange($event, 'docs')" />
                <span class="app-helper-text">{{ docsFileName || 'Optional setup guide, license guide, or readme.' }}</span>
              </label>
              <label class="app-form-group" for="source-changelog-file">
                <span class="app-label">Changelog</span>
                <input id="source-changelog-file" class="app-input" type="file" @change="handleFileChange($event, 'changelog')" />
                <span class="app-helper-text">{{ changelogFileName || 'Optional release note attachment.' }}</span>
              </label>
            </div>
          </div>
        </AppCard>

        <AppCard title="Version Settings" description="Prepare release metadata for the selected product source.">
          <div class="grid gap-4 lg:grid-cols-3">
            <AppInput id="source-version" v-model="version" label="Current version" placeholder="1.2.0" />
            <AppInput id="source-compatibility" v-model="compatibility" label="Compatibility" placeholder="Vue 3, Vite 8" />
            <AppSelect id="source-update-availability" v-model="updateAvailability" label="Update availability" :options="updateOptions" />
          </div>
          <div class="mt-4">
            <AppTextarea id="source-release-note" v-model="releaseNote" label="Release note" placeholder="Describe what's included in this source package" />
          </div>
        </AppCard>

        <AppCard title="Source Files" description="Local sample rows for the selected digital product.">
          <AppEmptyState v-if="selectedSourceFiles.length === 0" title="No source files yet" description="Upload a product package to add a source file row.">
            <template #action>
              <AppButton size="sm" variant="secondary" @click="uploadProductSource">
                <Upload class="mr-1 h-4 w-4" aria-hidden="true" />
                Upload Product
              </AppButton>
            </template>
          </AppEmptyState>

          <div v-else class="overflow-x-auto">
            <table class="app-table">
              <thead>
                <tr>
                  <th scope="col">File</th>
                  <th scope="col">Type</th>
                  <th scope="col">Version</th>
                  <th scope="col">Size</th>
                  <th scope="col">Status</th>
                  <th scope="col">Uploaded</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in selectedSourceFiles" :key="file.id">
                  <td>
                    <div class="flex min-w-[14rem] items-center gap-3">
                      <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 text-primary-700" aria-hidden="true">
                        <FileArchive v-if="file.type === 'Package'" class="h-4 w-4" />
                        <Image v-else-if="file.type === 'Cover'" class="h-4 w-4" />
                        <FileText v-else class="h-4 w-4" />
                      </span>
                      <div>
                        <p class="font-medium text-app-text">{{ file.filename }}</p>
                        <p class="text-xs text-app-textMuted">{{ selectedProduct?.name }}</p>
                      </div>
                    </div>
                  </td>
                  <td><span class="text-sm text-app-textSecondary">{{ file.type }}</span></td>
                  <td><span class="text-sm font-medium text-app-text">{{ file.version }}</span></td>
                  <td><span class="text-sm text-app-textSecondary">{{ file.size }}</span></td>
                  <td><AppBadge :variant="getStatusVariant(file.status)">{{ file.status }}</AppBadge></td>
                  <td><span class="text-sm text-app-textSecondary">{{ formatDate(file.uploadedAt) }}</span></td>
                  <td>
                    <div class="flex min-w-[8rem] items-center gap-2">
                      <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="archiveFile(file)">Archive</button>
                      <button class="text-sm font-medium text-danger-700 hover:text-danger-800" type="button" @click="removeFile(file.id)">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </AppCard>
      </div>

      <aside class="grid gap-4 content-start">
        <AppCard title="Delivery Settings" description="Configure access rules for the digital package.">
          <div class="grid gap-4">
            <AppSelect id="source-license" v-model="licenseType" label="License type" :options="licenseOptions" />
            <AppInput id="source-download-limit" v-model="downloadLimit" label="Download limit" type="number" placeholder="10" />
            <AppInput id="source-access-duration" v-model="accessDuration" label="Access duration" placeholder="12 months" />
            <AppSelect id="source-delivery-status" v-model="deliveryStatus" label="Delivery status" :options="deliveryOptions" />
          </div>
        </AppCard>

        <AppCard title="Readiness Checklist" description="Launch checks for the selected product source.">
          <div class="grid gap-3">
            <div class="rounded-card border border-app-borderSoft bg-app-muted p-3">
              <div class="flex items-center justify-between gap-3">
                <p class="app-label-text">Ready items</p>
                <AppBadge :variant="readinessCount === readinessItems.length ? 'success' : 'warning'">
                  {{ readinessCount }} / {{ readinessItems.length }}
                </AppBadge>
              </div>
            </div>
            <div v-for="item in readinessItems" :key="item.label" class="flex items-start gap-3 rounded-card border border-app-borderSoft p-3">
              <CheckCircle2 v-if="item.ready" class="mt-0.5 h-4 w-4 text-success-600" aria-hidden="true" />
              <RefreshCcw v-else class="mt-0.5 h-4 w-4 text-warning-600" aria-hidden="true" />
              <div>
                <p class="text-sm font-medium text-app-text">{{ item.label }}</p>
                <p class="text-xs text-app-textMuted">{{ item.ready ? 'Ready' : 'Needs attention' }}</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Selected Product" description="Source context from mock product data.">
          <div class="grid gap-3">
            <div class="flex items-center gap-3 rounded-card border border-app-borderSoft p-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50 text-lg" aria-hidden="true">{{ selectedProduct?.image }}</span>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-app-text">{{ selectedProduct?.name }}</p>
                <p class="text-xs text-app-textMuted">{{ selectedProduct?.category }} - {{ selectedProduct?.sku }}</p>
              </div>
            </div>
            <div class="rounded-card border border-app-borderSoft p-3">
              <p class="app-label-text">Version note</p>
              <p class="mt-2 text-sm leading-6 text-app-textSecondary">{{ releaseNote }}</p>
            </div>
            <div class="rounded-card border border-app-borderSoft p-3">
              <p class="app-label-text">Package estimate</p>
              <p class="mt-2 text-sm text-app-textSecondary">{{ formatBytes(248 * 1024 * 1024) }} sample package size</p>
            </div>
          </div>
        </AppCard>
      </aside>
    </div>
  </div>
</template>
