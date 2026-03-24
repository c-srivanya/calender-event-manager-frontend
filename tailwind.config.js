/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        'extrabold': ['900'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      colors: {
        'blue-pastel': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#93c5fd',
          500: '#7c9fff',
          600: '#4f94ff',
        }
      },
      fontFamily: {
        'poppins': {
          400: ['Poppins', 'sans-serif'],
          500: ['Poppins', 'sans-serif'],
          600: ['Poppins', 'sans-serif'],
        },
      },
      borderRadius: {
        'genz': '24px',
        'genz-xl': '32px',
      },
      boxShadow: {
        'genz': 'var(--shadow-genz)',
        'genz-soft': '0 8px 32px rgba(124, 159, 255, 0.15)',
        'glass-1': '0 8px 32px rgba(79, 148, 255, 0.1)',
        'glass-2': '0 20px 40px rgba(79, 148, 255, 0.15)',
        'glow-blue': '0 0 20px rgba(124, 159, 255, 0.4)',
        'neumo': '8px 8px 16px rgba(79, 148, 255, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neumo-press': 'inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(79, 148, 255, 0.3)',
        'genz-3d': '0 25px 50px -12px rgba(79, 148, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glassPulse': 'glassPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.8', transform: 'scale(1.02)' },
        },
        glassPulse: {
          '0%, 100%': { boxShadow: 'var(--glass-1)', transform: 'scale(1)' },
          '50%': { boxShadow: 'var(--glass-2), 0 0 20px rgba(124,159,255,0.3)', transform: 'scale(1.01)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

