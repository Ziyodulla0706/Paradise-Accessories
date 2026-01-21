import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium B2B Palette
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#0A1628', // Primary navy
        },
        gold: {
          50: '#FFFBF0',
          100: '#FEF7E6',
          200: '#FDEDC8',
          300: '#FCE3AA',
          400: '#FBD98C',
          500: '#FACF6E',
          600: '#F9C550',
          700: '#E8B446',
          800: '#D4AF37', // Primary gold
          900: '#B8941F',
        },
        gray: {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748', // Professional gray
          800: '#1A202C',
          900: '#171923',
        },
        // Legacy support
        white: '#FFFFFF',
        graphite: '#2A2A2A',
        accent: {
          DEFAULT: '#D4AF37', // Gold
          hover: '#B8941F',
          light: '#FACF6E',
        },
        text: {
          primary: '#0A1628',
          secondary: '#4A5568',
        },
        bg: {
          light: '#F7FAFC',
          dark: '#EDF2F7',
        },
        border: {
          DEFAULT: '#E2E8F0',
          light: '#EDF2F7',
        },
        // Dark theme colors
        dark: {
          bg: {
            primary: '#0A1628',
            secondary: '#102A43',
            tertiary: '#243B53',
          },
          text: {
            primary: '#F7FAFC',
            secondary: '#CBD5E0',
          },
          border: '#334E68',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        // Tight spacing for dense layouts
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '5rem',
        '5xl': '6rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(10, 22, 40, 0.05)',
        md: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -1px rgba(10, 22, 40, 0.06)',
        lg: '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -2px rgba(10, 22, 40, 0.05)',
        xl: '0 20px 25px -5px rgba(10, 22, 40, 0.1), 0 10px 10px -5px rgba(10, 22, 40, 0.04)',
        '2xl': '0 25px 50px -12px rgba(10, 22, 40, 0.25)',
        '3xl': '0 35px 60px -12px rgba(10, 22, 40, 0.3)',
        accent: '0 10px 25px -5px rgba(212, 175, 55, 0.3)',
        gold: '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        fixed: '300',
        modal: '400',
        popover: '500',
        tooltip: '600',
        floating: '700',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-bottom': 'slideInBottom 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'counter': 'counter 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        counter: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
