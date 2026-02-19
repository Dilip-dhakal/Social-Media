import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#3b82f6',
        'light-bg': '#f9fafb',
        'card-bg': '#ffffff',
        'border-color': '#e5e7eb',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
