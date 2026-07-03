export type FileType = 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf' | 'archive'

export interface FileFolder {
  id: string
  name: string
  file_count: number
  size: number
  owner: string
  updated_at: string
}

export interface FileManagerItem {
  id: string
  name: string
  type: FileType
  size: number
  owner: string
  folder: string
  modified_at: string
  is_shared: boolean
  is_favorite: boolean
}
