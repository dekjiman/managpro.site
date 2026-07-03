<template>
  <section class="bg-gray-50 py-16 sm:py-24">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Frequently asked questions.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Quick answers to common questions about Nata Admin.
        </p>
      </div>
      <div class="mt-12 space-y-3">
        <FaqAccordion
          v-for="(item, index) in faqItems"
          :key="index"
          :question="item.question"
          :answer="item.answer"
          :default-open="index === 0"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { faqItems } from '@/config/landing.config'
import FaqAccordion from './FaqAccordion.vue'
</script>
