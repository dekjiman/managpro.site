export interface Transaction {
  id: string
  transaction_code: string
  type: string
  customer_name: string
  amount: number
  payment_method: string
  status: string
  date: string
}
