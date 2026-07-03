export interface ApiKey {
  id: string
  name: string
  maskedKey: string
  status: 'Active' | 'Revoked' | 'Expired'
  createdAt: string
  lastUsedAt: string | null
  permissions: string[]
}
