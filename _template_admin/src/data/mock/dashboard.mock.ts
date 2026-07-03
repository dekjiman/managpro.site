import type { DataRow, StatItem } from '@/types/common'

export const overviewMetrics: StatItem[] = [
    { title: 'Total Revenue', value: '$128,400', change: '+14.2% from last month', trend: 'up' },
    { title: 'Total Users', value: '24,892', change: '+8.1% active growth', trend: 'up' },
    { title: 'Total Orders', value: '6,420', change: '+5.7% completed orders', trend: 'up' },
    { title: 'Conversion Rate', value: '8.6%', change: '-1.2% from last week', trend: 'down' },
]

export const analyticsMetrics: StatItem[] = [
    { title: 'Website Visitors', value: '184,290', change: '+18.5% traffic growth', trend: 'up' },
    { title: 'Active Sessions', value: '4,812', change: '+9.3% right now', trend: 'up' },
    { title: 'Bounce Rate', value: '32.4%', change: '-4.2% improvement', trend: 'up' },
    { title: 'Avg. Duration', value: '4m 18s', change: '+36s from baseline', trend: 'up' },
]

export const salesMetrics: StatItem[] = [
    { title: 'Total Sales', value: '$286,120', change: '+16.8% sales growth', trend: 'up' },
    { title: 'Monthly Revenue', value: '$72,450', change: '+11.1% this month', trend: 'up' },
    { title: 'Pending Orders', value: '128', change: 'Requires review', trend: 'flat' },
    { title: 'Completed Orders', value: '2,840', change: '+7.6% fulfilled', trend: 'up' },
]

export const dashboardMetrics: Record<string, StatItem[]> = {
  overview: overviewMetrics,
  analytics: analyticsMetrics,
  sales: salesMetrics,
}

export const revenueSeries = [
  { name: 'Revenue', data: [12000, 18000, 15200, 24000, 28000, 32000, 38600, 42000, 46000, 52000, 58000, 64200] },
]

export const categoryLabels = ['SaaS', 'Commerce', 'Services', 'Support']
export const categorySeries = [42, 24, 18, 16]

export const recentOrders: DataRow[] = [
  { id: 'ord-1001', name: 'Order #1001', owner: 'Bluebird Studio', status: 'completed', amount: 4200, updated_at: '2026-06-12' },
  { id: 'ord-1002', name: 'Order #1002', owner: 'Northstar Labs', status: 'pending', amount: 2180, updated_at: '2026-06-11' },
  { id: 'ord-1003', name: 'Order #1003', owner: 'Crescent Systems', status: 'active', amount: 5850, updated_at: '2026-06-10' },
  { id: 'ord-1004', name: 'Order #1004', owner: 'Orbit Works', status: 'failed', amount: 980, updated_at: '2026-06-09' },
]

export const activities = [
  'Ariana approved a new invoice draft',
  'Mika exported the sales report',
  'Noah updated product inventory',
  'Sofia resolved a webhook delivery issue',
]

export const overviewInsights = [
  { label: 'Revenue target', value: '82%', note: '$21.6k remaining this month' },
  { label: 'Open tickets', value: '18', note: '6 high priority customer requests' },
  { label: 'Inventory alerts', value: '7', note: 'Products below reorder threshold' },
]

export const analyticsVisitorSeries = [
  { name: 'Visitors', data: [12800, 15400, 14800, 18900, 22400, 23800, 26200, 28100, 30500, 33400, 36100, 39200] },
  { name: 'Sessions', data: [9200, 11200, 10600, 14100, 16800, 17300, 19400, 21100, 22800, 24700, 26900, 28600] },
]

export const trafficSourceLabels = ['Organic', 'Paid', 'Referral', 'Social']
export const trafficSourceSeries = [46, 24, 18, 12]

export const deviceBreakdown = [
  { device: 'Desktop', share: '54%', sessions: '92,418', trend: '+12.4%' },
  { device: 'Mobile', share: '38%', sessions: '65,102', trend: '+18.1%' },
  { device: 'Tablet', share: '8%', sessions: '13,684', trend: '+4.6%' },
]

export const visitorLocations = [
  { location: 'United States', visitors: '48,210', share: '26%' },
  { location: 'Indonesia', visitors: '31,840', share: '17%' },
  { location: 'United Kingdom', visitors: '22,430', share: '12%' },
  { location: 'Singapore', visitors: '16,980', share: '9%' },
]

export const topPages: DataRow[] = [
  { id: 'page-1', name: '/pricing', owner: 'Pricing page', status: 'active', amount: 48210, updated_at: '2026-06-14' },
  { id: 'page-2', name: '/features', owner: 'Feature overview', status: 'active', amount: 36480, updated_at: '2026-06-14' },
  { id: 'page-3', name: '/docs/getting-started', owner: 'Documentation', status: 'pending', amount: 22140, updated_at: '2026-06-13' },
  { id: 'page-4', name: '/blog/product-update', owner: 'Product update', status: 'active', amount: 18620, updated_at: '2026-06-12' },
]

export const campaignPerformance = [
  { name: 'Summer launch', channel: 'Paid search', conversion: '9.8%', spend: '$12,400' },
  { name: 'Partner webinar', channel: 'Referral', conversion: '7.2%', spend: '$4,800' },
  { name: 'Creator bundle', channel: 'Social', conversion: '5.9%', spend: '$6,200' },
]

export const salesTrendSeries = [
  { name: 'Sales', data: [22000, 28000, 31000, 36500, 42000, 49800, 53200, 59000, 62800, 68400, 72100, 78600] },
]

export const salesFunnel = [
  { stage: 'Leads', count: '4,820', rate: '100%' },
  { stage: 'Qualified', count: '2,960', rate: '61%' },
  { stage: 'Proposal', count: '1,240', rate: '26%' },
  { stage: 'Closed won', count: '428', rate: '9%' },
]

export const topProducts: DataRow[] = [
  { id: 'prod-1', name: 'Admin Pro License', owner: 'Software', status: 'active', amount: 48200, updated_at: '2026-06-14' },
  { id: 'prod-2', name: 'Design Asset Pack', owner: 'Digital Assets', status: 'active', amount: 31800, updated_at: '2026-06-13' },
  { id: 'prod-3', name: 'Team Workspace Add-on', owner: 'SaaS', status: 'pending', amount: 24600, updated_at: '2026-06-12' },
  { id: 'prod-4', name: 'Priority Support', owner: 'Service', status: 'active', amount: 16900, updated_at: '2026-06-11' },
]

export const topCustomers = [
  { name: 'Northstar Labs', value: '$42,800', orders: '18 orders' },
  { name: 'Bluebird Studio', value: '$36,420', orders: '14 orders' },
  { name: 'Crescent Systems', value: '$28,960', orders: '11 orders' },
]

export const orderStatusLabels = ['Completed', 'Pending', 'Processing', 'Failed']
export const orderStatusSeries = [64, 18, 12, 6]

export const regionSales = [
  { region: 'North America', value: '$124,800', share: '44%' },
  { region: 'Asia Pacific', value: '$82,600', share: '29%' },
  { region: 'Europe', value: '$58,420', share: '20%' },
  { region: 'Other markets', value: '$20,300', share: '7%' },
]
