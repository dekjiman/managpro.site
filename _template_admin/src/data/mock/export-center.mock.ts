import type { ExportJob } from '@/types/export'

export const exportJobs: ExportJob[] = [
  { id: 'exp-001', name: 'Sales Report Jun 2026', type: 'Sales Report', format: 'PDF', status: 'Completed', created_by: 'Maya Singh', created_at: '2026-06-14T07:55:00', completed_at: '2026-06-14T07:56:00', size: '1.2 MB', record_count: 1240 },
  { id: 'exp-002', name: 'Customer List Q2', type: 'Customer Export', format: 'CSV', status: 'Completed', created_by: 'Maya Singh', created_at: '2026-06-13T05:30:00', completed_at: '2026-06-13T05:30:00', size: '892 KB', record_count: 842 },
  { id: 'exp-003', name: 'Invoice Archive May 2026', type: 'Invoice Export', format: 'CSV', status: 'Completed', created_by: 'Noah Bennett', created_at: '2026-06-10T14:00:00', completed_at: '2026-06-10T14:01:00', size: '1.1 MB', record_count: 580 },
  { id: 'exp-004', name: 'User Activity Audit', type: 'Activity Export', format: 'JSON', status: 'Completed', created_by: 'Ariana Hart', created_at: '2026-06-09T10:30:00', completed_at: '2026-06-09T10:30:00', size: '2.4 MB', record_count: 3400 },
  { id: 'exp-005', name: 'Product Catalog Backup', type: 'Product Export', format: 'CSV', status: 'Failed', created_by: 'Ilya Novak', created_at: '2026-06-08T16:00:00', completed_at: '', size: '', record_count: 0 },
  { id: 'exp-006', name: 'Order History Q2 2026', type: 'Order Export', format: 'Excel', status: 'Completed', created_by: 'Sofia Lane', created_at: '2026-06-07T11:00:00', completed_at: '2026-06-07T11:02:00', size: '3.1 MB', record_count: 2450 },
  { id: 'exp-007', name: 'Transaction Log May', type: 'Transaction Export', format: 'CSV', status: 'Processing', created_by: 'Noah Bennett', created_at: '2026-06-14T08:00:00', completed_at: '', size: '', record_count: 0 },
  { id: 'exp-008', name: 'User Roles Snapshot', type: 'Role Export', format: 'JSON', status: 'Completed', created_by: 'Ariana Hart', created_at: '2026-06-05T09:00:00', completed_at: '2026-06-05T09:00:00', size: '245 KB', record_count: 120 },
  { id: 'exp-009', name: 'Media Library Index', type: 'Media Export', format: 'CSV', status: 'Pending', created_by: 'Mika Chen', created_at: '2026-06-14T06:00:00', completed_at: '', size: '', record_count: 0 },
  { id: 'exp-010', name: 'Audit Logs June', type: 'Audit Log Export', format: 'CSV', status: 'Completed', created_by: 'Maya Singh', created_at: '2026-06-03T15:00:00', completed_at: '2026-06-03T15:01:00', size: '4.2 MB', record_count: 5800 },
  { id: 'exp-011', name: 'Customer Invoices', type: 'Invoice Export', format: 'PDF', status: 'Failed', created_by: 'Noah Bennett', created_at: '2026-06-02T12:00:00', completed_at: '', size: '', record_count: 0 },
  { id: 'exp-012', name: 'Monthly Revenue Report', type: 'Sales Report', format: 'PDF', status: 'Completed', created_by: 'Maya Singh', created_at: '2026-06-01T08:00:00', completed_at: '2026-06-01T08:01:00', size: '856 KB', record_count: 890 },
]
