/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          50: '#e6f7fc',
          100: '#b3e8f5',
          200: '#80d9ee',
          300: '#4dcae7',
          400: '#1abfe0',
          500: '#14b8e6',
          600: '#119dbf',
          700: '#0d7d99',
          800: '#0a5d73',
          900: '#063d4d',
        },
        surface: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
};
