/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins'
      },
      colors: {
        blue: {
          'light': '#E2F4FF',
          'dark': '#003F62'
        },
        yellow: {
          'dark': '#EDA415'
        },
        gray: {
          'light': '#F4F4F4',
          'dark': '#292D32'
        }
      }
    },
  },
  plugins: [],
}

