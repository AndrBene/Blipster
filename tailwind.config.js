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
    },
  },
  plugins: [],
  darkMode: 'class',
};
