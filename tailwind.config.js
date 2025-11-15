/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fde6e4',
          200: '#fbd0ce',
          300: '#f7aca7',
          400: '#f17d75',
          500: '#e65448',
          600: '#d13729',
          700: '#b02b1f',
          800: '#92261c',
          900: '#79251d',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe7',
          300: '#a7bdd2',
          400: '#789ab8',
          500: '#577da0',
          600: '#446385',
          700: '#38506c',
          800: '#31445b',
          900: '#2d3b4d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


