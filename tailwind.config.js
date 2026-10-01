/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06070a',
          900: '#0b0d11',
          850: '#0f1218',
          800: '#12161f',
          700: '#1a202c',
          600: '#242b3b',
        },
        parchment: {
          50: '#faf8f5',
          100: '#f8f6f1',
          200: '#efebe1',
          300: '#e4dcd0',
          400: '#d5c7b3',
          500: '#b8a48b',
          800: '#42382c',
          900: '#2a2219',
        },
        crimson: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        groupA: '#f59e0b', // Amber
        groupB: '#06b6d4', // Cyan
        groupC: '#f43f5e', // Rose
        groupD: '#c084fc', // Purple
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Crimson Pro"', '"Nanum Myeongjo"', 'Georgia', 'serif'],
        sans: ['"Pretendard"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        pulseRadar: {
          '0%': { transform: 'scale(0.95)', opacity: '0.85', boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
          '70%': { transform: 'scale(1.15)', opacity: '1', boxShadow: '0 0 0 14px rgba(220, 38, 38, 0)' },
          '100%': { transform: 'scale(0.95)', opacity: '0.85', boxShadow: '0 0 0 0 rgba(220, 38, 38, 0)' },
        }
      },
      animation: {
        radar: 'pulseRadar 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
      }
    },
  },
  plugins: [],
}
