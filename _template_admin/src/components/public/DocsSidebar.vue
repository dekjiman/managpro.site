<template>
  <aside class="w-full shrink-0 border-b border-gray-200 bg-white lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-72 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-gray-200">
    <div class="p-4 lg:p-5">
      <div class="relative">
        <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          v-model="query"
          type="search"
          placeholder="Search documentation..."
          class="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>
    </div>
    <nav class="px-3 pb-6 lg:px-4">
      <button
        v-for="section in filteredSections"
        :key="section.id"
        type="button"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
        :class="activeId === section.id ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
        @click="scrollTo(section.id)"
      >
        <component :is="section.icon" class="h-4 w-4 shrink-0" />
        {{ section.title }}
      </button>
      <p
        v-if="filteredSections.length === 0"
        class="px-3 py-6 text-center text-sm text-gray-400"
      >
        No documentation found for "{{ query }}".
      </p>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@lucide/vue'
import { docSections } from '@/config/docs.content'

const query = ref('')
const activeId = ref(docSections[0].id)

const filteredSections = computed(() => {
  if (!query.value.trim()) return docSections
  const q = query.value.toLowerCase()
  return docSections.filter(
    (s) => s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q),
  )
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function onScroll() {
  const offset = 120
  let current = docSections[0].id
  for (const section of docSections) {
    const el = document.getElementById(section.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= offset) {
        current = section.id
      }
    }
  }
  activeId.value = current
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScroll, { passive: true })
}
</script>
