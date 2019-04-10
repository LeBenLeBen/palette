module.exports = {
  devServer: {
    port: 3000,
  },
  css: {
    loaderOptions: {
      // Loading Kanbasu settings to access it's variables, mixins, etc.
      sass: {
        data: `
          @import '~kanbasu/src/scss/tools/functions';
          @import '~kanbasu/src/scss/tools/mixins';
          @import "@/assets/scss/settings/_settings.scss";
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/palette/' : '/',
};
