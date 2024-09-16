/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto:["Roboto", "sans-serif"],
        noto:["Noto Sans JP", "sans-serif"],
        kadwa: ['Kadwa', 'sans-serif']
      }
    },
  },
  plugins: [],
  plugins: [require('tailwindcss-font-inter')]
}