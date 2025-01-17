/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/index.html',
    './src/client/public-blog/index.html',
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
};
