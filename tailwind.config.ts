import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary gold palette (from logo)
        gold: {
          50:  '#fdf8ee',
          100: '#f8edc8',
          200: '#f0d98a',
          300: '#E8C97A',
          400: '#C9A84C', // Primary gold
          500: '#B08C38',
          600: '#8C6E28',
          700: '#6B5220',
          800: '#4A3818',
          900: '#2A1F0C',
        },
        // Silver palette (from logo)
        silver: {
          50:  '#f5f6f8',
          100: '#E0E5EC',
          200: '#C4CDD8',
          300: '#A8B2C0',
          400: '#8C97A8',
          500: '#707C8C',
          600: '#566070',
          700: '#3E4650',
          800: '#282E38',
          900: '#141820',
        },
        // Navy dark palette (from logo background)
        navy: {
          50:  '#eef0f5',
          100: '#d0d5e4',
          200: '#a8b2cc',
          300: '#7a8ab4',
          400: '#4C5E8C',
          500: '#2C3A6B',
          600: '#1C2444', // Main navy
          700: '#141A33',
          800: '#0D1022',
          900: '#070813',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
