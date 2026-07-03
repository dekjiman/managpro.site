export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  status: string
  order: number
  created_at: string
}

export interface HelpArticle {
  id: string
  title: string
  summary: string
  category: string
  content: string
  author: string
  created_at: string
}
