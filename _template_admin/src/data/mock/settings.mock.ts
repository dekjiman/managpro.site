import type { NotificationPreference, ActiveSession, LoginHistoryEntry } from '@/types/setting'

export const generalSettings = {
  appName: 'Nata Admin',
  defaultLanguage: 'en',
  timezone: 'UTC',
  dateFormat: 'DD MMM YYYY',
  currency: 'USD',
}

export const profileSettings = {
  name: 'John Carter',
  email: 'john@example.test',
  phone: '+1 (555) 123-4567',
  jobTitle: 'Senior Developer',
  bio: 'Full-stack developer with a passion for building clean, accessible admin interfaces.',
  avatar: 'JC',
}

export const companySettings = {
  name: 'Acme Corporation',
  email: 'contact@acme.test',
  phone: '+1 (555) 987-6543',
  address: '123 Business Ave, Suite 400, San Francisco, CA 94105',
  website: 'https://acme.test',
  taxId: 'TAX-45-7890123',
}

export const notificationPreferences: NotificationPreference[] = [
  { id: 'email-notif', label: 'Email Notifications', description: 'Receive notifications via email for important updates', enabled: true },
  { id: 'push-notif', label: 'Push Notifications', description: 'Receive push notifications in your browser', enabled: false },
  { id: 'security-alert', label: 'Security Alerts', description: 'Get alerted about suspicious login attempts', enabled: true },
  { id: 'weekly-summary', label: 'Weekly Summary', description: 'Receive a weekly summary of account activity', enabled: true },
  { id: 'marketing-email', label: 'Marketing Emails', description: 'Receive product updates and promotional offers', enabled: false },
]

export const activeSessions: ActiveSession[] = [
  { id: 'sess-1', device: 'MacBook Pro', browser: 'Chrome 125', location: 'San Francisco, US', ipAddress: '192.168.1.42', lastActive: '2026-06-14T10:30:00', isCurrent: true },
  { id: 'sess-2', device: 'iPhone 15', browser: 'Safari 18', location: 'San Francisco, US', ipAddress: '192.168.1.77', lastActive: '2026-06-13T22:15:00', isCurrent: false },
  { id: 'sess-3', device: 'Windows PC', browser: 'Firefox 128', location: 'New York, US', ipAddress: '203.0.113.45', lastActive: '2026-06-12T14:20:00', isCurrent: false },
]

export const loginHistory: LoginHistoryEntry[] = [
  { id: 'lh-1', ipAddress: '192.168.1.42', location: 'San Francisco, US', device: 'MacBook Pro', browser: 'Chrome 125', timestamp: '2026-06-14T10:30:00', success: true },
  { id: 'lh-2', ipAddress: '192.168.1.42', location: 'San Francisco, US', device: 'MacBook Pro', browser: 'Chrome 125', timestamp: '2026-06-14T08:00:00', success: true },
  { id: 'lh-3', ipAddress: '203.0.113.45', location: 'New York, US', device: 'Unknown', browser: 'Firefox 128', timestamp: '2026-06-12T14:20:00', success: true },
  { id: 'lh-4', ipAddress: '198.51.100.23', location: 'London, UK', device: 'iPhone 15', browser: 'Safari 18', timestamp: '2026-06-12T06:15:00', success: false },
  { id: 'lh-5', ipAddress: '192.168.1.77', location: 'San Francisco, US', device: 'iPhone 15', browser: 'Safari 18', timestamp: '2026-06-11T22:30:00', success: true },
  { id: 'lh-6', ipAddress: '198.51.100.99', location: 'Mumbai, IN', device: 'Android Tablet', browser: 'Chrome 124', timestamp: '2026-06-10T16:45:00', success: false },
]
