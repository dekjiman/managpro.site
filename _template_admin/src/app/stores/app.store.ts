import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Nata Admin',
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
    currentTheme: 'light',
    currentLanguage: 'en',
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    setMobileSidebarOpen(value: boolean) {
      this.mobileSidebarOpen = value
    },
    setTheme(theme: 'light' | 'dark') {
      this.currentTheme = theme
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('nata-admin-theme', theme)
    },
    toggleTheme() {
      this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light')
    },
    initTheme() {
      const stored = localStorage.getItem('nata-admin-theme') as 'light' | 'dark' | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = stored || (prefersDark ? 'dark' : 'light')
      this.setTheme(theme)
    },
  },
})
