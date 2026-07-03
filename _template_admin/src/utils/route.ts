import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { AdminMenuItem } from '@/types/menu'

export function isMenuItemActive(item: AdminMenuItem, route: RouteLocationNormalizedLoaded) {
  if (item.path === route.path) return true
  return item.children?.some((child) => child.path === route.path) || false
}
