const { fontFamily } = require("tailwindcss/defaultTheme")
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D50000",
          hover: "#B30000"
        },
        secondary: "#4FC1E9",
        accent: "#4CAF50",
        tertiary: "#9C27B0",
        highlight: "#F2EA7E",
        background: "#121A29",
        foreground: "#FFFFFF",
        "white-alpha": {
          5: "rgba(255, 255, 255, 0.05)",
          10: "rgba(255, 255, 255, 0.1)",
          20: "rgba(255, 255, 255, 0.2)", 
          30: "rgba(255, 255, 255, 0.3)",
          50: "rgba(255, 255, 255, 0.5)",
          70: "rgba(255, 255, 255, 0.7)",
          80: "rgba(255, 255, 255, 0.8)",
        },
        primaryRed: "#D50000",
        primaryYellow: "#F2EA7E",
        accentGreen: "#4CAF50",
        textDark: "#333333",
        textLight: "#666666",
        'yogurt-red': 'var(--fresh-berry-red)',
        'accent-green': 'var(--bogani-green)',
        'berry': 'var(--fresh-berry-red)',
        'cream': '#F2EA7E',
        'bogani-green': 'var(--bogani-green)',
        'fresh-berry-red': 'var(--fresh-berry-red)',
        'charcoal-black': 'var(--charcoal-black)',
        'bright-white': 'var(--bright-white)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 15px 5px rgba(255, 255, 255, 0.3)",
        "glow-sm": "0 0 10px 2px rgba(255, 255, 255, 0.15)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from var(--tw-gradient-angle), var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 4s ease-in-out infinite',
        rotate: 'rotate 20s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}