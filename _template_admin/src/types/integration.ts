export interface Integration {
  id: string
  name: string
  logo: string
  description: string
  category: string
  status: 'Connected' | 'Disconnected' | 'Error'
  lastSync: string | null
}
