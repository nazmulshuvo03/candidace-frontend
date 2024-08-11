/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Or 'media'
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Roboto", "serif"],
        mono: ["Menlo", "monospace"],
      },
      gridTemplateColumns: {
        6: "repeat(6, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
