export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TaskAssignee {
  id: string
  name: string
  role: string
}

export interface TaskItem {
  id: string
  title: string
  description: string
  assignee: TaskAssignee
  priority: TaskPriority
  status: TaskStatus
  due_date: string
  created_at: string
  updated_at: string
  project: string
  tags: string[]
}
