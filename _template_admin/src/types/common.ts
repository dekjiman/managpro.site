export type StatusVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface StatItem {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'flat'
}

export interface TableColumn {
  key: string
  label: string
  type?: 'text' | 'badge' | 'currency' | 'date'
  sortable?: boolean
}

export type DataRow = Record<string, string | number | boolean | undefined>
