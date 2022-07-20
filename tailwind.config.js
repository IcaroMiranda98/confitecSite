/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        terciary: 'var(--color-terciary)',
      }
    },
  },
  plugins: [],
}
