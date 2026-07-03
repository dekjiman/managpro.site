import {
  Activity,
  AlertTriangle,
  AppWindow,
  Archive,
  BadgeDollarSign,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  CalendarDays,
  ChartPie,
  CircleDollarSign,
  CreditCard,
  DatabaseZap,
  FileBadge,
  FileText,
  FolderKanban,
  Gauge,
  HelpCircle,
  Home,
  Image,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Lock,
  Mail,
  MessageSquare,
  NotebookText,
  Palette,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Table2,
  Tags,
  UserCog,
  Users,
  Webhook,
} from '@lucide/vue'
import type { AdminMenuGroup } from '@/types/menu'

export const adminMenu: AdminMenuGroup[] = [
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Dashboard',
        icon: LayoutDashboard,
        children: [
          { label: 'Overview', path: '/dashboard', icon: Home },
          { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
          { label: 'Sales', path: '/dashboard/sales', icon: ChartPie },
        ],
      },
    ],
  },
  {
    label: 'Apps',
    items: [
      {
        label: 'Apps',
        icon: AppWindow,
        children: [
          { label: 'Email', path: '/apps/email', icon: Mail },
          { label: 'Chat', path: '/apps/chat', icon: MessageSquare, badge: '12' },
          { label: 'Calendar', path: '/apps/calendar', icon: CalendarDays },
          { label: 'Kanban', path: '/apps/kanban', icon: FolderKanban },
          { label: 'Tasks', path: '/apps/tasks', icon: ShieldCheck },
          { label: 'File Manager', path: '/apps/file-manager', icon: Archive },
          { label: 'Notes', path: '/apps/notes', icon: NotebookText },
        ],
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        label: 'Management',
        icon: Users,
        children: [
          { label: 'Users', path: '/management/users', icon: Users, permission: 'users.view' },
          { label: 'Roles & Permissions', path: '/management/roles', icon: UserCog },
          { label: 'Customers', path: '/management/customers', icon: Users },
          { label: 'Orders', path: '/management/orders', icon: ShoppingCart },
        ],
      },
    ],
  },
  {
    label: 'Finance',
    items: [
      {
        label: 'Finance',
        icon: CircleDollarSign,
        children: [
          { label: 'Invoices', path: '/finance/invoices', icon: Receipt },
          { label: 'Create Invoice', path: '/finance/invoices/create', icon: FileBadge },
          { label: 'Transactions', path: '/finance/transactions', icon: BadgeDollarSign },
          { label: 'Payments', path: '/finance/payments', icon: CreditCard },
          { label: 'Pricing Plans', path: '/finance/pricing-plans', icon: Tags },
          { label: 'Billing History', path: '/finance/billing-history', icon: FileText },
        ],
      },
    ],
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Products',
        icon: ShoppingBag,
        children: [
          { label: 'Product List', path: '/management/products', icon: ShoppingBag },
          { label: 'Product Categories', path: '/management/product-categories', icon: Tags },
          { label: 'Digital Product Editor', path: '/content/digital-product-editor', icon: NotebookText },
          { label: 'Product Source', path: '/content/product-source', icon: Archive },
        ],
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        label: 'Content',
        icon: BookOpen,
        children: [
          { label: 'Pages', path: '/content/pages', icon: FileText },
          { label: 'Page Editor', path: '/content/pages/editor', icon: NotebookText },
          { label: 'Media Library', path: '/content/media', icon: Image },
          { label: 'FAQ', path: '/content/faq', icon: HelpCircle },
          { label: 'Help Center', path: '/content/help-center', icon: BookOpen },
        ],
      },
    ],
  },
  {
    label: 'Reports',
    items: [
      {
        label: 'Reports',
        icon: BarChart3,
        children: [
          { label: 'Sales Report', path: '/reports/sales', icon: BarChart3, permission: 'reports.view' },
          { label: 'User Activity', path: '/reports/user-activity', icon: Activity },
          { label: 'Audit Logs', path: '/reports/audit-logs', icon: DatabaseZap },
          { label: 'Export Center', path: '/reports/export-center', icon: Archive },
        ],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'System',
        icon: Settings,
        children: [
          { label: 'General Settings', path: '/system/general-settings', icon: Settings },
          { label: 'Profile Settings', path: '/system/profile-settings', icon: UserCog },
          { label: 'Company Settings', path: '/system/company-settings', icon: Boxes },
          { label: 'Notification Settings', path: '/system/notification-settings', icon: Bell },
          { label: 'Security Settings', path: '/system/security-settings', icon: Lock },
          { label: 'API Keys', path: '/system/api-keys', icon: KeyRound },
          { label: 'Integrations', path: '/system/integrations', icon: AppWindow },
          { label: 'Webhooks', path: '/system/webhooks', icon: Webhook },
          { label: 'Appearance', path: '/system/appearance', icon: Palette },
        ],
      },
    ],
  },
  {
    label: 'Template Pages',
    items: [
      {
        label: 'Template Pages',
        icon: FileText,
        children: [
          { label: 'Login', path: '/auth/login', icon: Lock },
          { label: 'Register', path: '/auth/register', icon: UserCog },
          { label: 'Forgot Password', path: '/auth/forgot-password', icon: KeyRound },
          { label: 'Reset Password', path: '/auth/reset-password', icon: ShieldCheck },
          { label: 'Verify Email', path: '/auth/verify-email', icon: Mail },
          { label: 'Two Factor', path: '/auth/two-factor', icon: ShieldCheck },
          { label: 'Lock Screen', path: '/auth/lock-screen', icon: Lock },
          { label: '403 Page', path: '/errors/403', icon: AlertTriangle },
          { label: '404 Page', path: '/errors/404', icon: AlertTriangle },
          { label: '500 Page', path: '/errors/500', icon: AlertTriangle },
          { label: 'Maintenance', path: '/utility/maintenance', icon: Settings },
          { label: 'Coming Soon', path: '/utility/coming-soon', icon: Gauge },
          { label: 'Profile Page', path: '/profile', icon: UserCog },
          { label: 'Account Page', path: '/account', icon: Settings },
          { label: 'Activity Page', path: '/activity', icon: Activity },
          { label: 'Timeline Page', path: '/timeline', icon: CalendarDays },
          { label: 'Search Results', path: '/search-results', icon: Search },
          { label: 'Empty State', path: '/empty-state', icon: Inbox },
        ],
      },
    ],
  },
  {
    label: 'Components Preview',
    items: [
      {
        label: 'Components Preview',
        icon: Boxes,
        children: [
          { label: 'Colors', path: '/components/colors', icon: Palette },
          { label: 'Typography', path: '/components/typography', icon: FileText },
          { label: 'Buttons', path: '/components/buttons', icon: AppWindow },
          { label: 'Cards', path: '/components/cards', icon: Boxes },
          { label: 'Badges', path: '/components/badges', icon: Tags },
          { label: 'Alerts', path: '/components/alerts', icon: AlertTriangle },
          { label: 'Forms', path: '/components/forms', icon: FileText },
          { label: 'Tables', path: '/components/tables', icon: Table2 },
          { label: 'Charts', path: '/components/charts', icon: BarChart3 },
          { label: 'Modals', path: '/components/modals', icon: AppWindow },
          { label: 'Tabs', path: '/components/tabs', icon: LayoutDashboard },
          { label: 'Dropdowns', path: '/components/dropdowns', icon: AppWindow },
          { label: 'Empty States', path: '/components/empty-states', icon: Inbox },
          { label: 'Icons', path: '/components/icons', icon: Boxes },
        ],
      },
    ],
  },
]
