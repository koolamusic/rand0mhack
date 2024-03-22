import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        hop: {
          "0%, 100%": { transform: "translateY(-1.5%)" },
          "50%": { transform: "translateY(1.5%)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.75s linear infinite",
        hop: "hop 0.55s ease-in infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
