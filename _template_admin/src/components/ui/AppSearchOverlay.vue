<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Search, X, Command } from '@lucide/vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.open,
  (val) => {
    if (val) {
      query.value = ''
      nextTick(() => searchInput.value?.focus())
    }
  },
)

function onBackdropClick() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]"
        @keydown="onKeydown"
      >
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="onBackdropClick" />

        <div class="relative w-full max-w-xl px-3 sm:px-4">
          <div class="flex items-center gap-3 rounded-xl border border-app-borderSoft bg-app-card px-4 py-3.5 shadow-2xl">
            <Search class="h-5 w-5 shrink-0 text-app-textMuted" aria-hidden="true" />
            <input
              ref="searchInput"
              v-model="query"
              class="flex-1 border-0 bg-transparent text-base text-app-text outline-none placeholder:text-app-textMuted"
              placeholder="Search pages, reports, settings..."
            />
            <span class="hidden shrink-0 items-center gap-1 rounded-md border border-app-borderSoft px-1.5 py-0.5 text-xs text-app-textMuted sm:flex">
              <Command class="h-3 w-3" aria-hidden="true" />
              K
            </span>
            <button
              class="rounded-lg p-1.5 text-app-textMuted hover:bg-app-muted hover:text-app-text"
              type="button"
              aria-label="Close search"
              @click="emit('close')"
            >
              <X class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div v-if="query" class="mt-2 rounded-xl border border-app-borderSoft bg-app-card p-2 shadow-lg">
            <p class="p-3 text-sm text-app-textMuted">No results found</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.15s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
