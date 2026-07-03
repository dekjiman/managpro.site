<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle2, Clock3, Filter, Plus, Search, X } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppDrawer from '@/components/ui/AppDrawer.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import AppTablePagination from '@/components/tables/AppTablePagination.vue'
import { tasks } from '@/data/mock/tasks.mock'
import { formatDate } from '@/utils/format'
import { getInitials } from '@/utils/status'
import type { StatusVariant } from '@/types/common'
import type { TaskItem, TaskPriority, TaskStatus } from '@/types/task'

const route = useRoute()

const searchQuery = ref('')
const statusFilter = ref<TaskStatus | ''>('')
const priorityFilter = ref<TaskPriority | ''>('')
const assigneeFilter = ref('')
const selectedTaskId = ref<string | null>(null)
const showCreateModal = ref(false)
const currentPage = ref(1)
const pageSize = 8

const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskStatus = ref<TaskStatus>('todo')
const newTaskPriority = ref<TaskPriority>('medium')
const newTaskDueDate = ref('2026-06-30')

const today = new Date('2026-06-14T00:00:00')

const statusOptions: { label: string; value: TaskStatus | '' }[] = [
  { label: 'All status', value: '' },
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Review', value: 'review' },
  { label: 'Completed', value: 'completed' },
]

const priorityOptions: { label: string; value: TaskPriority | '' }[] = [
  { label: 'All priorities', value: '' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const assigneeOptions = computed(() => {
  const names = Array.from(new Set(tasks.map((task) => task.assignee.name)))
  return ['All assignees', ...names]
})

const filteredTasks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesQuery =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.project.toLowerCase().includes(query) ||
      task.tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesStatus = !statusFilter.value || task.status === statusFilter.value
    const matchesPriority = !priorityFilter.value || task.priority === priorityFilter.value
    const matchesAssignee = !assigneeFilter.value || task.assignee.name === assigneeFilter.value

    return matchesQuery && matchesStatus && matchesPriority && matchesAssignee
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / pageSize)))

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTasks.value.slice(start, start + pageSize)
})

const selectedTask = computed(() => {
  if (!selectedTaskId.value) return null
  return tasks.find((task) => task.id === selectedTaskId.value) || null
})

const taskStats = computed(() => [
  { label: 'Total tasks', value: tasks.length, tone: 'primary' },
  { label: 'In progress', value: tasks.filter((task) => task.status === 'in-progress').length, tone: 'info' },
  { label: 'Completed', value: tasks.filter((task) => task.status === 'completed').length, tone: 'success' },
  { label: 'Overdue', value: tasks.filter((task) => isOverdue(task)).length, tone: 'danger' },
])

watch([searchQuery, statusFilter, priorityFilter, assigneeFilter], () => {
  currentPage.value = 1
})

function statusLabel(status: TaskStatus) {
  switch (status) {
    case 'todo':
      return 'To do'
    case 'in-progress':
      return 'In progress'
    case 'review':
      return 'Review'
    case 'completed':
      return 'Completed'
  }
}

function statusVariant(status: TaskStatus): StatusVariant {
  switch (status) {
    case 'completed':
      return 'success'
    case 'review':
      return 'warning'
    case 'in-progress':
      return 'info'
    case 'todo':
      return 'neutral'
  }
}

function priorityLabel(priority: TaskPriority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

function priorityVariant(priority: TaskPriority): StatusVariant {
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

function isOverdue(task: TaskItem) {
  return task.status !== 'completed' && new Date(`${task.due_date}T00:00:00`) < today
}

function openCreateModal() {
  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskStatus.value = 'todo'
  newTaskPriority.value = 'medium'
  newTaskDueDate.value = '2026-06-30'
  showCreateModal.value = true
}

function createTask() {
  if (!newTaskTitle.value.trim()) return

  tasks.unshift({
    id: `task-${Date.now()}`,
    title: newTaskTitle.value.trim(),
    description: newTaskDescription.value.trim() || 'New task created from the task list sample.',
    assignee: { id: 'usr-02', name: 'Mika Chen', role: 'Frontend Engineer' },
    priority: newTaskPriority.value,
    status: newTaskStatus.value,
    due_date: newTaskDueDate.value,
    created_at: '2026-06-14',
    updated_at: '2026-06-14',
    project: 'Apps Experience',
    tags: ['Sample', 'Tasks'],
  })

  showCreateModal.value = false
}

function markCompleted(task: TaskItem) {
  task.status = 'completed'
  task.updated_at = '2026-06-14'
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader
      title="Tasks"
      description="Track task ownership, priority, due dates, and status with list filters and detail review."
      :breadcrumb="route.meta.breadcrumb as string[]"
    >
      <template #actions>
        <AppButton @click="openCreateModal">
          <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
          Add Task
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <div
        v-for="stat in taskStats"
        :key="stat.label"
        class="rounded-card border border-app-borderSoft bg-app-card p-4 shadow-card"
      >
        <p class="app-label-text">{{ stat.label }}</p>
        <div class="mt-2 flex items-center justify-between gap-3">
          <p class="text-2xl font-bold text-app-text">{{ stat.value }}</p>
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg"
            :class="{
              'bg-primary-50 text-primary-700': stat.tone === 'primary',
              'bg-info-50 text-info-700': stat.tone === 'info',
              'bg-success-50 text-success-700': stat.tone === 'success',
              'bg-danger-50 text-danger-700': stat.tone === 'danger',
            }"
          >
            <CheckCircle2 v-if="stat.tone === 'success'" class="h-5 w-5" aria-hidden="true" />
            <Clock3 v-else class="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>

    <section class="rounded-card border border-app-borderSoft bg-app-card shadow-card">
      <div class="border-b border-app-borderSoft p-4">
        <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_12rem_13rem]">
          <div class="relative">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-textMuted" aria-hidden="true" />
            <AppInput id="task-search" v-model="searchQuery" class="pl-9" placeholder="Search tasks, projects, or tags..." aria-label="Search tasks" />
          </div>
          <label class="app-form-group" for="task-status-filter">
            <span class="sr-only">Status filter</span>
            <select id="task-status-filter" v-model="statusFilter" class="app-input">
              <option v-for="option in statusOptions" :key="option.label" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
          <label class="app-form-group" for="task-priority-filter">
            <span class="sr-only">Priority filter</span>
            <select id="task-priority-filter" v-model="priorityFilter" class="app-input">
              <option v-for="option in priorityOptions" :key="option.label" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
          <label class="app-form-group" for="task-assignee-filter">
            <span class="sr-only">Assignee filter</span>
            <select id="task-assignee-filter" v-model="assigneeFilter" class="app-input">
              <option value="">All assignees</option>
              <option v-for="assignee in assigneeOptions.slice(1)" :key="assignee" :value="assignee">
                {{ assignee }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="filteredTasks.length === 0" class="p-4">
        <AppEmptyState title="No matching tasks" description="Reset search or filters to see more task samples.">
          <template #action>
            <AppButton
              variant="secondary"
              size="sm"
              @click="searchQuery = ''; statusFilter = ''; priorityFilter = ''; assigneeFilter = ''"
            >
              <Filter class="mr-1 h-4 w-4" aria-hidden="true" />
              Reset Filters
            </AppButton>
          </template>
        </AppEmptyState>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="app-table">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Assignee</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Due Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in paginatedTasks" :key="task.id" :class="{ 'bg-danger-50/40': isOverdue(task) }">
              <td>
                <div class="min-w-[16rem]">
                  <p class="font-medium text-app-text">{{ task.title }}</p>
                  <p class="mt-1 line-clamp-1 text-xs text-app-textMuted">{{ task.project }}</p>
                </div>
              </td>
              <td>
                <div class="flex min-w-[12rem] items-center gap-3">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                    {{ getInitials(task.assignee.name) }}
                  </span>
                  <div>
                    <p class="font-medium text-app-text">{{ task.assignee.name }}</p>
                    <p class="text-xs text-app-textMuted">{{ task.assignee.role }}</p>
                  </div>
                </div>
              </td>
              <td>
                <AppBadge :variant="priorityVariant(task.priority)">
                  {{ priorityLabel(task.priority) }}
                </AppBadge>
              </td>
              <td>
                <AppBadge :variant="statusVariant(task.status)">
                  {{ statusLabel(task.status) }}
                </AppBadge>
              </td>
              <td>
                <div class="min-w-[8rem]">
                  <p class="text-sm text-app-textSecondary">{{ formatDate(task.due_date) }}</p>
                  <p v-if="isOverdue(task)" class="mt-1 text-xs font-medium text-danger-700">Overdue</p>
                  <p v-else-if="task.status === 'completed'" class="mt-1 text-xs font-medium text-success-700">Completed</p>
                </div>
              </td>
              <td>
                <div class="flex min-w-[9rem] items-center gap-2">
                  <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button" @click="selectedTaskId = task.id">
                    View
                  </button>
                  <button
                    v-if="task.status !== 'completed'"
                    class="text-sm font-medium text-success-700 hover:text-success-800"
                    type="button"
                    @click="markCompleted(task)"
                  >
                    Complete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppTablePagination :page="currentPage" :total-pages="totalPages" @change="currentPage = $event" />
    </section>

    <AppDrawer :open="Boolean(selectedTask)">
      <div v-if="selectedTask" class="flex h-full flex-col">
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <p class="app-label-text mb-2">Task Detail</p>
            <h2 class="app-section-title">{{ selectedTask.title }}</h2>
          </div>
          <button class="app-btn app-btn-ghost app-btn-icon" type="button" aria-label="Close task detail" @click="selectedTaskId = null">
            <X class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div class="flex-1 space-y-5 overflow-y-auto">
          <p class="text-sm leading-6 text-app-textSecondary">{{ selectedTask.description }}</p>

          <div class="flex flex-wrap gap-2">
            <AppBadge :variant="priorityVariant(selectedTask.priority)">
              {{ priorityLabel(selectedTask.priority) }}
            </AppBadge>
            <AppBadge :variant="statusVariant(selectedTask.status)">
              {{ statusLabel(selectedTask.status) }}
            </AppBadge>
            <AppBadge v-if="isOverdue(selectedTask)" variant="danger">Overdue</AppBadge>
          </div>

          <div class="grid gap-3 rounded-lg bg-app-muted p-3">
            <div>
              <p class="app-label-text">Assignee</p>
              <div class="mt-2 flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
                  {{ getInitials(selectedTask.assignee.name) }}
                </span>
                <div>
                  <p class="text-sm font-medium text-app-text">{{ selectedTask.assignee.name }}</p>
                  <p class="text-xs text-app-textMuted">{{ selectedTask.assignee.role }}</p>
                </div>
              </div>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <p class="app-label-text">Project</p>
                <p class="mt-1 text-sm text-app-textSecondary">{{ selectedTask.project }}</p>
              </div>
              <div>
                <p class="app-label-text">Due Date</p>
                <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(selectedTask.due_date) }}</p>
              </div>
              <div>
                <p class="app-label-text">Created</p>
                <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(selectedTask.created_at) }}</p>
              </div>
              <div>
                <p class="app-label-text">Updated</p>
                <p class="mt-1 text-sm text-app-textSecondary">{{ formatDate(selectedTask.updated_at) }}</p>
              </div>
            </div>
          </div>

          <div>
            <p class="app-label-text mb-2">Tags</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in selectedTask.tags"
                :key="tag"
                class="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-700"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-2 border-t border-app-borderSoft pt-4">
          <AppButton v-if="selectedTask.status !== 'completed'" size="sm" @click="markCompleted(selectedTask); selectedTaskId = null">
            Mark Completed
          </AppButton>
          <AppButton variant="secondary" size="sm" @click="selectedTaskId = null">Close</AppButton>
        </div>
      </div>
    </AppDrawer>

    <AppModal :open="showCreateModal" title="Add Task" @close="showCreateModal = false">
      <form class="grid gap-4" @submit.prevent="createTask">
        <AppInput id="task-title" v-model="newTaskTitle" label="Task title" placeholder="Enter task title" required />
        <label class="app-form-group" for="task-description">
          <span class="app-label">Description</span>
          <textarea id="task-description" v-model="newTaskDescription" class="app-textarea" placeholder="Describe the task..." />
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="app-form-group" for="task-status">
            <span class="app-label">Status</span>
            <select id="task-status" v-model="newTaskStatus" class="app-input">
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <label class="app-form-group" for="task-priority">
            <span class="app-label">Priority</span>
            <select id="task-priority" v-model="newTaskPriority" class="app-input">
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>
        <AppInput id="task-due-date" v-model="newTaskDueDate" label="Due date" type="date" required />
        <div class="flex flex-wrap gap-2">
          <AppButton type="submit">Create Task</AppButton>
          <AppButton variant="secondary" type="button" @click="showCreateModal = false">Cancel</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
