export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  client_email: string
  client_company: string
  client_address: string
  company_name: string
  company_address: string
  company_email: string
  company_phone: string
  items: InvoiceItem[]
  subtotal: number
  tax_rate: number
  tax_amount: number
  discount: number
  amount: number
  status: string
  notes: string
  issue_date: string
  due_date: string
}
