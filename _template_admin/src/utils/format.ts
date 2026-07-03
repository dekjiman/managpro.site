import dayjs from 'dayjs'

export function formatDate(value: string) {
  return dayjs(value).format('DD MMM YYYY')
}

export function formatDateTime(value: string) {
  return dayjs(value).format('DD MMM YYYY, HH:mm')
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}
