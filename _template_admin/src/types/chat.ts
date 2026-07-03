export type ChatContactStatus = 'online' | 'away' | 'busy' | 'offline'

export interface ChatContact {
  id: string
  name: string
  avatar?: string
  status: ChatContactStatus
  last_seen?: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  sender_id: string
  text: string
  timestamp: string
  is_read: boolean
}

export interface ChatConversation {
  id: string
  contact_id: string
  messages: ChatMessage[]
  unread_count: number
}
