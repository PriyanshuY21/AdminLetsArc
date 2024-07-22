/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EDE9E5",
        as:"#848484",
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
