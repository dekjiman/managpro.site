<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { MapPin, CalendarDays } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { formatDate } from '@/utils/format'

const route = useRoute()
const router = useRouter()

const profile = ref({
  name: 'John Carter',
  username: 'johncarter',
  avatar: 'JC',
  email: 'john@example.test',
  phone: '+1 (555) 123-4567',
  role: 'Senior Developer',
  bio: 'Full-stack developer passionate about building clean, accessible, and performant admin interfaces.',
  location: 'San Francisco, CA',
  joinedDate: '2024-03-15',
  socialLinks: [
    { platform: 'GitHub', icon: 'simple-icons:github', url: '#' },
    { platform: 'Twitter', icon: 'simple-icons:x', url: '#' },
    { platform: 'LinkedIn', icon: 'simple-icons:linkedin', url: '#' },
  ],
})

const recentActivity = [
  { id: 1, action: 'Created a new invoice', target: 'INV-2026-0042', time: '2 hours ago' },
  { id: 2, action: 'Updated user permissions', target: 'Roles & Permissions', time: '5 hours ago' },
  { id: 3, action: 'Deployed new release', target: 'v2.4.1', time: '1 day ago' },
  { id: 4, action: 'Reviewed audit logs', target: 'Security', time: '2 days ago' },
  { id: 5, action: 'Added new product', target: 'Wireless Keyboard', time: '3 days ago' },
]

const projects = [
  { name: 'Admin Dashboard', role: 'Lead Developer', status: 'Active', progress: 85 },
  { name: 'Mobile App API', role: 'Backend Developer', status: 'Active', progress: 60 },
  { name: 'Customer Portal', role: 'Full Stack', status: 'Completed', progress: 100 },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Profile" description="User profile with activity and project information." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/system/profile-settings')">Edit Profile</AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 xl:grid-cols-[1fr_2fr]">
      <div class="grid gap-4">
        <AppCard title="Profile Summary">
          <div class="flex flex-col items-center text-center">
            <span class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-2xl font-bold text-primary-700">
              {{ profile.avatar }}
            </span>
            <h2 class="mt-4 text-xl font-bold text-app-text">{{ profile.name }}</h2>
            <p class="text-sm text-app-textMuted">@{{ profile.username }}</p>
            <p class="mt-1 text-sm text-app-textSecondary">{{ profile.role }}</p>
            <AppBadge variant="success" class="mt-2">Active</AppBadge>
            <p class="mt-4 text-sm text-app-textMuted">{{ profile.bio }}</p>
            <div class="mt-4 flex items-center gap-1 text-xs text-app-textSubtle">
              <MapPin class="h-3.5 w-3.5" aria-hidden="true" />
              {{ profile.location }}
            </div>
            <div class="mt-1 flex items-center gap-1 text-xs text-app-textSubtle">
              <CalendarDays class="h-3.5 w-3.5" aria-hidden="true" />
              Joined {{ formatDate(profile.joinedDate) }}
            </div>
          </div>
        </AppCard>

        <AppCard title="Contact">
          <div class="grid gap-3 text-sm">
            <div>
              <p class="text-xs text-app-textSubtle">Email</p>
              <p class="text-app-text">{{ profile.email }}</p>
            </div>
            <div>
              <p class="text-xs text-app-textSubtle">Phone</p>
              <p class="text-app-text">{{ profile.phone }}</p>
            </div>
          </div>
        </AppCard>

        <AppCard title="Social Links">
          <div class="grid gap-2">
            <a v-for="link in profile.socialLinks" :key="link.platform" :href="link.url" class="flex items-center gap-2 rounded-lg border border-app-borderSoft px-3 py-2 text-sm text-app-text hover:bg-app-muted" target="_blank" rel="noopener noreferrer">
              <Icon :icon="link.icon" class="h-5 w-5" aria-hidden="true" />
              {{ link.platform }}
            </a>
          </div>
        </AppCard>
      </div>

      <div class="grid gap-4">
        <AppCard title="Recent Activity">
          <div class="grid gap-3">
            <div v-for="item in recentActivity" :key="item.id" class="flex items-start gap-3 rounded-lg border border-app-borderSoft p-3">
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">{{ item.action.charAt(0) }}</span>
              <div class="flex-1">
                <p class="text-sm text-app-text">{{ item.action }} <span class="font-medium text-primary-700">{{ item.target }}</span></p>
                <p class="text-xs text-app-textMuted">{{ item.time }}</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Projects">
          <div class="grid gap-3">
            <div v-for="project in projects" :key="project.name" class="rounded-lg border border-app-borderSoft p-3">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm font-medium text-app-text">{{ project.name }}</p>
                  <p class="text-xs text-app-textMuted">{{ project.role }}</p>
                </div>
                <AppBadge :variant="project.status === 'Active' ? 'info' : 'success'">{{ project.status }}</AppBadge>
              </div>
              <div class="mt-3">
                <div class="flex items-center justify-between text-xs text-app-textMuted">
                  <span>Progress</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <div class="mt-1 h-2 w-full rounded-full bg-app-borderSoft">
                  <div class="h-2 rounded-full bg-primary-600 transition-all" :style="{ width: `${project.progress}%` }" />
                </div>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
