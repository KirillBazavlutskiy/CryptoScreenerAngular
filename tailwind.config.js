/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        usm: "400px",
        fhd: "1920px"
      },
      fontSize: {
        usm: "10px"
      }
    },
  },
  plugins: [],
}
