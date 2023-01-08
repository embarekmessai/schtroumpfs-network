/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{
      ...colors,
      appGreen : {
        '100':'#12B10F',
        '200':'#0C7D0A',
      },
      appBlue : '#26C7FA'
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
