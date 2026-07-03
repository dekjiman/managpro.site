<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { CalendarDays } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'

const route = useRoute()
const router = useRouter()

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  category: string
}

const events: TimelineEvent[] = [
  { id: 1, date: '2026-06-14', title: 'Platform v2.5 Released', description: 'Major update with new dashboard components, improved table filtering, and performance optimizations across the admin interface.', category: 'Release' },
  { id: 2, date: '2026-06-12', title: 'Team Milestone: 10K Users', description: 'The platform crossed 10,000 registered users. Celebrating this achievement with the team.', category: 'Milestone' },
  { id: 3, date: '2026-06-10', title: 'Security Audit Completed', description: 'Quarterly security audit completed successfully. All critical vulnerabilities have been addressed.', category: 'Security' },
  { id: 4, date: '2026-06-08', title: 'New Integration: Stripe Connect', description: 'Integrated Stripe Connect for marketplace payment processing. Enables direct payouts to sellers.', category: 'Integration' },
  { id: 5, date: '2026-06-05', title: 'Design System v1.2', description: 'Updated the design system with new component tokens, improved spacing scale, and dark mode preview.', category: 'Design' },
  { id: 6, date: '2026-06-01', title: 'Q2 Planning Session', description: 'Quarterly planning session completed. Key focus areas: performance, accessibility, and new integrations.', category: 'Planning' },
]
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Timeline" description="Key events and milestones in the project history." :breadcrumb="route.meta.breadcrumb as string[]">
      <template #actions>
        <AppButton variant="secondary" @click="router.push('/dashboard')">Back to Dashboard</AppButton>
      </template>
    </AppPageHeader>

    <AppCard>
      <div v-if="events.length === 0" class="py-8 text-center text-sm text-app-textMuted">No timeline events available.</div>
      <div v-else class="relative">
        <div class="absolute left-6 top-0 h-full w-px bg-app-borderSoft" aria-hidden="true" />
        <div class="grid gap-6">
          <div v-for="event in events" :key="event.id" class="relative pl-16">
            <div class="absolute left-4 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-200 bg-app-surface">
              <span class="h-2 w-2 rounded-full bg-primary-600" />
            </div>
            <div class="rounded-lg border border-app-borderSoft p-4 transition hover:shadow-card">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-base font-semibold text-app-text">{{ event.title }}</h3>
                  <p class="mt-1 text-sm text-app-textMuted">{{ event.description }}</p>
                </div>
                <AppBadge variant="info">{{ event.category }}</AppBadge>
              </div>
              <div class="mt-3 flex items-center gap-2 text-xs text-app-textSubtle">
                <CalendarDays class="h-3.5 w-3.5" aria-hidden="true" />
                {{ event.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>
