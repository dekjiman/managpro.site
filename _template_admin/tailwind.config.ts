import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['0.9375rem', { lineHeight: '1.5rem' }],
        md: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      colors: {
        primary: tokenScale('primary'),
        secondary: tokenScale('secondary'),
        success: tokenScale('success', 900),
        info: tokenScale('info', 900),
        warning: tokenScale('warning', 900),
        danger: tokenScale('danger', 900),
        app: {
          body: 'var(--surface-body)',
          page: 'var(--surface-page)',
          card: 'var(--surface-card)',
          header: 'var(--surface-header)',
          sidebar: 'var(--surface-sidebar)',
          muted: 'var(--surface-muted)',
          soft: 'var(--surface-soft)',
          elevated: 'var(--surface-elevated)',
          overlay: 'var(--surface-overlay)',
          text: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
          textMuted: 'var(--text-muted)',
          textSubtle: 'var(--text-subtle)',
          textDisabled: 'var(--text-disabled)',
          border: 'var(--border-default)',
          borderSoft: 'var(--border-soft)',
          borderStrong: 'var(--border-strong)',
        },
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        dropdown: 'var(--shadow-dropdown)',
        modal: 'var(--shadow-modal)',
        focusPrimary: 'var(--shadow-focus-primary)',
        focusDanger: 'var(--shadow-focus-danger)',
      },
    },
  },
  plugins: [],
} satisfies Config

function tokenScale(name: string, max = 950) {
  const shades = max === 950 ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] : [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  return Object.fromEntries(shades.map((shade) => [shade, `var(--color-${name}-${shade})`]))
}
