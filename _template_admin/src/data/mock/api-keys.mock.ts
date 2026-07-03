import type { ApiKey } from '@/types/api-key'

export const apiKeys: ApiKey[] = [
  { id: 'ak-1', name: 'Production API', maskedKey: 'sk_live_••••••••a1b2', status: 'Active', createdAt: '2026-01-15', lastUsedAt: '2026-06-14T10:30:00', permissions: ['read', 'write', 'admin'] },
  { id: 'ak-2', name: 'Staging API', maskedKey: 'sk_test_••••••••c3d4', status: 'Active', createdAt: '2026-02-01', lastUsedAt: '2026-06-13T16:00:00', permissions: ['read', 'write'] },
  { id: 'ak-3', name: 'Mobile App Key', maskedKey: 'sk_live_••••••••e5f6', status: 'Active', createdAt: '2026-03-10', lastUsedAt: '2026-06-14T09:15:00', permissions: ['read', 'write'] },
  { id: 'ak-4', name: 'Webhook Client', maskedKey: 'sk_live_••••••••g7h8', status: 'Revoked', createdAt: '2026-01-20', lastUsedAt: '2026-05-30T12:00:00', permissions: ['read'] },
  { id: 'ak-5', name: 'Analytics Integration', maskedKey: 'sk_live_••••••••i9j0', status: 'Expired', createdAt: '2025-06-01', lastUsedAt: '2026-05-01T08:00:00', permissions: ['read'] },
  { id: 'ak-6', name: 'CI/CD Pipeline', maskedKey: 'sk_live_••••••••k1l2', status: 'Active', createdAt: '2026-04-05', lastUsedAt: '2026-06-14T07:45:00', permissions: ['read', 'write', 'deploy'] },
]
