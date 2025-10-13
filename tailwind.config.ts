/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
          mono: ['var(--font-geist-mono)', 'monospace'],
          playfair: ['var(--font-playfair)', 'serif'],
        },
        colors: {
          gold: {
            50: '#fdf8f3',
            100: '#f7f0e6',
            200: '#f0e2cc',
            300: '#e5cba3',
            400: '#d8ae75',
            500: '#c4a267',
            600: '#b08c5a',
            700: '#947044',
            800: '#795a3a',
            900: '#634a30',
          },
        },
        animation: {
          'fade-in': 'fadeIn 0.8s ease-out',
          'slide-up': 'slideUp 0.7s ease-out',
          'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'pulse-gentle': {
            '0%, 100%': { opacity: '0.5' },
            '50%': { opacity: '1' },
          },
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }