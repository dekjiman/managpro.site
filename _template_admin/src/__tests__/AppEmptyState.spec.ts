import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'

describe('AppEmptyState', () => {
  it('renders default title and description', () => {
    const wrapper = mount(AppEmptyState)
    expect(wrapper.text()).toContain('No data found')
    expect(wrapper.text()).toContain('Try adjusting your search or filters.')
  })

  it('renders custom title and description', () => {
    const wrapper = mount(AppEmptyState, {
      props: { title: 'No results', description: 'Please try again.' },
    })
    expect(wrapper.text()).toContain('No results')
    expect(wrapper.text()).toContain('Please try again.')
  })

  it('renders action slot', () => {
    const wrapper = mount(AppEmptyState, {
      slots: { action: '<button>Create</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Create')
  })

  it('renders the Inbox icon', () => {
    const wrapper = mount(AppEmptyState)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })
})
