export interface PricingPlan {
  id: string
  name: string
  description: string
  monthly_price: number
  yearly_price: number
  features: string[]
  is_popular: boolean
  highlight: string
}
