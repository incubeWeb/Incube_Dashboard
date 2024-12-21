const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
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
  plugins: []
})