/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#11131c",
        "surface-container": "#1d1f29",
        "surface-container-low": "#191b24",
        "surface-container-high": "#282933",
        "surface-container-highest": "#33343e",

        "on-surface": "#e2e1ef",
        "on-surface-variant": "#c4c5d9",

        primary: "#2d5bff",
        "primary-cyan": "#64FFDA",

        tertiary: "#ffba20",
        outline: "#8e90a2",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
    },
  },
  plugins: [],
}