//const path = require("path");
module.exports = {
  //transpileDependencies: ["vuetify"],
  //outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",

      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  transpileDependencies: ["vuetify"],
};
