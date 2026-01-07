import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        hud: "0 12px 30px rgba(2, 42, 84, 0.10)",
      },
      borderRadius: {
        card: "24px",
        button: "20px",
      },
      colors: {
        navy: "var(--navy)",
        cream: "var(--cream)",
        sky: "var(--sky-blue)",
        "cta-red": "var(--cta-red)",
        "warm-yellow": "var(--warm-yellow)",
      },
    },
  },
  plugins: [],
};

export default config;
