export interface Product {
  id: string
  name: string
  sku: string
  image: string
  category: string
  description: string
  price: number
  stock: number
  low_stock_threshold: number
  status: string
  sales_count: number
  rating: number
  created_at: string
}
