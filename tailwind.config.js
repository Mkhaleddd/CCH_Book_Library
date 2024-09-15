/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          // Simple 16 row grid
          'mine': ' max-content;',
  
        }
      },
    },
    plugins: [],
  }