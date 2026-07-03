<template>
  <div
    ref="containerRef"
    class="relative select-none overflow-hidden rounded-lg"
    @mousedown="onDragStart"
    @touchstart.prevent="onDragStart"
    @mousemove="onDragMove"
    @touchmove="onDragMove"
    @mouseup="onDragEnd"
    @mouseleave="onDragEnd"
    @touchend="onDragEnd"
  >
    <img
      :src="leftImage"
      :alt="leftLabel"
      class="block w-full select-none"
      draggable="false"
    />
    <div
      class="absolute inset-0 overflow-hidden"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    >
      <img
        :src="rightImage"
        :alt="rightLabel"
        class="block h-full w-full max-w-none select-none"
        draggable="false"
        :style="{ width: containerWidth ? containerWidth + 'px' : '100%' }"
      />
    </div>
    <div
      class="absolute inset-y-0 w-0.5 bg-white shadow-lg"
      :style="{ left: `calc(${position}% - 1px)` }"
    >
      <div
        class="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white shadow-md"
      >
        <ChevronLeft class="h-3.5 w-3.5 text-gray-600" />
        <ChevronRight class="h-3.5 w-3.5 text-gray-600" />
      </div>
    </div>
    <span
      class="pointer-events-none absolute bottom-3 left-3 rounded bg-black/50 px-2 py-0.5 text-xs font-medium text-white"
    >
      {{ leftLabel }}
    </span>
    <span
      class="pointer-events-none absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 text-xs font-medium text-white"
    >
      {{ rightLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = withDefaults(defineProps<{
  leftImage: string
  rightImage: string
  leftLabel?: string
  rightLabel?: string
  defaultPosition?: number
}>(), {
  leftLabel: 'Light Mode',
  rightLabel: 'Dark Mode',
  defaultPosition: 50,
})

const containerRef = ref<HTMLElement>()
const containerWidth = ref(0)
const position = ref(props.defaultPosition)
const dragging = ref(false)

function getClientX(e: MouseEvent | TouchEvent): number {
  return 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
}

function onDragStart(e: MouseEvent | TouchEvent) {
  dragging.value = true
  const rect = containerRef.value?.getBoundingClientRect()
  if (rect) {
    containerWidth.value = rect.width
    updatePosition(getClientX(e), rect)
  }
}

function onDragMove(e: MouseEvent | TouchEvent) {
  if (!dragging.value) return
  const rect = containerRef.value?.getBoundingClientRect()
  if (rect) {
    containerWidth.value = rect.width
    updatePosition(getClientX(e), rect)
  }
}

function onDragEnd() {
  dragging.value = false
}

function updatePosition(clientX: number, rect: DOMRect) {
  const x = clientX - rect.left
  position.value = Math.max(0, Math.min(100, (x / rect.width) * 100))
}
</script>
