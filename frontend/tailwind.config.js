/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Sora'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          900: "#0d0d0d",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3d3d3d",
        },
        lime: {
          400: "#c8f135",
          500: "#b3d900",
        },
      },
    },
  },
  plugins: [],
};
