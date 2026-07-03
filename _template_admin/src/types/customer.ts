export type CustomerType = 'enterprise' | 'smb' | 'startup' | 'individual'

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  type: CustomerType
  avatar: string
  status: string
  total_orders: number
  total_spent: number
  joined_date: string
  notes: string
}
