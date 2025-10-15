 codex/add-automated-github-deployment-script-rziebe
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f4ff',
          100: '#ebe9fe',
          200: '#d9d4fd',
          300: '#c0b4fa',
          400: '#a086f5',
          500: '#7f55ef',
          600: '#6436e4',
          700: '#5328cb',
          800: '#4524a7',
          900: '#3b2188'
        }
      }
    }
  },
  plugins: []
};


import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
 main
export default config;
