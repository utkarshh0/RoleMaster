/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      colors : {
          primary : 'var(--primary)',
          text : 'var(--text)'
      }
    },
  },
  plugins: [],
}

