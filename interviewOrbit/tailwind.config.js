/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0d1227',
          dim: '#080d22',
          card: '#151a30',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          blue: '#0052ff',
          cyan: '#00f0ff',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}