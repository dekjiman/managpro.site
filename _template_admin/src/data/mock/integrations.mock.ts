import type { Integration } from '@/types/integration'

export const integrations: Integration[] = [
  { id: 'int-1', name: 'Slack', logo: 'simple-icons:slack', description: 'Send notifications and alerts to your Slack workspace.', category: 'Communication', status: 'Connected', lastSync: '2026-06-14T10:30:00' },
  { id: 'int-2', name: 'Stripe', logo: 'simple-icons:stripe', description: 'Process payments and manage subscriptions.', category: 'Payments', status: 'Connected', lastSync: '2026-06-14T10:25:00' },
  { id: 'int-3', name: 'GitHub', logo: 'simple-icons:github', description: 'Sync issues, commits, and pull requests.', category: 'Developer', status: 'Connected', lastSync: '2026-06-14T09:00:00' },
  { id: 'int-4', name: 'Google Drive', logo: 'simple-icons:googledrive', description: 'Access and manage files from Google Drive.', category: 'Storage', status: 'Connected', lastSync: '2026-06-13T18:00:00' },
  { id: 'int-5', name: 'Dropbox', logo: 'simple-icons:dropbox', description: 'Backup files and sync data across devices.', category: 'Storage', status: 'Disconnected', lastSync: null },
  { id: 'int-6', name: 'Discord', logo: 'simple-icons:discord', description: 'Post real-time alerts and activity feeds to Discord channels.', category: 'Communication', status: 'Connected', lastSync: '2026-06-14T10:00:00' },
  { id: 'int-7', name: 'Mailchimp', logo: 'simple-icons:mailchimp', description: 'Manage email campaigns and subscriber lists.', category: 'Marketing', status: 'Disconnected', lastSync: null },
  { id: 'int-8', name: 'Twilio', logo: 'simple-icons:twilio', description: 'Send SMS and voice notifications.', category: 'Communication', status: 'Error', lastSync: '2026-06-12T14:30:00' },
  { id: 'int-9', name: 'Google Analytics', logo: 'simple-icons:googleanalytics', description: 'Track website traffic and user behavior.', category: 'Analytics', status: 'Connected', lastSync: '2026-06-14T08:00:00' },
  { id: 'int-10', name: 'Jira', logo: 'simple-icons:jira', description: 'Track project tickets and team workflows.', category: 'Developer', status: 'Disconnected', lastSync: null },
  { id: 'int-11', name: 'Shopify', logo: 'simple-icons:shopify', description: 'Manage orders, sync products and inventory.', category: 'E-commerce', status: 'Connected', lastSync: '2026-06-13T22:00:00' },
  { id: 'int-12', name: 'Zendesk', logo: 'simple-icons:zendesk', description: 'Track support tickets and customer interactions.', category: 'Support', status: 'Error', lastSync: '2026-06-11T11:00:00' },
]
