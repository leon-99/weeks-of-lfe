/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '26': 'repeat(26, minmax(0, 1fr))',
      },
      colors: {
        'glass': {
          'bg': 'rgba(255, 255, 255, 0.05)',
          'border': 'rgba(255, 255, 255, 0.1)',
          'hover': 'rgba(255, 255, 255, 0.08)',
        },
        'glass-card': {
          'bg': 'rgba(255, 255, 255, 0.05)',
          'border': 'rgba(255, 255, 255, 0.1)',
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'pulse-hover': 'pulse 0.6s ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulse: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
}

