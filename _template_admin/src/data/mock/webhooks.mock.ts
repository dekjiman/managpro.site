import type { Webhook } from '@/types/webhook'

export const webhooks: Webhook[] = [
  { id: 'wh-1', name: 'Order Created', url: 'https://api.example.test/webhooks/order-created', events: ['order.created', 'order.paid'], status: 'Active', lastTriggeredAt: '2026-06-14T10:30:00', createdAt: '2026-01-15' },
  { id: 'wh-2', name: 'User Events', url: 'https://api.example.test/webhooks/user-events', events: ['user.created', 'user.updated', 'user.deleted'], status: 'Active', lastTriggeredAt: '2026-06-14T08:15:00', createdAt: '2026-02-01' },
  { id: 'wh-3', name: 'Payment Notifications', url: 'https://api.example.test/webhooks/payments', events: ['payment.succeeded', 'payment.failed'], status: 'Active', lastTriggeredAt: '2026-06-13T22:00:00', createdAt: '2026-02-15' },
  { id: 'wh-4', name: 'Invoice Events', url: 'https://api.example.test/webhooks/invoices', events: ['invoice.created', 'invoice.paid', 'invoice.overdue'], status: 'Paused', lastTriggeredAt: '2026-06-10T14:30:00', createdAt: '2026-03-01' },
  { id: 'wh-5', name: 'Customer Activity', url: 'https://api.example.test/webhooks/customer', events: ['customer.created', 'customer.updated'], status: 'Active', lastTriggeredAt: '2026-06-14T09:45:00', createdAt: '2026-03-20' },
  { id: 'wh-6', name: 'Subscription Updates', url: 'https://api.example.test/webhooks/subscriptions', events: ['subscription.created', 'subscription.cancelled', 'subscription.renewed'], status: 'Failed', lastTriggeredAt: '2026-06-12T16:00:00', createdAt: '2026-04-01' },
  { id: 'wh-7', name: 'Refund Notifications', url: 'https://api.example.test/webhooks/refunds', events: ['refund.processed'], status: 'Active', lastTriggeredAt: '2026-06-11T11:20:00', createdAt: '2026-04-15' },
  { id: 'wh-8', name: 'Product Sync', url: 'https://api.example.test/webhooks/product-sync', events: ['product.created', 'product.updated', 'product.deleted'], status: 'Paused', lastTriggeredAt: '2026-06-08T10:00:00', createdAt: '2026-05-01' },
]
