export interface EmailMessage {
  id: string
  sender_name: string
  sender_email: string
  sender_avatar?: string
  subject: string
  preview: string
  body: string
  folder: EmailFolder
  labels: EmailLabel[]
  is_read: boolean
  is_starred: boolean
  has_attachment: boolean
  date: string
}

export type EmailFolder = 'inbox' | 'sent' | 'draft' | 'starred' | 'archive' | 'trash'

export type EmailLabel = 'work' | 'client' | 'billing' | 'support' | 'personal'

export interface EmailFolderItem {
  key: EmailFolder
  label: string
  icon: string
  count: number
}

export interface EmailLabelItem {
  key: EmailLabel
  label: string
  color: string
}
