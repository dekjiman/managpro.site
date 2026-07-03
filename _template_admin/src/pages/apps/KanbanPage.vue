<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CalendarDays, MessageSquare, Paperclip, Plus, Search } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { kanbanColumns, kanbanTasks } from '@/data/mock/kanban.mock'
import { getInitials } from '@/utils/status'
import type { KanbanColumnKey, KanbanPriority } from '@/types/kanban'
import type { StatusVariant } from '@/types/common'

const route = useRoute()

const searchQuery = ref('')
const priorityFilter = ref<KanbanPriority | ''>('')
const selectedTaskId = ref<string | null>(null)
const showCreateModal = ref(false)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskColumn = ref<KanbanColumnKey>('todo')
const newTaskPriority = ref<KanbanPriority>('medium')
const newTaskDueDate = ref('2026-06-30')

const priorityOptions: { label: string; value: KanbanPriority | '' }[] = [
  { label: 'All priorities', value: '' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const filteredTasks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return kanbanTasks.filter((task) => {
    const matchesQuery =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesPriority = !priorityFilter.value || task.priority === priorityFilter.value

    return matchesQuery && matchesPriority
  })
})

const selectedTask = computed(() => {
  if (!selectedTaskId.value) return null
  return kanbanTasks.find((task) => task.id === selectedTaskId.value) || null
})

const boardStats = computed(() => [
  { label: 'Total tasks', value: kanbanTasks.length },
  { label: 'In progress', value: kanbanTasks.filter((task) => task.column === 'in-progress').length },
  { label: 'In review', value: kanbanTasks.filter((task) => task.column === 'review').length },
  { label: 'Done', value: kanbanTasks.filter((task) => task.column === 'done').length },
])

function tasksByColumn(column: KanbanColumnKey) {
  return filteredTasks.value.filter((task) => task.column === column)
}

function priorityVariant(priority: KanbanPriority): StatusVariant {
  switch (priority) {
    case 'urgent':
      return 'danger'
    case 'high':
      return 'warning'
    case 'medium':
      return 'info'
    case 'low':
      return 'neutral'
  }
}

function priorityLabel(priority: KanbanPriority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

function dueDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function openCreateModal(column: KanbanColumnKey = 'todo') {
  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskColumn.value = column
  newTaskPriority.value = 'medium'
  newTaskDueDate.value = '2026-06-30'
  showCreateModal.value = true
}

function createTask() {
  if (!newTaskTitle.value.trim()) return

  kanbanTasks.unshift({
    id: `kanban-${Date.now()}`,
    title: newTaskTitle.value.trim(),
    description: newTaskDescription.value.trim() || 'New task created from the Kanban board sample.',
    column: newTaskColumn.value,
    priority: newTaskPriority.value,
    assignees: [{ id: 'usr-02', name: 'Mika Chen', role: 'Frontend Engineer' }],
    due_date: newTaskDueDate.value,
    tags: ['Sample', 'Kanban'],
    comments_count: 0,
    attachments_count: 0,
  })

  showCreateModal.value = false
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Kanban"
      description="Plan task flow across columns with priorities, ownership, due dates, and progress states."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton @click="openCreateModal()">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Task
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div
        v-for="stat in boardStats"
        :key="stat.label"
        class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card"
      >
        <p class="app-label-text">{{ stat.label }}</p>
        <p class="mt-2 text-2xl font-bold text-app-text">{{ stat.value }}</p>
      </div>
    </div>

    <div class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card">
      <div class="grid gap-3 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div class="relative">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
          <AppInput id="kanban-search" v-model="searchQuery" class="pl-9" placeholder="Search tasks, descriptions, or tags..." aria-label="Search tasks" />
        </div>
        <label class="app-form-group" for="kanban-priority">
          <span class="sr-only">Priority filter</span>
          <select id="kanban-priority" v-model="priorityFilter" class="app-input">
            <option v-for="option in priorityOptions" :key="option.label" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-4">
      <section
        v-for="column in kanbanColumns"
        :key="column.key"
        class="flex min-h-[24rem] flex-col rounded-card border border-app-borderSoft bg-app-muted shadow-card"
      >
        <div class="border-b border-app-borderSoft px-4 py-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="app-card-title">{{ column.title }}</h2>
              <p class="mt-1 text-xs text-app-textMuted">{{ column.description }}</p>
            </div>
            <span class="rounded-full bg-app-card px-2 py-0.5 text-xs font-medium text-app-textMuted">
              {{ tasksByColumn(column.key).length }}
            </span>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-3">
          <button
            class="flex items-center justify-center gap-2 rounded-lg border border-dashed border-app-border bg-app-card px-3 py-2 text-sm font-medium text-app-textSecondary transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            type="button"
            @click="openCreateModal(column.key)"
          >
            <Plus class="h-4 w-4" aria-hidden="true" />
            Add task
          </button>

          <AppEmptyState
            v-if="tasksByColumn(column.key).length === 0"
            title="No tasks here"
            description="Try another filter or add a task to this column."
          />

          <article
            v-for="task in tasksByColumn(column.key)"
            v-else
            :key="task.id"
            class="rounded-lg border border-app-borderSoft bg-app-card p-4 text-left shadow-sm transition-colors hover:border-primary-200"
          >
            <button class="block w-full text-left" type="button" @click="selectedTaskId = task.id">
              <div class="mb-3 flex items-start justify-between gap-3">
                <h3 class="text-sm font-semibold leading-5 text-app-text">{{ task.title }}</h3>
                <AppBadge :variant="priorityVariant(task.priority)">
                  {{ priorityLabel(task.priority) }}
                </AppBadge>
              </div>
              <p class="line-clamp-2 text-sm text-app-textSecondary">{{ task.description }}</p>
            </button>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="tag in task.tags"
                :key="tag"
                class="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-700"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3">
              <div class="flex -space-x-2">
                <span
                  v-for="assignee in task.assignees"
                  :key="assignee.id"
                  class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary-50 text-[11px] font-semibold text-primary-700"
                  :title="assignee.name"
                >
                  {{ getInitials(assignee.name) }}
                </span>
              </div>
              <div class="flex items-center gap-3 text-xs text-app-textMuted">
                <span class="inline-flex items-center gap-1">
                  <MessageSquare class="h-3.5 w-3.5" aria-hidden="true" />
                  {{ task.comments_count }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <Paperclip class="h-3.5 w-3.5" aria-hidden="true" />
                  {{ task.attachments_count }}
                </span>
              </div>
            </div>

            <div class="mt-3 flex items-center gap-1.5 border-t border-app-borderSoft pt-3 text-xs text-app-textMuted">
              <CalendarDays class="h-3.5 w-3.5" aria-hidden="true" />
              <span>Due {{ dueDateLabel(task.due_date) }}</span>
            </div>
          </article>
        </div>
      </section>
    </div>

    <AppModal :open="Boolean(selectedTask)" title="Task Detail" @close="selectedTaskId = null">
      <div v-if="selectedTask" class="grid gap-4">
        <div>
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <AppBadge :variant="priorityVariant(selectedTask.priority)">
              {{ priorityLabel(selectedTask.priority) }}
            </AppBadge>
            <span class="text-sm text-app-textMuted">Due {{ dueDateLabel(selectedTask.due_date) }}</span>
          </div>
          <h2 class="app-section-title">{{ selectedTask.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-app-textSecondary">{{ selectedTask.description }}</p>
        </div>

        <div>
          <p class="app-label-text mb-2">Assignees</p>
          <div class="grid gap-2">
            <div
              v-for="assignee in selectedTask.assignees"
              :key="assignee.id"
              class="flex items-center gap-3 rounded-lg border border-app-borderSoft px-3 py-2"
            >
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                {{ getInitials(assignee.name) }}
              </span>
              <div>
                <p class="text-sm font-medium text-app-text">{{ assignee.name }}</p>
                <p class="text-xs text-app-textMuted">{{ assignee.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-3 rounded-lg bg-app-muted p-3 sm:grid-cols-2">
          <div>
            <p class="app-label-text">Comments</p>
            <p class="mt-1 text-sm font-semibold text-app-text">{{ selectedTask.comments_count }}</p>
          </div>
          <div>
            <p class="app-label-text">Attachments</p>
            <p class="mt-1 text-sm font-semibold text-app-text">{{ selectedTask.attachments_count }}</p>
          </div>
        </div>
      </div>
    </AppModal>

    <AppModal :open="showCreateModal" title="Add Task" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createTask">
        <AppInput id="kanban-task-title" v-model="newTaskTitle" label="Task title" placeholder="Enter task title" required />
        <label class="app-form-group" for="kanban-task-description">
          <span class="app-label">Description</span>
          <textarea id="kanban-task-description" v-model="newTaskDescription" class="app-textarea" placeholder="Describe the task..." />
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="app-form-group" for="kanban-task-column">
            <span class="app-label">Column</span>
            <select id="kanban-task-column" v-model="newTaskColumn" class="app-input">
              <option v-for="column in kanbanColumns" :key="column.key" :value="column.key">
                {{ column.title }}
              </option>
            </select>
          </label>
          <label class="app-form-group" for="kanban-task-priority">
            <span class="app-label">Priority</span>
            <select id="kanban-task-priority" v-model="newTaskPriority" class="app-input">
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>
        <AppInput id="kanban-task-due" v-model="newTaskDueDate" label="Due date" type="date" required />
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Task</AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
