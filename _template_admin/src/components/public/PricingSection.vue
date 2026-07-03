<template>
  <section id="pricing" class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose your starting point.
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Pick the package that fits your project. Start free and upgrade when you need more.
        </p>
      </div>
      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        <PricingCard
          v-for="plan in pricingPlans"
          :key="plan.name"
          v-bind="plan"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { pricingPlans } from '@/config/landing.config'
import PricingCard from './PricingCard.vue'
</script>
