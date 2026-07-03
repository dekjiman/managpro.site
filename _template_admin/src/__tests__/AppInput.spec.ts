import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from '@/components/forms/AppInput.vue'

describe('AppInput', () => {
  it('renders input with given id', () => {
    const wrapper = mount(AppInput, { props: { id: 'name', modelValue: '' } })
    expect(wrapper.find('input').attributes('id')).toBe('name')
  })

  it('renders label when provided', () => {
    const wrapper = mount(AppInput, { props: { id: 'email', label: 'Email', modelValue: '' } })
    expect(wrapper.text()).toContain('Email')
  })

  it('shows required asterisk when required', () => {
    const wrapper = mount(AppInput, { props: { id: 'req', label: 'Name', required: true, modelValue: '' } })
    expect(wrapper.html()).toContain('*')
  })

  it('sets input type', () => {
    const wrapper = mount(AppInput, { props: { id: 'pwd', type: 'password', modelValue: '' } })
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('renders helper text', () => {
    const wrapper = mount(AppInput, { props: { id: 'h', helper: 'Your full name', modelValue: '' } })
    expect(wrapper.text()).toContain('Your full name')
  })

  it('renders error text and aria-invalid', () => {
    const wrapper = mount(AppInput, { props: { id: 'e', error: 'Required', modelValue: '' } })
    expect(wrapper.text()).toContain('Required')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('does not show helper when error is present', () => {
    const wrapper = mount(AppInput, {
      props: { id: 'x', helper: 'Help', error: 'Error', modelValue: '' },
    })
    expect(wrapper.text()).not.toContain('Help')
    expect(wrapper.text()).toContain('Error')
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(AppInput, { props: { id: 'd', disabled: true, modelValue: '' } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput, { props: { id: 'n', modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })
})
