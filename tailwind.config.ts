import type { Config } from "tailwindcss";
import formsPlugin from '@tailwindcss/forms';

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        brand: '#FFA300',
        dark: '#15313F',
        navy: '#213469',
        gray: '#8C8C8C',
        cyan: '#5FAEC4',
        formInput: '#F2F7FF',
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
