/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic colors for light/dark themes
        primary: {
          DEFAULT: "#3DCBB1",
          dark: "#19a88e",
        },
        surface: "#ffffff",
        "surface-dark": "#0f172a",
        card: "#f8fafc",
        "card-dark": "#1e293b",
        text: "#0f172a",
        "text-dark": "#e6eef6",
        muted: "#6b7280",
        "muted-dark": "#9ca3af",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
