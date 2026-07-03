import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    layout: 'admin' | 'auth' | 'blank' | 'public'
    breadcrumb?: string[]
    requiresAuth?: boolean
    permission?: string
  }
}
