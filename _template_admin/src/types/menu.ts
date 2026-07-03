import type { Component } from 'vue'

export interface AdminMenuItem {
  label: string
  path?: string
  icon?: Component
  badge?: string
  permission?: string
  children?: AdminMenuItem[]
}

export interface AdminMenuGroup {
  label: string
  items: AdminMenuItem[]
}
