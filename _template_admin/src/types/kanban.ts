export type KanbanColumnKey = 'todo' | 'in-progress' | 'review' | 'done'
export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanAssignee {
  id: string
  name: string
  role: string
}

export interface KanbanTask {
  id: string
  title: string
  description: string
  column: KanbanColumnKey
  priority: KanbanPriority
  assignees: KanbanAssignee[]
  due_date: string
  tags: string[]
  comments_count: number
  attachments_count: number
}
