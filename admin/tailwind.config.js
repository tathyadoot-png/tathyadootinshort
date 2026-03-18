/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        text: "var(--color-text)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};

export default config;
