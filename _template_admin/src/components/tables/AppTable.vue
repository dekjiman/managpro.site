<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDown, ArrowUp, ChevronsUpDown, LoaderCircle } from '@lucide/vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import type { DataRow, TableColumn } from '@/types/common'
import { formatCurrency, formatDate } from '@/utils/format'
import { getStatusVariant } from '@/utils/status'

const props = withDefaults(defineProps<{
  columns: TableColumn[]
  rows: DataRow[]
  loading?: boolean
  error?: string
  selectable?: boolean
  selectedRows?: string[]
}>(), {
  loading: false,
  error: '',
  selectable: false,
  selectedRows: () => [],
})

const emit = defineEmits<{
  'update:selectedRows': [ids: string[]]
}>()

const sortKey = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const left = a[sortKey.value]
    const right = b[sortKey.value]
    const result = typeof left === 'number' && typeof right === 'number'
      ? left - right
      : String(left ?? '').localeCompare(String(right ?? ''))
    return sortDirection.value === 'asc' ? result : -result
  })
})

const visibleIds = computed(() => sortedRows.value.map((row) => String(row.id)).filter(Boolean))
const allSelected = computed(() => visibleIds.value.length > 0 && visibleIds.value.every((id) => props.selectedRows.includes(id)))

function toggleSort(column: TableColumn) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    return
  }
  sortKey.value = column.key
  sortDirection.value = 'asc'
}

function toggleRow(id: string) {
  const next = props.selectedRows.includes(id)
    ? props.selectedRows.filter((rowId) => rowId !== id)
    : [...props.selectedRows, id]
  emit('update:selectedRows', next)
}

function toggleAll() {
  emit('update:selectedRows', allSelected.value ? [] : visibleIds.value)
}

function displayValue(row: DataRow, column: TableColumn) {
  const value = row[column.key]
  if (value === undefined || value === '') return '-'
  if (column.type === 'currency') return formatCurrency(Number(value))
  if (column.type === 'date') return formatDate(String(value))
  return String(value)
}
</script>

<template>
  <div class="app-table-wrapper">
    <div v-if="loading" class="flex min-h-48 items-center justify-center gap-2 p-6 text-sm text-app-textMuted">
      <LoaderCircle class="h-4 w-4 animate-spin" aria-hidden="true" />
      Loading table data...
    </div>
    <div v-else-if="error" class="p-4">
      <AppEmptyState title="Unable to load data" :description="error" />
    </div>
    <table v-else-if="sortedRows.length" class="app-table">
      <thead>
        <tr>
          <th v-if="selectable" scope="col" class="w-10">
            <input
              class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
              type="checkbox"
              :checked="allSelected"
              aria-label="Select all rows"
              @change="toggleAll"
            />
          </th>
          <th v-for="column in columns" :key="column.key" scope="col">
            <button
              v-if="column.sortable"
              class="inline-flex items-center gap-1 font-semibold text-inherit"
              type="button"
              @click="toggleSort(column)"
            >
              {{ column.label }}
              <ArrowUp v-if="sortKey === column.key && sortDirection === 'asc'" class="h-3.5 w-3.5" aria-hidden="true" />
              <ArrowDown v-else-if="sortKey === column.key && sortDirection === 'desc'" class="h-3.5 w-3.5" aria-hidden="true" />
              <ChevronsUpDown v-else class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            </button>
            <span v-else>{{ column.label }}</span>
          </th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedRows" :key="String(row.id)" :class="selectedRows.includes(String(row.id)) && 'bg-primary-50'">
          <td v-if="selectable">
            <input
              class="h-4 w-4 rounded border-app-border text-primary-600 focus:ring-primary-500"
              type="checkbox"
              :checked="selectedRows.includes(String(row.id))"
              :aria-label="`Select row ${String(row.id)}`"
              @change="toggleRow(String(row.id))"
            />
          </td>
          <td v-for="column in columns" :key="column.key">
            <AppBadge v-if="column.type === 'badge'" :variant="getStatusVariant(String(row[column.key]))">
              {{ displayValue(row, column) }}
            </AppBadge>
            <span v-else>{{ displayValue(row, column) }}</span>
          </td>
          <td>
            <slot name="actions" :row="row">
              <button class="text-sm font-medium text-primary-700 hover:text-primary-800" type="button">View</button>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="p-4">
      <AppEmptyState title="No rows to display" description="Reset filters or add sample data to continue." />
    </div>
  </div>
</template>
