<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Info } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const showSmall = ref(false)
const showMedium = ref(false)
const showLarge = ref(false)
const showDanger = ref(false)
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Modals" description="Modal component with sizes and variants." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-6 sm:grid-cols-2">
      <AppCard title="Modal Sizes">
        <div class="flex flex-wrap gap-3">
          <AppButton variant="secondary" size="sm" @click="showSmall = true">Small</AppButton>
          <AppButton variant="secondary" size="sm" @click="showMedium = true">Medium</AppButton>
          <AppButton variant="secondary" size="sm" @click="showLarge = true">Large</AppButton>
        </div>
      </AppCard>
      <AppCard title="Modal Variants">
        <div class="flex flex-wrap gap-3">
          <AppButton variant="danger" size="sm" @click="showDanger = true">Danger Modal</AppButton>
        </div>
      </AppCard>
    </div>

    <AppModal :open="showSmall" title="Small Modal" size="sm" @close="showSmall = false">
      <p class="text-sm text-app-textSecondary">This is a small modal. Uses size="sm".</p>
      <template #footer>
        <AppButton variant="secondary" size="sm" @click="showSmall = false">Close</AppButton>
        <AppButton variant="primary" size="sm" @click="showSmall = false">Confirm</AppButton>
      </template>
    </AppModal>

    <AppModal :open="showMedium" title="Medium Modal" size="md" @close="showMedium = false">
      <p class="text-sm text-app-textSecondary">Medium modal with more content. This is the default size and works well for most confirmation dialogs and forms.</p>
      <template #footer>
        <AppButton variant="secondary" size="sm" @click="showMedium = false">Cancel</AppButton>
        <AppButton variant="primary" size="sm" @click="showMedium = false">Save Changes</AppButton>
      </template>
    </AppModal>

    <AppModal :open="showLarge" title="Large Modal" size="lg" @close="showLarge = false">
      <div class="space-y-3">
        <p class="text-sm text-app-textSecondary">Large modal suitable for complex forms, detailed views, or wizards.</p>
        <div class="rounded-lg border border-app-borderSoft bg-app-muted p-3 text-sm text-app-textSecondary">Additional content area.</div>
      </div>
      <template #footer>
        <AppButton variant="secondary" size="sm" @click="showLarge = false">Cancel</AppButton>
        <AppButton variant="primary" size="sm" @click="showLarge = false">Continue</AppButton>
      </template>
    </AppModal>

    <AppModal :open="showDanger" title="Delete Confirmation" size="sm" @close="showDanger = false">
      <div class="flex items-start gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-100 text-danger-600">
          <Info class="h-5 w-5" />
        </div>
        <div>
          <p class="text-sm font-medium text-app-text">Are you sure?</p>
          <p class="mt-1 text-sm text-app-textSecondary">This action cannot be undone. All associated data will be permanently deleted.</p>
        </div>
      </div>
      <template #footer>
        <AppButton variant="secondary" size="sm" @click="showDanger = false">Cancel</AppButton>
        <AppButton variant="danger" size="sm" @click="showDanger = false">Delete</AppButton>
      </template>
    </AppModal>
  </div>
</template>
