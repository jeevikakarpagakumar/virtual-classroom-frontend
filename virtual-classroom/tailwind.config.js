/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode support
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Ensure this includes app directory
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa", // Light mode background
        foreground: "#1a1a1a", // Light mode text color
        "dark-background": "#181818", // Dark mode background
        "dark-foreground": "#ffffff", // Dark mode text color
      },
    },
  },
  plugins: [],
};
