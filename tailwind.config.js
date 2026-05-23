/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pastelPink: "#FFD6E8",
        pastelBlue: "#D6F0FF",
        mint: "#D8FFE3",
        cream: "#FFF8F0",
        lavender: "#E8D9FF",
        ink: "#34313f"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(150, 115, 160, 0.16)",
        glow: "0 16px 38px rgba(180, 126, 150, 0.18)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"]
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
