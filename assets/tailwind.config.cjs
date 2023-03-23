/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../lib/mousers_web/components/layouts/**.heex"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
