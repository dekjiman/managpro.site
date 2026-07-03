import { defineStore } from 'pinia'

export interface ToastItem {
  id: number
  title: string
  type: 'success' | 'info' | 'warning' | 'danger'
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    globalLoading: false,
    commandPaletteOpen: false,
    activeModal: '',
    toastQueue: [] as ToastItem[],
  }),
  actions: {
    pushToast(toast: Omit<ToastItem, 'id'>) {
      this.toastQueue.push({ ...toast, id: Date.now() })
    },
    removeToast(id: number) {
      this.toastQueue = this.toastQueue.filter((toast) => toast.id !== id)
    },
  },
})
