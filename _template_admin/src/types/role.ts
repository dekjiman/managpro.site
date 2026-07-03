export interface Permission {
  id: string
  group: string
  label: string
  key: string
}

export interface Role {
  id: string
  name: string
  description: string
  icon: string
  user_count: number
  permissions: string[]
  created_at: string
}
