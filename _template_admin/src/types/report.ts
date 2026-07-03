export interface SalesMetric {
  date: string
  revenue: number
  orders: number
}

export interface SalesReport {
  id: string
  period: string
  total_revenue: number
  total_orders: number
  total_customers: number
  conversion_rate: number
  average_order_value: number
  daily_metrics: SalesMetric[]
  top_products: { name: string; revenue: number; units: number }[]
  revenue_by_category: { category: string; revenue: number }[]
}
