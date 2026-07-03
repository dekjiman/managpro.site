import { BookOpen, ChevronRight, FolderTree, LayoutDashboard, Palette, Type, Puzzle, Database, Settings, Sliders, Cpu } from '@lucide/vue'
import type { Component } from 'vue'

export interface DocSection {
  id: string
  title: string
  icon: Component
  html: string
}

export const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    html: `
      <p class="text-lg leading-relaxed text-gray-600">
        Nata Admin is a <strong>Vue 3 + TypeScript + Tailwind CSS + SCSS</strong> admin template built for developers who need a clean, reusable foundation for dashboard projects.
      </p>
      <p class="text-lg leading-relaxed text-gray-600">
        It includes ready-to-use dashboard pages, application pages, management screens, finance modules, content management, reports, system settings, authentication flows, error pages, and component previews — all styled with a consistent design system.
      </p>
      <h3>Tech Stack</h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Vue 3</span>
          <span class="text-xs text-gray-500">Composition API + TypeScript</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Tailwind CSS</span>
          <span class="text-xs text-gray-500">Utility-first styling</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">SCSS</span>
          <span class="text-xs text-gray-500">Structured styling layer</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Pinia</span>
          <span class="text-xs text-gray-500">State management</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Vue Router</span>
          <span class="text-xs text-gray-500">Client-side routing</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">ApexCharts</span>
          <span class="text-xs text-gray-500">Chart visualizations</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Lucide</span>
          <span class="text-xs text-gray-500">UI icon family</span>
        </div>
        <div class="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <span class="text-sm font-medium text-gray-900">Inter</span>
          <span class="text-xs text-gray-500">Primary font</span>
        </div>
      </div>
      <h3>Key Principles</h3>
      <ul>
        <li><strong>Reusability</strong> — All UI elements are reusable components with typed props and slots.</li>
        <li><strong>Consistency</strong> — Colors, typography, spacing, and shadows follow a single design token system.</li>
        <li><strong>Mock-data-driven</strong> — The template works out of the box without a backend.</li>
        <li><strong>Responsive</strong> — Every page adapts to mobile, tablet, and desktop breakpoints.</li>
        <li><strong>Easy customization</strong> — Colors, menu, routes, and theme are config-driven.</li>
      </ul>
    `,
  },
  {
    id: 'installation',
    title: 'Installation',
    icon: Cpu,
    html: `
      <h3>Prerequisites</h3>
      <ul>
        <li>Node.js 18+</li>
        <li>npm 9+ or yarn or pnpm</li>
      </ul>
      <h3>Steps</h3>
      <div class="space-y-4">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">1. Clone the repository</p>
          <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>git clone https://github.com/your-username/nata-admin-template.git
cd nata-admin-template</code></pre>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">2. Install dependencies</p>
          <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>npm install</code></pre>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">3. Start development server</p>
          <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>npm run dev</code></pre>
          <p class="mt-2 text-sm text-gray-600">The app will be available at <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">http://localhost:5173</code>.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">4. Build for production</p>
          <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>npm run build</code></pre>
          <p class="mt-2 text-sm text-gray-600">Output will be in the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">dist/</code> directory.</p>
        </div>
      </div>
      <h3>Available Commands</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Command</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run dev</code></td>
              <td class="px-4 py-2 text-gray-700">Start development server with hot reload</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run build</code></td>
              <td class="px-4 py-2 text-gray-700">Build for production</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run preview</code></td>
              <td class="px-4 py-2 text-gray-700">Preview production build locally</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run typecheck</code></td>
              <td class="px-4 py-2 text-gray-700">Run TypeScript type checking</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run lint</code></td>
              <td class="px-4 py-2 text-gray-700">Run ESLint</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">npm run test</code></td>
              <td class="px-4 py-2 text-gray-700">Run Vitest unit tests</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  },
  {
    id: 'folder-structure',
    title: 'Folder Structure',
    icon: FolderTree,
    html: `
      <p class="leading-relaxed text-gray-600">
        The project follows a clean, layered architecture. Every directory has a specific purpose.
      </p>
      <div class="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
        <pre class="text-sm leading-relaxed text-gray-700"><code>src/
<button class="emoji" /> app/                  <span class="text-gray-400"># Application core</span>
<button class="emoji" />   layouts/             <span class="text-gray-400"># Layout wrappers (Admin, Auth, Blank, Public)</span>
<button class="emoji" />   router/              <span class="text-gray-400"># Vue Router setup and route definitions</span>
<button class="emoji" />   stores/              <span class="text-gray-400"># Pinia stores (app, auth, ui)</span>
<button class="emoji" />   providers/           <span class="text-gray-400"># App-level providers</span>
<button class="emoji" /> assets/
<button class="emoji" />   scss/                <span class="text-gray-400"># SCSS tokens, base, typography, layout</span>
<button class="emoji" />   illustrations/       <span class="text-gray-400"># SVG illustrations</span>
<button class="emoji" />   images/              <span class="text-gray-400"># Image assets</span>
<button class="emoji" /> components/
<button class="emoji" />   ui/                  <span class="text-gray-400"># Base UI (Button, Card, Modal, Badge, etc.)</span>
<button class="emoji" />   layout/              <span class="text-gray-400"># Layout components (Sidebar, Header, Breadcrumb)</span>
<button class="emoji" />   forms/               <span class="text-gray-400"># Form controls (Input, Select, Checkbox, etc.)</span>
<button class="emoji" />   tables/              <span class="text-gray-400"># Table components (AppTable, Pagination, Filter)</span>
<button class="emoji" />   charts/              <span class="text-gray-400"># Chart wrappers (Line, Bar, Donut, Area, etc.)</span>
<button class="emoji" />   feedback/            <span class="text-gray-400"># Toast, LoadingState, ErrorState</span>
<button class="emoji" />   public/              <span class="text-gray-400"># Public/landing page components</span>
<button class="emoji" /> config/                <span class="text-gray-400"># App, menu, chart, theme, landing config</span>
<button class="emoji" /> data/mock/             <span class="text-gray-400"># Mock data files (30+ datasets)</span>
<button class="emoji" /> pages/                 <span class="text-gray-400"># Page components by domain</span>
<button class="emoji" /> types/                 <span class="text-gray-400"># TypeScript type definitions</span>
<button class="emoji" /> utils/                 <span class="text-gray-400"># Utility functions and helpers</span>
<button class="emoji" /> App.vue                <span class="text-gray-400"># Root component with layout resolver</span>
<button class="emoji" /> main.ts                <span class="text-gray-400"># Application entry point</span></code></pre>
      </div>
      <h3>Pages Directory</h3>
      <p class="leading-relaxed text-gray-600">
        Pages are organized by domain matching the main menu groups:
      </p>
      <div class="grid gap-2 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">dashboard/</p>
          <p class="text-xs text-gray-500">Overview, Analytics, Sales</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">apps/</p>
          <p class="text-xs text-gray-500">Email, Chat, Calendar, Kanban, Tasks, File Manager, Notes</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">management/</p>
          <p class="text-xs text-gray-500">Users, Roles, Customers, Products, Orders</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">finance/</p>
          <p class="text-xs text-gray-500">Invoices, Transactions, Payments, Pricing, Billing</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">content/</p>
          <p class="text-xs text-gray-500">Pages, Media, FAQ, Help Center, Editors</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">reports/</p>
          <p class="text-xs text-gray-500">Sales, User Activity, Audit Logs, Export Center</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">system/</p>
          <p class="text-xs text-gray-500">Settings, API Keys, Integrations, Webhooks, Appearance</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">public/</p>
          <p class="text-xs text-gray-500">Landing page</p>
        </div>
      </div>
    `,
  },
  {
    id: 'routing',
    title: 'Routing',
    icon: ChevronRight,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin uses <strong>Vue Router 4</strong> with a centralized route definition file. All routes are lazy-loaded for optimal performance.
      </p>
      <h3>Route Definition</h3>
      <p class="leading-relaxed text-gray-600">
        Routes are defined in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/app/router/routes.ts</code>. Each route includes a <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">meta</code> object with metadata.
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Example route definition
{
  path: '/management/users',
  name: 'management.users',
  component: () => import('@/pages/management/UsersListPage.vue'),
  meta: {
    title: 'Users',
    layout: 'admin',
    breadcrumb: ['Management', 'Users'],
    requiresAuth: true,
    permission: 'users.view',
  },
}</code></pre>
      <h3>Route Meta Fields</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Field</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Type</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">title</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string</code></td>
              <td class="px-4 py-2 text-gray-700">Page title used in document.title and breadcrumbs</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">layout</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">'admin' | 'auth' | 'blank' | 'public'</code></td>
              <td class="px-4 py-2 text-gray-700">Which layout wrapper to use</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">breadcrumb</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string[]</code></td>
              <td class="px-4 py-2 text-gray-700">Breadcrumb trail segments</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">requiresAuth</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">boolean</code></td>
              <td class="px-4 py-2 text-gray-700">Requires authentication to access</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">permission</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string</code></td>
              <td class="px-4 py-2 text-gray-700">Permission key for access control</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Router Setup</h3>
      <p class="leading-relaxed text-gray-600">
        The router is initialized in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/app/router/index.ts</code>. It includes:
      </p>
      <ul>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">createWebHistory()</code> for clean URLs</li>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">scrollBehavior</code> to scroll to top on navigation</li>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">afterEach</code> guard to set <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">document.title</code></li>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">beforeEach</code> guard for auth and permission checks</li>
      </ul>
      <h3>Layout Resolver</h3>
      <p class="leading-relaxed text-gray-600">
        The root <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">App.vue</code> dynamically resolves the layout based on the route's <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">meta.layout</code> field:
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>const layouts = {
  admin: AdminLayout,    // Sidebar + Header + Content
  auth: AuthLayout,      // Centered auth card
  blank: BlankLayout,    // Minimal centered shell
  public: PublicLayout,  // Public header + footer
}</code></pre>
    `,
  },
  {
    id: 'menu-config',
    title: 'Menu Config',
    icon: LayoutDashboard,
    html: `
      <p class="leading-relaxed text-gray-600">
        The sidebar menu is driven by a configuration file — not hardcoded in the sidebar component. This makes it easy to add, remove, or reorder menu items.
      </p>
      <h3>Menu Configuration</h3>
      <p class="leading-relaxed text-gray-600">
        Defined in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/config/menu.config.ts</code>. The menu is an array of groups, each containing a title, icon, and child items.
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Example menu structure
{
  title: 'Management',
  icon: Users,
  children: [
    { title: 'Users', icon: UserCircle, route: '/management/users' },
    { title: 'Roles', icon: Shield, route: '/management/roles' },
    { title: 'Customers', icon: Building2, route: '/management/customers' },
  ],
}</code></pre>
      <h3>Menu Item Properties</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Property</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Type</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">title</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string</code></td>
              <td class="px-4 py-2 text-gray-700">Menu group or item label</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">icon</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">Component</code></td>
              <td class="px-4 py-2 text-gray-700">Lucide icon component</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">route</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string</code></td>
              <td class="px-4 py-2 text-gray-700">Route path to navigate to</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">badge</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">string</code></td>
              <td class="px-4 py-2 text-gray-700">Optional badge text (e.g. "New", "3")</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">children</td>
              <td class="px-4 py-2 text-gray-600"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">MenuItem[]</code></td>
              <td class="px-4 py-2 text-gray-700">Nested menu items (max 1 level deep)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Main Menu Groups</h3>
      <div class="grid gap-2 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Dashboard</p>
          <p class="text-xs text-gray-500">Overview, Analytics, Sales</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Apps</p>
          <p class="text-xs text-gray-500">Email, Chat, Calendar, Kanban, Tasks, File Manager, Notes</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Management</p>
          <p class="text-xs text-gray-500">Users, Roles, Customers, Products, Orders</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Finance</p>
          <p class="text-xs text-gray-500">Invoices, Transactions, Payments, Pricing, Billing</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Content</p>
          <p class="text-xs text-gray-500">Pages, Media, FAQ, Help Center</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Reports</p>
          <p class="text-xs text-gray-500">Sales, User Activity, Audit Logs, Export Center</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">System</p>
          <p class="text-xs text-gray-500">Settings, API Keys, Integrations, Webhooks, Appearance</p>
        </div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p class="text-sm font-medium text-gray-900">Template Pages</p>
          <p class="text-xs text-gray-500">Auth, Error, Utility, Profile pages</p>
        </div>
      </div>
    `,
  },
  {
    id: 'scss-tokens',
    title: 'SCSS Tokens',
    icon: Sliders,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin uses a <strong>token-based styling system</strong> with SCSS custom properties (CSS variables). All colors, spacing, shadows, and transitions are defined as tokens in a central location.
      </p>
      <h3>Token Files</h3>
      <p class="leading-relaxed text-gray-600">
        Tokens are split across two files in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/assets/scss/</code>:
      </p>
      <ul>
        <li><strong>_tokens.scss</strong> — CSS custom properties (design tokens) scoped to <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">:root</code> and <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">.dark</code></li>
        <li><strong>_variables.scss</strong> — SCSS variables for convenience and reuse within partials</li>
      </ul>
      <h3>Token Categories</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Color Tokens</p>
          <p class="text-sm text-gray-600">Full scales (50–950) for primary, secondary, success, info, warning, and danger — each with <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--color-{name}-{shade}</code>.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Surface Tokens</p>
          <p class="text-sm text-gray-600"><code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--surface-page</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--surface-card</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--surface-overlay</code> for background layers.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Border Tokens</p>
          <p class="text-sm text-gray-600"><code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--border-default</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--border-subtle</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--border-hover</code> for consistent borders.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Text Tokens</p>
          <p class="text-sm text-gray-600"><code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--text-primary</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--text-secondary</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--text-muted</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--text-inverse</code>.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Shadow Tokens</p>
          <p class="text-sm text-gray-600"><code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--shadow-sm</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--shadow-md</code>, <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--shadow-lg</code> for elevation.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Chart Tokens</p>
          <p class="text-sm text-gray-600">Predefined chart color palette for ApexCharts series: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--chart-1</code> through <code class="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">--chart-8</code>.</p>
        </div>
      </div>
      <h3>Dark Mode Overrides</h3>
      <p class="leading-relaxed text-gray-600">
        Dark mode tokens are defined under a <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">.dark</code> selector block in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">_tokens.scss</code>. The Tailwind config uses <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">darkMode: 'class'</code> to toggle the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">.dark</code> class on the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">&lt;html&gt;</code> element.
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Example token usage
:root {
  --color-primary-600: #066fd1;
  --surface-card: #ffffff;
  --border-default: #e5e7eb;
}

.dark {
  --color-primary-600: #3b82f6;
  --surface-card: #1f2937;
  --border-default: #374151;
}</code></pre>
      <h3>Tailwind Token Mapping</h3>
      <p class="leading-relaxed text-gray-600">
        The <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">tailwind.config.ts</code> maps SCSS tokens to Tailwind utility classes using a <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">tokenScale()</code> helper, so you can use classes like <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">bg-primary-600</code> or <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">text-success-500</code>.
      </p>
    `,
  },
  {
    id: 'color-system',
    title: 'Color System',
    icon: Palette,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin uses a <strong>Tabler-inspired color system</strong> with semantic color scales. Each color has shades from 50 (lightest) to 950 (darkest).
      </p>
      <h3>Semantic Colors</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="h-4 w-4 rounded-full" style="background-color: #066fd1"></span>
            <p class="text-sm font-semibold text-gray-900">Primary</p>
          </div>
          <p class="text-xs text-gray-600">Base: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs">#066fd1</code></p>
          <p class="text-xs text-gray-500">Main actions, active menu, focus, selected state</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="h-4 w-4 rounded-full" style="background-color: #2fb344"></span>
            <p class="text-sm font-semibold text-gray-900">Success</p>
          </div>
          <p class="text-xs text-gray-600">Base: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs">#2fb344</code></p>
          <p class="text-xs text-gray-500">Positive feedback, completed states</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="h-4 w-4 rounded-full" style="background-color: #4299e1"></span>
            <p class="text-sm font-semibold text-gray-900">Info</p>
          </div>
          <p class="text-xs text-gray-600">Base: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs">#4299e1</code></p>
          <p class="text-xs text-gray-500">Informational messages, hints</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="h-4 w-4 rounded-full" style="background-color: #f59f00"></span>
            <p class="text-sm font-semibold text-gray-900">Warning</p>
          </div>
          <p class="text-xs text-gray-600">Base: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs">#f59f00</code></p>
          <p class="text-xs text-gray-500">Caution, pending states</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="h-4 w-4 rounded-full" style="background-color: #d63939"></span>
            <p class="text-sm font-semibold text-gray-900">Danger</p>
          </div>
          <p class="text-xs text-gray-600">Base: <code class="rounded bg-gray-100 px-1 py-0.5 text-xs">#d63939</code></p>
          <p class="text-xs text-gray-500">Errors, destructive actions</p>
        </div>
      </div>
      <h3>Component States</h3>
      <p class="leading-relaxed text-gray-600">
        Every component in Nata Admin supports the following states, using the appropriate semantic color:
      </p>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">State</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">default</td><td class="px-4 py-2 text-gray-700">Resting state</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">hover</td><td class="px-4 py-2 text-gray-700">Hover state with darker shade or ghost background</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">active</td><td class="px-4 py-2 text-gray-700">Pressed or selected state</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">focus</td><td class="px-4 py-2 text-gray-700">Visible focus ring for keyboard navigation</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">disabled</td><td class="px-4 py-2 text-gray-700">Reduced opacity, no interaction</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">loading</td><td class="px-4 py-2 text-gray-700">Spinner indicator, disabled during operation</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">error</td><td class="px-4 py-2 text-gray-700">Danger color for validation errors</td></tr>
            <tr class="border-b border-gray-100"><td class="px-4 py-2 font-medium text-gray-900">success</td><td class="px-4 py-2 text-gray-700">Success color for positive feedback</td></tr>
          </tbody>
        </table>
      </div>
      <h3>Usage Rule</h3>
      <p class="leading-relaxed text-gray-600">
        Always use semantic tokens instead of raw hex colors in components:
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Correct
&lt;button class="bg-primary-600 hover:bg-primary-700 text-white"&gt;Save&lt;/button&gt;

// Incorrect
&lt;button style="background: #066fd1"&gt;Save&lt;/button&gt;</code></pre>
    `,
  },
  {
    id: 'typography',
    title: 'Typography',
    icon: Type,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin uses <strong>Inter</strong> as the primary typeface — a clean, highly legible sans-serif font designed for screen interfaces.
      </p>
      <h3>Font Configuration</h3>
      <p class="leading-relaxed text-gray-600">
        Inter is loaded via <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">@fontsource/inter</code> and configured as the primary font family in both Tailwind and SCSS.
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Tailwind config
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
}

// SCSS token
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;</code></pre>
      <h3>Type Scale</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Element</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Size</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Weight</th>
              <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">Tailwind Class</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Page Title</td>
              <td class="px-4 py-2 text-gray-700">24px</td>
              <td class="px-4 py-2 text-gray-700">Bold 700</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-2xl font-bold</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Section Title</td>
              <td class="px-4 py-2 text-gray-700">18px</td>
              <td class="px-4 py-2 text-gray-700">Semibold 600</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-lg font-semibold</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Card Title</td>
              <td class="px-4 py-2 text-gray-700">16px</td>
              <td class="px-4 py-2 text-gray-700">Semibold 600</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-base font-semibold</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Body</td>
              <td class="px-4 py-2 text-gray-700">15px</td>
              <td class="px-4 py-2 text-gray-700">Regular 400</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-[15px]</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Table Cell</td>
              <td class="px-4 py-2 text-gray-700">14px</td>
              <td class="px-4 py-2 text-gray-700">Regular 400</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-sm</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Table Header</td>
              <td class="px-4 py-2 text-gray-700">12px</td>
              <td class="px-4 py-2 text-gray-700">Semibold 600</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-xs font-semibold</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Form Label</td>
              <td class="px-4 py-2 text-gray-700">13px</td>
              <td class="px-4 py-2 text-gray-700">Medium 500</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-xs font-medium</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Button</td>
              <td class="px-4 py-2 text-gray-700">14px</td>
              <td class="px-4 py-2 text-gray-700">Medium 500</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-sm font-medium</code></td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="px-4 py-2 font-medium text-gray-900">Badge</td>
              <td class="px-4 py-2 text-gray-700">12px</td>
              <td class="px-4 py-2 text-gray-700">Medium 500</td>
              <td class="px-4 py-2"><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">text-xs font-medium</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Allowed Font Weights</h3>
      <p class="leading-relaxed text-gray-600">
        Only four weights are used in the template:
      </p>
      <ul>
        <li><strong>400 Regular</strong> — Body text, table cells, paragraphs</li>
        <li><strong>500 Medium</strong> — Buttons, form labels, badges</li>
        <li><strong>600 Semibold</strong> — Section titles, card titles, table headers</li>
        <li><strong>700 Bold</strong> — Page titles, emphasis</li>
      </ul>
    `,
  },
  {
    id: 'components',
    title: 'Components',
    icon: Puzzle,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin includes a comprehensive library of reusable Vue components. Every component is typed with TypeScript interfaces and supports multiple states.
      </p>
      <h3>Base UI Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/ui/</code>:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppButton</p><p class="text-xs text-gray-500">Primary, secondary, outline, ghost, danger, icon, loading</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppCard</p><p class="text-xs text-gray-500">Card with header, body, footer, image variants</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppBadge</p><p class="text-xs text-gray-500">Status, numeric, outline, pill, dot variants</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppAlert</p><p class="text-xs text-gray-500">Success, info, warning, danger, dismissible</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppModal</p><p class="text-xs text-gray-500">Basic, scrollable, centered, large with backdrop</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppDropdown</p><p class="text-xs text-gray-500">Menu, action, notification, user dropdowns</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppTabs</p><p class="text-xs text-gray-500">Line, pill, bordered, icon tab variants</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppAvatar</p><p class="text-xs text-gray-500">Image, initials, size variants, status indicator</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppDrawer</p><p class="text-xs text-gray-500">Slide-in panel from left or right</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppSearchOverlay</p><p class="text-xs text-gray-500">Full-screen search with keyboard shortcut</p></div>
      </div>
      <h3>Form Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/forms/</code>:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppInput</p><p class="text-xs text-gray-500">Text input with label, helper, error, disabled, loading</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppSelect</p><p class="text-xs text-gray-500">Select dropdown with placeholder, options, states</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppTextarea</p><p class="text-xs text-gray-500">Textarea with resizable, label, error, disabled</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppCheckbox</p><p class="text-xs text-gray-500">Checkbox with label, indeterminate, disabled</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppRadio</p><p class="text-xs text-gray-500">Radio button group with label, disabled</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppSwitch</p><p class="text-xs text-gray-500">Toggle switch with label, disabled, loading</p></div>
      </div>
      <h3>Table Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/tables/</code>:
      </p>
      <ul>
        <li><strong>AppTable</strong> — Data table with sort, selectable rows, slot-based columns</li>
        <li><strong>AppTableToolbar</strong> — Search input, action buttons, view toggle</li>
        <li><strong>AppTableFilter</strong> — Filter dropdowns for column-based filtering</li>
        <li><strong>AppTablePagination</strong> — Page navigation with page size selector</li>
      </ul>
      <h3>Chart Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/charts/</code>:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">LineChart</p><p class="text-xs text-gray-500">Line chart with multiple series, markers, grid</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AreaChart</p><p class="text-xs text-gray-500">Area chart with gradient fill</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">BarChart</p><p class="text-xs text-gray-500">Vertical and horizontal bar charts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">DonutChart</p><p class="text-xs text-gray-500">Donut and pie charts with legend</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">RadialChart</p><p class="text-xs text-gray-500">Radial gauge chart</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">SparklineChart</p><p class="text-xs text-gray-500">Compact inline sparkline chart</p></div>
      </div>
      <h3>Feedback Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/feedback/</code>:
      </p>
      <ul>
        <li><strong>AppToast</strong> — Toast notification queue with success, error, info, warning types</li>
        <li><strong>LoadingState</strong> — Full-page or inline loading spinner</li>
        <li><strong>ErrorState</strong> — Error display with retry action</li>
      </ul>
      <h3>Layout Components</h3>
      <p class="leading-relaxed text-gray-600">
        Located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/components/layout/</code>:
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppSidebar</p><p class="text-xs text-gray-500">Collapsible sidebar with menu groups, active state</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppHeader</p><p class="text-xs text-gray-500">Sticky header with search, notifications, user menu</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppBreadcrumb</p><p class="text-xs text-gray-500">Breadcrumb navigation from route meta</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"><p class="text-sm font-medium text-gray-900">AppPageHeader</p><p class="text-xs text-gray-500">Page title with breadcrumb and actions</p></div>
      </div>
    `,
  },
  {
    id: 'mock-data',
    title: 'Mock Data',
    icon: Database,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin includes <strong>30+ mock data files</strong> so the template works completely out of the box without a backend. All data is realistic, typed, and ready to use.
      </p>
      <h3>Location</h3>
      <p class="leading-relaxed text-gray-600">
        All mock data is located in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/data/mock/</code>. Each file exports typed arrays of mock records.
      </p>
      <pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code>// Example: users.mock.ts
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-06-01T10:30:00Z',
  },
  // ... more users
]</code></pre>
      <h3>Available Mock Data</h3>
      <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">users.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">customers.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">products.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">orders.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">invoices.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">transactions.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">payments.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">dashboard.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">emails.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">chats.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">calendar.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">kanban.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">tasks.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">files.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">notes.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">pages.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">media.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">faq.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">roles.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">settings.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">sales.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">api-keys.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">integrations.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">webhooks.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">billing.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">pricing-plans.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">export-center.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">audit-logs.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">user-activity.mock.ts</p></div>
        <div class="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2"><p class="text-sm text-gray-700">help-center.mock.ts</p></div>
      </div>
      <h3>Mock Data Quality</h3>
      <ul>
        <li>Realistic names, emails, addresses, and statuses</li>
        <li>Support search, filter, and pagination</li>
        <li>Include <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">created_at</code> / <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">updated_at</code> timestamps</li>
        <li>Varied statuses (active, pending, suspended, etc.)</li>
        <li>Avoid real personal data</li>
        <li>Consistent between related pages (user IDs match across datasets)</li>
      </ul>
      <h3>Replacing Mock Data with Real API</h3>
      <p class="leading-relaxed text-gray-600">
        When you are ready to connect a real backend, replace the mock data imports with API service calls. The page components are structured to make this straightforward — data is fetched in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">onMounted</code> and stored in local refs.
      </p>
    `,
  },
  {
    id: 'customization',
    title: 'Customization',
    icon: Settings,
    html: `
      <p class="leading-relaxed text-gray-600">
        Nata Admin is designed to be easy to customize. Most changes can be made by editing configuration files — no need to dig into component code.
      </p>
      <h3>Change Primary Color</h3>
      <div class="space-y-3">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">1. Update SCSS tokens</p>
          <p class="mb-2 text-sm text-gray-600">Edit <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/assets/scss/_tokens.scss</code> — update the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">--color-primary-*</code> variables (50–950) for both <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">:root</code> and <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">.dark</code>.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">2. Update Tailwind config</p>
          <p class="mb-2 text-sm text-gray-600">Edit <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">tailwind.config.ts</code> — update the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">tokenScale('primary')</code> mapping if needed.</p>
        </div>
      </div>
      <h3>Modify Sidebar Menu</h3>
      <div class="space-y-3">
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Edit menu.config.ts</p>
          <p class="mb-2 text-sm text-gray-600">Open <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/config/menu.config.ts</code> and add, remove, or reorder menu groups and items. Each item has a <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">title</code>, <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">icon</code>, and <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">route</code>.</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="mb-2 text-sm font-semibold text-gray-900">Add route for new page</p>
          <p class="mb-2 text-sm text-gray-600">Open <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/app/router/routes.ts</code> and add a new route entry with the appropriate <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">meta</code> fields.</p>
        </div>
      </div>
      <h3>Customize Dark Mode</h3>
      <p class="leading-relaxed text-gray-600">
        Dark mode colors are defined in the <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">.dark</code> block in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">_tokens.scss</code>. The toggle behavior is managed by <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">src/app/stores/app.store.ts</code>:
      </p>
      <ul>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">setTheme('light' | 'dark')</code> — Switch theme programmatically</li>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">toggleTheme()</code> — Toggle between light and dark</li>
        <li><code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">initTheme()</code> — Initialize theme from localStorage or system preference</li>
      </ul>
      <h3>Add a New Page</h3>
      <ol class="space-y-3">
        <li class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-sm font-semibold text-gray-900">1. Create the page component</p>
          <p class="text-sm text-gray-600">Add a new <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">.vue</code> file in the appropriate <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/pages/</code> subdirectory.</p>
        </li>
        <li class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-sm font-semibold text-gray-900">2. Register the route</p>
          <p class="text-sm text-gray-600">Add a route entry in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/app/router/routes.ts</code> with lazy-loaded component and meta fields.</p>
        </li>
        <li class="rounded-lg border border-gray-200 bg-white p-4">
          <p class="text-sm font-semibold text-gray-900">3. Add to sidebar menu</p>
          <p class="text-sm text-gray-600">Add a menu item in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/config/menu.config.ts</code> pointing to the new route.</p>
        </li>
      </ol>
      <h3>Replace Mock Data with Real Backend</h3>
      <p class="leading-relaxed text-gray-600">
        When you are ready to integrate a backend:
      </p>
      <ol>
        <li>Create API service functions in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/utils/api/</code> (create the directory if needed)</li>
        <li>Replace mock data imports in page components with API calls</li>
        <li>Update the Pinia auth store to use real login/logout endpoints</li>
        <li>Remove or keep mock data files as reference</li>
      </ol>
      <h3>Other Customizations</h3>
      <ul>
        <li><strong>App name</strong> — Edit <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/config/app.config.ts</code></li>
        <li><strong>Font family</strong> — Update <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">tailwind.config.ts</code> and <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">_tokens.scss</code></li>
        <li><strong>Spacing / radius / shadows</strong> — Edit token values in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">_tokens.scss</code></li>
        <li><strong>Chart colors</strong> — Update <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">--chart-1</code> through <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">--chart-8</code> in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">_tokens.scss</code></li>
        <li><strong>Toast duration</strong> — Configure in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800">src/config/app.config.ts</code></li>
      </ul>
    `,
  },
]
