import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/ui/AppButton.vue'

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, { slots: { default: 'Save' } })
    expect(wrapper.text()).toBe('Save')
  })

  it('uses primary variant by default', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-btn-primary')
  })

  it('applies variant class', () => {
    const wrapper = mount(AppButton, { props: { variant: 'danger' } })
    expect(wrapper.classes()).toContain('app-btn-danger')
  })

  it('applies size class when sm', () => {
    const wrapper = mount(AppButton, { props: { size: 'sm' } })
    expect(wrapper.classes()).toContain('app-btn-sm')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(AppButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('is disabled when loading', () => {
    const wrapper = mount(AppButton, { props: { loading: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders spinner when loading', () => {
    const wrapper = mount(AppButton, { props: { loading: true } })
    const spinner = wrapper.find('.animate-spin')
    expect(spinner.exists()).toBe(true)
  })

  it('sets type attribute', () => {
    const wrapper = mount(AppButton, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(AppButton, { props: { ariaLabel: 'Close' } })
    expect(wrapper.attributes('aria-label')).toBe('Close')
  })

  it('emits click event', async () => {
    const wrapper = mount(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
