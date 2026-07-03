import type { CalendarEvent } from '@/types/calendar'

export const calendarEvents: CalendarEvent[] = [
  { id: 'evt-01', title: 'Sprint Planning', date: '2026-06-02', time: '09:00', end_time: '10:30', category: 'meeting' },
  { id: 'evt-02', title: 'Design Review', date: '2026-06-02', time: '14:00', end_time: '15:00', category: 'meeting' },
  { id: 'evt-03', title: 'Gym Session', date: '2026-06-03', time: '07:00', end_time: '08:00', category: 'personal' },
  { id: 'evt-04', title: 'Q2 Report Submission', date: '2026-06-05', category: 'deadline', all_day: true },
  { id: 'evt-05', title: 'Team Standup', date: '2026-06-06', time: '09:30', end_time: '09:45', category: 'meeting' },
  { id: 'evt-06', title: 'Dentist Appointment', date: '2026-06-07', time: '10:00', end_time: '11:00', category: 'personal' },
  { id: 'evt-07', title: 'Product Launch', date: '2026-06-10', category: 'deadline', all_day: true },
  { id: 'evt-08', title: 'Client Presentation', date: '2026-06-11', time: '13:00', end_time: '14:30', category: 'meeting' },
  { id: 'evt-09', title: 'Yoga Class', date: '2026-06-12', time: '18:00', end_time: '19:00', category: 'personal' },
  { id: 'evt-10', title: 'Budget Review', date: '2026-06-13', time: '10:00', end_time: '11:30', category: 'meeting' },
  { id: 'evt-11', title: 'Public Holiday', date: '2026-06-15', category: 'holiday', all_day: true },
  { id: 'evt-12', title: '1-on-1 with Manager', date: '2026-06-16', time: '14:00', end_time: '14:30', category: 'meeting' },
  { id: 'evt-13', title: 'Code Freeze', date: '2026-06-18', category: 'deadline', all_day: true },
  { id: 'evt-14', title: 'Team Lunch', date: '2026-06-19', time: '12:00', end_time: '13:30', category: 'personal' },
  { id: 'evt-15', title: 'Conference Call', date: '2026-06-20', time: '15:00', end_time: '16:00', category: 'meeting' },
  { id: 'evt-16', title: 'Sprint Retrospective', date: '2026-06-23', time: '10:00', end_time: '11:00', category: 'meeting' },
  { id: 'evt-17', title: 'Doctor Appointment', date: '2026-06-24', time: '09:30', end_time: '10:15', category: 'personal' },
  { id: 'evt-18', title: 'Release v2.5', date: '2026-06-25', category: 'deadline', all_day: true },
  { id: 'evt-19', title: 'Off-site Workshop', date: '2026-06-26', time: '08:00', end_time: '17:00', category: 'out-of-office' },
  { id: 'evt-20', title: 'Performance Review', date: '2026-06-30', time: '11:00', end_time: '12:00', category: 'meeting' },
]
