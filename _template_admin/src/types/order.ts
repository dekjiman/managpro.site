export interface OrderItem {
  id: string
  product_name: string
  quantity: number
  unit_price: number
  total: number
}

export interface OrderTimeline {
  status: string
  date: string
  note: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  amount: number
  items: OrderItem[]
  order_status: string
  payment_status: string
  shipping_address: string
  shipping_method: string
  notes: string
  timeline: OrderTimeline[]
  date: string
  created_at: string
  updated_at: string
}
