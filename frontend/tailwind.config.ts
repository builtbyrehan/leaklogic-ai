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
        // Dark backgrounds
        'dark': {
          900: '#0F0F10',
          800: '#18181B',
          700: '#27272A',
        },
        'dark-primary': '#001031', // Deep indigo from Spline
        'sidebar': '#09090B',
        
        // Spline-inspired branding colors
        'brand': {
          'violet': '#7B2FF7',      // Top wave
          'magenta': '#E8299C',     // Mid band
          'pink': '#FF4D8D',        // Transition band
          'orange': '#FF7A3D',      // Lower band
          'peach': '#FFA85C',       // Bottom band
        },
        
        // Primary (using Spline violet)
        'primary': {
          DEFAULT: '#7B2FF7',
          light: '#9D5CFF',
          dark: '#6020D9',
        },
        
        // Success (keeping functional green)
        'success': {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        
        // Warning (using Spline peach/orange)
        'warning': {
          DEFAULT: '#FFA85C',
          light: '#FFBC7D',
          dark: '#FF7A3D',
        },
        
        // Danger (using Spline pink/magenta)
        'danger': {
          DEFAULT: '#FF4D8D',
          light: '#FF70A6',
          dark: '#E8299C',
        },
        
        // Accent (Spline magenta)
        'accent': {
          DEFAULT: '#E8299C',
          light: '#FF4DB8',
          dark: '#C91A7F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #001031 0%, #27272A 100%)',
        
        // Spline-inspired gradients
        'gradient-primary': 'linear-gradient(135deg, #7B2FF7 0%, #E8299C 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #E8299C 0%, #FF4D8D 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FF7A3D 0%, #FFA85C 100%)',
        'gradient-rainbow': 'linear-gradient(135deg, #7B2FF7 0%, #E8299C 33%, #FF4D8D 66%, #FF7A3D 100%)',
        
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(123, 47, 247, 0.2) 0%, rgba(232, 41, 156, 0.2) 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(123, 47, 247, 0.5)',
        'glow-magenta': '0 0 30px rgba(232, 41, 156, 0.5)',
        'glow-pink': '0 0 30px rgba(255, 77, 141, 0.5)',
        'glow-success': '0 0 30px rgba(16, 185, 129, 0.5)',
        'glow-danger': '0 0 30px rgba(255, 77, 141, 0.5)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rainbow': 'rainbow 8s ease-in-out infinite',
        'glass-shimmer': 'glassShimmer 7s ease-in-out infinite',
        'color-cycle': 'colorCycle 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(123, 47, 247, 0.5), 0 0 10px rgba(123, 47, 247, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(123, 47, 247, 0.8), 0 0 30px rgba(123, 47, 247, 0.5)' },
        },
        rainbow: {
          '0%, 100%': { borderColor: '#7B2FF7' },
          '25%': { borderColor: '#E8299C' },
          '50%': { borderColor: '#FF4D8D' },
          '75%': { borderColor: '#FF7A3D' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
