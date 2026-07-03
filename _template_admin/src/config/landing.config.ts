export const landingNavItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Preview', href: '/#preview' },
  { label: 'Components', href: '/#components' },
  { label: 'Docs', href: '/docs' },
] as const

export const techStackItems = [
  { label: 'Vue 3', href: '#' },
  { label: 'TypeScript', href: '#' },
  { label: 'Tailwind CSS', href: '#' },
  { label: 'SCSS', href: '#' },
  { label: 'Pinia', href: '#' },
  { label: 'Vue Router', href: '#' },
  { label: 'ApexCharts', href: '#' },
  { label: 'Lucide', href: '#' },
  { label: 'Inter', href: '#' },
] as const

export const featureItems = [
  {
    icon: 'LayoutDashboard',
    title: 'Clean dashboard layout',
    description: 'Polished admin layout with sidebar, header, breadcrumb, and page header patterns.',
  },
  {
    icon: 'Files',
    title: 'Ready-to-use pages',
    description: 'Dashboards, apps, management, finance, content, reports, system, auth, and error pages.',
  },
  {
    icon: 'Palette',
    title: 'Tailwind + SCSS styling',
    description: 'Utility-first CSS with SCSS tokens, variables, and organized component styles.',
  },
  {
    icon: 'Droplets',
    title: 'Tabler-inspired colors',
    description: 'Consistent color system with semantic tokens for primary, success, info, warning, and danger.',
  },
  {
    icon: 'Text',
    title: 'Inter typography',
    description: 'Clean Inter-based type scale with predefined sizes for titles, body, tables, and labels.',
  },
  {
    icon: 'Beaker',
    title: 'Lucide icon set',
    description: 'Consistent UI icons using the Lucide icon family via the maintained @lucide/vue package.',
  },
  {
    icon: 'BarChart3',
    title: 'ApexCharts integration',
    description: 'Reusable chart components for line, area, bar, donut, radial, and sparkline charts.',
  },
  {
    icon: 'Database',
    title: 'Mock data included',
    description: 'Realistic mock data for users, customers, products, orders, invoices, and more.',
  },
  {
    icon: 'PanelLeft',
    title: 'Responsive sidebar',
    description: 'Collapsible sidebar on desktop, slide-in drawer on mobile with active route state.',
  },
  {
    icon: 'Shield',
    title: 'Auth and error pages',
    description: 'Login, register, forgot password, and error pages for 403, 404, and 500.',
  },
  {
    icon: 'Component',
    title: 'Component preview pages',
    description: 'Dedicated preview pages for buttons, cards, forms, tables, charts, modals, and more.',
  },
  {
    icon: 'Settings',
    title: 'Easy customization',
    description: 'Config-based routing, menu, theme, and tokens — customize without touching components.',
  },
] as const

export const previewCategories = [
  {
    title: 'Dashboard',
    description: 'Overview, analytics, and sales dashboard pages with charts and metrics.',
    count: '3 pages',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Apps',
    description: 'Email, chat, calendar, kanban, tasks, file manager, and notes.',
    count: '7 pages',
    href: '/apps/email',
    icon: 'AppWindow',
  },
  {
    title: 'Management',
    description: 'Users, roles, customers, products, orders, and detail pages.',
    count: '10 pages',
    href: '/management/users',
    icon: 'Users',
  },
  {
    title: 'Finance',
    description: 'Invoices, transactions, payments, pricing plans, and billing history.',
    count: '6 pages',
    href: '/finance/invoices',
    icon: 'CircleDollarSign',
  },
  {
    title: 'Content',
    description: 'Pages, media library, FAQ, help center, and page editor.',
    count: '6 pages',
    href: '/content/pages',
    icon: 'FileText',
  },
  {
    title: 'Reports',
    description: 'Sales report, user activity, audit logs, and export center.',
    count: '4 pages',
    href: '/reports/sales',
    icon: 'BarChart3',
  },
  {
    title: 'System',
    description: 'Settings, API keys, integrations, webhooks, and appearance.',
    count: '8 pages',
    href: '/system/general-settings',
    icon: 'Settings',
  },
  {
    title: 'Auth Pages',
    description: 'Login, register, forgot password, reset password, verify email, and two-factor.',
    count: '6 pages',
    href: '/auth/login',
    icon: 'KeyRound',
  },
  {
    title: 'Components',
    description: 'Buttons, cards, forms, tables, charts, modals, badges, alerts, and icons.',
    count: '12 pages',
    href: '/components/buttons',
    icon: 'Component',
  },
] as const

export const pageGroups = [
  { title: 'Dashboard Pages', pages: '3 pages' },
  { title: 'Application Pages', pages: '7 pages' },
  { title: 'Management Pages', pages: '10 pages' },
  { title: 'Finance Pages', pages: '6 pages' },
  { title: 'Content Pages', pages: '6 pages' },
  { title: 'Report Pages', pages: '4 pages' },
  { title: 'System Pages', pages: '8 pages' },
  { title: 'Auth Pages', pages: '6 pages' },
  { title: 'Error Pages', pages: '3 pages' },
  { title: 'Component Pages', pages: '12 pages' },
] as const

export const componentShowcaseItems = [
  { title: 'Buttons', description: 'Primary, secondary, outline, ghost, danger, and icon buttons.' },
  { title: 'Cards', description: 'Card with header, body, footer, image, and stat variants.' },
  { title: 'Badges', description: 'Status, numeric, outline, pill, and dot badges.' },
  { title: 'Alerts', description: 'Success, info, warning, danger, and dismissible alerts.' },
  { title: 'Forms', description: 'Inputs, selects, textareas, checkboxes, radios, switches, and validation.' },
  { title: 'Tables', description: 'Data tables with search, filter, sort, pagination, and loading states.' },
  { title: 'Modals', description: 'Basic, scrollable, centered, and large modal dialogs.' },
  { title: 'Dropdowns', description: 'Menu, action, notification, and user dropdowns.' },
  { title: 'Tabs', description: 'Line, pill, bordered, and icon tab variants.' },
  { title: 'Charts', description: 'Line, area, bar, donut, radial, and sparkline chart components.' },
  { title: 'Empty States', description: 'Empty, filtered-empty, error, and loading state placeholders.' },
  { title: 'Icons', description: 'Lucide icon family used consistently across all UI components.' },
] as const

export const designSystemItems = [
  { label: 'Tabler-inspired color tokens', description: 'Semantic color scales for primary, success, info, warning, and danger states.' },
  { label: 'Inter type scale', description: 'Consistent font sizes from page title (24px) to badge (12px).' },
  { label: 'SCSS design tokens', description: 'Centralized tokens for spacing, radius, shadow, and transitions.' },
  { label: 'Tailwind token mapping', description: 'Full Tailwind color mapping to SCSS tokens for utility-first usage.' },
  { label: 'Component state system', description: 'Default, hover, active, focus, disabled, loading, error, and success for every component.' },
  { label: 'Lucide icon system', description: 'Single icon family for buttons, sidebar, tables, alerts, and forms.' },
] as const

export const docsTopics = [
  'Getting Started',
  'Installation',
  'Folder Structure',
  'Routing',
  'Menu Config',
  'SCSS Tokens',
  'Color System',
  'Typography',
  'Components',
  'Mock Data',
  'Customization',
] as const

export const pricingPlans = [
  {
    name: 'Starter Kit',
    description: 'Core dashboard and basic components for small projects.',
    price: 'Free',
    features: ['Dashboard overview', 'Basic components', 'Documentation', 'Mock data', 'Responsive layout'],
    cta: 'Download',
    href: '#',
    featured: false,
  },
  {
    name: 'Full Template',
    description: 'Complete admin template with all pages and components.',
    price: '$29',
    features: ['Everything in Starter', 'All admin pages', 'Apps pages', 'Finance pages', 'System pages', 'Component previews', 'Auth pages'],
    cta: 'Get Started',
    href: '#',
    featured: true,
  },
  {
    name: 'Extended Kit',
    description: 'Full template plus landing pages and extra resources.',
    price: '$49',
    features: ['Everything in Full', 'Landing pages', 'Extra auth pages', 'Additional illustrations', 'Email templates'],
    cta: 'Get Extended',
    href: '#',
    featured: false,
  },
] as const

export const faqItems = [
  {
    question: 'Is this built with Vue 3?',
    answer: 'Yes, Nata Admin is built entirely with Vue 3 using the Composition API and TypeScript for type safety.',
  },
  {
    question: 'Does it include Tailwind CSS?',
    answer: 'Yes, Tailwind CSS is the primary utility framework. It is fully configured with custom color tokens mapped to the design system.',
  },
  {
    question: 'Does it use SCSS?',
    answer: 'Yes, SCSS is used as the structured styling layer with tokens, variables, base styles, and component-specific partials.',
  },
  {
    question: 'Are pages connected to backend?',
    answer: 'No. All pages use mock data so the template works out of the box without a backend. You can replace mock data with real API calls.',
  },
  {
    question: 'Does it include documentation?',
    answer: 'Yes. Documentation covers installation, folder structure, routing, menu configuration, SCSS tokens, color system, typography, and component usage.',
  },
  {
    question: 'Can I customize colors?',
    answer: 'Absolutely. Colors are defined as SCSS tokens and Tailwind config — you can update the primary color and semantic palette in one place.',
  },
  {
    question: 'Does it include dark mode?',
    answer: 'Yes. Dark mode is implemented using CSS custom properties with a .dark class toggle, localStorage persistence, and system preference detection.',
  },
  {
    question: 'Can I use it for client projects?',
    answer: 'Yes. Nata Admin is licensed for personal and commercial use in client projects.',
  },
  {
    question: 'Does it include landing pages?',
    answer: 'The Extended Kit includes landing page templates. The base template focuses on admin dashboard pages.',
  },
  {
    question: 'Does it include mock data?',
    answer: 'Yes. Mock data is provided for users, customers, products, orders, invoices, transactions, and more — all realistic and ready to use.',
  },
] as const

export const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Preview', href: '/#preview' },
    { label: 'Components', href: '/#components' },
  ],
  preview: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Apps', href: '/apps/email' },
    { label: 'Management', href: '/management/users' },
    { label: 'Auth Pages', href: '/auth/login' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Changelog', href: '#' },
    { label: 'License', href: '#' },
    { label: 'Support', href: '#' },
  ],
} as const
