module.exports = {
  important: true,
  theme: {
    extend: {},
  },
  variants: {
    margin: ['responsive', 'last'],
  },
  plugins: [
    function({ addBase }) {
      addBase({
        a: { textDecoration: 'underline' },
      });
    },
  ],
};
