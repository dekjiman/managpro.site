<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="/" class="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <LayoutDashboard class="h-5 w-5 text-primary-600" />
        Nata Admin
      </a>
      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in landingNavItems"
          :key="item.label"
          :href="item.href"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
        >
          {{ item.label }}
        </a>
      </nav>
      <div class="hidden items-center gap-3 md:flex">
        <a
          href="/dashboard"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View Demo
        </a>
        <a
          href="#"
          class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Download
        </a>
      </div>
      <button
        type="button"
        class="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        aria-label="Toggle navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" class="h-5 w-5" />
        <X v-else class="h-5 w-5" />
      </button>
    </div>
    <PublicMobileNav :open="mobileOpen" @close="mobileOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutDashboard, Menu, X } from '@lucide/vue'
import { landingNavItems } from '@/config/landing.config'
import PublicMobileNav from './PublicMobileNav.vue'

const mobileOpen = ref(false)
const headerRef = ref<HTMLElement>()
</script>
