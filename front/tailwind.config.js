/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{
      ...colors,
      appGreen : '#12B10F',
      appBlue : '#26C7FA'
    },
    extend: {},
  },
  plugins: [],
}
