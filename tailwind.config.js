const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}', './chusho.config.js'],

  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        a: { textDecoration: 'underline' },
      });
    }),
  ],
};
