/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b59f8',
        secondary: '#343c6a',
        primaryLight: 'rgba(27, 89, 248, 0.1)',
        background: '#f5f7fa',
        border: '#e9eaeb',
        grayText: '#232323',
        lightGrayText: '#718ebf',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
