export type EventCategory = 'meeting' | 'personal' | 'deadline' | 'holiday' | 'out-of-office'

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  end_time?: string
  category: EventCategory
  description?: string
  all_day?: boolean
}
