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
        background: '#0a0a0f',
        border: '#e9eaeb',
        grayText: '#232323',
        lightGrayText: '#718ebf',
        bgblack: '#1A1B21',
        bgblack1: '#141419',
        codebg: '#2a2a2f',
        btnblue: '#2563eb',
        border2: '#374151',
        borderblack: '#1f1f26',
        txtgray: '#9CA3AF',
        txtgray2: '#6B7280',
        bgblack2: '#1A1F2E',
        border3: '#2D3748',
        border4: '#334155',
        border5: '#2D2D44',
        input: '#22232B',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        jetbrains: ['var(--font-jetbrains)'],
      },
    },
    screens: {
      mobile: { max: '640px' },
      tablet: { min: '640px', max: '1023px' },
      small: { max: '1023px' },
      desktop: { min: '1024px' },
      desktopMax: { max: '1536px' },
      fixScale: { min: '1390px', max: '1536px' },
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
