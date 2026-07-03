<template>
  <section class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-12 text-center sm:px-16 sm:py-16">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start building your admin dashboard today.
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-lg text-primary-100">
          Use Nata Admin as a clean, customizable foundation for your next Vue dashboard project.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/dashboard"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition-colors hover:bg-primary-50"
          >
            <Eye class="h-4 w-4" />
            View Demo
          </a>
          <a
            href="/docs"
            class="inline-flex items-center gap-2 rounded-lg border border-primary-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <BookOpen class="h-4 w-4" />
            Read Docs
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Eye, BookOpen } from '@lucide/vue'
</script>
