const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/vite-dev-server/index.html',
    './src/views/public-blog/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        EBGaramond: 'EB Garamond, monospace',
      },
      boxShadow: {
        custom: `0 0 10px 1px ${colors.stone[200]}`,
        'custom-dark': `0 0 10px 1px ${colors.slate[700]}`,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
