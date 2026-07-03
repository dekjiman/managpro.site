export interface Payment {
  id: string
  transaction_id: string
  customer_name: string
  amount: number
  payment_method: string
  status: string
  date: string
}
