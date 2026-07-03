<template>
  <section class="py-10 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mt-12">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div class="flex items-center gap-1.5 border-b border-gray-200 px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-red-400" />
            <span class="h-3 w-3 rounded-full bg-yellow-400" />
            <span class="h-3 w-3 rounded-full bg-green-400" />
            <span class="ml-2 text-xs font-medium text-gray-400">nata-admin.local</span>
          </div>
          <ImageCompareSlider
            left-image="/src/assets/images/dashboard-light.png"
            right-image="/src/assets/images/dashboard-dark.png"
            left-label="Light Mode"
            right-label="Dark Mode"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ImageCompareSlider from './ImageCompareSlider.vue'
</script>
