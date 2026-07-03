<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Save } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppSelect from '@/components/forms/AppSelect.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import AppCheckbox from '@/components/forms/AppCheckbox.vue'
import AppRadio from '@/components/forms/AppRadio.vue'
import AppSwitch from '@/components/forms/AppSwitch.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const formData = ref({
  name: '',
  email: '',
  role: '',
  bio: '',
  newsletter: false,
  theme: 'light',
  notifications: false,
})
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Forms" description="Form component examples with validation states." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Input Fields</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <AppInput id="form-name" v-model="formData.name" label="Full Name" placeholder="Enter your full name" helper="This will appear on your profile." />
          </div>
          <div>
            <AppInput id="form-email" v-model="formData.email" label="Email Address" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Select & Textarea</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <AppSelect id="form-role" v-model="formData.role" label="Role" :options="[{ label: 'Select role', value: '' }, { label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }, { label: 'User', value: 'user' }]" placeholder="Select role" />
          </div>
          <div>
            <AppTextarea id="form-bio" v-model="formData.bio" label="Bio" placeholder="Write a short bio..." :rows="3" />
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Input States</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <AppInput id="input-disabled" :model-value="'Disabled'" label="Disabled" disabled />
          </div>
          <div>
            <AppInput id="input-error" :model-value="'invalid'" label="With Error" error="This field has an error." />
          </div>
          <div>
            <AppInput id="input-success" :model-value="'valid value'" label="With Success" success="Looks good!" />
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Toggle & Selection</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <AppCheckbox id="form-newsletter" v-model="formData.newsletter" label="Subscribe to newsletter" />
          </div>
          <div>
            <p class="mb-2 text-xs font-medium text-app-textMuted">Theme</p>
            <AppRadio id="theme-light" v-model="formData.theme" name="theme" value="light" label="Light" />
            <AppRadio id="theme-dark" v-model="formData.theme" name="theme" value="dark" label="Dark" class="mt-1" />
          </div>
          <div>
            <AppSwitch id="form-notifications" v-model="formData.notifications" label="Enable notifications" />
          </div>
        </div>
      </section>
      <section>
        <AppButton variant="primary">
          <Save class="mr-1 h-4 w-4" /> Submit Form
        </AppButton>
      </section>
    </div>
  </div>
</template>
