/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "../Letsarc/src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        blue1: "#0B60B0",
        white1: "#FFFFFF",
        white2: "#FFFBF5",
        white3: "#E5E1DA",
        black1: "#000000",
        black2: "#141414",
        grey1: "#D5DADD",
        primary: "#EDE9E5",
        secondary: "#FFFFFF",
        accent: "#6B7280",
        text: "#000000",
        nc: "#D9D9D9",
        nav: "#C1C1C1",
        nn: "#F9FAFB",
        nn2: "#C1C1C1",
        gr: "#00D08A",
        gr1: "#61D6A3",
        gr2: "#DEF7EC",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [],
};
