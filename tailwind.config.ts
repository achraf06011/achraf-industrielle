import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0F4C81',
          'blue-dark': '#0A3560',
          'blue-light': '#1A6AB0',
          'blue-bright': '#00A8E8',
          steel: '#6B7280',
          'steel-light': '#9CA3AF',
          dark: '#050A14',
          'dark-2': '#0A0F1E',
          'dark-3': '#0D1526',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(15, 76, 129, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 76, 129, 0.08) 1px, transparent 1px)`,
        'hero-gradient': 'linear-gradient(135deg, #050A14 0%, #0A1628 50%, #0D1F3C 100%)',
        'blue-gradient': 'linear-gradient(135deg, #0F4C81 0%, #00A8E8 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(15, 76, 129, 0.1) 0%, rgba(0, 168, 232, 0.05) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'beam': 'beam 4s ease-in-out infinite',
        'particle': 'particle 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        beam: {
          '0%, 100%': { opacity: '0.2', transform: 'scaleX(1)' },
          '50%': { opacity: '0.5', transform: 'scaleX(1.1)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(100px)', opacity: '0' },
        },
      },
      boxShadow: {
        'blue-glow': '0 0 30px rgba(15, 76, 129, 0.3)',
        'blue-glow-lg': '0 0 60px rgba(15, 76, 129, 0.4)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 30px rgba(15, 76, 129, 0.2)',
        'inner-blue': 'inset 0 0 30px rgba(15, 76, 129, 0.1)',
      },
    },
  },
  plugins: [animate],
}

export default config
