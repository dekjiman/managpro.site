import type { HelpArticle } from '@/types/faq'

export const helpArticles: HelpArticle[] = [
  {
    id: 'help-001', title: 'Getting Started Guide', summary: 'Learn the basics of navigating the platform and setting up your account.',
    category: 'Getting Started',
    content: 'Welcome to the platform! This guide walks you through creating your account, setting up your profile, inviting team members, and configuring your first project.',
    author: 'Mika Chen', created_at: '2026-01-10',
  },
  {
    id: 'help-002', title: 'Managing Users and Roles', summary: 'How to add, edit, and manage users with role-based permissions.',
    category: 'Administration',
    content: 'Learn how to invite team members, assign roles and permissions, manage user status, and configure access controls for your organization.',
    author: 'Ariana Hart', created_at: '2026-02-15',
  },
  {
    id: 'help-003', title: 'Setting Up Billing', summary: 'Configure your payment methods, view invoices, and manage subscriptions.',
    category: 'Billing',
    content: 'This guide covers adding payment methods, viewing billing history, downloading invoices, upgrading/downgrading plans, and handling failed payments.',
    author: 'Noah Bennett', created_at: '2026-03-01',
  },
  {
    id: 'help-004', title: 'Using the Dashboard', summary: 'Understand your dashboard metrics, charts, and key performance indicators.',
    category: 'Getting Started',
    content: 'The dashboard provides an overview of your key metrics. Learn how to read the charts, filter data by date range, and customize your dashboard view.',
    author: 'Sofia Lane', created_at: '2026-01-20',
  },
  {
    id: 'help-005', title: 'API Integration Guide', summary: 'Connect your applications using our REST API and webhooks.',
    category: 'Technical',
    content: 'Detailed documentation on authenticating API requests, available endpoints, rate limiting, webhook events, and error handling best practices.',
    author: 'Ilya Novak', created_at: '2026-04-10',
  },
  {
    id: 'help-006', title: 'Security Best Practices', summary: 'Recommended security settings and best practices for your account.',
    category: 'Administration',
    content: 'Review recommended security settings including two-factor authentication, password policies, session management, IP whitelisting, and audit log monitoring.',
    author: 'Maya Singh', created_at: '2026-03-15',
  },
  {
    id: 'help-007', title: 'Data Export and Backup', summary: 'How to export your data and understand our backup policies.',
    category: 'Technical',
    content: 'Learn how to export your data in CSV or JSON format, schedule automated exports, and understand our data retention and backup policies.',
    author: 'Ilya Novak', created_at: '2026-05-01',
  },
  {
    id: 'help-008', title: 'Troubleshooting Common Issues', summary: 'Solutions to frequently encountered problems and error messages.',
    category: 'Getting Started',
    content: 'Find solutions to common issues including login problems, payment failures, browser compatibility, slow performance, and notification delivery issues.',
    author: 'Ariana Hart', created_at: '2026-04-20',
  },
]
