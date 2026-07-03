<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const typeScale = [
  { tag: 'h1', label: 'Page Title', size: '24px / 700', class: 'text-2xl font-bold' },
  { tag: 'h2', label: 'Section', size: '18px / 600', class: 'text-lg font-semibold' },
  { tag: 'h3', label: 'Card Title', size: '16px / 600', class: 'text-base font-semibold' },
  { tag: 'p', label: 'Body', size: '15px / 400', class: 'text-[15px] font-normal' },
  { tag: 'td', label: 'Table Cell', size: '14px / 400', class: 'text-sm font-normal' },
  { tag: 'th', label: 'Table Header', size: '12px / 600', class: 'text-xs font-semibold uppercase tracking-wider' },
  { tag: 'label', label: 'Form Label', size: '13px / 500', class: 'text-[13px] font-medium' },
  { tag: 'button', label: 'Button', size: '14px / 500', class: 'text-sm font-medium' },
  { tag: 'span', label: 'Badge', size: '12px / 500', class: 'text-xs font-medium' },
]

const fontWeights = [
  { weight: 400, name: 'Regular', class: 'font-normal' },
  { weight: 500, name: 'Medium', class: 'font-medium' },
  { weight: 600, name: 'Semibold', class: 'font-semibold' },
  { weight: 700, name: 'Bold', class: 'font-bold' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Typography" description="Typography scale following Inter font system." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Type Scale</h2>
        <div class="rounded-lg border border-app-borderSoft">
          <div v-for="(item, idx) in typeScale" :key="item.tag" class="flex items-center border-b border-app-borderSoft px-4 py-3 last:border-b-0" :class="idx % 2 === 0 ? 'bg-app-muted' : ''">
            <div class="w-24 text-xs font-medium text-app-textMuted">{{ item.tag }}</div>
            <div class="w-32 text-xs text-app-textMuted">{{ item.size }}</div>
            <div class="flex-1" :class="item.class">{{ item.label }}</div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Font Weights</h2>
        <div class="grid gap-3 sm:grid-cols-4">
          <div v-for="fw in fontWeights" :key="fw.weight" class="rounded-lg border border-app-borderSoft p-4 text-center">
            <p class="text-lg" :class="fw.class">Inter {{ fw.name }}</p>
            <p class="mt-1 text-xs text-app-textMuted">Weight {{ fw.weight }}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="mb-3 text-lg font-semibold text-app-text">Font Family</h2>
        <div class="rounded-lg border border-app-borderSoft p-4">
          <p class="text-sm text-app-textMuted">Primary: Inter</p>
          <p class="text-sm text-app-textMuted">Fallback: system-ui, sans-serif</p>
        </div>
      </section>
    </div>
  </div>
</template>
