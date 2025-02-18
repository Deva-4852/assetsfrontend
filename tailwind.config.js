/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Ensure DaisyUI is loaded
};
