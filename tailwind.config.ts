import type { Config } from 'tailwindcss';

/** Paleta e fontes da HAZE (Identidade-HAZE/BRAND.md). Branco puro não existe na marca. */
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
      gray: '#8D8B86',
      cyan: '#01BBFB',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 12px 28px rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
