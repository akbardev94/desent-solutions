/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f3eee6",
        ink: "#1c1916",
        clay: "#c4542c",
        moss: "#2f6b4f",
        line: "#eadfce",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(80, 48, 20, 0.06)",
      },
    },
  },
  plugins: [],
}
