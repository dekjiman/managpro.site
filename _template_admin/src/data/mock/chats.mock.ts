import type { ChatContact, ChatConversation } from '@/types/chat'

export const chatContacts: ChatContact[] = [
  { id: 'contact-1', name: 'Ariana Hart', status: 'online' },
  { id: 'contact-2', name: 'Mika Chen', status: 'online' },
  { id: 'contact-3', name: 'Noah Bennett', status: 'away', last_seen: '2026-06-13T09:30:00Z' },
  { id: 'contact-4', name: 'Sofia Lane', status: 'busy' },
  { id: 'contact-5', name: 'Ilya Novak', status: 'offline', last_seen: '2026-06-12T22:15:00Z' },
  { id: 'contact-6', name: 'Maya Singh', status: 'online' },
  { id: 'contact-7', name: 'Leo Torres', status: 'away', last_seen: '2026-06-13T08:45:00Z' },
]

export const chatConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    contact_id: 'contact-1',
    unread_count: 0,
    messages: [
      { id: 'msg-1-1', conversation_id: 'conv-1', sender_id: 'contact-1', text: 'Hey! Just sent you the updated dashboard mockups.', timestamp: '2026-06-13T09:00:00Z', is_read: true },
      { id: 'msg-1-2', conversation_id: 'conv-1', sender_id: 'me', text: 'Looks great! The new layout is much cleaner.', timestamp: '2026-06-13T09:02:00Z', is_read: true },
      { id: 'msg-1-3', conversation_id: 'conv-1', sender_id: 'contact-1', text: 'Glad you like it. Should I push the changes to staging?', timestamp: '2026-06-13T09:05:00Z', is_read: true },
      { id: 'msg-1-4', conversation_id: 'conv-1', sender_id: 'me', text: 'Yes, go ahead. I will review them in the afternoon.', timestamp: '2026-06-13T09:10:00Z', is_read: true },
    ],
  },
  {
    id: 'conv-2',
    contact_id: 'contact-2',
    unread_count: 2,
    messages: [
      { id: 'msg-2-1', conversation_id: 'conv-2', sender_id: 'contact-2', text: 'Do you have a minute? The API rate limit issue is back.', timestamp: '2026-06-13T10:15:00Z', is_read: true },
      { id: 'msg-2-2', conversation_id: 'conv-2', sender_id: 'contact-2', text: 'Getting 429 errors on the /users endpoint again.', timestamp: '2026-06-13T10:16:00Z', is_read: true },
      { id: 'msg-2-3', conversation_id: 'conv-2', sender_id: 'contact-2', text: 'Could you check the gateway config when you get a chance?', timestamp: '2026-06-13T10:18:00Z', is_read: false },
    ],
  },
  {
    id: 'conv-3',
    contact_id: 'contact-3',
    unread_count: 1,
    messages: [
      { id: 'msg-3-1', conversation_id: 'conv-3', sender_id: 'contact-3', text: 'The deployment pipeline is green again.', timestamp: '2026-06-13T08:30:00Z', is_read: true },
      { id: 'msg-3-2', conversation_id: 'conv-3', sender_id: 'contact-3', text: 'I fixed the race condition in the worker queue.', timestamp: '2026-06-13T08:32:00Z', is_read: true },
      { id: 'msg-3-3', conversation_id: 'conv-3', sender_id: 'contact-3', text: 'Can you review the PR when you are free?', timestamp: '2026-06-13T08:35:00Z', is_read: false },
    ],
  },
  {
    id: 'conv-4',
    contact_id: 'contact-4',
    unread_count: 3,
    messages: [
      { id: 'msg-4-1', conversation_id: 'conv-4', sender_id: 'contact-4', text: 'The Q2 financial report is ready for review.', timestamp: '2026-06-12T16:00:00Z', is_read: true },
      { id: 'msg-4-2', conversation_id: 'conv-4', sender_id: 'contact-4', text: 'Revenue is up 18% compared to last quarter.', timestamp: '2026-06-12T16:01:00Z', is_read: true },
      { id: 'msg-4-3', conversation_id: 'conv-4', sender_id: 'contact-4', text: 'We also need to discuss the budget for next fiscal year.', timestamp: '2026-06-12T16:05:00Z', is_read: false },
      { id: 'msg-4-4', conversation_id: 'conv-4', sender_id: 'contact-4', text: 'Do you have time for a call tomorrow?', timestamp: '2026-06-12T16:06:00Z', is_read: false },
    ],
  },
  {
    id: 'conv-5',
    contact_id: 'contact-5',
    unread_count: 0,
    messages: [
      { id: 'msg-5-1', conversation_id: 'conv-5', sender_id: 'me', text: 'The new onboarding flow is ready for testing.', timestamp: '2026-06-12T14:00:00Z', is_read: true },
      { id: 'msg-5-2', conversation_id: 'conv-5', sender_id: 'contact-5', text: 'I will take a look this evening. Thanks!', timestamp: '2026-06-12T14:30:00Z', is_read: true },
      { id: 'msg-5-3', conversation_id: 'conv-5', sender_id: 'contact-5', text: 'One thing — the email step seems to be missing validation.', timestamp: '2026-06-12T21:00:00Z', is_read: true },
    ],
  },
  {
    id: 'conv-6',
    contact_id: 'contact-6',
    unread_count: 1,
    messages: [
      { id: 'msg-6-1', conversation_id: 'conv-6', sender_id: 'contact-6', text: 'Happy birthday! Hope you have an amazing day! 🎉', timestamp: '2026-06-11T09:00:00Z', is_read: true },
      { id: 'msg-6-2', conversation_id: 'conv-6', sender_id: 'me', text: 'Thank you so much! 😊', timestamp: '2026-06-11T09:15:00Z', is_read: true },
      { id: 'msg-6-3', conversation_id: 'conv-6', sender_id: 'contact-6', text: 'Are we still on for the team lunch on Friday?', timestamp: '2026-06-13T10:00:00Z', is_read: false },
    ],
  },
  {
    id: 'conv-7',
    contact_id: 'contact-7',
    unread_count: 0,
    messages: [
      { id: 'msg-7-1', conversation_id: 'conv-7', sender_id: 'contact-7', text: 'The server migration is scheduled for next weekend.', timestamp: '2026-06-12T11:00:00Z', is_read: true },
      { id: 'msg-7-2', conversation_id: 'conv-7', sender_id: 'me', text: 'Any expected downtime?', timestamp: '2026-06-12T11:05:00Z', is_read: true },
      { id: 'msg-7-3', conversation_id: 'conv-7', sender_id: 'contact-7', text: 'About 2 hours, we will notify all users in advance.', timestamp: '2026-06-12T11:10:00Z', is_read: true },
    ],
  },
]
