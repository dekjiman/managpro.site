<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeft, ChevronRight, Plus } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import { calendarEvents } from '@/data/mock/calendar.mock'
import type { CalendarEvent, EventCategory } from '@/types/calendar'

const route = useRoute()

const currentDate = ref(new Date())
const selectedDate = ref<string | null>(null)
const showCreateModal = ref(false)

const newEventTitle = ref('')
const newEventTime = ref('')
const newEventCategory = ref<EventCategory>('meeting')

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const monthName = computed(() =>
  currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)

const today = new Date()
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

type DayCell = {
  day: number
  dateStr: string
  isCurrentMonth: boolean
  events: CalendarEvent[]
}

const calendarDays = computed(() => {
  const firstDay = new Date(year.value, month.value, 1)
  const lastDay = new Date(year.value, month.value + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7
  const cells: DayCell[] = []

  for (let i = 0; i < totalCells; i++) {
    let day: number
    let dateObj: Date
    let isCurrentMonth: boolean

    if (i < startOffset) {
      const prevMonth = new Date(year.value, month.value, 0)
      day = prevMonth.getDate() - startOffset + i + 1
      dateObj = new Date(year.value, month.value - 1, day)
      isCurrentMonth = false
    } else if (i >= startOffset + daysInMonth) {
      day = i - startOffset - daysInMonth + 1
      dateObj = new Date(year.value, month.value + 1, day)
      isCurrentMonth = false
    } else {
      day = i - startOffset + 1
      dateObj = new Date(year.value, month.value, day)
      isCurrentMonth = true
    }

    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
    const events = calendarEvents.filter((e) => e.date === dateStr)

    cells.push({ day, dateStr, isCurrentMonth, events })
  }

  return cells
})

const selectedDayEvents = computed(() => {
  if (!selectedDate.value) return []
  return calendarEvents.filter((e) => e.date === selectedDate.value)
})

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}

function selectDate(dateStr: string) {
  selectedDate.value = dateStr === selectedDate.value ? null : dateStr
}

function openCreateModal(dateStr?: string) {
  selectedDate.value = dateStr || selectedDate.value
  newEventTitle.value = ''
  newEventTime.value = ''
  newEventCategory.value = 'meeting'
  showCreateModal.value = true
}

function createEvent() {
  if (!newEventTitle.value.trim() || !selectedDate.value) return
  const nextId = `evt-${String(calendarEvents.length + 1).padStart(2, '0')}`
  calendarEvents.push({
    id: nextId,
    title: newEventTitle.value.trim(),
    date: selectedDate.value,
    time: newEventTime.value || undefined,
    category: newEventCategory.value,
  })
  showCreateModal.value = false
}

function categoryColor(cat: EventCategory) {
  switch (cat) {
    case 'meeting': return 'bg-primary-500'
    case 'personal': return 'bg-info-500'
    case 'deadline': return 'bg-warning-500'
    case 'holiday': return 'bg-success-500'
    case 'out-of-office': return 'bg-secondary-500'
  }
}

function categoryBg(cat: EventCategory) {
  switch (cat) {
    case 'meeting': return 'bg-primary-50 text-primary-700'
    case 'personal': return 'bg-info-50 text-info-700'
    case 'deadline': return 'bg-warning-50 text-warning-800'
    case 'holiday': return 'bg-success-50 text-success-700'
    case 'out-of-office': return 'bg-secondary-100 text-secondary-700'
  }
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Calendar" description="Manage your schedule, events, and deadlines." :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <!-- Navigation -->
      <div class="flex items-center justify-between border-b border-app-borderSoft px-4 py-3">
        <div class="flex items-center gap-2">
          <button class="flex h-8 w-8 items-center justify-center rounded-lg text-app-textSecondary transition-colors hover:bg-app-muted hover:text-app-text" type="button" aria-label="Previous month" @click="prevMonth">
            <ChevronLeft class="h-4 w-4" aria-hidden="true" />
          </button>
          <h2 class="app-section-title min-w-[12rem] text-center text-base">{{ monthName }}</h2>
          <button class="flex h-8 w-8 items-center justify-center rounded-lg text-app-textSecondary transition-colors hover:bg-app-muted hover:text-app-text" type="button" aria-label="Next month" @click="nextMonth">
            <ChevronRight class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <AppButton size="sm" @click="openCreateModal()">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Event
        </AppButton>
      </div>

      <!-- Grid -->
      <div>
        <div class="grid grid-cols-7 border-b border-app-borderSoft">
          <div v-for="day in weekDays" :key="day" class="app-label-text border-r border-app-borderSoft px-2 py-2 text-center last:border-r-0">
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7">
          <button
            v-for="(cell, idx) in calendarDays"
            :key="idx"
            class="min-h-[5rem] border-b border-r border-app-borderSoft p-1.5 text-left transition-colors hover:bg-app-muted last:border-r-0"
            :class="{
              'bg-primary-50/20': cell.dateStr === todayStr,
              'bg-primary-50': cell.dateStr === selectedDate,
              'opacity-40': !cell.isCurrentMonth,
            }"
            type="button"
            @click="selectDate(cell.dateStr)"
          >
            <span
              class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs"
              :class="{
                'bg-primary-600 text-white': cell.dateStr === todayStr,
                'text-app-textSecondary': cell.dateStr !== todayStr,
              }"
            >
              {{ cell.day }}
            </span>
            <div class="mt-1 space-y-0.5">
              <div
                v-for="evt in cell.events.slice(0, 3)"
                :key="evt.id"
                class="truncate rounded px-1 py-0.5 text-xs font-medium"
                :class="categoryBg(evt.category)"
              >
                {{ evt.title }}
              </div>
              <div v-if="cell.events.length > 3" class="text-xs text-app-textMuted">
                +{{ cell.events.length - 3 }} more
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Selected Day Events -->
      <div v-if="selectedDate" class="border-t border-app-borderSoft px-4 py-3">
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-app-text">
            Events on {{ new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
          </h3>
          <AppButton size="sm" @click="openCreateModal()">
            <Plus class="mr-1 h-3 w-3" aria-hidden="true" />
            Add
          </AppButton>
        </div>
        <div v-if="selectedDayEvents.length === 0" class="py-2 text-sm text-app-textMuted">
          No events on this day.
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="evt in selectedDayEvents"
            :key="evt.id"
            class="flex items-center gap-3 rounded-lg border border-app-borderSoft px-3 py-2"
          >
            <span class="h-3 w-3 shrink-0 rounded-full" :class="categoryColor(evt.category)" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-app-text">{{ evt.title }}</p>
              <p class="text-xs text-app-textMuted">
                <template v-if="evt.all_day">All day</template>
                <template v-else-if="evt.time && evt.end_time">{{ evt.time }} – {{ evt.end_time }}</template>
                <template v-else-if="evt.time">{{ evt.time }}</template>
              </p>
            </div>
            <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium" :class="categoryBg(evt.category)">{{ evt.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <AppModal :open="showCreateModal" title="Create Event" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createEvent">
        <AppInput id="evt-title" v-model="newEventTitle" label="Event Title" placeholder="Enter title" required />
        <AppInput id="evt-time" v-model="newEventTime" label="Time" placeholder="e.g. 14:00" type="time" />
        <label class="app-form-group" for="evt-category">
          <span class="app-label">Category</span>
          <select id="evt-category" v-model="newEventCategory" class="app-input">
            <option value="meeting">Meeting</option>
            <option value="personal">Personal</option>
            <option value="deadline">Deadline</option>
            <option value="holiday">Holiday</option>
            <option value="out-of-office">Out of Office</option>
          </select>
        </label>
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Event</AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
