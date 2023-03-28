/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      brightBlue: "hsl(220, 98%, 61%)",
      checkBackground: "hsl(192, 100%, 67%)",
      checkBackgroundTo: "hsl(280, 87%, 65%)",
      // Light Theme:
      veryLightGray: "hsl(0, 0%, 98%)",
      veryLightGrayishBlue: "hsl(236, 33%, 92%)",
      lightGrayishBlue: "hsl(233, 11%, 84%)",
      darkGrayishBlue: "hsl(236, 9%, 61%)",
      veryDarkGrayishBlue: "hsl(235, 19%, 35%)",
      // Dark Theme
      veryDarkBlue: "hsl(235, 21%, 11%)",
      veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
      lightGrayishBlue: "hsl(234, 39%, 85%)",
      lightGrayishBlueHover: "hsl(236, 33%, 92%)",
      darkGrayishBlue: "hsl(234, 11%, 52%)",
      veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
      veryDarkGrayishBlue: "hsl(237, 14%, 26%)",
      "transparent": "transparent",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "768px",
        "2xl": "1024px",
      },
    },
    extend: {},
  },
  plugins: [],
};
