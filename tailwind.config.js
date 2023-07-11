/** @type {import('tailwindcss').Config} */
//import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scale-animation': 'scale-up-down 0.5s ease-in-out infinite',
      },
      keyframes: {
        'scale-up-down': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

