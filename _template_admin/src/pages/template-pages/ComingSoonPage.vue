<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Rocket } from '@lucide/vue'
import { useUiStore } from '@/app/stores/ui.store'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'

const uiStore = useUiStore()
const email = ref('')

function notifyMe() {
  if (!email.value.trim()) return
  uiStore.pushToast({ title: "We'll notify you when we launch!", type: 'success' })
  email.value = ''
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center">
    <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
      <Rocket class="h-10 w-10" aria-hidden="true" />
    </div>
    <h1 class="mt-6 text-3xl font-bold text-app-text">Coming Soon</h1>
    <p class="mx-auto mt-3 max-w-md text-app-textMuted">
      We are working on something exciting. Stay tuned for updates and be the first to know when we launch.
    </p>
    <form class="mt-8 flex w-full max-w-sm gap-2" @submit.prevent="notifyMe">
      <AppInput id="coming-soon-email" v-model="email" placeholder="Enter your email" type="email" required />
      <AppButton type="submit">Notify Me</AppButton>
    </form>
    <RouterLink class="mt-8 inline-flex" to="/dashboard">
      <AppButton variant="secondary">Back to Dashboard</AppButton>
    </RouterLink>
  </div>
</template>
