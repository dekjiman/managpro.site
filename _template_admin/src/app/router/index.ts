import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/app/stores/auth.store'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Nata Admin`
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { path: '/auth/login', query: { redirect: to.fullPath } }
  }

  const permission = String(to.meta.permission || '')
  if (permission && !authStore.permissions.includes(permission)) {
    return '/errors/403'
  }

  return true
})

export default router
