<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const colorGroups = [
  {
    title: 'Primary',
    colors: [
      { name: '50', class: 'bg-primary-50', text: 'text-primary-900' },
      { name: '100', class: 'bg-primary-100', text: 'text-primary-900' },
      { name: '200', class: 'bg-primary-200', text: 'text-primary-800' },
      { name: '300', class: 'bg-primary-300', text: 'text-primary-800' },
      { name: '400', class: 'bg-primary-400', text: 'text-white' },
      { name: '500', class: 'bg-primary-500', text: 'text-white' },
      { name: '600', class: 'bg-primary-600', text: 'text-white' },
      { name: '700', class: 'bg-primary-700', text: 'text-white' },
      { name: '800', class: 'bg-primary-800', text: 'text-white' },
      { name: '900', class: 'bg-primary-900', text: 'text-white' },
    ],
  },
  {
    title: 'Gray',
    colors: [
      { name: '50', class: 'bg-gray-50', text: 'text-gray-900' },
      { name: '100', class: 'bg-gray-100', text: 'text-gray-900' },
      { name: '200', class: 'bg-gray-200', text: 'text-gray-800' },
      { name: '300', class: 'bg-gray-300', text: 'text-gray-800' },
      { name: '400', class: 'bg-gray-400', text: 'text-white' },
      { name: '500', class: 'bg-gray-500', text: 'text-white' },
      { name: '600', class: 'bg-gray-600', text: 'text-white' },
      { name: '700', class: 'bg-gray-700', text: 'text-white' },
      { name: '800', class: 'bg-gray-800', text: 'text-white' },
      { name: '900', class: 'bg-gray-900', text: 'text-white' },
    ],
  },
  {
    title: 'Semantic',
    colors: [
      { name: 'Success', class: 'bg-success-500', text: 'text-white' },
      { name: 'Info', class: 'bg-info-500', text: 'text-white' },
      { name: 'Warning', class: 'bg-warning-500', text: 'text-white' },
      { name: 'Danger', class: 'bg-danger-500', text: 'text-white' },
    ],
  },
  {
    title: 'Neutral',
    colors: [
      { name: 'Surface', class: 'bg-app-surface', text: 'text-app-text', border: 'border border-app-borderSoft' },
      { name: 'Card', class: 'bg-app-card', text: 'text-app-text', border: 'border border-app-borderSoft' },
      { name: 'Muted', class: 'bg-app-muted', text: 'text-app-text', border: 'border border-app-borderSoft' },
      { name: 'Border', class: 'bg-app-borderSoft', text: 'text-app-text' },
    ],
  },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Colors" description="Design token color palette used across the template." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div class="grid gap-8">
      <div v-for="group in colorGroups" :key="group.title">
        <h2 class="mb-3 text-lg font-semibold text-app-text">{{ group.title }}</h2>
        <div class="grid gap-2" :class="group.title === 'Semantic' || group.title === 'Neutral' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5'">
          <div v-for="color in group.colors" :key="color.name" :class="[color.class, color.border || '', color.text, 'rounded-lg p-4']">
            <p class="text-sm font-medium">{{ color.name }}</p>
            <p v-if="color.class.includes('primary') || color.class.includes('gray')" class="mt-1 text-xs opacity-70">{{ color.class.replace('bg-', '').replace(' text-*', '') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
