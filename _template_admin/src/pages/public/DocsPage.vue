<template>
  <div class="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
    <DocsSidebar />
    <main class="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div class="mx-auto max-w-3xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Documentation</h1>
          <p class="mt-3 text-lg text-gray-600">
            Everything you need to get started with Nata Admin — from installation to customization.
          </p>
        </div>
        <section
          v-for="section in docSections"
          :id="section.id"
          :key="section.id"
          class="mb-12 scroll-mt-20"
        >
          <h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
            <component :is="section.icon" class="h-6 w-6 text-primary-600" />
            {{ section.title }}
          </h2>
          <div
            class="prose-custom space-y-5"
            v-html="section.html"
          />
          <hr class="mt-10 border-t border-gray-200" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { docSections } from '@/config/docs.content'
import DocsSidebar from '@/components/public/DocsSidebar.vue'
</script>

<style scoped>
.prose-custom :deep(h3) {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.prose-custom :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose-custom :deep(ul) {
  margin-bottom: 1rem;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.prose-custom :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.25rem;
  list-style-type: decimal;
}

.prose-custom :deep(li) {
  margin-bottom: 0.375rem;
  line-height: 1.6;
  color: #4b5563;
}

.prose-custom :deep(strong) {
  font-weight: 600;
  color: #111827;
}

.prose-custom :deep(code) {
  font-size: 0.8125rem;
}

.prose-custom :deep(table) {
  border-collapse: collapse;
}

.prose-custom :deep(th) {
  background-color: #f9fafb;
}
</style>
