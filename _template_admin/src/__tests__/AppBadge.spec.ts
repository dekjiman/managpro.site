import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadge from '@/components/ui/AppBadge.vue'

describe('AppBadge', () => {
  it('renders default slot content', () => {
    const wrapper = mount(AppBadge, { slots: { default: 'Active' } })
    expect(wrapper.text()).toBe('Active')
  })

  it('uses neutral variant by default', () => {
    const wrapper = mount(AppBadge, { slots: { default: 'Default' } })
    expect(wrapper.classes()).toContain('app-badge-neutral')
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'success' }, slots: { default: 'Done' } })
    expect(wrapper.classes()).toContain('app-badge-success')
  })

  it('accepts all variants', () => {
    const variants = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const
    for (const v of variants) {
      const wrapper = mount(AppBadge, { props: { variant: v }, slots: { default: 'Test' } })
      expect(wrapper.classes()).toContain(`app-badge-${v}`)
    }
  })
})
