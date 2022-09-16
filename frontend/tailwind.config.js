module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#027D86",
        secondary: "#289A48",
      },
      gridTemplateColumns: {
        hero: "5fr 2fr",
      },
      height: {
        100: "28rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
};
