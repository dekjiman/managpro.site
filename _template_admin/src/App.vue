<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAppStore } from '@/app/stores/app.store'
import AdminLayout from '@/app/layouts/AdminLayout.vue'
import AuthLayout from '@/app/layouts/AuthLayout.vue'
import BlankLayout from '@/app/layouts/BlankLayout.vue'
import PublicLayout from '@/app/layouts/PublicLayout.vue'
import AppToast from '@/components/feedback/AppToast.vue'

const appStore = useAppStore()
const route = useRoute()
const layout = computed(() => {
  const layouts = {
    admin: AdminLayout,
    auth: AuthLayout,
    blank: BlankLayout,
    public: PublicLayout,
  }
  return layouts[route.meta.layout || 'admin']
})

onMounted(() => {
  appStore.initTheme()
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
  <AppToast />
</template>
