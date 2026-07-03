export type SettingCategory = 'general' | 'profile' | 'company' | 'notification' | 'security' | 'appearance'

export interface SettingField {
  key: string
  label: string
  type: 'text' | 'email' | 'url' | 'select' | 'toggle' | 'color' | 'textarea'
  value: string
  category: SettingCategory
  options?: { label: string; value: string }[]
  helper?: string
}

export interface NotificationPreference {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface ActiveSession {
  id: string
  device: string
  browser: string
  location: string
  ipAddress: string
  lastActive: string
  isCurrent: boolean
}

export interface LoginHistoryEntry {
  id: string
  ipAddress: string
  location: string
  device: string
  browser: string
  timestamp: string
  success: boolean
}
