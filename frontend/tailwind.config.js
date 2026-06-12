/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        laser: {
          neon: '#00ffcc',
          purple: '#bd00ff',
          blue: '#0066ff',
          pink: '#ff0055',
        }
      },
    },
  },
  plugins: [],
}