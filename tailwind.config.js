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
          textDark : 'var(--textDark)',
          textLight : 'var(--textLight)'
      }
    },
  },
  plugins: [],
}

