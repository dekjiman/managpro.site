<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  Home, LayoutDashboard, Settings, User, Users, ShoppingCart, Package,
  FileText, BarChart3, Bell, Search, Mail, Calendar, Clock,
  CheckCircle2, AlertCircle, Info, TriangleAlert,
  Plus, Edit, Trash2, Eye, Download, Upload, Save, X,
  ChevronRight, ChevronLeft, ChevronDown, ArrowRight,
  MoreHorizontal, Filter, Star, Heart, Share2, Copy,
  Moon, Sun, Monitor, Grid, List, RefreshCw, Loader2,
  LogOut, Menu, Maximize2, Minimize2,
} from '@lucide/vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()

const groups: { title: string; icons: { name: string; component: object }[] }[] = [
  {
    title: 'Navigation',
    icons: [
      { name: 'Home', component: Home },
      { name: 'LayoutDashboard', component: LayoutDashboard },
      { name: 'Settings', component: Settings },
      { name: 'Menu', component: Menu },
      { name: 'ChevronRight', component: ChevronRight },
      { name: 'ChevronLeft', component: ChevronLeft },
      { name: 'ChevronDown', component: ChevronDown },
      { name: 'ArrowRight', component: ArrowRight },
    ],
  },
  {
    title: 'Actions',
    icons: [
      { name: 'Plus', component: Plus },
      { name: 'Edit', component: Edit },
      { name: 'Trash2', component: Trash2 },
      { name: 'Save', component: Save },
      { name: 'Copy', component: Copy },
      { name: 'Share2', component: Share2 },
      { name: 'Download', component: Download },
      { name: 'Upload', component: Upload },
    ],
  },
  {
    title: 'Content & Data',
    icons: [
      { name: 'User', component: User },
      { name: 'Users', component: Users },
      { name: 'ShoppingCart', component: ShoppingCart },
      { name: 'Package', component: Package },
      { name: 'FileText', component: FileText },
      { name: 'BarChart3', component: BarChart3 },
      { name: 'Mail', component: Mail },
      { name: 'Calendar', component: Calendar },
    ],
  },
  {
    title: 'Feedback',
    icons: [
      { name: 'CheckCircle2', component: CheckCircle2 },
      { name: 'AlertCircle', component: AlertCircle },
      { name: 'Info', component: Info },
      { name: 'TriangleAlert', component: TriangleAlert },
      { name: 'Bell', component: Bell },
      { name: 'Clock', component: Clock },
      { name: 'Star', component: Star },
      { name: 'Heart', component: Heart },
    ],
  },
  {
    title: 'UI Controls',
    icons: [
      { name: 'Search', component: Search },
      { name: 'Filter', component: Filter },
      { name: 'MoreHorizontal', component: MoreHorizontal },
      { name: 'Eye', component: Eye },
      { name: 'X', component: X },
      { name: 'Grid', component: Grid },
      { name: 'List', component: List },
      { name: 'RefreshCw', component: RefreshCw },
    ],
  },
  {
    title: 'Theme & Misc',
    icons: [
      { name: 'Sun', component: Sun },
      { name: 'Moon', component: Moon },
      { name: 'Monitor', component: Monitor },
      { name: 'LogOut', component: LogOut },
      { name: 'Loader2', component: Loader2 },
      { name: 'Maximize2', component: Maximize2 },
      { name: 'Minimize2', component: Minimize2 },
    ],
  },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Icons" description="Lucide icon family — commonly used icons in the template." :breadcrumb="route.meta.breadcrumb as string[]" />
    <div v-for="group in groups" :key="group.title" class="mb-8">
      <h2 class="mb-3 text-lg font-semibold text-app-text">{{ group.title }}</h2>
      <div class="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
        <div v-for="icon in group.icons" :key="icon.name" class="flex flex-col items-center gap-1 rounded-lg border border-app-borderSoft p-3 transition hover:border-primary-300 hover:shadow-sm" :title="icon.name">
          <component :is="icon.component" class="h-5 w-5 text-app-text" aria-hidden="true" />
          <span class="truncate text-[10px] text-app-textMuted">{{ icon.name }}</span>
        </div>
      </div>
    </div>
    <p class="text-sm text-app-textMuted">Full Lucide icon set available via <code class="rounded bg-app-muted px-1.5 py-0.5 font-mono text-xs">@lucide/vue</code>.</p>
  </div>
</template>
