/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: 'Roboto Flex, sans-serif',
      },
      boxShadow: {
        buttonsShadow: ' 2px 3px 6px 1px rgba(0, 0, 0, 0.05)',
        card: '0 0.5px 15px -3px #8181814b',
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(300px,1fr))',
      },
      colors: {
        purple: '#633BBC',
        'main-red': '#F15156',
        yellow: '#F4D35E',
        'light-bg': '#FDECED',
        'dark-blue': '#0D3B66',
        organge: '#F27006',
        green: '#3CDC8C',
        'light-gray': '#D3E2E5',
      },
    },
  },
  plugins: [],
}
