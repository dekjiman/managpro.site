<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ChevronDown } from '@lucide/vue'
import type { AdminMenuItem } from '@/types/menu'

const props = defineProps<{
  item: AdminMenuItem
  collapsed?: boolean
}>()

const route = useRoute()
const isOpen = ref(true)
const hasChildren = computed(() => Boolean(props.item.children?.length))
const itemLabel = computed(() => props.item.label)
const active = computed(() => {
  if (props.item.path && route.path === props.item.path) return true
  return props.item.children?.some((child) => child.path === route.path) || false
})

function toggleOpen() {
  if (!props.collapsed) {
    isOpen.value = !isOpen.value
  }
}
</script>

<template>
  <div>
    <button
      v-if="hasChildren"
      class="app-sidebar-item"
      :class="[active && 'app-sidebar-item-active', collapsed && 'app-sidebar-item-collapsed']"
      type="button"
      :aria-label="itemLabel"
      :title="collapsed ? itemLabel : undefined"
      :aria-expanded="!collapsed && isOpen"
      @click="toggleOpen"
    >
      <component :is="item.icon" v-if="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
      <span v-if="!collapsed" class="min-w-0 flex-1 truncate text-left">{{ item.label }}</span>
      <ChevronDown v-if="!collapsed" class="h-4 w-4 transition" :class="isOpen && 'rotate-180'" aria-hidden="true" />
    </button>
    <RouterLink
      v-else-if="item.path"
      class="app-sidebar-item"
      :class="[active && 'app-sidebar-item-active', collapsed && 'app-sidebar-item-collapsed']"
      :to="item.path"
      :aria-label="itemLabel"
      :title="collapsed ? itemLabel : undefined"
    >
      <component :is="item.icon" v-if="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
      <span v-if="!collapsed" class="min-w-0 flex-1 truncate">{{ item.label }}</span>
      <span v-if="item.badge && !collapsed" class="app-badge app-badge-primary">{{ item.badge }}</span>
    </RouterLink>
    <div v-if="hasChildren && isOpen && !collapsed" class="mt-1 grid gap-1 pl-4">
      <AppSidebarItem v-for="child in item.children" :key="child.label" :item="child" />
    </div>
  </div>
</template>
