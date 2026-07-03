<template>
  <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
    <button
      type="button"
      class="flex w-full items-center justify-between px-6 py-4 text-left"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="text-sm font-medium text-gray-900">{{ question }}</span>
      <ChevronDown
        class="h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      />
    </button>
    <Transition name="accordion">
      <div v-if="open" class="border-t border-gray-100 px-6 py-4">
        <p class="text-sm leading-relaxed text-gray-600">{{ answer }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'

const props = defineProps<{
  question: string
  answer: string
  defaultOpen?: boolean
}>()

const open = ref(props.defaultOpen ?? false)
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
