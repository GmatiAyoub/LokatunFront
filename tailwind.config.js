/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF6D00',
          600: '#E65100',
          700: '#BF360C',
        },
        secondary: {
          50:  '#E3EAF0',
          100: '#B9CCDA',
          200: '#8FAEC4',
          300: '#6590AE',
          400: '#3B7298',
          500: '#00264D',
          600: '#001E3D',
          700: '#00162D',
        },
        sand: {
          50:  '#FFFDF9',
          100: '#FFF8F0',
          200: '#FFEFD8',
          300: '#FFE4C0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}