/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        sora: "Sora",
      },
      colors: {
        blue: {
          light: "#E2F4FF",
          dark: "#003F62",
          hover: "#012940",
          disable: "#0367a1",
        },
        yellow: {
          dark: "#EDA415",
        },
        gray: {
          light: "#F4F4F4",
          dark: "#292D32",
        },
      },
    },
  },
  plugins: [],
};
