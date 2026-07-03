import type { StatusVariant } from '@/types/common'

const statusMap: Record<string, StatusVariant> = {
  active: 'success',
  completed: 'success',
  paid: 'success',
  connected: 'success',
  published: 'success',
  pending: 'warning',
  draft: 'warning',
  overdue: 'warning',
  failed: 'danger',
  suspended: 'danger',
  revoked: 'danger',
  inactive: 'neutral',
  archived: 'neutral',
  open: 'info',
  processing: 'info',
}

export function getStatusVariant(status?: string): StatusVariant {
  return statusMap[String(status || '').toLowerCase()] || 'neutral'
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
