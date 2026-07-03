import type { BillingRecord } from '@/types/billing'

export const billingRecords: BillingRecord[] = [
  { id: 'bill-001', billing_period: 'Jun 2026', plan_name: 'Professional', amount: 79, status: 'Pending', invoice_number: 'INV-2026-0021', date: '2026-06-01' },
  { id: 'bill-002', billing_period: 'May 2026', plan_name: 'Professional', amount: 79, status: 'Paid', invoice_number: 'INV-2026-0015', date: '2026-05-01' },
  { id: 'bill-003', billing_period: 'Apr 2026', plan_name: 'Professional', amount: 79, status: 'Paid', invoice_number: 'INV-2026-0010', date: '2026-04-01' },
  { id: 'bill-004', billing_period: 'Mar 2026', plan_name: 'Professional', amount: 79, status: 'Paid', invoice_number: 'INV-2026-0008', date: '2026-03-01' },
  { id: 'bill-005', billing_period: 'Feb 2026', plan_name: 'Starter', amount: 29, status: 'Paid', invoice_number: 'INV-2026-0004', date: '2026-02-01' },
  { id: 'bill-006', billing_period: 'Jan 2026', plan_name: 'Starter', amount: 29, status: 'Paid', invoice_number: 'INV-2026-0002', date: '2026-01-01' },
  { id: 'bill-007', billing_period: 'Dec 2025', plan_name: 'Starter', amount: 29, status: 'Paid', invoice_number: 'INV-2025-0020', date: '2025-12-01' },
  { id: 'bill-008', billing_period: 'Nov 2025', plan_name: 'Starter', amount: 29, status: 'Paid', invoice_number: 'INV-2025-0018', date: '2025-11-01' },
  { id: 'bill-009', billing_period: 'Oct 2025', plan_name: 'Free', amount: 0, status: 'Paid', invoice_number: '—', date: '2025-10-01' },
  { id: 'bill-010', billing_period: 'Sep 2025', plan_name: 'Free', amount: 0, status: 'Paid', invoice_number: '—', date: '2025-09-01' },
]
