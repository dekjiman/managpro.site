import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: true,
    currentUser: {
      name: 'Ariana Hart',
      email: 'ariana.hart@example.test',
      role: 'Admin',
    },
    roles: ['Admin', 'Manager'],
    permissions: ['dashboard.view', 'users.view', 'reports.export', 'settings.view'],
  }),
})
