export interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  status: 'Active' | 'Paused' | 'Failed'
  lastTriggeredAt: string | null
  createdAt: string
}
