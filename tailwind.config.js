/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B1534",
        "primary-dark": "#2B0A1E",
        "primary-light": "#6A274C",
        secondary: "#C6A972",
        "secondary-light": "#DCC49A",
        accent: "#8B5E3C",
        "accent-light": "#B98A63",
        background: "#FAF8F5",
        surface: "#FFFFFF",
        "surface-soft": "#F5F0EA",
        "text-primary": "#1F1A17",
        "text-secondary": "#5F5752",
        success: "#3E6B4D",
        warning: "#B07D32",
        pastelPink: "#C6A972",
        pastelBlue: "#F5F0EA",
        mint: "#E6EFE8",
        cream: "#FAF8F5",
        lavender: "#F0E7EA",
        ink: "#4B1534"
      },
      boxShadow: {
        soft: "0 8px 25px rgba(75, 21, 52, 0.08)",
        glow: "0 15px 40px rgba(75, 21, 52, 0.12)"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        display: ["Cormorant Garamond", "Georgia", "serif"]
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        shine: "shine 1.2s ease-in-out"
      }
    }
  },
  plugins: []
};