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
    screens: {
      mobile: { max: '640px' },
      tablet: { min: '640px', max: '1023px' },
      small: { max: '1023px' },
      desktop: { min: '1024px' },
      desktopMax: { max: '1536px' },
      bigScreen: { min: '1550px' },

      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px', max: '1535px' },
      xxl: { min: '1536px' },

      tall: { raw: '(min-height: 933px)' },
      short: { raw: '(max-height: 600px)' },
    },
  },
  plugins: [],
};
