/** @type {import('tailwindcss').Config} */
// const plugin = require("tailwindcss/plugin");
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins"],
      },
      colors: {
        bg_base: "#F1F1FB",
        text_dark: "#1F2B3A",
        primary: "#0087FF",
        warning: "#FF0004"
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          fontFamily: theme("fontFamily.body"),
          scrollBehavior: "smooth",
          backgroundColor: theme("colors.bg_base"),
          color: theme("colors.text_dark"),
          backgroundImage:
          "repeating-linear-gradient(-45deg, #e1e1e1, #e1e1e1 1px, #f5f5f5 1px, #f5f5f5 8px)",
        },
        html: {
          scrollBehavior: "smooth",
        },
      });
    }),
  ],
};
