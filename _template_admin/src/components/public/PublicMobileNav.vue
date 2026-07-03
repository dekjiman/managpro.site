<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="$emit('close')"
      />
    </Transition>
    <Transition name="drawer-slide">
      <div
        v-if="open"
        class="fixed inset-y-0 left-0 z-50 w-72 border-r border-gray-200 bg-white shadow-lg md:hidden"
      >
        <div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <a href="/" class="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <LayoutDashboard class="h-5 w-5 text-primary-600" />
            Nata Admin
          </a>
          <button
            type="button"
            class="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close navigation menu"
            @click="$emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        <nav class="flex flex-col gap-1 px-3 py-4">
          <a
            v-for="item in landingNavItems"
            :key="item.label"
            :href="item.href"
            class="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600"
            @click="$emit('close')"
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="border-t border-gray-200 px-3 py-4">
          <a
            href="/dashboard"
            class="mb-2 block rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            @click="$emit('close')"
          >
            View Demo
          </a>
          <a
            href="#"
            class="block rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
            @click="$emit('close')"
          >
            Download
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { LayoutDashboard, X } from '@lucide/vue'
import { landingNavItems } from '@/config/landing.config'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(-100%);
}
</style>
