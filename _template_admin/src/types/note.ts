export interface NoteItem {
  id: string
  title: string
  content: string
  content_preview: string
  tags: string[]
  is_favorite: boolean
  is_archived: boolean
  updated_at: string
  created_at: string
}
