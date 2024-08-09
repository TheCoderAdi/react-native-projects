/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        SpaceMono: ["SpaceMono", "monospace"],
      },
    },
  },
  plugins: [],
};
