/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx,js,ts,html}"
  ],
  theme: {
    extend: {
      colors:{
        blue : {
          secondary : "#E0E7FE",
          primary : "#4F45E1",
          random  : "#F0885C"
        },
        black : { 
          primary : "#000000",
        },
        gray : {
          primary : "#DDDDDD",
          bg_main : "#F9FBFC",
          bg_sidebar : "#FFFFFF"

        }
      },
      screens : {
        mobile : "425px",
        mobileS : "320px",
        tabletBottom : "768px",
        tabletUp : "895px",
        shareUp : "1123px",
        mobileM : "375px"
      }
    },
  },
  plugins: [],
}

