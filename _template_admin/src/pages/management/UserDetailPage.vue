<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, CalendarDays, Clock, Mail, MapPin, Phone, Shield } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { users } from '@/data/mock/users.mock'
import { formatDate } from '@/utils/format'
import { getInitials, getStatusVariant } from '@/utils/status'

const route = useRoute()
const router = useRouter()

const user = computed(() => {
  return users.find((u) => u.id === route.params.id) || null
})

const recentActivity = [
  { action: 'Logged in', date: '2026-06-14 09:15:00' },
  { action: 'Updated profile settings', date: '2026-06-13 14:30:00' },
  { action: 'Exported user report', date: '2026-06-12 11:00:00' },
  { action: 'Changed password', date: '2026-06-10 16:45:00' },
  { action: 'Account created', date: user.value?.joined_date ? `${user.value.joined_date} 10:00:00` : '2026-01-01 10:00:00' },
]

const assignedProjects = [
  { name: 'Admin Dashboard Redesign', role: 'Lead Developer' },
  { name: 'User Management Module', role: 'Contributor' },
  { name: 'API Integration Suite', role: 'Reviewer' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="User Detail" description="View and manage user information." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/management/users')">
          <ArrowLeft class="mr-1 h-4 w-4" aria-hidden="true" />
          Back to Users
        </AppButton>
      </template>
    </AppPageHeader>

    <div v-if="!user" class="flex items-center justify-center py-20">
      <p class="text-app-textMuted">User not found.</p>
    </div>

    <template v-else>
      <AppCard title="Profile Summary" description="Basic user identity and account overview.">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-2xl font-bold text-primary-700">
            {{ getInitials(user.name) }}
          </div>
          <div class="grid flex-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="app-label-text">Full Name</p>
              <p class="mt-1 text-sm font-medium text-app-text">{{ user.name }}</p>
            </div>
            <div>
              <p class="app-label-text">Email</p>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-app-textSecondary">
                <Mail class="h-3.5 w-3.5" aria-hidden="true" />
                {{ user.email }}
              </p>
            </div>
            <div>
              <p class="app-label-text">Role</p>
              <p class="mt-1 text-sm font-medium text-app-text">{{ user.role }}</p>
            </div>
            <div>
              <p class="app-label-text">Status</p>
              <div class="mt-1">
                <AppBadge :variant="getStatusVariant(user.status)">{{ user.status }}</AppBadge>
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      <div class="grid gap-4 xl:grid-cols-3">
        <AppCard title="Contact Information" description="User contact details.">
          <div class="grid gap-3">
            <div class="flex items-center gap-3">
              <Mail class="h-4 w-4 text-app-textMuted" aria-hidden="true" />
              <span class="text-sm text-app-textSecondary">{{ user.email }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="h-4 w-4 text-app-textMuted" aria-hidden="true" />
              <span class="text-sm text-app-textSecondary">{{ user.phone || '—' }}</span>
            </div>
            <div class="flex items-center gap-3">
              <MapPin class="h-4 w-4 text-app-textMuted" aria-hidden="true" />
              <span class="text-sm text-app-textSecondary">{{ user.location || '—' }}</span>
            </div>
          </div>
        </AppCard>

        <AppCard title="Account Status" description="Membership and security details.">
          <div class="grid gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-app-textSecondary">Member since</span>
              <span class="flex items-center gap-1.5 text-sm font-medium text-app-text">
                <CalendarDays class="h-3.5 w-3.5" aria-hidden="true" />
                {{ formatDate(user.joined_date) }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-app-textSecondary">Last active</span>
              <span class="flex items-center gap-1.5 text-sm font-medium text-app-text">
                <Clock class="h-3.5 w-3.5" aria-hidden="true" />
                {{ formatDate(user.last_active) }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-app-textSecondary">2FA</span>
              <AppBadge variant="success">Enabled</AppBadge>
            </div>
          </div>
        </AppCard>

        <AppCard title="Security" description="Password and authentication sample.">
          <div class="flex items-center gap-3 rounded-lg border border-app-borderSoft p-3">
            <Shield class="h-8 w-8 text-app-textMuted" aria-hidden="true" />
            <div>
              <p class="text-sm font-medium text-app-text">Password</p>
              <p class="text-xs text-app-textMuted">Last changed 3 months ago</p>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <AppButton variant="secondary" size="sm">Reset Password</AppButton>
            <AppButton v-if="user.status === 'Active'" variant="danger" size="sm">Suspend User</AppButton>
          </div>
        </AppCard>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <AppCard title="Recent Activity" description="Latest actions and events.">
          <div class="space-y-1">
            <div v-for="(activity, idx) in recentActivity" :key="idx" class="flex items-start gap-3 rounded-lg p-2 hover:bg-app-muted">
              <div class="mt-1 h-2 w-2 rounded-full bg-primary-400" />
              <div class="flex-1">
                <p class="text-sm font-medium text-app-text">{{ activity.action }}</p>
                <p class="text-xs text-app-textMuted">{{ activity.date }}</p>
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard title="Assigned Projects" description="Projects this user is involved with.">
          <div class="grid gap-2">
            <div v-for="project in assignedProjects" :key="project.name" class="flex items-center justify-between rounded-lg border border-app-borderSoft p-3">
              <div>
                <p class="text-sm font-medium text-app-text">{{ project.name }}</p>
                <p class="text-xs text-app-textMuted">{{ project.role }}</p>
              </div>
              <span class="text-xs text-app-textMuted">Active</span>
            </div>
          </div>
        </AppCard>
      </div>
    </template>
  </div>
</template>
