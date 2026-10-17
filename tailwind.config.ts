import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      graphite: '#141414',
      line: '#2B2B2B',
      paper: '#F1EEE7',
      white: '#FFFFFF',
      gray: '#8D8B86',
      cyan: '#01BBFB',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1240px',
        header: '1320px',
      },
      boxShadow: {
        lift: '0 14px 34px rgb(0 0 0 / 0.08)',
        header: '0 2px 24px rgb(0 0 0 / 0.06)',
        glow: '0 0 56px rgb(1 187 251 / 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
