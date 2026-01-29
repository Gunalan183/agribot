/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#228B22',
        'agri-light': '#90EE90',
        'agri-dark': '#006400',
      },
      fontSize: {
        'xxs': '0.625rem',
      }
    },
  },
  plugins: [],
}