/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#2D7D32',
        'agri-light': '#81C784',
        'agri-dark': '#1B5E20',
        'agri-accent': '#4CAF50',
        'agri-yellow': '#FFC107',
        'agri-orange': '#FF9800',
        'agri-blue': '#2196F3',
        'agri-brown': '#8D6E63',
        'agri-cream': '#FFF8E1',
        'agri-soil': '#A1887F',
      },
      fontSize: {
        'xxs': '0.625rem',
        'farmer': '1.125rem', // 18px - better for farmers
        'farmer-lg': '1.25rem', // 20px
        'farmer-xl': '1.5rem', // 24px
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'farmer': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'farmer-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'farmer-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}