export interface AuditLog {
  id: string
  action: string
  actor: string
  resource: string
  resource_id: string
  details: string
  ip_address: string
  severity: string
  module: string
  timestamp: string
}
