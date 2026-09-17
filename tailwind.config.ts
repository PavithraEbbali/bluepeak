import type { Config } from 'tailwindcss';

/**
 * Palette values are lifted verbatim from mybluepeak.com's published theme
 * tokens (--wp--preset--color--*), so the retailer site reads as Bluepeak.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#060048',
          50: '#eceaf5',
          100: '#d2cde6',
          200: '#a79dcd',
          300: '#7b6cb4',
          400: '#503f96',
          500: '#2f2073',
          600: '#1b0f5c',
          700: '#0f0652',
          800: '#090149',
          900: '#060048',
          950: '#03002a',
        },
        royal: {
          DEFAULT: '#0a109d',
          400: '#3b41c4',
          500: '#1a20ad',
          600: '#0a109d',
          700: '#080d7e',
        },
        ocean: {
          DEFAULT: '#034fab',
          400: '#2e7bd4',
          500: '#0b64c4',
          600: '#034fab',
          700: '#023d85',
        },
        teal: {
          DEFAULT: '#008dbb',
          50: '#e6f6fb',
          100: '#c2eaf5',
          200: '#87d5eb',
          300: '#45bcdd',
          400: '#12a3cc',
          500: '#008dbb',
          600: '#00749b',
          700: '#005a78',
          800: '#004258',
          900: '#012c3b',
        },
        sun: {
          DEFAULT: '#ebab32',
          400: '#f2c063',
          500: '#ebab32',
          600: '#c98b1c',
        },
        bone: {
          DEFAULT: '#f3f3ed',
          100: '#faf9f6',
          200: '#f3f3ed',
          300: '#e7e6dc',
          400: '#d5d3c4',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Tuned against the column each one actually lives in, so the hero
           headline lands on three or four lines rather than six. */
        'display-sm': [
          'clamp(1.75rem,3.4vw,2.5rem)',
          { lineHeight: '1.08', letterSpacing: '-0.03em' },
        ],
        display: [
          'clamp(2.125rem,4.4vw,3.25rem)',
          { lineHeight: '1.04', letterSpacing: '-0.035em' },
        ],
        'display-lg': [
          'clamp(2.375rem,5.4vw,4.25rem)',
          { lineHeight: '1.0', letterSpacing: '-0.038em' },
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,0,72,.04), 0 12px 32px -12px rgba(6,0,72,.14)',
        'card-lift': '0 2px 4px rgba(6,0,72,.05), 0 32px 64px -24px rgba(6,0,72,.28)',
        glow: '0 0 0 1px rgba(0,141,187,.35), 0 18px 48px -18px rgba(0,141,187,.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.08)',
      },
      backgroundImage: {
        'brand-sweep': 'linear-gradient(90deg,#034fab 0%,#0a109d 100%)',
        'teal-sweep': 'linear-gradient(90deg,#008dbb 0%,#034fab 100%)',
        'navy-depth': 'radial-gradient(120% 120% at 50% 0%,#0b1066 0%,#060048 48%,#03002a 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0,14px,0)' },
          '100%': { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.85)', opacity: '.6' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        /* Slow push-in on the hero photograph. Starts already scaled so the
           frame never exposes an edge as it drifts. */
        'ken-burns': {
          '0%': { transform: 'scale(1.06) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.5%,-1.2%,0)' },
        },
        /* Ambient colour drifting behind the light sections. Transform only,
           so these stay on the compositor. */
        'drift-a': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(7%,-5%,0) scale(1.14)' },
        },
        'drift-b': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.08)' },
          '50%': { transform: 'translate3d(-6%,6%,0) scale(1)' },
        },
        'drift-c': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '50%': { transform: 'translate3d(4%,7%,0) scale(1.18)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration,38s) linear infinite',
        'fade-up': 'fade-up .6s cubic-bezier(.16,1,.3,1) both',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(.16,1,.3,1) infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        'ken-burns': 'ken-burns 26s ease-in-out infinite alternate',
        'drift-a': 'drift-a 30s ease-in-out infinite',
        'drift-b': 'drift-b 38s ease-in-out infinite',
        'drift-c': 'drift-c 34s ease-in-out infinite',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
};

export default config;
